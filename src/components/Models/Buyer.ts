import { IBuyer } from "../../types"

const FIELD_ERRORS: Record<keyof IBuyer, string> = {
  payment: 'Не выбран вид оплаты',
  email: 'Укажите адрес электронной почты',
  phone: 'Укажите номер телефона',
  address: 'Укажите адрес'
}

export class Buyer{
  private _payment: IBuyer['payment'] = '';
  private _email: string = '';
  private _phone: string = '';
  private _address: string = '';

  setBuyerData(data: Partial<IBuyer>): void {
  if (data.payment !== undefined) this._payment = data.payment;
  if (data.email !== undefined) this._email = data.email;
  if (data.phone !== undefined) this._phone = data.phone;
  if (data.address !== undefined) this._address = data.address;
}

  getBuyerData(): IBuyer {
    return {
      payment: this._payment,
      email: this._email,
      phone: this._phone,
      address: this._address
    }
  }

  clearBuyerData(): void {
    this._payment = '';
    this._email = '';
    this._phone = '';
    this._address = '';
  }

  validateData(data: IBuyer) {
    return Object.entries(data).reduce((acc, [key, value]) => {
      if (value === '') {
        const fieldname = key as keyof IBuyer
        acc[key] = FIELD_ERRORS[fieldname] || `поле ${key} не заполнено`
      }
      return acc
    },{} as Record<string, string>)
  }
}