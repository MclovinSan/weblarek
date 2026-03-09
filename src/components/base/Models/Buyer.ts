import { IBuyer } from "../../../types"

export class Buyer implements IBuyer{
  payment: IBuyer['payment'] = '';
  email: string = '';
  phone: string = '';
  address: string = '';

  setBuyerData(data: Partial<IBuyer>): void {
    Object.assign(this, data)
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
  }

  validateData(data: IBuyer) {
    return Object.entries(data).reduce((acc, [key, value]) => {
      if (value === '') {
        acc[key] = `поле ${key} не заполнено`
      }
      return acc
    },{} as Record<string, string>)
  }
}