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
