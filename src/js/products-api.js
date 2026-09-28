import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from './constants';

axios.defaults.baseURL = API_BASE_URL;
export async function getCategories() {
  const responce = await axios.get(API_ENDPOINTS.CATEGORIES);
  return responce.data;
}
export async function getProducts() {
  const responce = await axios.get(API_ENDPOINTS.PRODUCTS);
  return responce.data;
}
export async function getProductsByCategory(category) {
  const responce = await axios.get(
    `${API_ENDPOINTS.PRODUCTS_BY_CATEGORY}${category}`
  );
  return responce.data;
}
