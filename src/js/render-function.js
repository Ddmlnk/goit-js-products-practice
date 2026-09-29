import { refs } from './refs';

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
}
