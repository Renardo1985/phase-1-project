// gets all buttons from side nav bar in DOM
const buttons = document.querySelectorAll("#btn");
// global attribute for main page area
const main = document.querySelector(".main");

//event listener on all side nav buttons using forEach with call back
buttons.forEach(element => {element.addEventListener("click", buttonCall)});

//function used to clear main body area in DOM
function clearMain(node) {
    while (node.firstChild) {
       node.removeChild(node.firstChild);
    }
}

function buttonCall()
{
clearMain(main);
const card = document.createElement("div")
card.classList.add("card")
let h2 = document.createElement("h2");
let p = document.createElement("p")

h2.textContent = this.textContent;
p.textContent = `Likes`;
let button = document.createElement("button")
button.classList.add("like-btn")
button.textContent = "Like ❤️ "
card.append(h2, p, button)
main.appendChild(card);   

}

