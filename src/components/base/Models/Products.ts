import { IProduct } from '../../../types'
import { BaseProductsModel } from './BaseProductsModel';

export class Products extends BaseProductsModel<IProduct>{
  private _preview: IProduct | null = null;
  
  setItems(items: IProduct[]): void {
    this._products = items
  }

  getItemById(id: string): IProduct | undefined {
    return this._products.find(p => p.id === id)
  }

  setPreview(product: IProduct): void {
    this._preview = product
  }

  getPreview(): IProduct | null {
    return this._preview
  }
}