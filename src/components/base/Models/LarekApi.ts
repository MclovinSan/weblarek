import { IApi, IGet, IPost, IProduct } from "../../../types";

export class LarekApi {
  private _baseApi: IApi;

  constructor(baseApi: IApi) {
    this._baseApi = baseApi
  }

  getProduct(): Promise<IProduct[]> {
    return this._baseApi.get<IGet>('/product/')
      .then((data: IGet) => data.items)
  }

  postOrder(order: IPost): Promise<object> {
    return this._baseApi.post<object>('/order', order)
  }
}