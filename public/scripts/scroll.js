//-- Start code for bottom right scroll up button
$(document).scroll(function () {
  let y = $(this).scrollTop();
  if (y > 200) {
    $('#scroll-up').fadeIn();
  } else {
    $('#scroll-up').fadeOut();
  }
});

$('#scroll-up').click(function () {
  window.scrollTo(0, 0);
  $('.new-tweet').slideDown();
  $('#nav-new-tweet').fadeOut();
});
//-- End code for bottom right scroll up button
