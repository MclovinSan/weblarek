import './scss/styles.scss';
import { LarekApi } from './components/Models/LarekApi';
import { Products } from './components/Models/Products';
import { Api } from './components/base/Api';
import { API_URL } from './utils/constants'; 
import { Cart } from './components/Models/Cart';
import { Buyer } from './components/Models/Buyer';

const productsModel = new Products()
const cartModel = new Cart()
const bueyrModel = new Buyer()
const baseApi = new Api(API_URL)
const larekApi = new LarekApi(baseApi)

larekApi.getProduct()
  .then((items) => {
    productsModel.setItems(items)
    const testItemById1 = productsModel.getItemById('b06cde61-912f-4663-9751-09956c0eed67')
    const testItemById2 = productsModel.getItemById('854cef69-976d-4c2a-a18c-2aa45046c390')
    if (testItemById1) productsModel.setPreview(testItemById1); // Метод getPreview используется в console.log
    if (testItemById1) cartModel.addItem(testItemById1); // Метод getItems используется в console.log
    if (testItemById2) cartModel.addItem(testItemById2);
    bueyrModel.setBuyerData({ // Метод getBuyerData используется в console.log
      payment: 'online',
      email: '123@example.com',
      phone: '+1111111111'
    })
    const buyerData = bueyrModel.getBuyerData()

    console.log('Метод getItems для класса Products выдаёт список товаров:', productsModel.getItems())
    console.log('Метод getItemById для класса Products выдаёт товар по айди:', testItemById1)
    console.log('Метод getPreview для класса Products выдаёт выбранный товар:', productsModel.getPreview())
    console.log('Метод getItems для класса Cart выдаёт список товаров в корзине:', cartModel.getItems())
    console.log('Метод totalPrice для класса Cart выдаёт общую стоимость товаров в корзине:', cartModel.totalPrice())
    console.log('Метод countItems для класса Cart выдаёт общее количество товаров в корзине:', cartModel.countItems())
    console.log('Метод totalPrice для класса Cart выдаёт общую стоимость товаров в корзине:', cartModel.haveItem('854cef69-976d-4c2a-a18c-2aa45046c390'))
    if (testItemById2) cartModel.deleteItem(testItemById2);
    console.log('Метод getItems для класса Cart после метода deleteItem:', cartModel.getItems())
    console.log('Метод getBuyerData для класса Buyer выдаёт данные:', bueyrModel.getBuyerData())
    console.log('Метод validateData для класса Buyer выдаёт данные:', bueyrModel.validateData(buyerData))
    bueyrModel.clearBuyerData()
    console.log('Метод getBuyerData для класса Buyer после метода clearBuyerDat:', bueyrModel.getBuyerData())
  })
  .catch((err) => {
    console.log('Ошибка при получении товаров:', err)
  })