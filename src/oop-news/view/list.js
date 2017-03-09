import NewsItemView from './item.js';

export default class NewsListView {
  constructor({ model }) {
    this.model = model;

    // Observe data
    this.model.observe(this.update.bind(this));
  }

  render() {
    if (!this.rootEl) {
      const listElement = document.createElement('section');
      listElement.id = 'the-verge-news';
      this.rootEl = listElement;

      this.buildData();
    }
  }

  buildData(articles) {
    articles = articles || this.model.articles;

    articles.forEach(itemModel => {
      const article = new NewsItemView({ model: itemModel });
      this.getRootEl().appendChild(article.render().getRootEl());
    });

    return this;
  }

  update(newArticles) {
    this.buildData(newArticles);
  }

  getRootEl() {
    return this.rootEl;
  }
};
