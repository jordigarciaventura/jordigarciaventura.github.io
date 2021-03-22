document.addEventListener('DOMContentLoaded', () => {

  const text = document.getElementById('text');
  const author = document.getElementById('author');
  const newQuoteBtn = document.getElementById('new-quote');
  const tweetBtn = document.getElementById('tweet-quote');
  const tumblrBtn = document.getElementById('tumblr-quote');

  let quotes;
  let currentIndex;

  getQuotes();

  let currentQuote;
  let currentAuthor;

  newQuoteBtn.onclick = () => render();

  function changeMainColor(color) {
    var root = document.querySelector(':root');
    root.style.setProperty('--main-color', color);
  }

  function getRandomColor() {
    return `hsl(${Math.round(Math.random() * 360)}, 100%, 30%)`;

  }

  async function getQuotes() {
    let response = await fetch('https://gist.githubusercontent.com/nasrulhazim/54b659e43b1035215cd0ba1d4577ee80/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json');
    quotes = await response.json();
    quotes = quotes["quotes"];
    render();
  }

  function render() {
    changeMainColor(getRandomColor());
    setRandomQuote();
    setTweetBtn();
    setTumblrBtn();
  }

  function setRandomQuote() {
    let index;
    do {
      index = Math.round(quotes.length * Math.random());
    } while (currentIndex == index);
    currentIndex = index;

    setQuote(quotes[index].quote, quotes[index].author);
  }

  function setQuote(quoteValue, authorValue) {
    currentQuote = quoteValue;
    currentAuthor = authorValue;
    text.innerText = currentQuote;
    author.innerText = '- ' + currentAuthor;
  }

  function setTweetBtn() {
    tweetBtn.setAttribute('href', makeTweetUrl('quotes', currentQuote + ' ' + currentAuthor));
  }

  function setTumblrBtn() {
    tumblrBtn.setAttribute('href', makeQuoteTumblrUrl('quotes', currentQuote, currentAuthor));
  }

  function makeTweetUrl(tags, content) {
    return "https://twitter.com/intent/tweet?&hashtags=" + tags + "&text=" + encodeURIComponent(content);
  }

  function makeQuoteTumblrUrl(tags, content, caption) {
    return "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&tags=" + tags + "&content=" + encodeURIComponent(content) + "&caption=" + caption + "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button";
  }
});