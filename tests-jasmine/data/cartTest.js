import { addToCart,cart,loadFromStorage } from "../../data/cart.js";

describe('test suite: addToCart',()=>{
  it('adds an existing  product to the cart',() => {
    spyOn(localStorage,'setItem');
    spyOn(localStorage,'getItem').and.callFake(()=>{//now we'll get this item in the cart by default when this case will be tested 
      return JSON.stringify([{
        productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity:1,
        deliveryOptionId: '1'
      }]);      
    });
      loadFromStorage();//this will give the cart value from above spyOn localStorage getItem;
      addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');
      console.log(cart[0]);
      expect(cart.length).toEqual(1);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(cart[0].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
      expect(cart[0].quantity).toEqual(2);
  });

  it('adds a new product to the cart',() => {
    spyOn(localStorage,'setItem');//in the add to cart function, after adding the product to cart we were saving changes to localStorage and below in the test when we pass the product, we don't actually want to save changes in local storage so we used this.this will replace the set item with the fake version and later when the call will be made then it'll be added to this mock and will not affect the real localStorage.

    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([]);
    });

      loadFromStorage();

    addToCart(`e43638ce-6aa0-4b85-b27f-e1d07eb678c6`);
    expect(cart.length).toEqual(1);

    //we can check if addToCart calls setItem at some point
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);//this checks how many times the give method called. this only works if this method has been mocked with spyOn.
    expect(cart[0].productId).toEqual(`e43638ce-6aa0-4b85-b27f-e1d07eb678c6`);
    expect(cart[0].quantity).toEqual(1);
  });
})