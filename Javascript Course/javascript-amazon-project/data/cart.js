import { products } from "./products.js";

export let cart = JSON.parse(localStorage.getItem('cart')) || [{
  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2
}, {
  productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 1
}];

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export let stillTimeOutArray = Array(products.length).fill().map(v => false);
export let indexTimeOutArray = Array(products.length).fill();

export function addToCart(productId, quantity) {
  let matchingItem;

  cart.forEach(cartItem => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity
    });
  }

  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach(cartItem => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}

export function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach(item => {
    cartQuantity += item.quantity;
  });

  return cartQuantity;
}

function findCartItem(productId) {
  let cartItemResult;

  cart.forEach((cartItem, i) => {
    if (productId === cartItem.productId) {
      cartItemResult = cartItem;
      return;
    }
  });
  return cartItemResult;
}

export function updateQuantity(productId, newQuantity) {
  const cartItem = findCartItem(productId);

  cartItem.quantity = newQuantity;
  saveToStorage();
}