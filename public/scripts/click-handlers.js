//-- Nav new tweet button handler
$('#nav-new-tweet').click(function () {
  window.scrollTo(0, 0);
  $('.new-tweet').slideDown();
  $('#nav-new-tweet').fadeOut();
});

//-- Fade in and out scroll up button
$(document).scroll(function () {
  let y = $(this).scrollTop();
  if (y > 200) {
    $('#nav-new-tweet').fadeOut();
    $('#scroll-up').fadeIn();
  } else {
    $('#nav-new-tweet').fadeIn();
    $('#scroll-up').fadeOut();
  }
});

//-- Scroll up button handler
$('#scroll-up').click(function () {
  window.scrollTo(0, 0);
  $('.new-tweet').slideDown();
  $('#nav-new-tweet').fadeOut();
});
