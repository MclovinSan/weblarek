import { ICardAction } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface IBasket {
  basketList: HTMLElement[];
  totalPrice: number;
}

export class Basket extends Component<IBasket> {
  protected basketListEl: HTMLElement;
  protected totalPriceEl: HTMLElement;
  protected orderButton: HTMLButtonElement;
  
    constructor(container: HTMLElement, actions?: ICardAction) {
      super(container)
  
      this.orderButton = ensureElement<HTMLButtonElement>('.basket__button', this.container)
      this.totalPriceEl = ensureElement<HTMLElement>('.basket__price', this.container)
      this.basketListEl = ensureElement<HTMLElement>('.basket__list', this.container)
      
      if (actions?.onClick) {
        this.orderButton.addEventListener('click', actions.onClick)
      }
    }

    set totalPrice(value: number) {
      this.totalPriceEl.textContent = String(value)
    }

    set basketList(items: HTMLElement[]) {
      this.basketListEl.replaceChildren(...items)
      if (items.length === 0) {
        this.orderButton.disabled = true
      } else {
        this.orderButton.disabled = false
      }
    }
}