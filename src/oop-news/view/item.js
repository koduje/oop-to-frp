export default class NewsItemView {
  constructor({ model }) {
    this.model = model;
  }

  render() {
    if (!this.rootEl) {
      const articleFragment = document.createDocumentFragment();
      const contentElement = document.createElement('article');
      this.titleElement = document.createElement('h1');
      this.authorElement = document.createElement('h2');
      this.linkElement = document.createElement('a');

      this.titleElement.appendChild(this.linkElement);
      contentElement.appendChild(this.authorElement);
      contentElement.appendChild(this.titleElement);
      articleFragment.appendChild(contentElement);

      this.rootEl = articleFragment;
      this.buildData();
    }

    return this;
  }

  update() {
    this.buildData();
  }

  buildData() {
    const { title, author, url } = this.model;

    this.linkElement.textContent = title;
    this.linkElement.href = url;
    this.authorElement.textContent = author;

    return this;
  }

  getRootEl() {
    return this.rootEl;
  }
};
