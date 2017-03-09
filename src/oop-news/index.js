import ArticleRepository from './repositories/articleRepository';
import NewsCollection from './model/collection';
import NewsListView from './view/list';

export default class NewsComponent {
  constructor() {
    const articleRepository = new ArticleRepository();
    const interval = 2000;

    articleRepository.load().then((json) => {
      this.model = NewsCollection.fromJSON(json);

      this.view = new NewsListView({
        model: this.model
      });

      this.view.render();

      articleRepository.loadWithInterval(
        interval, promise => promise.then(
          json => this.model.update(json.articles)
        )
      );

      document.getElementById('app').appendChild(
        this.view.getRootEl()
      );
    });
  }
};
