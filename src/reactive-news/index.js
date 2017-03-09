import { getNewsOnInterval$ } from './repository.js';
import { getNewsModel$ } from './model.js';
import { getArticlesView$ } from './view.js';
import { getRenderer$ } from './renderer.js';

const newsComponent = () => {
  const repository$ = getNewsOnInterval$({ intervalValue: 2000 });
  const model$ = getNewsModel$({ source$: repository$ });
  const view$ = getArticlesView$({ source$: model$ });
  const renderer$ = getRenderer$({
    source$: view$,
    parentElement: document.getElementById('app')
  });

  return {
    repository$,
    model$,
    view$,
    renderer$
  };
};

export default newsComponent;
