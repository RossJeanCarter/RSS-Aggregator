export default (posts) => {
  const liArray = posts.map(({ id, title, link }) => {
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

    button.addEventListener('click', (e) => {
      const activeId = e.target.getAttribute('data-id');
      const { title: activeTitle, description: activeDescription } = posts
        .find((post) => post.id === activeId);
      const modalTitle = document.querySelector('.modal-title');
      const modalBody = document.querySelector('.modal-body');
      modalTitle.textContent = activeTitle;
      modalBody.textContent = activeDescription;
      const readButton = document.querySelector('.btn');
      readButton.href = link;
    });

    li.append(aElement, button);
    return li;
  });
  return liArray;
};
