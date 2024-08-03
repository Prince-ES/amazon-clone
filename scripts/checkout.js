import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import {loadProducts, loadProductsFetch} from '../data/products.js';
import { loadCart } from '../data/cart.js';

//import '../data/cart-oop.js';//this will run all the code in that file.
// import '../data/cart-class.js';//creating objects from class;//imported here because to run code we need a html file and this checkout file is conected with checkout.html file.
//import '../data/backend-practice.js';

// new Promise((resolve)=>{//it's a builtin class and when we create a promise we need to give it a function. resolve is a function and works very similar to jasmine's done function so resolve lets us control when to go to the next step.
  
//   loadProducts(()=>{
   
//     resolve();// this resolve will get called only when the asynchronous function(loadProduct)is done working an after the resolve function runs the compiler will move to rest of the code below.
//   });
// }).then(()=>{
//   renderOrderSummary();
//   renderPaymentSummary();
// })//promise is a class and has smililar way of generating new promises.

///////////the promises are designed in a way that they allow performing multiple things at a time. therefore after resolve the next step is not below, the below code is running beside. to make the below code next step put it in ".then function" that'll run the function as next step after resolve.///////////
// console.log("hello");

/*
loadProducts(()=>{//when we'll go to the checkout page, the loadProduct will pass this anonymous function and after getting the response the anonymous function will run and hence both the function inside will also run.
  renderOrderSummary();//this function also indirectly accesses the product array so we'll run this after loading product array. same goes with paymentSummary.js
  renderPaymentSummary();
});
*/

//the syntax of promise contains more code than doing same with nested functions then why do we prefer promises? check ans below
//The problem is that with each layer of nesting some indences or spaces added at first this means if we have lots of callbacks the code will become more and more nested. and all these indences make our code hard to work with. for ex- if we use cart from backend then we'll first need to load the products then carts and then run the functions as cart accesses some of the product's properties. see below is the practical comparison for bth when cart is also used from backend.

//nested format:-
/*
loadProducts(()=>{
  loadCart(()=>{
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/

//Promise format:-
/*
new Promise((resolve)=>{
  loadProducts(()=>{
    resolve('value1');//we can also give resolve a value. the value we pass here can be used in below steps(.then) as parameter
  });

}).then((value)=>{//now the next step is to load cart but after calling loadCart we have to wait again but this .then functinon doesn't provide the resolve method therefore:-
  console.log(value);
  return new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    });
  });

}).then(()=>{
  renderOrderSummary();
  renderPaymentSummary();
});
*/
//so even though promises require a bunch of setup code we can see that it keeps our code relatively flatter.

//we can also run multiple promises at the same time using   "Promise.all()" and wait for all of them to finish. above code is the same but all the promise were handled seperately.

Promise.all([
  new Promise((resolve)=>{
    loadProducts(()=>{
      resolve('value1');
    });  
  }),
  new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    });
  })

]).then((values)=>{//this "values" parameter contains params from all the above promises which have passed some value in resolve.
  console.log(values);
  renderOrderSummary();
  renderPaymentSummary();
});


//************ after fetch  above code (promise.all) can be replaced by following code.***** 

Promise.all([
  loadProductsFetch(),
  new Promise((resolve)=>{//this remained same because we didn't use fetch for cart
    loadCart(()=>{
      resolve();
    });
  })
]).then((values)=>{
  console.log(values);
  renderOrderSummary();
  renderPaymentSummary();
});


