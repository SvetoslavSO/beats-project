//$('.choice__list').bxSlider();

const leftBtn = document.querySelector("#left");
const rightBtn = document.querySelector("#right");
const itemsList = document.querySelector("#items");
const computedStyles = window.getComputedStyle(itemsList);
const items = document.querySelectorAll(".choice__item");

const minRight = 0;
const itemWidth = getComputedStyle(items[0]).width;
const step = parseInt(itemWidth);
const maxRight = (items.length-1)*step;
let currentRight = 0;

itemsList.style.right = currentRight;

rightBtn.addEventListener("click", e=>{
  e.preventDefault();
  if (currentRight < maxRight){
    currentRight += step;
    itemsList.style.right = `${currentRight}px`;
  }
})

leftBtn.addEventListener("click", e=>{
  e.preventDefault();
  if (currentRight > minRight){
    currentRight -= step;
    itemsList.style.right = `${currentRight}px`;
  }
})