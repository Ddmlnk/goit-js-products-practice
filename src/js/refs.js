export const refs = {
  categoriesList: document.querySelector('.categories'),
  productsList: document.querySelector('.products'),
  notFound: document.querySelector('.not-found'),
  modal: document.querySelector('.modal'),
  modalCloseButton: document.querySelector('.modal__close-btn'),
  modalProduct: document.querySelector('.modal-product'),
  searchForm: document.querySelector('.search-form'),
  clearSearchButton: document.querySelector('.search-form__btn-clear'),
  addToWishListButton: document.querySelector('.modal-product__btn--wishlist'),

  wishlistCount: document.querySelector('[data-wishlist-count]'),
  cartCount: document.querySelector('[data-cart-count]'),
  addToCartButton: document.querySelector('.modal-product__btn--cart'),

  loadMoreButton: document.querySelector('.load-more-btn'),

  cartValue: document.querySelector('[data-count]'),
  cartPrice: document.querySelector('[data-price]'),
  buyProductsButton: document.querySelector('.cart-summary__btn'), //////

  scrollToTopButton: document.querySelector('.scroll-top-btn'),
  toggleThemeButton: document.querySelector('.theme-toggle-btn'),
};
