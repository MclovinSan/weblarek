import { IBuyer } from "../../types"
import { IEvents } from "../base/Events";

type TErrors = Partial<Record<keyof IBuyer, string>>

export class Buyer{
  private payment: IBuyer['payment'] = '';
  private email: string = '';
  private phone: string = '';
  private address: string = '';

   constructor(protected events: IEvents) {
   }

  setBuyerData(data: Partial<IBuyer>): void {
    if (data.payment !== undefined) this.payment = data.payment;
    if (data.email !== undefined) this.email = data.email;
    if (data.phone !== undefined) this.phone = data.phone;
    if (data.address !== undefined) this.address = data.address;
    this.events.emit('buyerData:change')
  }

  getBuyerData(): IBuyer {
    return {
      payment: this.payment,
      email: this.email,
      phone: this.phone,
      address: this.address
    }
  }

  clearBuyerData(): void {
    this.payment = '';
    this.email = '';
    this.phone = '';
    this.address = '';
    this.events.emit('buyerData:change');
  }

  validate(): TErrors {
    const errors: TErrors = {};

    if (!this.payment) {
        errors.payment = 'Выберите способ оплаты';
    }

    if (!this.address.trim()) {
        errors.address = 'Укажите адрес';
    }

    if (!this.email.trim()) {
        errors.email = 'Укажите email';
    }

    if (!this.phone.trim()) {
        errors.phone = 'Укажите телефон';
    }

    return errors;
}
}