import './scss/styles.scss';
import { LarekApi } from './components/base/Models/LarekApi';
import { Products } from './components/base/Models/Products';
import { Api } from './components/base/Api';

const API_URL = import.meta.env.VITE_API_ORIGIN
const productsModel = new Products()
const baseApi = new Api(API_URL)
const larekApi = new LarekApi(baseApi)

larekApi.getProduct()
  .then((items) => {
    productsModel.setItems(items)

    console.log(productsModel.getItems())
  })
  .catch((err) => {
    console.log('Ошибка при получении товаров:', err)
  })