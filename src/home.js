//Логіка сторінки Home

import { handleCategoryClick, initHomePage } from './js/handlers';
import { refs } from './js/refs';

document.addEventListener('DOMContentLoaded', initHomePage);
refs.categoriesList.addEventListener('click', handleCategoryClick);
