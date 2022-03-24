let list = document.getElementById('team-List');
const text = document.querySelectorAll(".team__text");
const buttons = document.querySelectorAll(".team__employee-name");

function closeItems(){
  for(let j = 0; j<buttons.length; j++){
    const button = buttons[j];
    const desc = button.nextElementSibling;
    desc.classList.remove("team__text--active");
    button.classList.remove("team__employee-name--active");
  }
}

list.addEventListener('click', function (event){
  event.preventDefault();
  const target = event.target;
  if(target.classList.contains("team__employee-name")){
    const desc = target.nextElementSibling;
    if(desc.classList.contains("team__text--active")){
      closeItems();
    }else{
      closeItems();
      desc.classList.add('team__text--active');
      target.classList.add("team__employee-name--active");
    }
  }
});