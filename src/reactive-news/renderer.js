import h from 'virtual-dom/h';
import diff from 'virtual-dom/diff';
import patch from 'virtual-dom/patch';
import createElement from 'virtual-dom/create-element';

const initalRender = () => h('div', [
  h('h1', '... loading')
]);

export const getRenderer$ = ({ source$, parentElement }) => {
  let oldTree = initalRender();
  let rootNode = createElement(oldTree);

  const update = _tree => {
    const newTree = _tree;
    const patches = diff(oldTree, newTree);
    rootNode = patch(rootNode, patches);
    oldTree = newTree;
  };

  parentElement.appendChild(rootNode);

  return source$.forEach(
    newsTree => {
      const appTree = h('section', {
        id: 'the-verge-news'
      }, newsTree);

      update(appTree);
    }
  );
};
