import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Form } from "./Form";

interface IOrderForm {
  payment: string;
  address: string;
}

export class OrderForm extends Form<IOrderForm> {
  protected buttons: HTMLButtonElement[];

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);

        
        this.buttons = [
            ensureElement<HTMLButtonElement>('button[name="card"]', this.container),
            ensureElement<HTMLButtonElement>('button[name="cash"]', this.container)
        ]

        this.buttons.forEach(button => {
          button.addEventListener('click', (e: Event) => {
            const target = e.target as HTMLButtonElement
            this.events.emit(`payment:change`, { value: target.name })
          })
        })
    }

    set payment(value: string) {
      this.buttons.forEach(button => {
        button.classList.toggle('button_alt-active', button.name === value)
      })
    }
  }