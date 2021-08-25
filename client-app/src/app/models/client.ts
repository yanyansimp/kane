import { ITransaction } from "./transaction";

export interface IClient {
  id: string;
  lastName: string;
  firstName: string;
  middleName: string;
  suffix: string;
  birthDate: Date;
  tin: string;
  contactNumber: string;
  address: string;
  gender: string;
  nationality: string;
  civilStatus: string;
  numberOfDependents: string;
  educationalAttn: string;
  school: string;
  religion: string;
  homeNumber: string;
  officeNumber: string;
  monthlyIncome: string;
  monthlyHouseholdIncome: string;
  createdAt: string;
  businesses: IBusiness[];
  transactions: ITransaction[];
}

export interface IBusiness {
    id: string;
    name: string;
    location: string;
    type: string;
    industry: string;
    dateEstablished: string;
    createdAt: string;
}