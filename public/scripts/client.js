const renderTweets = function (tweets) {
  for (const tweet in tweets) {
    const newDate = moment(tweets[tweet].created_at).fromNow();
    const articleContainer = $(`<article class="tweets"></article>`);
    const headerContainer = $(`<header class="article-tweet-header"></header>`);
    const mainContainer = $(`<main class="article-tweet-main"></main>`);
    const footerContainer = $(`<footer class="article-tweet-footer"></footer>`);
    const likesContainer = $(`<div class="article-tweet-likes"></div>`);
    const report = $(`<img id="tweet-report" src="images/report.png"></div>`);
    const retweet = $(
      `<img id="tweet-retweet" src="images/retweet.png"></div>`
    );
    const heart = $(`<img id="tweet-heart" src="images/heart.png"></div>`);
    const name = $(`<h5 class="tweet-header-username"></h5>`).text(
      tweets[tweet].user.name
    );
    const avatar = $(`<img class="user-icon" ></div>`).attr(
      'src',
      tweets[tweet].user.avatars
    );
    const handle = $(`<h5 class="tweet-header-email"></h5>`).text(
      tweets[tweet].user.handle
    );
    const content = $(`<div class="article-tweet-content"></div>`).text(
      tweets[tweet].content.text
    );
    const date = $(`<h6 class="article-tweet-date"></h6>`).text(newDate);
    $(articleContainer).append(headerContainer, mainContainer, footerContainer);
    $(headerContainer).append(name, handle);
    $(name).prepend(avatar);
    $(mainContainer).append(content);
    $(footerContainer).append(date, likesContainer);
    $(likesContainer).append(report, retweet, heart);
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
    errorHandler('Error: This tweet is empty');
  } else if (textInput.length > 140) {
    errorHandler('Error: This tweet is over 140 characters');
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
    $.ajax({
      url: '/tweets/',
      type: 'POST',
      data: formData,
    });
    $('#tweeter-main').empty();
    getTweets();
  } else {
    errorHandler('Error: Undefined entry');
  }
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
window.onload = getTweets();
