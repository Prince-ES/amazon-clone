//also checkout the "backend.txt" file.
//to send an http message we'll use a class "XMLHttpRequest". this is a built in class.

const xhr = new XMLHttpRequest();//as we use a class to create object this is an in built class that creates a new HTTP message to send to the backend.  message = request.

xhr.addEventListener('load',()=>{//here we want to wait for the response so we used the 'load' parameter. //we can also see the responses in the network tab (you'll find it in the console navigation bar.)
 console.log(xhr.response);
});//checkout the xhr.response's comment at line 23;//we've used this code above because addEventListener needs to be setup before using and then we'll trigger the event. same works with 'click' and others.
//now we need to setup the request
xhr.open('get', 'https://supersimplebackend.dev');//we'll give open, two parameters: 1st is what type of http message to send. 'get' means to get some info from backend. some other types are(GET, POST, PUT, DELETE). 2nd parameter tells where to send this http message, that is URL.
//URL: Uniform Resource Locator
//-like an address, but for the internet.
//-Helps us locate another computer on the internet.
//examples:-
// https://amazon.com//points to one of the amazon backend computer.
// https://youtube.com
// https://supersimple.dev
// https means we are using http to communicate with this computer. the "s" after http tells that we're using secure version of http. the second part of the URL is called a domain name. this is like an address. it points to another computer on the internet.

//for this project supersimpledev has already set up a backend computer that we can practice with. it's located at: https://supersimplebackend.dev

xhr.send();// the variable xhr creates a message, the xhr.open sets the message and then this sends the message to internet(to that url);

// xhr.response//this will be undefined at first. actually xhr.send is ans asynchronous code. so on reaching the line 17 it'll not wait to complete the code and move to the next code. it just sends the request and immediately moves to the next code. in this case in order to get this response we need to wait for the response to come back first and then we can access .response; in order to wait for the responseto come back at top after we create the xhr we'll use some code.

//wecan send different messages or diff requests to the backend using URL paths. a url path is the part that comes after the domain name.for ex in : https://supersimple.dev/hello the url path is      "/hello". if there is no url path(https://supersimple.dev) the path is "/"

// let's try sending requests to different url paths.

const xhr2 = new XMLHttpRequest();

xhr2.addEventListener('load',()=>{
  console.log(xhr2.response);
})

xhr2.open('GET', 'https://supersimplebackend.dev/documentation');
xhr2.send();

//A backend only supports a certain set of URL paths. forex when he creater supersimplebackend.dev. he had decide which url paths are supported and how his backend would respond to each URL path.

//if we send a request to a URL path that is not supported the backend will respond with an error.