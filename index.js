// gets all buttons from side nav bar in DOM
const buttons = document.querySelectorAll("#btn");
// global attribute for main page area
const main = document.querySelector(".main");
const home = document.querySelector("#home");
const load = document.querySelector("#load");

//event listener on all side nav buttons using forEach with call back
buttons.forEach(element => {element.addEventListener("click", buttonCall)});
document.querySelector("#logo").addEventListener("click",loadHome)

function loadHome(){ clearMain(load); home.className = ""}

//function used to clear main body area in DOM
function clearMain(node) {
    while (node.firstChild) {
       node.removeChild(node.firstChild);
    }
}

function buttonCall()
{
home.className ="hide";
clearMain(load)
let h2 = document.createElement("h2");
let p = document.createElement("p")
h2.textContent = this.textContent;
p.textContent = `Likes`;
let button = document.createElement("button")
button.textContent = "rate"
load.append(h2, p, button)

   

}

