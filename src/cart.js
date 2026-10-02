import {
  handleAddToCartButtonClick,
  handleAddToWishlistButton,
  handleBuyProductsClick,
  handleProductClick,
  handleToggleThemeButton,
  initCartPage,
  initWishlistPage,
} from './js/handlers';
import { loadCartProducts, loadWishlistProducts } from './js/helpers';
import { refs } from './js/refs';

//Логіка сторінки Cart
document.addEventListener('DOMContentLoaded', initCartPage);
refs.productsList.addEventListener('click', handleProductClick);

refs.addToWishListButton.addEventListener('click', handleAddToWishlistButton);

refs.addToCartButton.addEventListener('click', async () => {
  handleAddToCartButtonClick();
  await loadCartProducts();
});

refs.buyProductsButton.addEventListener('click', handleBuyProductsClick);

refs.toggleThemeButton.addEventListener('click', handleToggleThemeButton);
