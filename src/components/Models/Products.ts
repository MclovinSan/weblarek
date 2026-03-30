import { IProduct } from '../../types'
import { IEvents } from '../base/Events';

export class Products{
  private preview: IProduct | null = null;
  protected products: IProduct[] = [];

  constructor(protected events: IEvents) {
  }

   getItems(): IProduct[] {
    return this.products
  }
  
  setItems(items: IProduct[]): void {
    this.products = items
    this.events.emit('items:changed')
  }

  getItemById(id: string): IProduct | undefined {
    return this.products.find(p => p.id === id)
  }

  setPreview(product: IProduct): void {
    this.preview = product
    this.events.emit('preview:changed', this.preview)
  }

  getPreview(): IProduct | null {
    return this.preview
  }
}