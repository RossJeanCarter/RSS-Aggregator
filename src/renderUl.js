import createContainer from './container.js';

export default (title, type, i18n, renderLiFeeds) => {
  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');
  const container = createContainer(i18n.t(title));
  ul.append(...renderLiFeeds(type));
  container.append(ul);
  return container;
};
