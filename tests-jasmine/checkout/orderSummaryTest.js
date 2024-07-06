import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage,cart } from "../../data/cart.js";


describe('test suite: renderOrderSummary',()=>{

  
  const productId1='e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  beforeEach(()=>{//this is called a beforeEach hook, and it'll run this funciton before each of our test.
    spyOn(localStorage,'setItem');
    document.querySelector('.js-test-container').innerHTML = `
    <div class="js-order-summary"></div><!--when the renderOrderSummary function get's called, it generates some HTML and puts it into .js-order-summary but as in this block we don't have that class and element, we'll make one.-->
    <div class="js-payment-summary"></div><!--when the delete button is clicked(see line 56) then in our code when the delete button is clicked, it makes the changes and calls the renderPaymentSummary function which generates some HTML and puts it into an element with class js-payment-summary now this block doesn't contains that div so we made one.-->
    `;
   
    // const productId1='e43638ce-6aa0-4b85-b27f-e1d07eb678c6';//these products are limited to this function block so can't use outside so move them outside.
    // const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId:productId1,
        quantity:2,
        deliveryOptionId:'1'
      },{
        productId:productId2,
        quantity:1,
        deliveryOptionId: '2'
      }]);      
    });
      loadFromStorage();
      renderOrderSummary();
  });
  afterEach(()=>{
    document.querySelector('.js-test-container').innerHTML = '';
  });
  it('displays the cart',()=>{
    // document.querySelector('.js-test-container').innerHTML = `
    // <div class="js-order-summary"></div>
    // `;
    // const productId1='e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    // const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
    // spyOn(localStorage,'getItem').and.callFake(()=>{
    //   return JSON.stringify([{
    //     productId:productId1,
    //     quantity:2,
    //     deliveryOptionId:'1'
    //   },{
    //     productId:productId2,
    //     quantity:1,
    //     deliveryOptionId: '2'
    //   }]);      
    // });
    //   loadFromStorage();//it'll access the local storage in the current block first and as we are making a fakecall and when js.getItem is called then this function gets the cart returned from this  block's local storage;
    //   renderOrderSummary();//as we know this combines all the html and then later assign it to the div element with class('js-order-summary'). hence this function will search for that div in this block and will assign the value.
    //   //on rendering we should have two 'cart-item-container' divs as we have 2 items as default.
      expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
      expect(
        document.querySelector(`.js-product-quantity-${productId1}`).innerText
      ).toContain('Quantity: 2');
      expect(
        document.querySelector(`.js-product-quantity-${productId2}`).innerText
      ).toContain('Quantity: 1');

      // document.querySelector('.js-test-container').innerHTML = '';//using afterEach hook which is calling a function containing this, after each test.
  });

  it('removes a product', ()=>{  
    // spyOn(localStorage,'setItem');//first we were using this but later we get to know about beforeEach hook. as this code was repeating in the above(this one contains more items(including items of above)) test too so beforeEach hook will run the function containing this for both the tests.
    // document.querySelector('.js-test-container').innerHTML = `
    // <div class="js-order-summary"></div><!--when the renderOrderSummary function get's called, it generates some HTML and puts it into .js-order-summary but as in this block we don't have that class and element, we'll make one.-->
    // <div class="js-payment-summary"></div><!--when the delete button is clicked(see line 56) then in our code when the delete button is clicked, it makes the changes and calls the renderPaymentSummary function which generates some HTML and puts it into an element with class js-payment-summary now this block doesn't contains that div so we made one.-->
    // `;
   
    // const productId1='e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    // const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
    // spyOn(localStorage,'getItem').and.callFake(()=>{
    //   return JSON.stringify([{
    //     productId:productId1,
    //     quantity:2,
    //     deliveryOptionId:'1'
    //   },{
    //     productId:productId2,
    //     quantity:1,
    //     deliveryOptionId: '2'
    //   }]);      
    // });
    //   loadFromStorage();
    //   renderOrderSummary();
      document.querySelector(`.js-delete-link-${productId1}`).click();//this will click delete on the first product and delete it.
      expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
      expect(
        document.querySelector(`.js-cart-item-container-${productId1}`)
      ).toEqual(null);
      expect(
        document.querySelector(`.js-cart-item-container-${productId2}`)
      ).not.toEqual(null);
      expect(cart.length).toEqual(1);
      expect(cart[0].productId).toEqual(productId2);
      
      // document.querySelector('.js-test-container').innerHTML = '';//using afterEach hook which is calling a function containing this, after each test.
  })
});