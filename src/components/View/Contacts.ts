import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Form } from "./Form";

interface IContactsForm {
  email: string;
  phone: string;
}

export class ContactsForm extends Form<IContactsForm> {
    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
    }

    set email(value: string) {
          ensureElement<HTMLInputElement>('input[name="email"]', this.container).value = value
    }

    set phone(value: string) {
          ensureElement<HTMLInputElement>('input[name="phone"]', this.container).value = value
    }
  }