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
import { IBuyer, IOrderSuccesResponse, IProduct } from './types';
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
const cardPreview = new CardPreview(cloneTemplate('#card-preview'),events);
const basket = new Basket(cloneTemplate('#basket'),{ onClick: () => events.emit('order:open') })
const order = new OrderForm(cloneTemplate('#order'), events)
const contacts = new ContactsForm(cloneTemplate('#contacts'), events);
const success = new Success(cloneTemplate('#success'), events)

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
  const card = cardPreview.render({ valid: cartModel.haveItem(item.id), ...item})

  modal.render({ content: card })
  modal.open()
})

events.on('actionCardButton:click', () => {
  const item = productsModel.getPreview()
  if (!item) return;
  cartModel.haveItem(item.id) ? cartModel.deleteItem(item) : cartModel.addItem(item)
  modal.close()
})

events.on('basket:change', () => {
  const countItems = cartModel.countItems()
  header.render({ counter: countItems })

  const cards = cartModel.getItems().map((item, index )=> {
    const card = new CardBasket(
      cloneTemplate('#card-basket'),
      {
        onClick: () => {
          cartModel.deleteItem(item);
        }
      }
    )
    return card.render({ ...item, index: index + 1})
  })
  
  basket.render({ basketList: cards, totalPrice: cartModel.totalPrice()})
})

const renderBasket = () => {
  modal.render({ content: basket.render() })
  modal.open()
}

events.on('basket:open', () => {
  renderBasket()
})

events.on('order:open', () => {
  modal.render({
    content: order.render()
  });
});

events.on('payment:change', (data: { value: IBuyer['payment']}) => {
  buyerModel.setBuyerData({ payment: data.value })
})

events.on('order.address:change', (data: { value: string }) => {
  buyerModel.setBuyerData({ address: data.value })
})

events.on('order:update', () => {
  modal.render({content: contacts.render({})});
});

events.on('contacts.email:change', (data: { value: string }) => {
  buyerModel.setBuyerData({ email: data.value });
});

events.on('contacts.phone:change', (data: { value: string }) => {
  buyerModel.setBuyerData({ phone: data.value });
});

events.on('buyerData:change', () => {
  const errors = buyerModel.validate();
  const buyer = buyerModel.getBuyerData()

  order.valid = !errors.payment && !errors.address;
  order.errors = Object.values({ payment: errors.payment, address: errors.address })
    .filter(i => !!i).join('. ');

  contacts.valid = !errors.email && !errors.phone;
  contacts.errors = Object.values({ email: errors.email, phone: errors.phone })
    .filter(i => !!i).join('. ');

  order.payment = buyer.payment
  order.address = buyer.address
  contacts.email = buyer.email
  contacts.phone = buyer.phone
});

events.on('contacts:update', () => {
  const orderData = {
    ...buyerModel.getBuyerData(),
    items: cartModel.getItems().map(item => `${item.id}`),
    total: cartModel.totalPrice()
  }

  larekApi.postOrder(orderData)
    .then((result: IOrderSuccesResponse) => {
      modal.render({
      content: success.render({ price: result.total})
      });
      cartModel.clearItems()
      buyerModel.clearBuyerData()
    })
    .catch(() => {
      console.error('Ошибка сервера:');
      
      contacts.errors = 'Не удалось отправить заказ. Попробуйте позже.'
    })
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