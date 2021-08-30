import { ITransaction } from "./transaction";

export interface IClient {
  id: string;
  lastName: string;
  firstName: string;
  middleName: string;
  suffix: string;
  birthDate: Date;
  gender: string;
  civilStatus: string;
  religion: string;
  tin: string;
  zipCode: string;
  contactNumber: string;
  address: string;

  // Spouse Info
  spouseLastName: string;
  spouseFirstName: string;
  spouseMiddleName: string;
  spouseBirthDate: Date;
  spouseGender: string;
  spouseTin: string;
  spouseNumber: string;

  // Co Borrower Info
  coLastName: string;
  coFirstName: string;
  coMiddleName: string;
  coBirthDate: Date;
  coGender: string;
  coTin: string;
  coNumber: string;

  // Atty Info
  atLastName: string;
  atFirstName: string;
  atMiddleName: string;
  atBirthDate: Date;
  atGender: string;
  atTin: string;
  atNumber: string;

  // Work Info
  employment: string;
  employmentType: string;
  companyName: string;
  companyLocation: string;
  industry: string;
  dateEmployed: string;
  profession: string;
  position: string;
  officeNumber: string;

  nationality: string;
  numberOfDependents: string;
  educationalAttn: string;
  school: string;
  homeNumber: string;
  monthlyIncome: string;
  monthlyHouseholdIncome: string;
  createdAt: string;
  businesses: IBusiness[] | null;
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

export interface IClientFormValues extends Partial<IClient> {

}

export class ClientFormValues implements IClientFormValues {
  id?: string = undefined;
  lastName: string = '';
  firstName: string = '';
  middleName: string = '';
  suffix: string = '';
  birthDate?: Date = undefined;
  gender: string = '';
  civilStatus: string = '';
  religion: string = '';
  tin: string = '';
  zipCode: string = '';
  contactNumber: string = '';
  address: string = '';

  // Spouse Info
  spouseLastName: string = '';
  spouseFirstName: string = '';
  spouseMiddleName: string = '';
  spouseBirthDate?: Date = undefined;
  spouseGender: string = '';
  spouseTin: string = '';
  spouseNumber: string = '';

  // Co Borrower Info
  coLastName: string = '';
  coFirstName: string = '';
  coMiddleName: string = '';
  coBirthDate?: Date = undefined;
  coGender: string = '';
  coTin: string = '';
  coNumber: string = '';

  // Atty Info
  atLastName: string = '';
  atFirstName: string = '';
  atMiddleName: string = '';
  atBirthDate?: Date = undefined;
  atGender: string = '';
  atTin: string = '';
  atNumber: string = '';

  // Work Info
  employment: string = '';
  employmentType: string = '';
  companyName: string = '';
  companyLocation: string = '';
  industry: string = '';
  dateEmployed: string = '';
  profession: string = '';
  position: string = '';
  officeNumber: string = '';

  nationality: string = '';
  numberOfDependents: string = '';
  educationalAttn: string = '';
  school: string = '';
  homeNumber: string = '';
  monthlyIncome: string = '';
  monthlyHouseholdIncome: string = '';
  createdAt: string = '';
  businesses?: IBusiness[] = undefined;
  transactions?: ITransaction[] = undefined;

  constructor(init?: IClientFormValues) {
    Object.assign(this, init);
  }
}