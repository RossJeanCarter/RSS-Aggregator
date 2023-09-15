import './styles.scss';
import 'bootstrap';
import i18next from 'i18next';
import View from './view.js';
import validateUrl from './validator.js';
import ruTranslation from './locales/ru.js';
import parser from './parser.js';
import renderFeedsPosts from './renderFeedsPosts.js';

const i18n = i18next.createInstance();
i18n.init({
  lng: 'ru',
  resources: {
    ru: ruTranslation,
  },
});

const state = {
  inputForm: {
    valid: true,
    data: {
      urlLinks: [],
    },
    errors: [],
  },
};

const view = new View(i18n);
view.init(state);

const { form, input, watchedState } = view;
const { urlLinks } = state.inputForm.data;

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const url = formData.get('url');
  validateUrl(url, watchedState, urlLinks, input, form, i18n) // валидный url (ссылка) в промисе
    .then((rssUrl) => parser(rssUrl)) // ссылку url в парсер
    .then((data) => {
      renderFeedsPosts(data, i18n); // функция наполняет div на основе данных в объекта feed posts
    })
    .catch((error) => {
      console.log('Форма невалидна, нет смысла продолжать', error);
    });
});
