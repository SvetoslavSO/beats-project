const buttons = document.querySelectorAll(".team__employee-name");
for(i = 0; i < buttons.length; i++){
  const button = buttons[i];
  button.addEventListener("click", function(e){
    e.preventDefault();
    
  })

}