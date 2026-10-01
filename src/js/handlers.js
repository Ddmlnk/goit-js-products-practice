import { showToast, toggleActiveClass } from './helpers';
import { openModal } from './modal';
import {
  getCategories,
  getProductById,
  getProducts,
  getProductsByCategory,
  searchProducts,
} from './products-api';
import { refs } from './refs';
import {
  clearProductsList,
  hideNotFound,
  renderCategories,
  renderProductInModal,
  renderProducts,
  showNotFound,
  updateCounters,
} from './render-function';
import {
  addToCart,
  addToWishlist,
  getCartItems,
  getWishlistItems,
  isInCart,
  isInWishList,
  removeFromCart,
  removeFromWishlist,
} from './storage';

export async function initHomePage() {
  try {
    updateCounters(getWishlistItems(), getCartItems());
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
export let currentProductId = null;
export async function handleProductClick(e) {
  const productItem = e.target.closest('.products__item');
  console.log(productItem.data);
  if (!productItem) return;

  const productId = Number(productItem.dataset.id);
  currentProductId = productId;
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

export async function handleClearSearchButtonClick() {
  refs.searchForm.reset();
  try {
    const { products } = await getProducts();
    clearProductsList();
    renderProducts(products);
    hideNotFound();
  } catch (err) {
    showNotFound();
    showToast(`Error with fetching products ${err}`, 'error');
  }
}

export function handleAddToWishlistButton() {
  console.log(currentProductId);
  if (!currentProductId) return;
  if (isInWishList(currentProductId)) {
    removeFromWishlist(currentProductId);
    refs.addToWishListButton.textContent = 'Add to wishlist';
    showToast('Product removed from wishlist', 'info');
  } else {
    addToWishlist(currentProductId);
    refs.addToWishListButton.textContent = 'remove from wishlist';
    showToast('Product add to wishlist');
  }
  updateCounters(getWishlistItems(), getCartItems());
}
export function handleAddToCartButtonClick() {
  if (!currentProductId) return;
  if (isInCart(currentProductId)) {
    removeFromCart(currentProductId);
    refs.addToCartButton.textContent = 'Add to cart';
    showToast('Product removed from cart', 'info');
  } else {
    addToCart(currentProductId);
    refs.addToCartButton.textContent = 'remove from cart';
    showToast('Product add to cart');
  }
  updateCounters(getWishlistItems(), getCartItems());
}
