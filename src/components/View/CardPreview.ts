import { IProduct } from "../../types";
import { categoryMap, CDN_URL } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Card } from "./Card";

type ICardPreview = Pick<IProduct, 'description' | 'image' | 'category' | 'id'>
interface valid { 
  valid: boolean
}

export class CardPreview extends Card<ICardPreview & valid> {
  protected descriptionEl: HTMLElement
  protected actionButton: HTMLButtonElement
  protected imageEl: HTMLImageElement
  protected categoryEl: HTMLElement

  constructor(container: HTMLElement, events: IEvents) {
    super(container)

    this.descriptionEl = ensureElement<HTMLElement>('.card__text', this.container)
    this.actionButton = ensureElement<HTMLButtonElement>('.card__button', this.container)
    this.imageEl = ensureElement<HTMLImageElement>('.card__image', this.container)
    this.categoryEl = ensureElement<HTMLElement>('.card__category', this.container)

    this.actionButton.addEventListener('click', () => {
      events.emit('actionCardButton:click')
    })
  }

  set image(value: string) {
      this.setImage(this.imageEl, `${CDN_URL}${value}`)
    }
  
  set category(value: string) {
    this.categoryEl.textContent = value

    for (const key  in categoryMap) {
      this.categoryEl.classList.toggle(
        categoryMap[key as keyof typeof categoryMap],
        key === value
      )
    }
  }

  set description(value: string) {
    this.descriptionEl.textContent = value
  }

  set valid(isOrdered: boolean) {
    this.actionButton.textContent = isOrdered ? 'Удалить из корзины' : 'Купить'
  }

  set price(value: number | null) {
    super.price = value

    if (this.actionButton) {
      if (value === null) {
        this.actionButton.textContent = 'Недоступно'
        this.actionButton.disabled = true
      } else {
        this.actionButton.disabled = false
      }
    }
  }
}