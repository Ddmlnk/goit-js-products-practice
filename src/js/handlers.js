import { showToast, toggleActiveClass } from './helpers';
import { openModal } from './modal';
import {
  getCategories,
  getProductById,
  getProducts,
  getProductsByCategory,
  searchProducts,
} from './products-api';
import {
  clearProductsList,
  hideNotFound,
  renderCategories,
  renderProductInModal,
  renderProducts,
  showNotFound,
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
    if (productsData.products.length > 0) {
      hideNotFound();
      renderProducts(productsData.products);
    } else {
      showNotFound();
    }
  } catch (error) {
    console.log(`Помилка отримання товарів по категорії ${error}}`);
  }
}

export async function handleProductClick(e) {
  const productItem = e.target.closest('.products__item');
  console.log(productItem.data);
  if (!productItem) return;
  const productId = Number(productItem.dataset.id);
  const product = await getProductById(productId);
  console.log(product);

  renderProductInModal(product);
  openModal();
}
export async function handleSearchSubmit(e) {
  e.preventDefault();
  const query = e.currentTarget.elements.searchValue.value.trim();
  console.log(query);
  if (!query) {
    showToast('Please enter a valid search query', 'warning');
    return;
  }
  clearProductsList();
  try {
    const { products } = await searchProducts(query);
    if (products.length > 0) {
      renderProducts(products);
      hideNotFound();
    } else {
      showNotFound();
    }
  } catch (err) {
    showToast(`error get products ${err}`, 'error');
  }
}
