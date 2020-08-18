/*
 * Copyright © 2020 Lisk Foundation
 *
 * See the LICENSE file at the top-level directory of this distribution
 * for licensing information.
 *
 * Unless otherwise agreed in a custom licensing agreement with the Lisk Foundation,
 * no part of this software, including this file, may be copied, modified,
 * propagated, or distributed except according to the terms contained in the
 * LICENSE file.
 *
 * Removal or modification of this copyright notice is prohibited.
 *
 */

import { Command, flags as flagParser } from '@oclif/command';
import { codec, cryptography, IPCChannel } from 'lisk-sdk';
import { getDefaultPath, getSocketsPath, splitPath } from './utils/path';
import { flags as commonFlags } from './utils/flags';
import { isApplicationRunning } from './utils/application';

interface BaseIPCFlags {
	readonly pretty?: boolean;
	readonly 'data-path'?: string;
}

export interface Schema {
	readonly $id: string;
	readonly type: string;
	readonly properties: Record<string, unknown>;
}

interface CodecSchema {
	accountSchema: Schema;
	blockSchema: Schema;
	blockHeaderSchema: Schema;
	blockHeadersAssets: {
		[key: number]: Schema;
	};
	transactionSchema: Schema;
	transactionsAssetSchemas: {
		moduleType: number;
		assetType: number;
		schema: Schema;
	}[];
}

export interface Codec {
	decodeAccount: (data: Buffer | string) => Record<string, unknown>;
	decodeBlock: (data: Buffer | string) => Record<string, unknown>;
	decodeTransaction: (data: Buffer | string) => Record<string, unknown>;
	encodeTransaction: (assetSchema: Schema, transactionObject: Record<string, unknown>) => string;
	transactionFromJSON: (
		assetSchema: Schema,
		transactionObject: Record<string, unknown>,
	) => Record<string, unknown>;
	transactionToJSON: (
		assetSchema: Schema,
		transactionObject: Record<string, unknown>,
	) => Record<string, unknown>;
}

const prettyDescription = 'Prints JSON in pretty format rather than condensed.';

const convertStrToBuffer = (data: Buffer | string): Buffer =>
	Buffer.isBuffer(data) ? data : Buffer.from(data, 'base64');

export default abstract class BaseIPCCommand extends Command {
	static flags = {
		pretty: flagParser.boolean({
			description: prettyDescription,
		}),
		'data-path': flagParser.string({
			...commonFlags.dataPath,
			env: 'LISK_DATA_PATH',
		}),
	};

	public baseIPCFlags: BaseIPCFlags = {};
	protected _codec!: Codec;
	protected _channel!: IPCChannel;
	protected _schema!: CodecSchema;

	// eslint-disable-next-line @typescript-eslint/require-await
	async finally(error?: Error | string): Promise<void> {
		if (error) {
			// TODO: replace this logic with isApplicationRunning util and log the error accordingly
			if (/^IPC Socket client connection timeout./.test((error as Error).message)) {
				this.error(
					'Please ensure the app is up and running with ipc enabled before using the command!',
				);
			}
			this.error(error instanceof Error ? error.message : error);
		}
		this._channel.cleanup();
	}

	async init(): Promise<void> {
		// Typing problem where constructor is not allowed as Input<any> but it requires to be the type
		const { flags } = this.parse(
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(this.constructor as unknown) as flagParser.Input<any>,
		);
		this.baseIPCFlags = flags as BaseIPCFlags;

		const dataPath = this.baseIPCFlags['data-path']
			? this.baseIPCFlags['data-path']
			: getDefaultPath();
		await this._createIPCChannel(dataPath);
		await this._setCodec();
	}

	printJSON(message?: string | Record<string, unknown>): void {
		if (this.baseIPCFlags.pretty) {
			this.log(JSON.stringify(message, undefined, '  '));
		} else {
			this.log(JSON.stringify(message));
		}
	}

