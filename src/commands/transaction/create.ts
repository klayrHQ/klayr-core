import { TransactionCreateCommand as BaseTransactionCreateCommand } from 'klayr-commander';
import { Application, PartialApplicationConfig } from 'klayr-sdk';
import { getApplication } from '../../application';

export class TransactionCreateCommand extends BaseTransactionCreateCommand {
	public getApplication(config: PartialApplicationConfig): Application {
		const app = getApplication(config);
		return app;
	}
}
