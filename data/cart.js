export let cart;
loadFromStorage();
export function loadFromStorage(){
  cart =JSON.parse(localStorage.getItem('cart')) || [{
    productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity:2,
    deliveryOptionId:'1'
  },{
    productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity:1,
    deliveryOptionId: '2'
  }];
}

function saveToStorage() {
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart (productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  if(matchingItem){
    matchingItem.quantity+=1;
  }else{
    cart.push({
      productId,quantity: 1,
      deliveryOptionId: '1'
    });
  }

  saveToStorage();//to store each item in the local storage after pushing or making any change.
}

export function removeFromCart(productId){
const newCart = [];
cart.forEach((cartItem) =>{
  if(cartItem.productId !== productId){
    newCart.push(cartItem);
  }
});

cart = newCart;
saveToStorage();
}

export function updateDeliveryOption(productId,deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });
  
  matchingItem.deliveryOptionId = deliveryOptionId;//the parameter "deliveryOptoinId" has the sama name as the property in matchingItem(a cart's item's property) but its working fine.

  saveToStorage();
}

export function loadCart(fun){
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load',()=>{//inside: the url path with "products" will return a JSON string containing all the products. we'll JSON.parse them first and them map the array as we were doing before. therefore products array will contain instances(objects) from different classes. 
     console.log(xhr.response);   
     fun();
  });

  
  
  xhr.open('GET','https://supersimplebackend.dev/cart');
  xhr.send();

 //  return products;
 }

