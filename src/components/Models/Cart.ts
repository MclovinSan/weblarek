import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Cart{
  protected products: IProduct[] = [];

  constructor(protected events: IEvents) {
  }

  getItems(): IProduct[] {
    return this.products
  }
  
  addItem(product: IProduct): void {
    this.products.push(product)
    this.events.emit('basket:change', this.products)
  }

  deleteItem(product: IProduct): void {
    this.products = this.products.filter(p => p.id !== product.id)
    this.events.emit('basket:change', this.products)
  }

  clearItems(): void {
    this.products = []
    this.events.emit('basket:change', this.products)
  }

  totalPrice(): number {
    return this.products.reduce((acc, item) => {
      acc += item.price || 0
      return acc
    }, 0) 
  }

  countItems(): number {
    return this.products.length
  }

  haveItem(id: string): boolean {
    return this.products.some(p => p.id === id)
  }
}