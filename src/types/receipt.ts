export interface IWinnerReceipt {
  id: string;
  date: string;
  dueDate: string;
  datetime: string;
  observations: string | null | undefined;
  anotation: string | null | undefined;
  termsConditions: string;
  status: string;
  client: IClient;
  numberTemplate: INumberTemplate;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  totalPaid: number;
  balance: number;
  decimalPrecision: string;
  warehouse: IWarehouse;
  term: string;
  barCodeContent: string;
  seller: ISeller;
  priceList: IPriceList;
  items: IItem[];
  costCenter: string | null | undefined;
  printingTemplate: IPrintingTemplate;
  isFirstInvoiceCreated: boolean;
}

export interface IClient {
  id: string;
  name: string;
  identification: string;
  phonePrimary: string | null | undefined;
  phoneSecondary: string | null | undefined;
  fax: string | null | undefined;
  mobile: string | null | undefined;
  email: string | null | undefined;
  address: IAddress;
  kindOfPerson: string;
  regime: string;
  identificationObject: IIdentificationObject;
}

export interface IAddress {
  address: string | null | undefined;
  department: string | null | undefined;
  city: string | null | undefined;
}

export interface IIdentificationObject {
  type: string;
  number: string;
}

export interface INumberTemplate {
  id: string;
  prefix: string | null | undefined;
  number: string;
  text: string | null | undefined;
  documentType: string;
  fullNumber: string;
  formattedNumber: string;
}

export interface IWarehouse {
  id: string;
  name: string;
}

export interface ISeller {
  id: number;
  name: string;
  identification: string;
  observations: string;
  status?: string;
}

export interface IPriceList {
  id: number;
  name: string;
}

export interface IItem {
  name: string;
  description: string | null | undefined;
  price: number;
  discount: number;
  reference: string | null | undefined;
  quantity: number;
  id: number;
  productKey: string | null | undefined;
  unit: string | null | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tax: any[];
  total: number;
}

export interface IPrintingTemplate {
  id: string;
  name: string;
  pageSize: string;
}
