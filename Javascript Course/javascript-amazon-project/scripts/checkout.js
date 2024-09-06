import { cart, removeFromCart, calculateCartQuantity, updateQuantity } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

const today = dayjs();
const deliveryDate = today.add(7, 'days');
console.log(deliveryDate.format('dddd, MMMM D'));

let cartSummaryHTML = '';

cart.forEach(cartItem => {
  const productId = cartItem.productId;

  let matchingProduct;

  products.forEach(product => {
    if (productId === product.id) {
      matchingProduct = product;
    }
  }); 

  cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${productId}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${productId}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-link" data-product-id="${productId}">
              Update
            </span>
            <input class="quantity-input js-quantity-input-${productId}">
            <span class="save-quantity-link link-primary js-save-link" data-product-id="${productId}">Save</span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${productId}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${productId}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${productId}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${productId}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
});

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

updateCartQuantity();

document.querySelectorAll('.js-delete-link')
  .forEach(link => {
    link.addEventListener('click', () => {
      const { productId } = link.dataset;
      removeFromCart(productId);

      document.querySelector(`.js-cart-item-container-${productId}`)
        .remove();
      updateCartQuantity();
    })
  });

document.querySelectorAll('.js-update-link')
  .forEach(link => {
    link.addEventListener('click', () => {
      const { productId } = link.dataset;

      document.querySelector(`.js-cart-item-container-${productId}`)
        .classList.add('is-editing-quantity');

      document.querySelector(`.js-quantity-input-${productId}`)
        .addEventListener('keydown', event => {
          if (event.key === 'Enter') {
            handlingSaveData(productId);
          }
        });
    })
  });

document.querySelectorAll(`.js-save-link`)
  .forEach(link => {
    link.addEventListener('click', () => {

      const { productId } = link.dataset;

      handlingSaveData(productId);
    });
  });

function handlingSaveData(productId) {
  document.querySelector(`.js-cart-item-container-${productId}`)
    .classList.remove('is-editing-quantity');
  
  let newQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);
  if (newQuantity > 0 && newQuantity <= 1000) {
    updateQuantity(productId, newQuantity);
    document.querySelector(`.js-quantity-label-${productId}`)
      .innerHTML = newQuantity;
    updateCartQuantity();
  }
}

function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();

  document.querySelector('.js-return-to-home-link')
    .innerHTML = `${cartQuantity} items`;
}