	private async _createIPCChannel(dataPath: string): Promise<void> {
		const { rootPath, label } = splitPath(dataPath);

		if (!isApplicationRunning(dataPath)) {
			throw new Error(`Application at data path ${dataPath} is not running.`);
		}

		this._channel = new IPCChannel(
			'CoreCLI',
			[],
			{},
			{
				socketsPath: getSocketsPath(rootPath, label),
			},
		);

		await this._channel.startAndListen();
	}

	private async _setCodec(): Promise<void> {
		this._schema = await this._channel.invoke('app:getSchema');

		this._codec = {
			decodeAccount: (data: Buffer | string): Record<string, unknown> =>
				codec.decodeJSON(this._schema.accountSchema, convertStrToBuffer(data)),
			decodeBlock: (data: Buffer | string): Record<string, unknown> => {
				const blockBuffer: Buffer = Buffer.isBuffer(data) ? data : Buffer.from(data, 'base64');
				const { blockSchema, blockHeaderSchema, blockHeadersAssets } = this._schema;
				const {
					header,
					payload,
				}: {
					header: Buffer;
					payload: ReadonlyArray<Buffer>;
				} = codec.decode(blockSchema, blockBuffer);

				const baseHeaderJSON: {
					asset: string;
					version: string;
				} = codec.decodeJSON(blockHeaderSchema, header);
				const blockAssetJSON = codec.decodeJSON<Record<string, unknown>>(
					blockHeadersAssets[baseHeaderJSON.version],
					Buffer.from(baseHeaderJSON.asset, 'base64'),
				);
				const payloadJSON = payload.map(transactionBuffer =>
					this._codec.decodeTransaction(transactionBuffer),
				);

				const blockId = cryptography.hash(header).toString('base64');

				return {
					header: {
						...baseHeaderJSON,
						asset: { ...blockAssetJSON },
						id: blockId,
					},
					payload: payloadJSON,
				};
			},
			decodeTransaction: (data: Buffer | string): Record<string, unknown> => {
				const transactionBuffer = Buffer.isBuffer(data) ? data : Buffer.from(data, 'base64');
				const baseTransaction: {
					moduleType: number;
					assetType: number;
					asset: string;
				} = codec.decodeJSON(this._schema.transactionSchema, transactionBuffer);
				const transactionTypeAssetSchema = this._schema.transactionsAssetSchemas.find(
					as =>
						as.moduleType === baseTransaction.moduleType &&
						as.assetType === baseTransaction.assetType,
				);
				if (!transactionTypeAssetSchema) {
					throw new Error(
						`Transaction with module ${baseTransaction.moduleType} asset ${baseTransaction.assetType} is not registered`,
					);
				}
				const transactionAsset = codec.decodeJSON<Record<string, unknown>>(
					transactionTypeAssetSchema.schema,
					Buffer.from(baseTransaction.asset, 'base64'),
				);

				return {
					...baseTransaction,
					id: cryptography.hash(transactionBuffer).toString('base64'),
					asset: transactionAsset,
				};
			},
			transactionFromJSON: (
				assetSchema: Schema,
				transactionObject: Record<string, unknown>,
			): Record<string, unknown> => {
				const assetBuffer = codec.encode(
					assetSchema,
					codec.fromJSON(assetSchema, transactionObject.asset as object),
				);

				return codec.fromJSON(this._schema.transactionSchema, {
					...transactionObject,
					asset: assetBuffer,
				});
			},
			transactionToJSON: (
				assetSchema: Schema,
				transactionObject: Record<string, unknown>,
			): Record<string, unknown> => {
				const assetJSON = codec.toJSON(assetSchema, transactionObject.asset as object);

				const transactionJSON = codec.toJSON(this._schema.transactionSchema, {
					...transactionObject,
					asset: Buffer.alloc(0),
				});

				return {
					...transactionJSON,
					asset: assetJSON,
				};
			},
			encodeTransaction: (
				assetSchema: Schema,
				transactionObject: Record<string, unknown>,
			): string => {
				const assetBuffer = codec.encode(assetSchema, transactionObject.asset as object);

				const transactionBuffer = codec.encode(this._schema.transactionSchema, {
					...transactionObject,
					asset: assetBuffer,
				});

				return transactionBuffer.toString('base64');
			},
		};
	}
}