import { IProduct } from '../../types'
import { IEvents } from '../base/Events';
import { BaseProductsModel } from './BaseProductsModel';

export class Products extends BaseProductsModel<IProduct>{
  private _preview: IProduct | null = null;

  constructor(protected events: IEvents) {
    super()
  }
  
  setItems(items: IProduct[]): void {
    this._products = items
    this.events.emit('items:changed')
  }

  getItemById(id: string): IProduct | undefined {
    return this._products.find(p => p.id === id)
  }

  setPreview(product: IProduct): void {
    this._preview = product
    this.events.emit('preview:changed', this._preview)
  }

  getPreview(): IProduct | null {
    return this._preview
  }
}