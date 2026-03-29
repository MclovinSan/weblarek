import { IProduct } from "../../types";
import { categoryMap, CDN_URL } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { Card } from "./Card";
import { ICardAction } from "../../types";

type ICardCatalog = Pick<IProduct, 'image' | 'category'>

export class CardCatalog extends Card<ICardCatalog> {
  protected imageEl: HTMLImageElement
  protected categoryEl: HTMLElement

  constructor(container: HTMLButtonElement, actions?: ICardAction) {
    super(container)

    this.imageEl = ensureElement<HTMLImageElement>('.card__image', this.container)
    this.categoryEl = ensureElement<HTMLElement>('.card__category', this.container)

    if (actions?.onClick) {
      this.container.addEventListener('click', actions.onClick)
    }
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
}