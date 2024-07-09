function Cart(localStorageKey) {//in object oriented programming, use pascalcase(similar to camelcase but first letter also capital) ex HappyBirthday.
  const cart = {
    cartItems:undefined,
    loadFromStorage() {
      this.cartItems =JSON.parse(localStorage.getItem(localStorageKey)) || [{//we might change object's name in future and if we acces cart.cartItem then it'll not work anymore to avoid this and access property from another property inside object use "this" feature. this will allow us to use a propety inside object from another property inside same object.
        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity:2,
        deliveryOptionId:'1'
      },{
        productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity:1,
        deliveryOptionId: '2'
      }];
    },
    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },
    
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
  
     this.saveToStorage();//to store each item in the local storage after pushing or making any change.
    },
    removeFromCart(productId){
      const newCart = [];
      this.cartItems.forEach((cartItem) =>{
        if(cartItem.productId !== productId){
          newCart.push(cartItem);
        }
      });
      
      this.cartItems = newCart;
      this.saveToStorage();
      },
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
      
  };

  return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');
// const cart = {//generating using function so commented out
//   cartItems:undefined,
//   loadFromStorage() {
//     this.cartItems =JSON.parse(localStorage.getItem('cart-oop')) || [{//we might change object's name in future and if we acces cart.cartItem then it'll not work anymore to avoid this and access property from another property inside object use "this" feature. this will allow us to use a propety inside object from another property inside same object.
//       productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
//       quantity:2,
//       deliveryOptionId:'1'
//     },{
//       productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
//       quantity:1,
//       deliveryOptionId: '2'
//     }];
//   },
//   saveToStorage() {
//     localStorage.setItem('cart-oop',JSON.stringify(this.cartItems));
//   },
  
//   addToCart (productId) {
//     let matchingItem;

//     this.cartItems.forEach((cartItem) => {
//       if(productId === cartItem.productId){
//         matchingItem = cartItem;
//       }
//     });

//     if(matchingItem){
//       matchingItem.quantity+=1;
//     }else{
//       this.cartItems.push({
//         productId,quantity: 1,
//         deliveryOptionId: '1'
//       });
//     }

//    this.saveToStorage();//to store each item in the local storage after pushing or making any change.
//   },
//   removeFromCart(productId){
//     const newCart = [];
//     this.cartItems.forEach((cartItem) =>{
//       if(cartItem.productId !== productId){
//         newCart.push(cartItem);
//       }
//     });
    
//     this.cartItems = newCart;
//     this.saveToStorage();
//     },
//     updateDeliveryOption(productId,deliveryOptionId) {
//       let matchingItem;
    
//       this.cartItems.forEach((cartItem) => {
//         if(productId === cartItem.productId){
//           matchingItem = cartItem;
//         }
//       });
      
//       matchingItem.deliveryOptionId = deliveryOptionId;//the parameter "deliveryOptoinId" has the sama name as the property in matchingItem(a cart's item's property) but its working fine.
    
//       this.saveToStorage();
//     }
    
// };

cart.loadFromStorage();

//in amazon we also have a business cart. this works seperate, so having to cart is easy with oop. we can just copy our main cart and change it's object name as businessCart and while loading cart from localStorage we'll give the file name.
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);

//******** commmented out coz using object oriented programming ************/

// export let cart = undefined;//cart; is the shortcut for let cart = undefined;
// loadFromStorage();
// export function loadFromStorage(){
//   cart =JSON.parse(localStorage.getItem('cart')) || [{
//     productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
//     quantity:2,
//     deliveryOptionId:'1'
//   },{
//     productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
//     quantity:1,
//     deliveryOptionId: '2'
//   }];
// }

// function saveToStorage() {
//   localStorage.setItem('cart',JSON.stringify(cart));
// }

// export function addToCart (productId) {
//   let matchingItem;

//   cart.forEach((cartItem) => {
//     if(productId === cartItem.productId){
//       matchingItem = cartItem;
//     }
//   });

//   if(matchingItem){
//     matchingItem.quantity+=1;
//   }else{
//     cart.push({
//       productId,quantity: 1,
//       deliveryOptionId: '1'
//     });
//   }

//   saveToStorage();//to store each item in the local storage after pushing or making any change.
// }

// export function removeFromCart(productId){
// const newCart = [];
// cart.forEach((cartItem) =>{
//   if(cartItem.productId !== productId){
//     newCart.push(cartItem);
//   }
// });

// cart = newCart;
// saveToStorage();
// }

// export function updateDeliveryOption(productId,deliveryOptionId) {
//   let matchingItem;

//   cart.forEach((cartItem) => {
//     if(productId === cartItem.productId){
//       matchingItem = cartItem;
//     }
//   });
  
//   matchingItem.deliveryOptionId = deliveryOptionId;//the parameter "deliveryOptoinId" has the sama name as the property in matchingItem(a cart's item's property) but its working fine.

//   saveToStorage();
// }

