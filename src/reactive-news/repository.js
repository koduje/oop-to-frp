import Rx from 'rxjs';

const theVergeNewsUrl = 'https://newsapi.org/v1/articles?source=the-verge';
const sortBy = '&sortBy=latest';
const apiKey = '&apiKey=ab6af4abea14464dabc6ea83b37fe92f';
const theVergeLatestNewsUrl = `${theVergeNewsUrl}${sortBy}${apiKey}`;

const fetchTheVergeNews = () => window.fetch(
  theVergeLatestNewsUrl
).then(response => response.json());

export const getNews$ = () => Rx.Observable
  .fromPromise(fetchTheVergeNews())
  .pluck('articles');

export const getNewsOnInterval$ = ({ intervalValue }) => Rx.Observable
  .interval(intervalValue)
  .startWith(-1)
  .flatMap(() => getNews$());
