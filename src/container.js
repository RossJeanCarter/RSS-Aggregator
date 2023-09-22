import createContainer from './createContainer.js';

export default (title, type, i18n, renderLi) => {
  const ul = document.createElement('ul'); // создали ul
  ul.classList.add('list-group', 'border-0', 'rounded-0');
  const container = createContainer(i18n.t(title)); // создали контейнер с title feeds или posts
  ul.append(...renderLi(type)); // в ul добавили список из li
  container.append(ul);
  return container;// возвращаем контейнер
};
