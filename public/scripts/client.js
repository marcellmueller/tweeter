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

const timeSince = (time) => {};

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
    const name = $(
      `<h5 class="tweet-header-username">${tweets[tweet].user.name}</h5>`
    );
    const avatar = $(
      `<img class="user-icon" src="${tweets[tweet].user.avatars}"></div>`
    );
    const handle = $(
      `<h5 class="tweet-header-email">${tweets[tweet].user.handle}</h5>`
    );
    const content = $(
      `<div class="article-tweet-content">${tweets[tweet].content.text}</div>`
    );
    const date = $(`<h6 class="article-tweet-date">${newDate}</h6>`);
    $(articleContainer).append(headerContainer, mainContainer, footerContainer);
    $(headerContainer).append(name, handle);
    $(name).prepend(avatar);
    $(mainContainer).append(content);
    $(footerContainer).append(date, likesContainer);
    $(likesContainer).append(report, retweet, heart);
    const main = $('#tweeter-main').get(0);
    console.log(articleContainer);
    $(main).append(articleContainer);
  }
};

window.onload = renderTweets(data);
