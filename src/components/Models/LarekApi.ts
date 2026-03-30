import { IApi, IProductsResponse, IOrder, IProduct, IOrderSuccesResponse } from "../../types";

export class LarekApi {
  private baseApi: IApi;

  constructor(baseApi: IApi) {
    this.baseApi = baseApi
  }

  getProduct(): Promise<IProduct[]> {
    return this.baseApi.get<IProductsResponse>('/product/')
      .then((data: IProductsResponse) => data.items)
  }

  postOrder(order: IOrder): Promise<IOrderSuccesResponse> {
    return this.baseApi.post<IOrderSuccesResponse>('/order', order)
  }
}