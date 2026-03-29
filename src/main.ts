import './scss/styles.scss';
import { LarekApi } from './components/Models/LarekApi';
import { Products } from './components/Models/Products';
import { Api } from './components/base/Api';
import { API_URL } from './utils/constants'; 
import { Cart } from './components/Models/Cart';
import { Buyer } from './components/Models/Buyer';
import { EventEmitter } from './components/base/Events';
import { Gallery } from './components/View/Gallery';
import { CardCatalog } from './components/View/CardCatalog';
import { cloneTemplate, ensureElement } from './utils/utils';
import { IBuyer, IProduct } from './types';
import { CardPreview } from './components/View/CardPreview';
import { Modal } from './components/View/Modal';
import { Header } from './components/View/Header';
import { Basket } from './components/View/Basket';
import { CardBasket } from './components/View/CardBasket';
import { OrderForm } from './components/View/Order';
import { ContactsForm } from './components/View/Contacts';
import { Success } from './components/View/Success';

const events = new EventEmitter();

const productsModel = new Products(events);
const cartModel = new Cart(events);
const buyerModel = new Buyer(events);

const header = new Header(events, ensureElement<HTMLElement>('.header'))
const gallery = new Gallery(document.body)
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'));

const baseApi = new Api(API_URL);
const larekApi = new LarekApi(baseApi);

events.on('items:changed', () => {
  const products = productsModel.getItems()

  const cardsArray = products.map(item => {
    const card = new CardCatalog(
      cloneTemplate('#card-catalog'),
      {
        onClick: () => events.emit('card:select', item)
      }
    )
    return card.render(item)
  })
  gallery.render({ catalog: cardsArray })
})

events.on('card:select', (item: IProduct) => {
  productsModel.setPreview(item)
})

events.on('preview:changed', (item: IProduct) => {
  const cardPreview = new CardPreview(
    cloneTemplate('#card-preview'),
    {
      onClick: () => events.emit('actionCardButton:click', item)
    }
  )
  const card = cardPreview.render({ valid: cartModel.haveItem(item.id), ...item})

  modal.render({ content: card })
  modal.open()
})

events.on('actionCardButton:click', (item: IProduct) => {
  cartModel.haveItem(item.id) ? cartModel.deleteItem(item) : cartModel.addItem(item)
  modal.close()
})

events.on('basket:change', () => {
  const countItems = cartModel.countItems()
  header.render({ counter: countItems })
})

const renderBasket = () => {
  const basket = new Basket(
    cloneTemplate('#basket'),
    {
      onClick: () => events.emit('order:open')
    }
  )
  
  const products = cartModel.getItems()
  const cards = products.map((item, index )=> {
    const card = new CardBasket(
      cloneTemplate('#card-basket'),
      {
        onClick: () => {
          cartModel.deleteItem(item);
          renderBasket()
        }
      }
    )
    return card.render({ ...item, index: index + 1})
  })
  
  const modalContent = basket.render({ basketList: cards, totalPrice: cartModel.totalPrice()})
  modal.render({ content: modalContent })
}

events.on('basket:open', () => {
  renderBasket()
  modal.open()
})

const order = new OrderForm(cloneTemplate('#order'), events)

const contacts = new ContactsForm(cloneTemplate('#contacts'), events);

const success = new Success(cloneTemplate('#success'), events)

events.on('order:open', () => {
  modal.render({
    content: order.render()
  });
});

events.on('payment:change', (data: { value: IBuyer['payment']}) => {
  order.payment = data.value
  buyerModel.setBuyerData({ payment: data.value })
})

events.on('order.address:change', (data: { value: string }) => {
  buyerModel.setBuyerData({ address: data.value })
})

events.on('order:update', () => {
  modal.render({
    content: contacts.render({
      email: '',
      phone: '',
      valid: false,
      errors: ''
    })
  });
});

events.on('contacts.email:change', (data: { value: string }) => {
  buyerModel.setBuyerData({ email: data.value });
});

events.on('contacts.phone:change', (data: { value: string }) => {
  buyerModel.setBuyerData({ phone: data.value });
});

events.on('buyerData:change', () => {
  const errors = buyerModel.validateData(buyerModel.getBuyerData());

  order.valid = !errors.payment && !errors.address;
  order.errors = Object.values({ payment: errors.payment, address: errors.address })
    .filter(i => !!i).join('. ');

  contacts.valid = !errors.email && !errors.phone;
  contacts.errors = Object.values({ email: errors.email, phone: errors.phone })
    .filter(i => !!i).join('. ');
});

events.on('contacts:update', () => {
  modal.render({
    content: success.render({ price: cartModel.totalPrice()})
  });
  cartModel.clearItems()
  buyerModel.clearBuyerData()
});

events.on('modal:close', () => {
  modal.close()
})

larekApi.getProduct()
  .then((items) => {
    productsModel.setItems(items)
  })
  .catch((err) => {
    console.log('Ошибка при получении товаров:', err)
  })