import {cart} from '../../data/cart.js';
import { getDeliveryOption } from '../../data/delivery-options.js';
import { getProduct } from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import { addOrder } from '../../data/orders.js';
 
export function renderPaymentSummary(){
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem)=>{
    const product = getProduct(cartItem.productId);

    productPriceCents += product.priceCents * cartItem.quantity
    formatCurrency(productPriceCents);
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

    shippingPriceCents += deliveryOption.priceCents;
    
  });
  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;


  const paymentSummaryHtml = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (3):</div>
      <div class="payment-summary-money">
        $${formatCurrency(productPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">
        $${formatCurrency(shippingPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
        $${formatCurrency(totalBeforeTaxCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">
        $${formatCurrency(taxCents)}
      </div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">
        $${formatCurrency(totalCents)}
      </div>
    </div>

    <button class="place-order-button button-primary js-place-order">
      Place your order
    </button>`;

    document.querySelector('.js-payment-summary')
      .innerHTML = paymentSummaryHtml;

    document.querySelector('.js-place-order')
    .addEventListener('click',async () => {
      try{
        const response = await fetch('https://supersimplebackend.dev/orders', {
          method: 'POST',//this is the type of request.
          headers:{//header gives more information about our request and this is needed when sending data to backend.
            'content-type' :'application/json'
          },
          body:JSON.stringify({
            cart:cart//we can't directly send object to backend so stringified it.
          })
  
        });//this fetch will return a promise which will be stored in response variable.//now we have to send cart details to place order so we've to make different type of request: POST = create something, PUT = update something, DELETE and GET(used before). here we'll use POSt. we'll give fetch a second parameter
  
        const order = await response.json();
        addOrder(order);

      }catch(error){
        console.log('unexpected error. Try again later.');
      }   
      
      window.location.href = 'orders.html';//special object provided by js. lets us control the url at the top of the browser. place your order is on the checkout page therefore url will be some numbers then checkout.html but after this it'll be numbers then order.html
      //order.html is a file parth. current file path was checkout.html because this code is runnign on the checkout page.
      
    });
}

