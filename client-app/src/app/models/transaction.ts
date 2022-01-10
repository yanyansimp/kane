import { IPayment } from "./payment";
import { IProperty } from "./Property";

export interface ITransaction {
    id: string;
    propertyTypeName: string;
    clientName: string;
    sequenceNo: string;
    contractPrice: number;
    monthlyAmortization: number;
    terms: number;
    status: string;
    createdAt?: Date;
    balance?: number;
    property?: IProperty | null;
    documents?: IDocument[] | null;
    payments?: IPayment[] | null;

    salesManager?: ISalesManager | null;
    salesAgent?: ISalesAgent | null;
}

export interface ISalesManager {
  id: string;
  name: string;
  image: string;
}

export interface ISalesAgent {
  id: string;
  name: string;
  image: string;
}

export interface IDocument {
    id: string;
    url: string;
    type: string;
    createdAt: Date;
}

// Value to send to api
export interface ITransactionValues extends Partial<ITransaction>{
  // id: string;
  // salesManagerId: string;
  // salesAgentId: string;
  // propertyId: string;
  // propertyTypeId: string;
  // clientId: string;
  // transaction: ITransaction;
  clientName: string;
  sequenceNo: string;
  property?: IProperty | null;
}

export class TransactionFormValues implements ITransactionValues {
  id?: string = undefined;
  propertyTypeName: string = '';
  sequenceNo: string = '';
  clientName: string = '';
  property?: IProperty = undefined;
  contractPrice: number = 0;
  monthlyAmortization: number = 0;
  terms: number = 0;
  createdAt?: Date = undefined;
  // propertyTypeId: string = '28202be7-a6a4-4da8-89b5-051257b3af41';
  // propertyId: string = '';

  constructor(init?: ITransactionValues) {
    Object.assign(this, init);
  }
}
