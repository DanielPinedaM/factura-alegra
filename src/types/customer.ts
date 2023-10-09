import { ISeller } from './receipt';

export interface ICustomer {
  id: string;
  name: string;
  identification: string;
  email: string;
  phonePrimary: string;
  phoneSecondary: string;
  fax: string;
  mobile: string;
  observations: string;
  status: string;
  kindOfPerson: string;
  regime: string;
  nameObject: INameObject;
  identificationObject: IIdentificationObject;
  enableHealthSector: boolean;
  healthPatients: string | null | undefined;
  address: IAddress;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type: any[];
  seller: ISeller;
  term: string | null | undefined;
  priceList: string | null | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  internalContacts: any[];
  settings: ISettings;
  statementAttached: boolean;
  accounting: IAccounting;
}

export interface INameObject {
  firstName: string;
  lastName: string;
}

export interface IIdentificationObject {
  type: string;
  number: string;
}

export interface IAddress {
  address: string;
  city: string;
  department: string;
  country: string;
  zipCode: string;
}

export interface ISettings {
  sendElectronicDocuments: boolean;
}

export interface IAccounting {
  accountReceivable: IAccountReceivable;
  debtToPay: IDebtToPay;
}

export interface IAccountReceivable {
  id: string;
  idParent: string;
  name: string;
  text: string;
  code: string | null | undefined;
  description: string;
  type: string;
  readOnly: boolean;
  nature: string;
  blocked: string;
  status: string;
  categoryRule: ICategoryRule;
  use: string;
  showThirdPartyBalance: boolean;
}

export interface ICategoryRule {
  id: string;
  name: string;
  key: string;
}

export interface IDebtToPay {
  id: string;
  idParent: string;
  name: string;
  text: string;
  code: string | null | undefined;
  description: string;
  type: string;
  readOnly: boolean;
  nature: string;
  blocked: string;
  status: string;
  categoryRule: ICategoryRule2;
  use: string;
  showThirdPartyBalance: boolean;
}

export interface ICategoryRule2 {
  id: string;
  name: string;
  key: string;
}
