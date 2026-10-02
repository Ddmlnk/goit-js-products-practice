import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS, ITEMS_PER_PAGE } from './constants';

axios.defaults.baseURL = API_BASE_URL;
export async function getCategories() {
  const responce = await axios.get(API_ENDPOINTS.CATEGORIES);
  return responce.data;
}
export async function getProducts(currentPage = 1) {
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  const responce = await axios.get(
    `${API_ENDPOINTS.PRODUCTS}?limit=${ITEMS_PER_PAGE}&skip=${skip}`
  );
  return responce.data;
}
export async function getProductsByCategory(category) {
  const responce = await axios.get(
    `${API_ENDPOINTS.PRODUCTS_BY_CATEGORY}${category}`
  );
  return responce.data;
}
export async function getProductById(productId) {
  const responce = await axios.get(
    `${API_ENDPOINTS.PRODUCT_BY_ID}${productId}`
  );
  console.log(responce.data);
  return responce.data;
}

export async function searchProducts(query) {
  const responce = await axios.get(`${API_ENDPOINTS.SEARCH}${query}`);
  console.log(responce.data);
  return responce.data;
}

export async function getProductsByIds(ids) {
  return Promise.all(ids.map(id => getProductById(id)));
}
