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
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Command } from '@oclif/core';
import { symlink, pathExistsSync, removeSync } from 'fs-extra';
import { join, isAbsolute } from 'path';

export default class LinkCommand extends Command {
	static description = 'Symlink specific SDK folder during development.';

	static examples = ['sdk:link /path/to/klayr-sdk/sdk'];

	static args = [
		{ name: 'targetSDKFolder', required: true, description: 'The path to the klayr SDK folder' },
	];

	// eslint-disable-next-line class-methods-use-this, @typescript-eslint/require-await
	async run(): Promise<void> {
		const {
			args: { targetSDKFolder },
		} = (await this.parse(LinkCommand)) as { args: { targetSDKFolder: string } };

		if (!pathExistsSync(targetSDKFolder)) {
			throw new Error(`Path '${targetSDKFolder}' does not exist or access denied.`);
		}

		const sdkLocalPath = join(__dirname, '../../../', 'node_modules', 'klayr-sdk');

		// If targetSDK folder is relative path, it should be relative from the node_module
		const targetSDKFolderFromNodeModule: string = isAbsolute(targetSDKFolder)
			? targetSDKFolder
			: join('../', targetSDKFolder);
		removeSync(sdkLocalPath);
		await symlink(targetSDKFolderFromNodeModule, sdkLocalPath);
		this.log(`Linked '${targetSDKFolder}' to '${sdkLocalPath}'.`);
	}
}
