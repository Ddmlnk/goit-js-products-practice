import { STORAGE_KEYS } from './constants';

export function getFromStorage(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.log(`error read from storage ${error}`);
  }
}

export function saveToLS(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Ошибка записи в LocalStorage ${err.message}`);
  }
}

export function removeFromLS(key) {
  localStorage.removeItem(key);
}

export function getWishlistItems() {
  return getFromStorage(STORAGE_KEYS.WISHLIST) || [];
}
export function getCartItems() {
  return getFromStorage(STORAGE_KEYS.CART) || [];
}

export function addToWishlist(id) {
  const wishlistItems = getWishlistItems();
  if (!wishlistItems.includes(id)) {
    wishlistItems.push(id);
    saveToLS(STORAGE_KEYS.WISHLIST, wishlistItems);
  }
}
export function addToCart(id) {
  const wishlistItems = getCartItems();
  if (!wishlistItems.includes(id)) {
    wishlistItems.push(id);
    saveToLS(STORAGE_KEYS.CART, wishlistItems);
  }
}
export function isInWishList(id) {
  return getWishlistItems().includes(id);
}
export function isInCart(id) {
  return getCartItems().includes(id);
}
export function removeFromWishlist(id) {
  const wishlistItems = getWishlistItems();
  const updateWishlist = wishlistItems.filter(item => item !== id);
  saveToLS(STORAGE_KEYS.WISHLIST, updateWishlist);
}
export function removeFromCart(id) {
  const wishlistItems = getCartItems();
  const updateWishlist = wishlistItems.filter(item => item !== id);
  saveToLS(STORAGE_KEYS.CART, updateWishlist);
}

export function getTheme() {
  return getFromStorage(STORAGE_KEYS.THEME) || 'light';
}
export function saveTheme(theme) {
  saveToLS(STORAGE_KEYS.THEME, theme);
}
