export interface IPayment {
  id: string;
  sequenceNo?: string;
  orNumber: string;
  amount: number | any;
  modeOfPayment: string;
  typeOfPayment: string;
  dateOfPayment?: Date;
  checkNo: string;
  bankName: string;
  branch: string;
  createdAt: Date;
}

export interface IPaymentDto {
  id: string;
  sequenceNo?: string;
  arNumber: string;
  name: string;
  propertyName: string;
  contractPrice: number | any;
  balance: number | any;
  amountPaid: number | any;
  type: string;
  mode: string;
  date?: Date;
}

export interface IPaymentFormValues extends Partial<IPayment> {}

export class PaymentFormValues implements IPaymentFormValues {
  id?: string = '';
  sequenceNo: string = '';
  dateOfPayment?: Date = undefined;
  oRNumber: string = '';
  amount: string = '';
  modeOfPayment: string = '';
  typeOfPayment: string = '';
  checkNo: string = '';
  bankName: string = '';
  branch: string = '';
  // DateOfPayment?:  Date = undefined;
  // InPaymentOf: string = '';
  // Total: string = '';
  // TransactionTypeId?: string = undefined;
  // TransactionId?:string = undefined;
  // ReceivedById?: string = undefined;

  constructor(init?: IPaymentFormValues) {
    Object.assign(this, init);
  }
}

export interface IPaymentFormValues {
  id?: string;
  transactionSequenceNo?: string;
  dateOfPayment?: Date;
  oRNumber: string;
  amount: string;
  typeOfPayment: string;
  modeOfPayment: string;
  checkNo: string;
  bankName: string;
  branch: string;
}
