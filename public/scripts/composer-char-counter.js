//-- Character counter listener
$(document).ready(function () {
  $('#tweet-text').bind('input propertychange', function () {
    let update = 140 - this.value.length;
    if (update > 0) {
      $(this).siblings().children('.counter').css('color', 'black');
      $(this).siblings().children('.counter').text(update);
    } else {
      $(this).siblings().children('.counter').css('color', 'red');
      $(this).siblings().children('.counter').text(update);
    }
  });
});
