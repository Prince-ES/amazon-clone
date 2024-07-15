class Cart {//every object we generate will have these property
  cartItems;

  localStorageKey;
  constructor(localStorageKey){// when we generate an object, it'll run this automatically. and this is better place for setup code.the method name is not userdefined and we also can't return anything from this method. the parameter this get will get stored in the above localStorage variable see just above line. and later this will be also used by other function
    this.localStorageKey = localStorageKey;//cart which was an instance is changed to this because each instance we generate will have it's own name and not cart always.
    // businessCart.localStorageKey = 'cart-business';//each object we clreate from this class will run this constructor so we don't need this as we're already using cart instance.

    this.loadFromStorage();
    // businessCart.loadFromStorage();
  }

  loadFromStorage() {
    this.cartItems =JSON.parse(localStorage.getItem(this.localStorageKey)) || [{//we might change object's name in future and if we acces cart.cartItem then it'll not work anymore to avoid this and access property from another property inside object use "this" feature. this will allow us to use a propety inside object from another property inside same object.
      productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity:2,
      deliveryOptionId:'1'
    },{
      productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity:1,
      deliveryOptionId: '2'
    }];
  }

  saveToStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart (productId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      }
    });

    if(matchingItem){
      matchingItem.quantity+=1;
    }else{
      this.cartItems.push({
        productId,quantity: 1,
        deliveryOptionId: '1'
      });
    }

   this.saveToStorage();
  }

  removeFromCart(productId){
    const newCart = [];
    this.cartItems.forEach((cartItem) =>{
      if(cartItem.productId !== productId){
        newCart.push(cartItem);
      }
    });
    
    this.cartItems = newCart;
    this.saveToStorage();
    }

    updateDeliveryOption(productId,deliveryOptionId) {
      let matchingItem;
    
      this.cartItems.forEach((cartItem) => {
        if(productId === cartItem.productId){
          matchingItem = cartItem;
        }
      });
      
      matchingItem.deliveryOptionId = deliveryOptionId;//the parameter "deliveryOptoinId" has the sama name as the property in matchingItem(a cart's item's property) but its working fine.
    
      this.saveToStorage();
    }
}

// function Cart(localStorageKey) {//in object oriented programming, use pascalcase(similar to camelcase but first letter also capital) ex HappyBirthday.
//   const cart = {
//     // cartItems:undefined,//properties of class are accessible from all the objects generated. so we commented out and created same property in class
//     // loadFromStorage() {
//     //   this.cartItems =JSON.parse(localStorage.getItem(localStorageKey)) || [{//we might change object's name in future and if we acces cart.cartItem then it'll not work anymore to avoid this and access property from another property inside object use "this" feature. this will allow us to use a propety inside object from another property inside same object.
//     //     productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
//     //     quantity:2,
//     //     deliveryOptionId:'1'
//     //   },{
//     //     productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
//     //     quantity:1,
//     //     deliveryOptionId: '2'
//     //   }];
//     // },
//     // saveToStorage() {
//     //   localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
//     // },
    
//     // addToCart (productId) {
//     //   let matchingItem;
  
//     //   this.cartItems.forEach((cartItem) => {
//     //     if(productId === cartItem.productId){
//     //       matchingItem = cartItem;
//     //     }
//     //   });
  
//     //   if(matchingItem){
//     //     matchingItem.quantity+=1;
//     //   }else{
//     //     this.cartItems.push({
//     //       productId,quantity: 1,
//     //       deliveryOptionId: '1'
//     //     });
//     //   }
  
//     //  this.saveToStorage();
//     // },
//     // removeFromCart(productId){
//     //   const newCart = [];
//     //   this.cartItems.forEach((cartItem) =>{
//     //     if(cartItem.productId !== productId){
//     //       newCart.push(cartItem);
//     //     }
//     //   });
      
//     //   this.cartItems = newCart;
//     //   this.saveToStorage();
//     //   },
//       // updateDeliveryOption(productId,deliveryOptionId) {
//       //   let matchingItem;
      
//       //   this.cartItems.forEach((cartItem) => {
//       //     if(productId === cartItem.productId){
//       //       matchingItem = cartItem;
//       //     }
//       //   });
        
//       //   matchingItem.deliveryOptionId = deliveryOptionId;//the parameter "deliveryOptoinId" has the sama name as the property in matchingItem(a cart's item's property) but its working fine.
      
//       //   this.saveToStorage();
//       // }
      
//   };

//   return cart;
// }
//each objects generated from the class is called instance. followings are some objects generated from the Cart class.
const cart = new Cart('cart-oop');//Cart is the class name. the syntax is quite similar to calling function but instead it uses a keyword "new". the parameter 'cart-oop' is added later while learning constructor.
const businessCart = new Cart('cart-business');//assigning class to variable and then just below changing property that are needed for particular object.

// cart.localStorageKey = 'cart-oop';//using contructor feature of classes. see line 5 if not there, check nearby.
// businessCart.localStorageKey = 'cart-business';

// cart.loadFromStorage();
// businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);

console.log(businessCart instanceof Cart);


