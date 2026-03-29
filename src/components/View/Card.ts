import { IProduct } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

type ICardBase = Pick<IProduct, 'price' | 'title'>

export abstract class Card<T> extends Component<ICardBase & T> {
  protected cardPriceElement: HTMLElement
  protected cardTitleElement: HTMLElement

  constructor(container: HTMLElement) {
    super(container)

    this.cardPriceElement = ensureElement<HTMLElement>('.card__price', this.container)
    this.cardTitleElement = ensureElement<HTMLElement>('.card__title', this.container)
  }

  set price(value: number | null) {
    if (!value) {
      this.cardPriceElement.textContent = 'Бесценно'
      return
    }
    this.cardPriceElement.textContent = `${value} синапсов`
  }

  set title(value: string) {
    this.cardTitleElement.textContent = value
  }
}