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
    $(main).append(articleContainer);
  }
};

$('.new-tweet-content').on('submit', function (e) {
  e.preventDefault();

  const formData = $('.new-tweet-content').serialize();

  $.ajax({
    url: '/tweets/',
    type: 'POST',
    data: formData,
  });
  console.log(formData);
});

window.onload = $.get('/tweets/', function (data) {
  renderTweets(data);
});
