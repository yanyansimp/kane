export interface ITransactionType {
    id: string;
    name: string;
}

export interface ITransactionTypeFormValues extends Partial<ITransactionType> {}

export class TransactionTypeFormValues implements ITransactionTypeFormValues {
    id?: string = undefined;
    name: string = '';
    
    constructor(init?: ITransactionTypeFormValues) {
        Object.assign(this, init);
      }
}

export interface ITransactionTypeFormValues {
    name: string;
}
