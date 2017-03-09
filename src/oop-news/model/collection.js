import NewsItemModel from './item';

export default class NewsCollection {
  constructor() {
    this.articles = [];
    this.observers = [];
  }

  static fromJSON(json) {
    const collection = new NewsCollection();
    collection.pushArticles(json.articles);
    return collection;
  }

  pushArticles(articles) {
    articles = articles
      .map(article => new NewsItemModel(article));

    this.articles.push(...articles);

    this.observers.forEach(observer => observer(articles));
  }

  update(articles) {
    const isTitleNew = newArticle => this.articles.every(
      savedArticle => !savedArticle.isDuplicate(newArticle)
    );

    const distinctArticles = articles.filter(
      isTitleNew
      // The same as:
      // article => isTitleNew(article)
    );

    if (distinctArticles.length > 0) {
      this.pushArticles(distinctArticles);
    }
  }

  observe(observer) {
    this.observers.push(observer);
  }
};
