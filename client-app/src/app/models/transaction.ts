import { IProperty } from "./Property";

export interface ITransaction {
    id: string;
    contractPrice: number;
    monthlyAmortization: number;
    terms: number;
    status: string;
    createdAt: Date;
    property: IProperty;
    documents: IDocument[];
}

export interface IDocument {
    id: string;
    url: string;
    type: string;
    createdAt: Date;
}