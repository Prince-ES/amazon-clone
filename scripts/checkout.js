import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
//import '../data/cart-oop.js';//this will run all the code in that file.
// import '../data/cart-class.js';//creating objects from class;//imported here because to run code we need a html file and this checkout file is conected with checkout.html file.
import '../data/backend-practice.js';
renderOrderSummary();
renderPaymentSummary();