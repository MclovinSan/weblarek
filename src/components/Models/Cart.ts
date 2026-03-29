import { IProduct } from "../../types";
import { BaseProductsModel } from "./BaseProductsModel"
import { IEvents } from "../base/Events";

export class Cart extends BaseProductsModel<IProduct> {

  constructor(protected events: IEvents) {
      super()
    }
  
  addItem(product: IProduct): void {
    this._products.push(product)
    this.events.emit('basket:change', this._products)
  }

  deleteItem(product: IProduct): void {
    this._products = this._products.filter(p => p.id !== product.id)
    this.events.emit('basket:change', this._products)
  }

  clearItems(): void {
    this._products = []
    this.events.emit('basket:change', this._products)
  }

  totalPrice(): number {
    return this._products.reduce((acc, item) => {
      acc += item.price || 0
      return acc
    }, 0) 
  }

  countItems(): number {
    return this._products.length
  }

  haveItem(id: string): boolean {
    return this._products.some(p => p.id === id)
  }
}