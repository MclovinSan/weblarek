import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface IModal {
  content: HTMLElement
}

export class Modal extends Component<IModal> {
  protected contentElement: HTMLElement;
  protected closeButtonElement: HTMLButtonElement;
  
  constructor(container: HTMLElement) {
    super(container)

    this.closeButtonElement = ensureElement<HTMLButtonElement>('.modal__close', this.container)
    this.contentElement = ensureElement<HTMLElement>('.modal__content', this.container)

    this.closeButtonElement.addEventListener('click', () => {
      this.close()
    })
  }

  set content(item: HTMLElement) {
    this.contentElement.replaceChildren(item)
  }

  open() {
  this.container.classList.add('modal_active')
  }

  close() {
  this.container.classList.remove('modal_active')
  }
}