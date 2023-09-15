import createContainer from './container.js';

export default (data, i18n) => {
  const { posts, feeds } = data;

  const postsDiv = document.querySelector('.posts');
  const feedsDiv = document.querySelector('.feeds');

  const { container: postsContainer, ul: postsUl } = createContainer(i18n.t('posts'));
  const { container: feedsContainer, ul: feedsUl } = createContainer(i18n.t('feeds'));

  posts.forEach(({ id, title, link }) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');

    const aElement = document.createElement('a');
    aElement.classList.add('fw-bold');
    aElement.href = link;
    aElement.textContent = title;
    aElement.target = '_blank';
    aElement.rel = 'noopener noreferrer';
    aElement.setAttribute('data-id', id);

    const button = document.createElement('button');
    button.type = 'button';
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    button.setAttribute('data-id', id);
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#modal');
    button.textContent = 'Просмотр';

    li.append(aElement, button);
    postsUl.appendChild(li);
  });

  feeds.forEach(({ title, description }) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'border-0', 'border-end-0');

    const feedTitle = document.createElement('h3');
    feedTitle.classList.add('h6', 'm-0');
    feedTitle.textContent = title;

    const feedDesc = document.createElement('p');
    feedDesc.classList.add('m-0', 'small', 'text-black-50');
    feedDesc.textContent = description;

    li.append(feedTitle, feedDesc);
    feedsUl.appendChild(li);
  });

  postsDiv.prepend(postsContainer);
  feedsDiv.prepend(feedsContainer);
};
