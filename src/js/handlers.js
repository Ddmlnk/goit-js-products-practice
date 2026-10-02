import { ITEMS_PER_PAGE, STORAGE_KEYS } from './constants';
import {
  loadCartProducts,
  loadWishlistProducts,
  showToast,
  toggleActiveClass,
  toggleTheme,
  UpdateLoadMoreButton,
} from './helpers';
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
  hideLoadMoreButton,
  hideNotFound,
  renderCategories,
  renderProductInModal,
  renderProducts,
  showLoadMoreButton,
  showLoadMoreButtonLoading,
  showNotFound,
  updateCartSammary,
  updateCounters,
} from './render-function';
import {
  addToCart,
  addToWishlist,
  getCartItems,
  getTheme,
  getWishlistItems,
  isInCart,
  isInWishList,
  removeFromCart,
  removeFromLS,
  removeFromWishlist,
  saveTheme,
  saveToLS,
} from './storage';

export let currentPage = 1;

export async function initHomePage() {
  const userTheme = getTheme();
  toggleTheme(userTheme);
  try {
    updateCounters(getWishlistItems(), getCartItems());
    const categories = await getCategories();
    console.log(categories);
    renderCategories(categories);
    const { products, total } = await getProducts(currentPage);

    console.log(products);
    renderProducts(products);

    showLoadMoreButton();
    UpdateLoadMoreButton(total, currentPage);
  } catch (error) {
    console.log(`Помилка ініціалізації сторінки Home ${error}`);
  }
}
///
export async function initWishlistPage() {
  const userTheme = getTheme();
  toggleTheme(userTheme);
  updateCounters(getWishlistItems(), getCartItems());
  await loadWishlistProducts();
}

export async function initCartPage(params) {
  const userTheme = getTheme();
  toggleTheme(userTheme);
  updateCounters(getWishlistItems(), getCartItems());
  await loadCartProducts();
}
//////// //
/////

export async function handleCategoryClick(e) {
  if (e.target.nodeName !== 'BUTTON') return;
  clearProductsList();
  hideLoadMoreButton();
  try {
    const category = e.target.textContent;
    console.log(category);
    const allCategoryButton = document.querySelectorAll('.categories__btn');
    toggleActiveClass(allCategoryButton, e.target, 'categories__btn--active');
    let productsData;
    if (category === 'All') {
      currentPage = 1;
      productsData = await getProducts();
      showLoadMoreButton();
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
  clearProductsList();
  currentPage = 1;
  try {
    const { products, total } = await getProducts();
    renderProducts(products);
    hideNotFound();
    showLoadMoreButton();
    UpdateLoadMoreButton(total, currentPage);

    const categoryEL = document.querySelector('.categories__btn');

    const allCategoriesButton = document.querySelectorAll('.categories__btn');
    toggleActiveClass(
      allCategoriesButton,
      categoryEL,
      'categories__btn--active'
    );
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

export async function handleLoadMoreButtonClick() {
  currentPage += 1;
  showLoadMoreButtonLoading();
  try {
    const { products, total } = await getProducts(currentPage);
    renderProducts(products);
    UpdateLoadMoreButton(total, currentPage);
  } catch (error) {
    showToast(`error clicking load more button ${error}`, 'error');
  }
}

export function handleBuyProductsClick() {
  const cartItems = getCartItems();
  if (cartItems.length === 0) {
    showToast('Your cart is empty', 'warning');
    return;
  }
  showToast('Thanks for your purchase', 'success');
  removeFromLS(STORAGE_KEYS.CART);
  updateCounters(getWishlistItems(), []);
  updateCartSammary([]);
  window.location.reload();
}

export function handleScrollTop() {
  if (window.scrollY > 400) {
    refs.scrollToTopButton.classList.add('scroll-top-btn--visible');
  } else {
    refs.scrollToTopButton.classList.remove('scroll-top-btn--visible');
  }
}

export function handleScrollToTopButtonClick() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

export function handleToggleThemeButton() {
  const currentTheme = document.body.dataset.theme || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  toggleTheme(newTheme);
  saveTheme(newTheme);
}
