import Transaction from '../models/Transaction';

/**
 * Conexão com a persistência dos dados com as rotas.
 * Realiza operações com o modelo como Create, Find, Delete, Update, etc.
 */

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const valueIncome = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((income, transaction) => {
        return income + transaction.value;
      }, 0);

    const valueOutcome = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((outcome, transaction) => {
        return outcome + transaction.value;
      }, 0);

    const balance = {
      income: valueIncome,
      outcome: valueOutcome,
      total: valueIncome - valueOutcome,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
