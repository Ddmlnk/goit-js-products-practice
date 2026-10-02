import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import {
  clearProductsList,
  hideLoadMoreButton,
  hideLoadMoreButtonLoading,
  hideNotFound,
  renderProducts,
  showNotFound,
  updateCartSammary,
} from './render-function';
import { ITEMS_PER_PAGE } from './constants';
import { getCartItems, getWishlistItems } from './storage';
import { getProductsByIds } from './products-api';
import { refs } from './refs';

export function toggleActiveClass(elements, activeElement, activeClass) {
  elements.forEach(element => {
    element.classList.remove(activeClass);
  });
  activeElement.classList.add(activeClass);
}

export function showToast(message, type = 'success') {
  const options = {
    message,
    position: 'topRight',
    timeout: 5000,
  };
  switch (type) {
    case 'success':
      iziToast.success(options);
      break;
    case 'error':
      iziToast.error(options);
      break;
    case 'warning':
      iziToast.warning(options);
      break;
    default:
      iziToast.error({
        message: 'Invalid type of toast',
        position: 'topRight',
        timeout: 5000,
      });
  }
}

export function UpdateLoadMoreButton(total, currentPage) {
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  if (currentPage === totalPages) {
    hideLoadMoreButton();
    showToast('No more products', 'info');
  } else {
    hideLoadMoreButtonLoading();
  }
}

////
export async function loadWishlistProducts() {
  const wishlist = getWishlistItems();
  clearProductsList();
  if (wishlist.length === 0) {
    showNotFound();
    return;
  }
  hideNotFound();
  try {
    const products = await getProductsByIds(wishlist);
    console.log(products);
    renderProducts(products);
  } catch (error) {
    showToast(`Error loading wishlist ${error}`, 'error');
    showNotFound();
  }
}
export async function loadCartProducts() {
  const cart = getCartItems();
  clearProductsList();
  if (cart.length === 0) {
    showNotFound();
    updateCartSammary([]);
    return;
  }
  hideNotFound();
  try {
    const products = await getProductsByIds(cart);
    console.log(products);
    renderProducts(products);
    updateCartSammary(products);
  } catch (error) {
    showToast(`Error loading cart ${error}`, 'error');
    showNotFound();
  }
}

export function toggleTheme(theme) {
  document.body.dataset.theme = theme;
  refs.toggleThemeButton.textContent = theme === 'light' ? '🌙' : '☀️';
}
