/*
 * Copyright © 2022 Lisk Foundation
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
 */
import {
	BaseModule,
	ValidatorsMethod,
	PoSMethod,
	ModuleMetadata,
} from 'klayr-sdk';

import { LegacyMethod } from './method';
import { LegacyEndpoint } from './endpoint';

import { RegisterKeysCommand } from './commands/register_keys';
import { KeysRegisteredEvent } from './events/keysRegistered';

export class LegacyModule extends BaseModule {
	public endpoint = new LegacyEndpoint(this.stores, this.offchainStores);
	public method = new LegacyMethod(this.stores, this.events);
	private _validatorsMethod!: ValidatorsMethod;
	private _posMethod!: PoSMethod;

	private readonly _registerKeysCommand = new RegisterKeysCommand(this.stores, this.events);

	public constructor() {
		super();

		// Register events
		this.events.register(KeysRegisteredEvent, new KeysRegisteredEvent(this.name));
	}

	public commands = [this._registerKeysCommand];

	public addDependencies(
		validatorsMethod: ValidatorsMethod,
		posMethod: PoSMethod,
	) {
		this._posMethod = posMethod;
		this._validatorsMethod = validatorsMethod;
		this._registerKeysCommand.addDependencies(this._validatorsMethod, this._posMethod);
	}

	public metadata(): ModuleMetadata {
		return {
			endpoints: [],
			commands: this.commands.map(command => ({
				name: command.name,
				params: command.schema,
			})),
			events: this.events.values().map(e => ({
				name: e.name,
				data: e.schema,
			})),
			assets: [],
			stores: [],
		};
	}

}
