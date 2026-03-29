import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IFormBase {
  errors: string;
  valid: boolean; 
}

export abstract class Form<T> extends Component<IFormBase & T> {
  protected submitButton: HTMLButtonElement
  protected errorsElement: HTMLElement

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container)

    this.submitButton = ensureElement<HTMLButtonElement>('.button[type=submit]', this.container)
    this.errorsElement = ensureElement<HTMLElement>('.form__errors', this.container)

    this.container.addEventListener('input', (e: Event) => {
      const target = e.target as HTMLInputElement
      const filedName = target.name as keyof T
      const value = target.value

      events.emit(`${(this.container as HTMLFormElement).name}.${String(filedName)}:change`, {
        filedName,
        value
      })
    })

    this.container.addEventListener('submit', (e: Event) => {
      e.preventDefault()
      events.emit(`${(this.container as HTMLFormElement).name}:update`)
    })
  }

  set errors(value: string) {
    this.errorsElement.textContent = value
  }

  set valid(value: boolean) {
    if (value) {
      this.submitButton.disabled = false
    } else {
      this.submitButton.disabled = true
    }
  }
}
