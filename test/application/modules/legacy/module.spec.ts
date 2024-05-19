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
} from 'klayr-sdk';

import { LegacyModule } from '../../../../src/application/modules';
import { LegacyMethod } from '../../../../src/application/modules/legacy/method';
import { LegacyEndpoint } from '../../../../src/application/modules/legacy/endpoint';
import {
	MODULE_NAME_LEGACY,
} from '../../../../src/application/modules/legacy/constants';

describe('LegacyModule', () => {
	let legacyModule: LegacyModule;

	beforeAll(() => {
		legacyModule = new LegacyModule();
	});

	it('should inherit from BaseModule', () => {
		expect(LegacyModule.prototype).toBeInstanceOf(BaseModule);
	});

	describe('constructor', () => {
		it('should have valid name', () => {
			expect(legacyModule.name).toBe(MODULE_NAME_LEGACY);
		});

		it('should expose endpoint', () => {
			expect(legacyModule).toHaveProperty('endpoint');
			expect(legacyModule.endpoint).toBeInstanceOf(LegacyEndpoint);
		});

		it('should expose Method', () => {
			expect(legacyModule).toHaveProperty('method');
			expect(legacyModule.method).toBeInstanceOf(LegacyMethod);
		});
	});

	describe('metadata', () => {
		it('should return module metadata', () => {
			const moduleMetadata = legacyModule.metadata();
			expect(typeof moduleMetadata).toBe('object');
			expect(Object.keys(moduleMetadata)).toEqual([
				'endpoints',
				'commands',
				'events',
				'assets',
				'stores',
			]);
			expect(moduleMetadata.endpoints).toHaveLength(0);
			expect(moduleMetadata.commands).toHaveLength(1);
			expect(moduleMetadata.events).toHaveLength(1);
			expect(moduleMetadata.assets).toHaveLength(0);
			expect(moduleMetadata.stores).toHaveLength(0);
		});
	});

});
