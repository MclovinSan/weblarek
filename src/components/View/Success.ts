import { ensureElement } from "../../utils/utils"
import { Component } from "../base/Component"
import { IEvents } from "../base/Events"

interface ISuccess {
  price: number
}

export class Success extends Component<ISuccess> {
  protected orderDescriptionElement: HTMLElement
  protected orderSuccessClose: HTMLButtonElement

  constructor(container: HTMLElement, events: IEvents) {
    super(container)
    this.orderDescriptionElement = ensureElement<HTMLElement>('.order-success__description', this.container)
    this.orderSuccessClose = ensureElement<HTMLButtonElement>('.order-success__close', this.container)

    this.orderSuccessClose.addEventListener('click', () => {
      events.emit('modal:close')
    })
  }

  set price(value: number) {
    this.orderDescriptionElement.textContent = `Списано ${value} синапсов`
  }
}