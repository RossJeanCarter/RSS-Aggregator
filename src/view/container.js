import createContainer from './createContainer.js';

export default (title, data, i18n, renderLi) => {
  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');
  const container = createContainer(i18n.t(title));
  ul.append(...renderLi(data, i18n));
  container.append(ul);
  return container;
};
