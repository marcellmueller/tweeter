const renderTweets = function (tweets) {
  for (const tweet in tweets) {
    const newDate = moment(tweets[tweet].created_at).fromNow();
    const articleContainer = $(`<article class="tweets">
    <header class="article-tweet-header">
      <h5 class="tweet-header-username">
      <img class="user-icon" src="${tweets[tweet].user.avatars}">
      ${tweets[tweet].user.name}</h5>
      <h5 class="tweet-header-email">${tweets[tweet].user.handle}</h5>
    </header>
    <main class="article-tweet-main">
      <div class="article-tweet-content">${tweets[tweet].content.text}</div>
    </main>
    <footer class="article-tweet-footer">
    <h6 class="article-tweet-date">${newDate}</h6>
    <div class="article-tweet-likes likes-hide">
      <img id="tweet-report" src="images/report.png">
      <img id="tweet-retweet" src="images/retweet.png">
      <img id="tweet-heart" src="images/heart.png">
    </div></footer>
    </article>`);

    const main = $('#tweeter-main').get(0);
    $(main).append(articleContainer);
  }
};

$('.new-tweet-content').on('submit', function (e) {
  e.preventDefault();
  const textInput = $('#tweet-text').val();
  const formData = $('.new-tweet-content').serialize();
  //Tweet submit error handling
  if (textInput.length < 1) {
    errorHandler('You have to write something first!');
  } else if (textInput.length > 140) {
    errorHandler('This tweet is over 140 characters');
  } else if (textInput === null) {
    errorHandler('Error: Undefined entry');
  } else if (
    //check if tweet is good and if so post with AJAX
    textInput.length >= 1 &&
    textInput.length <= 140 &&
    textInput !== null &&
    textInput !== undefined
  ) {
    $('#error-box').slideUp();
    $('.new-tweet').slideUp('slow');

    $.post('/tweets/', formData)
      .then(() => {
        getTweets();
      })
      .then(() => $('#tweet-text').val(''))
      .then(() => $('#counter').val(140));

    $('#nav-new-tweet').fadeIn();
    $('#tweeter-main').empty();
    getTweets();
  } else {
    errorHandler('Error: Undefined entry');
  }
});

$('#nav-new-tweet').click(function () {
  $('.new-tweet').slideDown();
  $('#nav-new-tweet').fadeOut();
});
const errorHandler = (errorText) => {
  $('#error-box').text(errorText).slideDown();
};

const sortTweets = (tweets) => {
  tweets.sort((a, b) => b.created_at - a.created_at);
  return tweets;
};
const getTweets = () => {
  $.get('/tweets/', function (data) {
    renderTweets(sortTweets(data));
  });
};

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

window.onload = getTweets();
