;(function(){
  const findBlockByAttr = (allias) =>{
  return $(".review__item").filter((ndx, item)=>{
    return $(item).attr("data-linked-with") == allias;
  })
}

$(".review__avatars-link").click(e=>{
  e.preventDefault();
  const $this = $(e.currentTarget);
  const target = $this.attr("data-open");
  const itemToShow = findBlockByAttr(target);
  const curItem = $this.closest(".review__avatars-item");

  itemToShow.addClass("review__item--active").siblings().removeClass("review__item--active");
  curItem.addClass("review__avatars-item--active").siblings().removeClass("review__avatars-item--active");
})
})()
