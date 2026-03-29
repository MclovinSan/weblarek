import { ICardAction } from "../../types"
import { ensureElement } from "../../utils/utils"
import { Card } from "./Card"

interface ICardBasket {
  index: number
}

export class CardBasket extends Card<ICardBasket> {
  protected deleteButtonElement: HTMLButtonElement
  protected basketIndexElement: HTMLElement

  constructor(container: HTMLElement, action?: ICardAction) {
    super(container)

    this.deleteButtonElement = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container)
    this.basketIndexElement = ensureElement<HTMLElement>('.basket__item-index', this.container)

    if(action?.onClick) {
      this.deleteButtonElement.addEventListener('click', action.onClick)
    }
  }

  set index(value: number) {
    this.basketIndexElement.textContent = String(value)
  }
}