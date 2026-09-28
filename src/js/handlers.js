import { toggleActiveClass } from './helpers';
import {
  getCategories,
  getProducts,
  getProductsByCategory,
} from './products-api';
import {
  clearProductsList,
  renderCategories,
  renderProducts,
} from './render-function';

export async function initHomePage() {
  try {
    const categories = await getCategories();
    console.log(categories);
    renderCategories(categories);

    const { products } = await getProducts();
    console.log(products);
    renderProducts(products);
  } catch (error) {
    console.log(`Помилка ініціалізації сторінки Home ${error}`);
  }
}
export async function handleCategoryClick(e) {
  if (e.target.nodeName !== 'BUTTON') return;
  clearProductsList();
  try {
    const category = e.target.textContent;
    console.log(category);
    const allCategoryButton = document.querySelectorAll('.categories__btn');
    toggleActiveClass(allCategoryButton, e.target, 'categories__btn--active');
    let productsData;
    if (category === 'All') {
      productsData = await getProducts();
    } else {
      productsData = await getProductsByCategory(category);
    }
    console.log(productsData);
    renderProducts(productsData.products);
  } catch (error) {
    console.log(`Помилка отримання товарів по категорії ${error}}`);
  }
}
