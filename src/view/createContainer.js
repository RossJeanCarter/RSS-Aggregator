export default (titleText) => {
  const container = document.createElement('div');
  container.classList.add('card', 'border-0');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  cardBody.innerHTML = '';
  const cardTitle = document.createElement('h2');
  cardTitle.classList.add('card-title', 'h4');
  cardTitle.textContent = titleText;

  cardBody.append(cardTitle);
  container.append(cardBody);

  return container;
};
