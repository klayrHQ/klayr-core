import { TransactionSignCommand as BaseTransactionSignCommand } from 'klayr-commander';
import { Application, PartialApplicationConfig } from 'klayr-sdk';
import { getApplication } from '../../application';

export class TransactionSignCommand extends BaseTransactionSignCommand {
	public getApplication(config: PartialApplicationConfig): Application {
		const app = getApplication(config);
		return app;
	}
}
