// Fake data taken from initial-tweets.json
const data = [
  {
    user: {
      name: 'Newton',
      avatars: 'https://i.imgur.com/73hZDYK.png',
      handle: '@SirIsaac',
    },
    content: {
      text:
        'If I have seen further it is by standing on the shoulders of giants',
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: 'Descartes',
      avatars: 'https://i.imgur.com/nlhLi3I.png',
      handle: '@rd',
    },
    content: {
      text: 'Je pense , donc je suis',
    },
    created_at: 1461113959088,
  },
];

const renderTweets = function (tweets) {
  for (const tweet in tweets) {
    const articleContainer = $(`<article class="tweets"></article>`);
    const headerContainer = $(`<header class="article-tweet-header"></header>`);
    const mainContainer = $(`<main class="article-tweet-main"></main>`);
    const footerContainer = $(`<footer class="article-tweet-footer"></footer>`);
    const likesContainer = $(`<div  id="article-tweet-likes"></div>`);
    const report = $(`<img id="tweet-report" src="images/report.png"></div>`);
    const retweet = $(
      `<img id="tweet-retweet" src="images/retweet.png"></div>`
    );
    const heart = $(`<img id="tweet-heart" src="images/heart.png"></div>`);
    const name = createTweetElement(
      tweets[tweet].user.name,
      'h5',
      'tweet-header-username'
    );
    const avatar = createTweetElement(
      tweets[tweet].user.avatars,
      'img',
      'user-icon'
    );
    const handle = createTweetElement(
      tweets[tweet].user.handle,
      'h5',
      'tweet-header-email'
    );
    const content = createTweetElement(
      tweets[tweet].content.text,
      'div',
      'article-tweet-content'
    );
    const date = createTweetElement(
      tweets[tweet].created_at,
      'h6',
      'article-tweet-date'
    );
    $(articleContainer).append(headerContainer, mainContainer, footerContainer);
    $(headerContainer).append(name, handle);
    $(name).append(avatar);
    $(mainContainer).append(content);
    $(footerContainer).append(date, likesContainer);
    $(likesContainer).append(report, retweet, heart);
    const main = $('#tweeter-main').get(0);
    console.log(articleContainer);
    $(main).append(articleContainer);
  }
};

const createTweetElement = function (tweet, type, className) {
  let $tweet = '';
  if (type === 'img') {
    $tweet = $(`<${type} class="${className}" src="${tweet}">`);
  } else {
    $tweet = $(`<${type} class="${className}">${tweet}</${type}>`);
  }
  return $tweet;
};

window.onload = renderTweets(data);
