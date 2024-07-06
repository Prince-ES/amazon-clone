import {cart,removeFromCart,updateDeliveryOption} from '../../data/cart.js';
import {products,getProduct} from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';

import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';//another syntax for exporting(while exporting the from the site, they have used this syntax for exporting so we also have to import from same syntax. their way of exporting: export default dayjs;. we can use it when we only want to export 1 thing. only one default export can be done from a file.
import {deliveryOptions} from '../../data/delivery-options.js';
import {getDeliveryOption} from '../../data/delivery-options.js';
import { renderPaymentSummary } from './paymentSummary.js';
// const today = dayjs();//this will give an object which contains today's date.
// const deliveryDate = today.add(7,'days');//this .add method will take two input. the first tells from which no. to increas and the 2nd which is a string tells what to increase.
//console.log(deliveryDate);//this will print an object which will have the day after 7 place from today ex(today = sunday then the output will be sunday as today is included.)
// console.log(deliveryDate.format('dddd, MMMM D'));//the format is specified in the documentation. dddd will tell days name(full) then MMMM ( months full name) then D (1-31);

export function renderOrderSummary(){
let cartSummaryHTML = '';

cart.forEach((cartItem)=>{
  const productId = cartItem.productId;

  const matchingProduct = getProduct(productId);


  const Today = dayjs();

  const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
  
  cartSummaryHTML +=`
    <div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${(Today.add(deliveryOption.deliverydays,'days')).format('dddd, MMMM D')}
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
          <div class="product-quantity js-product-quantity-${productId}">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary
            js-delete-link-${productId}
            js-delete-link" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          
          ${deliveryOptionsHTML(matchingProduct,cartItem)}
        </div>
      </div>
    </div>
  `
});

function deliveryOptionsHTML(matchingProduct,cartItem){
  let html = '';
  deliveryOptions.forEach((deliveryOption)=>{
    
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliverydays,'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    const priceString = deliveryOption.priceCents === 0? 'Free' : `$${formatCurrency(deliveryOption.priceCents)} -`;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;


 html += `<div class="delivery-option js-delivery-option"
          data-product-id="${matchingProduct.id}"
          data-delivery-option-id="${deliveryOption.id}">
    <input  type="radio"
      ${isChecked ? 'checked':''}
      class="delivery-option-input"
      name="delivery-option-${matchingProduct.id}">
    <div>
      <div class="delivery-option-date">
        ${dateString}
      </div>
      <div class="delivery-option-price">
        ${priceString} Shipping
      </div>
    </div>
  </div>
  `;
})

return html;
}


document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link')
  .forEach((link)=>{
    link.addEventListener('click',()=>{
      const productId = link.dataset.productId;//wherever also declared same variable has limited scope hence no error on declaring again.
      removeFromCart(productId);

     const container = document.querySelector(`.js-cart-item-container-${productId}`);
     container.remove();

     renderPaymentSummary();
    });
  });

  document.querySelectorAll('.js-delivery-option').forEach((element)=>{
    element.addEventListener('click',()=>{
      const {productId,deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId,deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
