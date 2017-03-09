import Rx from 'rxjs';
import '../shared.js';

export const getNewsModel$ = ({ source$ }) => source$
  .flatMap(articles => Rx.Observable.from(articles))
  .distinct(article => article.title)
  .bufferCountOrTime(10, 2000)
  .filter(articles => articles.length > 0)
  .scan(
    (savedArticles, newArticles) => savedArticles.concat(newArticles)
  );
