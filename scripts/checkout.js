import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import {loadProducts} from '../data/products.js';

//import '../data/cart-oop.js';//this will run all the code in that file.
// import '../data/cart-class.js';//creating objects from class;//imported here because to run code we need a html file and this checkout file is conected with checkout.html file.
//import '../data/backend-practice.js';

loadProducts(()=>{//when we'll go to the checkout page, the loadProduct will pass this anonymous function and after getting the response the anonymous function will run and hence both the function inside will also run.
  renderOrderSummary();//this function also indirectly accesses the product array so we'll run this after loading product array. same goes with paymentSummary.js
  renderPaymentSummary();
});
