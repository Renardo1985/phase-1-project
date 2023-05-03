// gets all buttons from side nav bar in DOM
const cake = "Our bespoke buttercream cakes add a personal touch to any occasion, whether you want to keep it simple and elegant or go for show-stopping and elaborate, we will work with you to create a bespoke design that is tailored to your specific theme for your occasion. A lot of time and attention to detail goes into creating your one of a kind master piece."
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
    requestData(this.textContent.toLowerCase());
    clearMain(load) 

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
    
    let h2 = document.createElement("h2");
    let p1 = document.createElement("p");
    let p2 = document.createElement("p");
    let p3 = document.createElement("p");

    h2.textContent = data.name;
    p1.textContent = data.about;
    p2.textContent = data.price;
    p3.textContent = data.rating;

    load.append(h2, p1, p2, p3)
}



function loadHome(){ clearMain(load); home.className = ""}

//function used to clear main body area in DOM
function clearMain(node) {
    while (node.firstChild) {
       node.removeChild(node.firstChild);
    }
}