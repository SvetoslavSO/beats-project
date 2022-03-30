const body = document.querySelector("#wrapper");

const sections = document.querySelectorAll("section");

const screenHeight = window.innerHeight;

body.addEventListener("wheel", e=>{
  e.preventDefault();
  console.log(e.deltaY);
  if(e.deltaY>0){
    body.style.transform = `${screenHeight}px`;
  }else{
    body.style.transform = `${screenHeight}px`;
  }
})