// import fs from 'fs';
import Transaction from '../models/Transaction';

import csvConfig from '../config/csv';
import CreateTransactionService from './CreateTransactionService';

interface Request {
  file: string;
}

class ImportTransactionsService {
  async execute({ file }: Request): Promise<Transaction[]> {
    const files = await csvConfig(file);
    const createTransaction = new CreateTransactionService();
    const transactions = [];

    // const fileExists = await fs.promises.stat(file);

    // if (fileExists) {
    //   await fs.promises.unlink(file);
    // }

    for (let index = 0; index < files.length; index += 1) {
      // eslint-disable-next-line no-await-in-loop
      const transaction = await createTransaction.execute({
        title: files[index].title,
        type: files[index].type,
        value: files[index].value,
        category: files[index].category,
      });

      transactions.push(transaction);
    }

    return transactions;
  }
}

export default ImportTransactionsService;
