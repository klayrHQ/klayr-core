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
 *
 */
module.exports = {
	apps: [
		{
			name: 'klayr-core',
			script: './bin/run',
			args: 'start --network=mainnet --api-ipc --api-ws --log=info',
			// env: {
			// 	KLAYR_NETWORK: 'mainnet',
			// 	KLAYR_LOG_LEVEL: 'warn',
			// 	KLAYR_CONFIG_FILE: '',
			// 	KLAYR_DATA_PATH: '',
			// 	KLAYR_API_IPC: true,
			// 	KLAYR_API_WS: true,
			// 	KLAYR_API_HTTP: false,
			// 	KLAYR_API_HOST: '127.0.0.1',
			// 	KLAYR_API_PORT: 7887,
			// },
			pid_file: './pids/klayr-core.pid',
			out_file: './logs/klayr-core.log',
			error_file: './logs/klayr-core.err',
			log_date_format: 'YYYY-MM-DD HH:mm:ss',
		},
	],
	deploy: {
		local: {
			host: '127.0.0.1',
			// key: process.env.HOME + '/.ssh/id_rsa',
			ref: 'origin/main',
			repo: 'https://github.com/klayrhq/klayr-core.git',
			path: '/tmp/klayr-core',
			'pre-setup': 'rm -rf /tmp/klayr-core',
			'post-setup':
				'source ~/.bashrc; source ~/.zshrc; nvm install && yarn install --frozen-lockfile && npm run build',
			'pre-deploy': 'source ~/.bashrc; source ~/.zshrc; pm2 del klayr-core;:',
			'post-deploy': 'source ~/.bashrc; source ~/.zshrc; pm2 start ecosystem.config.js',
		},
		remote: {
			host: ['8.8.8.8'],
			user: 'root',
			key: process.env.HOME + '/.ssh/id_rsa',
			ref: 'origin/main',
			repo: 'https://github.com/klayrhq/klayr-core.git',
			path: '/tmp/klayr-core',
			'pre-setup': 'rm -rf /tmp/klayr-core',
			'post-setup':
				'source ~/.bashrc; nvm install && yarn install --frozen-lockfile && npm run build',
			'pre-deploy': 'source ~/.bashrc; pm2 del klayr-core;:',
			'post-deploy': 'source ~/.bashrc; pm2 start ecosystem.config.js',
		},
	},
};
