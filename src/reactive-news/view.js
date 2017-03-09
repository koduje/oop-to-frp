import h from 'virtual-dom/h';

const createArticle = ({ title, author, url }) => h('article', [
  h('h2', String(author)),
  h('h1',
    h('a', {
      href: url
    }, String(title))
   )
]);

const createArticles = articles => articles.map(createArticle);

export const getArticlesView$ = ({ source$ }) => source$
  .map(createArticles);
