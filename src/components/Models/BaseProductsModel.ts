export abstract class BaseProductsModel<T> {
   protected _products: T[] = [];
  
   getItems(): T[] {
    return this._products
  }
}