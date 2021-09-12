import { IPayment } from "./payment";
import { IProperty } from "./Property";

export interface ITransaction {
    id: string;
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
}

export interface IDocument {
    id: string;
    url: string;
    type: string;
    createdAt: Date;
}

// Value to send to api
export interface ITransactionValues {
  id: string;
  salesManagerId: string;
  salesAgentId: string;
  propertyId: string;
  propertyTypeId: string;
  clientId: string;
  transaction: ITransaction;
}