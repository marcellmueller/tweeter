//-- Dynamically render tweets
const createTweet = function (tweet) {
  const newDate = moment(tweet.created_at).fromNow();
  const articleContainer = $(`<article class="tweets"></article>`);
  const headerContainer = $(`<header class="article-tweet-header"></header>`);
  const mainContainer = $(`<main class="article-tweet-main"></main>`);
  const footerContainer = $(`<footer class="article-tweet-footer"></footer>`);
  const likesContainer = $(`<div class="article-tweet-likes"></div>`);
  const report = $(`<img id="tweet-report" src="images/report.png"></div>`);
  const retweet = $(`<img id="tweet-retweet" src="images/retweet.png"></div>`);
  const heart = $(`<img id="tweet-heart" src="images/heart.png"></div>`);
  const name = $(`<h5 class="tweet-header-username"></h5>`).text(
    tweet.user.name
  );
  const avatar = $(`<img class="user-icon" ></div>`).attr(
    'src',
    tweet.user.avatars
  );
  const handle = $(`<h5 class="tweet-header-email"></h5>`).text(
    tweet.user.handle
  );
  const content = $(`<div class="article-tweet-content"></div>`).text(
    tweet.content.text
  );
  const date = $(`<h6 class="article-tweet-date"></h6>`).text(newDate);
  $(articleContainer).append(headerContainer, mainContainer, footerContainer);
  $(headerContainer).append(name, handle);
  $(name).prepend(avatar);
  $(mainContainer).append(content);
  $(footerContainer).append(date, likesContainer);
  $(likesContainer).append(report, retweet, heart);
  return articleContainer;
};

const renderTweets = (tweets) => {
  const tweetsContainer = $('#tweeter-main').html('');
  for (let tweet of tweets) {
    let tweetElement = createTweet(tweet);
    tweetsContainer.append(tweetElement);
  }
};

//-- Post new tweet form data and validation
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
      .then(() => $('#tweet-text').val(''))
      .then(() => $('.counter').val(140))
      .then(() => {
        getTweets();
      });

    $('#nav-new-tweet').fadeIn();
    $('#tweeter-main').empty();
  } else {
    errorHandler('Error: Undefined entry');
  }
});

//-- Call error handler slideDown
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
