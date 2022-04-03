;(function(){
  const slider = $('.choice__list').bxSlider({
  pager : false,
  controls: false
});

$(".arrow-icon--left").click(e=>{
  e.preventDefault();
  slider.goToPrevSlide();
})
$(".arrow-icon--right").click(e=>{
  e.preventDefault();
  slider.goToNextSlide();
})
})()

