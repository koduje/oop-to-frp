const theVergeNewsUrl = 'https://newsapi.org/v1/articles?source=the-verge';
const sortBy = '&sortBy=latest';
const apiKey = '&apiKey=ab6af4abea14464dabc6ea83b37fe92f';
const theVergeLatestNewsUrl = `${theVergeNewsUrl}${sortBy}${apiKey}`;

const fetchTheVergeNews = () => window.fetch(
  theVergeLatestNewsUrl
).then(response => response.json());

export default class ArticleRepository {
  load() {
    return fetchTheVergeNews();
  }

  loadWithInterval(interval, callback) {
    window.setInterval(
      () => callback(this.load()),
      interval
    );
  }
}
