export type IProduct = ArrayProduct[];

export interface ArrayProduct {
  id: number;
  category: ICategory;
  hasNoIvaDays: boolean;
  name: string;
  description: string | null | undefined;
  reference: string | null | undefined;
  status: string;
  price: IPrice[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tax: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customFields: any[];
  productKey: string | null | undefined;
  type: string;
  itemType: string | null | undefined;
}

export interface ICategory {
  id: string;
  name: string;
}

export interface IPrice {
  idPriceList: number;
  name: string;
  type: string;
  price: string;
  currency: ICurrency;
}

export interface ICurrency {
  code: string;
  symbol: string;
}
