// gets all buttons from side nav bar in DOM
const about = {
    cakes : "Our bespoke buttercream cakes add a personal touch to any occasion, whether you want to keep it simple and elegant or go for show-stopping and elaborate, we will work with you to create a bespoke design that is tailored to your specific theme for your occasion. A lot of time and attention to detail goes into creating your one of a kind master piece.",
    cupcakes : "We offer three style of cupcakes, Elegant, Luxury and Floral (All cupcakes are Jumbo). We will work with you to decide which bespoke set of cupcakes is best for you, to provide a truly customized experience for your occasion. They are great accompaniments to your showstopper cake, or perfect for gifting as a little treat on their own.",
    cookies : "We offer three style of cookies, drop cookies, NY style cookies and Fondant covered sugar cookies. We make each cookie by hand for every order, with premium quality ingredient, attention to detail and a lot of love.",
    brownies : "Our fudge brownies and blondies are made with premium quality, all-natural ingredients; no preservatives or stabilizers and nothing artificial. Every brownie and blondies is handcrafted with precision and love. We never want to sacrifice quality and promise to make the most irresistible and best brownies possible."
}
const rating = ["✯","✯✯","✯✯✯","✯✯✯✯","✯✯✯✯✯"]

const buttons = document.querySelectorAll("#btn");
// global attribute for main page area
const main = document.querySelector(".main");
const home = document.querySelector("#home");
const load = document.querySelector("#load");

//event listener on all side nav buttons using forEach with call back
buttons.forEach(element => {element.addEventListener("click", buttonCall)});
document.querySelector("#logo").addEventListener("click",loadHome)

function buttonCall()
{    
    clearMain(load) 
    let h2 = document.createElement("h2");
    let p = document.createElement("p")
    h2.textContent = this.textContent;
    p.textContent = about[this.textContent.toLowerCase()];
    load.append(h2,p)
    requestData(this.textContent.toLowerCase());
}

function requestData(key)
{
    fetch(`http://localhost:3000/${key}`)
    .then(data => data.json())
    .then(item => item.forEach(item =>generateItem(item))) 
}

function generateItem(data)
{
    home.className ="hide";    
    let p0 = document.createElement("p");
    let p1 = document.createElement("p");
    let p2 = document.createElement("p");
    let p3 = document.createElement("p");
    p0.textContent = data.name;
    p1.textContent = `About: ${data.about}`;
    p2.textContent = `Price: $${data.price}`;
    p3.textContent = `Rating: ${rating[data.rating]}`;
    load.append(p0, p1, p2, p3)
}

function loadHome(){ clearMain(load); home.className = ""}

//function used to clear main body area in DOM
function clearMain(node) {
    while (node.firstChild) {
       node.removeChild(node.firstChild);
    }
}