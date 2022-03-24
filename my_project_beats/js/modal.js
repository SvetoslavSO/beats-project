const openBtn = document.querySelector("#openOverlay");
const closeBtn = document.querySelector("#closeButton");
var overlay = document.querySelector("#overlayMenu");


openBtn.addEventListener("click", e=>{
  e.preventDefault();
  overlay.classList.add("Active");
  if(overlay.classList.contains("Active")){
    overlay.style.left = '0';
  }
})

closeBtn.addEventListener("click", e=>{
  e.preventDefault();
  overlay.classList.remove("Active");
  overlay.style.left = '-9999rem';
})
