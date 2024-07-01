import {cart, addToCart} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';//in modules if we have to go from current folder to a folder beside it we have to use "./" which is not necessary in general.
//other syntax of import:-
//import = as cartModule(userDefined) from 'path'; now we can import all the variable just with this.
//to access those variables use: cartModule.variableName

let productsHTML = '';
products.forEach((product) => {
  productsHTML+= `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src=${product.image}>
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${(product.rating.stars)*10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${formatCurrency(product.priceCents)}<!--//the code is been changed//this "toFixed() function ensures the no. of decimal places in the brackets-->
      </div>

      <div class="product-quantity-container">
        <select>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>`;

});

document.querySelector('.js-products-grid').innerHTML = productsHTML;



  function updateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((cartItem)=> {
      cartQuantity += cartItem.quantity;
    })
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  }
  let cartQuantity = 0;
  cart.forEach((cartItem)=> {
    cartQuantity += cartItem.quantity;
  })
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

document.querySelectorAll('.js-add-to-cart')//this is going to pass all the elements with this class and each of the element(button here) will get this addEventListener property.
  .forEach((button)=> {
    button.addEventListener('click',() => {
      const productId = button.dataset.productId;
      addToCart(productId);
      updateCartQuantity();
    });
  });

