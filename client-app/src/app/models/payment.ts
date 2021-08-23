export interface IPayment {
    id: string;
    // ORNumber: string;
    Amount: string;
    ModeOfPayment: string;
    // DateOfPayment?: Date;
    CheckNo: string;
    BankName: string;
    Branch: string;
    // TransactionId: string | null;
    // ReceivedById: string| null;
    
}

export interface IPaymentFormValues extends Partial<IPayment> {}

export class PaymentFormValues implements IPaymentFormValues {
    id?: string = undefined;
    // ORNumber: string = '';
    Amount:  string = '';
    ModeOfPayment:  string = '';
    // DateOfPayment?:  Date = undefined;
    CheckNo:  string = '';
    BankName: string = '';
    Branch: string = '';
    // TransactionId?:string = undefined;
    // ReceivedById?: string = undefined;
    
    constructor(init?: IPaymentFormValues) {
        Object.assign(this, init);
      }
}

export interface IPaymentFormValues {
    // ORNumber: string;
    Amount: string;
    ModeOfPayment: string;
    // DateOfPayment?: Date;
    CheckNo: string;
    BankName: string;
    Branch: string;
}
