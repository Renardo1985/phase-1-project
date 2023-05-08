//array of object for Cart
const cart = [];
const about = {
    cakes : "Our bespoke buttercream cakes add a personal touch to any occasion, whether you want to keep it simple and elegant or go for show-stopping and elaborate, we will work with you to create a bespoke design that is tailored to your specific theme for your occasion. A lot of time and attention to detail goes into creating your one of a kind master piece.",
    cupcakes : "We offer three style of cupcakes, Elegant, Luxury and Floral (All cupcakes are Jumbo). We will work with you to decide which bespoke set of cupcakes is best for you, to provide a truly customized experience for your occasion. They are great accompaniments to your showstopper cake, or perfect for gifting as a little treat on their own.",
    cookies : "We offer three style of cookies, drop cookies, NY style cookies and Fondant covered sugar cookies. We make each cookie by hand for every order, with premium quality ingredient, attention to detail and a lot of love.",
    brownies : "Our fudge brownies and blondies are made with premium quality, all-natural ingredients; no preservatives or stabilizers and nothing artificial. Every brownie and blondies is handcrafted with precision and love. We never want to sacrifice quality and promise to make the most irresistible and best brownies possible."
}
//ratings array
const rating = ["✯","✯✯","✯✯✯","✯✯✯✯","✯✯✯✯✯"]

// gets all buttons from nav bar in DOM
const buttons = document.querySelectorAll("#btn");
// global attribute for main page area
const main = document.querySelector(".main");
const home = document.querySelector("#home");
const load = document.querySelector("#load");

//event listener on all side nav buttons using forEach with call back
buttons.forEach(element => {element.addEventListener("click", buttonCall)});
document.querySelector("#logo").addEventListener("click",loadHome)

//call back function for clicks on Navigation bar
function buttonCall()
{    
    clearNode(load) 
    let h2 = document.createElement("h2");
    let p = document.createElement("p")
    h2.textContent = this.textContent;   
    if (this.textContent === "Cart")
    {        
        loadCart();
    }
    else
    {
        p.textContent = about[this.textContent.toLowerCase()];
        load.append(h2,p)
        requestData(this.textContent.toLowerCase());
    }
    
}
//main fetch to read from db.json
function requestData(key)
{
    
    fetch(`http://localhost:3000/${key}`)
    .then(data => data.json())
    .then((item) => {
                        item.forEach(item =>generateItem(item,key));
                        //populateForm(item);
                    })
    .catch(function(error){alert(`${error.message} from http://localhost:3000/${key}`)});
}
//Patch to update rating.
function updateRating(item,key){
    fetch(`http://localhost:3000/${key}/${item.id}`, {method: "PATCH",headers:{"Content-Type": "application/json",Accept: "application/json"},body: JSON.stringify({"rating":item.rating})})
    .catch(function(error){alert(`${error.message} from http://localhost:3000/${key}/${item.id}`)});
  }

function generateItem(data,key)
{          
    let p0 = document.createElement("p");
    let p1 = document.createElement("p");
    let p2 = document.createElement("p");
    let rate = document.createElement("button");
    let img = document.createElement("img");
    let add = document.createElement("button")   

    p0.textContent = data.name;
    p1.textContent = `About: ${data.about}`;
    p1.style.visibility = "hidden";
    p2.textContent = `Price: $${data.price}`;
    rate.textContent = `Rating:${rating[data.rating]}`;    
    img.src = data.image;
    //on mouseover show item description
    img.addEventListener("mouseover",()=>{p1.style.visibility ="";})
    img.style.height = "12rem"
    img.addEventListener("mouseleave",()=>{p1.style.visibility ="hidden";})
    rate.addEventListener("click",() => 
    {
        if (data.rating < 4){data.rating += 1}
        else {data.rating = 0}
        rate.textContent = `Rating:${rating[data.rating]}`;
        updateRating(data,key)

    })
    add.textContent = "Add to Cart"
    //when add to cart is clicked adds item to array cart
    add.addEventListener("click",() => {cart.push(data); console.log(cart)})
    load.append(p0, img,p1,rate, p2,add)
}

function populateForm(data){    
    const select = document.getElementById("item-name");
    clearNode(select)
    
    data.forEach( data => {
        let option = document.createElement("option");
        option.value = data.name;
        option.textContent = data.name;
        select.appendChild(option);
    });
}

function loadCart()
{
    clearNode(load)
    let h2 = document.createElement("h2");
    h2.textContent = "Cart"
    let p = document.createElement("p")
    p.textContent = `You have ${cart.length} item(s) in your cart.`
    load.append(h2,p)

    cart.forEach((element, index )=> { 
    let item = document.createElement("div");
    let p1 = document.createElement("p");
    let p2 = document.createElement("p");
    let img = document.createElement("img");
    let remove = document.createElement("button")   
    img.src = element.image;
    p1.textContent = `About: ${element.name}`;
    remove.textContent = "Remove"
    remove.addEventListener("click",() =>{cart.splice(index,1);loadCart();});
    p2.textContent = `Price: $${element.price}`; 
    item.append(img,p1,remove,p2)
    load.append(item)
    })

    if (cart.length>0){
    let total = document.createElement("p")
    total.textContent = `Total Price $${reduceCart()}`
    let checkOut = document.createElement("button")
    checkOut.textContent = "Check Out"
    checkOut.addEventListener("click",()=>{checkOutForm()})

    load.append(total,checkOut)
    }
}
function checkOutForm()
{

const form = document.createElement("form");
const name = document.createElement("input");
const email = document.createElement("input")
const button = document.createElement("button");

name.type = "text";
name.placeholder = "Enter your name";
email.type = "email"
email.placeholder = "Enter your email"
button.type= "submit"
button.textContent = "Submit";

form.appendChild(name);
form.appendChild(email)
form.appendChild(button);

form.addEventListener("submit", (event) =>{
  event.preventDefault(); // prevent the default form submission
  alert(`Hi, ${name.value}!, Your order has being processed`); // log a greeting message to the console
});
load.append(form)
}

function reduceCart()
{
    const sumOfPrices = cart.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.price;
      }, 0);
    return sumOfPrices;

}
function loadHome(){ clearMain(load); home.className = ""}

//function used to clear nodes in DOM
function clearNode(node) {
    while (node.firstChild) {
       node.removeChild(node.firstChild);
    }
}