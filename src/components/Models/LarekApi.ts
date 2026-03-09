import { IApi, IProductsResponse, IOrder, IProduct, IOrderSuccesResponse } from "../../types";

export class LarekApi {
  private _baseApi: IApi;

  constructor(baseApi: IApi) {
    this._baseApi = baseApi
  }

  getProduct(): Promise<IProduct[]> {
    return this._baseApi.get<IProductsResponse>('/product/')
      .then((data: IProductsResponse) => data.items)
  }

  postOrder(order: IOrder): Promise<IOrderSuccesResponse> {
    return this._baseApi.post<IOrderSuccesResponse>('/order', order)
  }
}