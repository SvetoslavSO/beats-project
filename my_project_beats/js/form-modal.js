$('#arrange-delivery').on('click', function (e) {
  e.preventDefault();

  const form = $(e.currentTarget);
  console.log(e.currentTarget);
  const name = form.find("[name = 'name']");
  const phone = form.find("[name = 'contacts']");
  const comment = form.find("[name = 'comment']");
  const to = form.find("[name = 'to']");

  $.ajax({
    url: "https://webdev-api.loftschool.com/sendmail",
    method: "post",
    data:{
      name: name.val(),
      phone: phone.val(),
      comment: comment.val(),
      to: to.val()
    }
  });
  $.fancybox.open({
    src: "#message-modal",
    type: 'inline'
  });


});

$(".modal-open-close").click(e =>{
  e.preventDefault();
  $.fancybox.close();
})