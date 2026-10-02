import {
  handleAddToCartButtonClick,
  handleAddToWishlistButton,
  handleProductClick,
  handleToggleThemeButton,
  initWishlistPage,
} from './js/handlers';
import { loadWishlistProducts } from './js/helpers';
import { refs } from './js/refs';

//Логіка сторінки Wishlist
document.addEventListener('DOMContentLoaded', initWishlistPage);
refs.productsList.addEventListener('click', handleProductClick);

refs.addToWishListButton.addEventListener('click', async () => {
  handleAddToWishlistButton();
  await loadWishlistProducts();
});

refs.addToCartButton.addEventListener('click', handleAddToCartButtonClick);

refs.toggleThemeButton.addEventListener('click', handleToggleThemeButton);
