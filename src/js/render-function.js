import { refs } from './refs';
import { isInCart, isInWishList } from './storage';

export function renderCategories(categories) {
  const categoriesAll = ['All', ...categories];
  const markup = categoriesAll
    .map(item => {
      return `<li class="categories__item"><button class="categories__btn" type="button">${item}</button></li>
`;
    })
    .join('');

  refs.categoriesList.innerHTML = markup;
  const firstCategories = document.querySelector('.categories__btn');
  firstCategories.classList.add('categories__btn--active');
}

export function renderProducts(products) {
  const markup = products
    .map(item => {
      return `<li class="products__item" data-id="${item.id}">
<img class="products__image" src="${item.thumbnail}" alt="${item.title}"/> <p class="products__title"> ${item.title}</p>
<p class="products__brand"><span class="products__brand--bold">Brand: ${item.brand}</span></p>
<p class="products__category">Category: ${item.category}</p> <p class="products__price">Price: ${item.price} $</p> 
</li>`;
    })
    .join('');
  refs.productsList.insertAdjacentHTML('beforeend', markup);
}

export function clearProductsList() {
  refs.productsList.innerHTML = '';
}

export function showNotFound() {
  refs.notFound.classList.add('not-found--visible');
}

export function hideNotFound() {
  refs.notFound.classList.remove('not-found--visible');
}
export function renderProductInModal({
  id,
  images,
  title,
  description,
  shippingInformation,
  returnPolicy,
  price,
  thumbnail,
  tags,
}) {
  const tagsMarkup = tags.map(tag => `<li>${tag}</li>`).join('');
  const markup = `<img class="modal-product__img" src='${images[0]}' alt='${title}' />
   <div class="modal-product__content"> <p class="modal-product__title">${title}</p>
   <ul class="modal-product__tags"> ${tagsMarkup} </ul>
   <p class="modal-product__description">${description}</p>
   <p class="modal-product__shipping-information">Shipping:${shippingInformation}</p>
   <p class="modal-product__return-policy">Return Policy: ${returnPolicy}</p>
   <p class="modal-product__price">Price: ${price} $</p>
   <button class="modal-product__buy-btn" type="button">Buy</button> 
   </div>`;

  refs.modalProduct.innerHTML = markup;
  updateModalButtons(id);
}

export function updateModalButtons(currentProductId) {
  if (isInWishList(currentProductId)) {
    refs.addToWishListButton.textContent = 'Remove from wishlist';
  } else {
    refs.addToWishListButton.textContent = 'Add to wishlist';
  }

  if (isInCart(currentProductId)) {
    refs.addToCartButton.textContent = 'Remove from cart';
  } else {
    refs.addToCartButton.textContent = 'Add to cart';
  }
}

export function updateCounters(wishlistItems, cartItems) {
  refs.wishlistCount.textContent = wishlistItems.length;
  refs.cartCount.textContent = cartItems.length;
}

export function showLoadMoreButton() {
  refs.loadMoreButton.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  refs.loadMoreButton.classList.add('is-hidden');
  refs.loadMoreButton.classList.remove('is-loading');
}

export function showLoadMoreButtonLoading() {
  refs.loadMoreButton.classList.add('is-loading');
}
export function hideLoadMoreButtonLoading() {
  refs.loadMoreButton.classList.remove('is-loading');
}

export function updateCartSammary(products) {
  refs.cartValue.textContent = products.length;
  const totalPrice = products.reduce((acc, product) => {
    return acc + product.price;
  }, 0);

  refs.cartPrice.textContent = Math.round(totalPrice) + '$';
}
