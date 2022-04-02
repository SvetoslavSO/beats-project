const acco = document.querySelector("#horizontal-acco");
const items = document.querySelectorAll(".colors__item");

const getItemWidth = (item) =>{
  let resultWidth = 524;

  const windowWidth = window.innerWidth;
  const itemWidth = item.offsetWidth;

  const isTablet = window.matchMedia("(max-width: 830px)").matches;
  const isMobile = window.matchMedia("(max-width: 480px)").matches;
  if (isTablet){
    resultWidth = windowWidth - itemWidth * items.length;
  }
  if (isMobile){
    resultWidth = windowWidth - itemWidth;
  }
  return resultWidth;
}

const setItemWidth = (item, width) =>{
  const itemContent = item.nextElementSibling;
  const itemText = itemContent.firstElementChild;
  itemContent.style.width = `${width}px`;
  itemText.style.width = `${width}px`;
}

const closeItem = (item) =>{
  const itemParent = item.parentElement;
  itemParent.classList.remove("colors__item--active");
  item.classList.remove("colors__button--active");
  setItemWidth(item, 0);
}

const openItem = (item) =>{
  const itemParent = item.parentElement;
  itemParent.classList.add("colors__item--active");
  item.classList.add("colors__button--active");
  const width = getItemWidth(item);
  setItemWidth(item, width);
  
}

acco.addEventListener("click", (e)=>{
  e.preventDefault();
  var target = e.target;
  if (target.classList.contains("colors__button-text")){
    target = target.parentElement;
  }
  const isActive = target.classList.contains("colors__button--active");
  const activeElement = document.querySelector(".colors__button--active");
  if(target.classList.contains("colors__button") && isActive){
    if (activeElement){
      closeItem(activeElement);
    }
  }
  if(target.classList.contains("colors__button") && !isActive){
    if (activeElement){
      closeItem(activeElement);
    }
    openItem(target);
  }
})

window.addEventListener("resize", ()=>{
  const activeButton = document.querySelector(".colors__button--active");
  closeItem(activeButton);
})