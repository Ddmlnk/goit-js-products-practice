//Логіка сторінки Home

import {
  handleAddToCartButtonClick,
  handleAddToWishlistButton,
  handleCategoryClick,
  handleClearSearchButtonClick,
  handleLoadMoreButtonClick,
  handleProductClick,
  handleScrollTop,
  handleScrollToTopButtonClick,
  handleSearchSubmit,
  handleToggleThemeButton,
  initHomePage,
  initWishlistPage,
} from './js/handlers';
import { showToast } from './js/helpers';
import { closeModal } from './js/modal';
import { refs } from './js/refs';

document.addEventListener('DOMContentLoaded', initHomePage);
refs.categoriesList.addEventListener('click', handleCategoryClick);

refs.productsList.addEventListener('click', handleProductClick);
refs.searchForm.addEventListener('submit', handleSearchSubmit);
refs.clearSearchButton.addEventListener('click', handleClearSearchButtonClick);
refs.addToWishListButton.addEventListener('click', handleAddToWishlistButton);
refs.addToCartButton.addEventListener('click', handleAddToCartButtonClick);

refs.loadMoreButton.addEventListener('click', handleLoadMoreButtonClick);

window.addEventListener('scroll', handleScrollTop);
refs.scrollToTopButton.addEventListener('click', handleScrollToTopButtonClick);

refs.toggleThemeButton.addEventListener('click', handleToggleThemeButton);
