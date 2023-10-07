import './styles.scss';
import 'bootstrap';
import i18next from 'i18next';
import View from './view/view.js';
import validateUrl from './utils/validator.js';
import ruTranslation from './locales/ru.js';
import enTranslation from './locales/en.js';
import parser from './utils/parser.js';
import updateData from './updateData.js';
import showLoadingMessage from './view/showLoadingMessage.js';

const defaultLanguage = 'ru';

const i18n = i18next.createInstance();
i18n.init({
  lng: defaultLanguage,
  resources: {
    ru: ruTranslation,
    en: enTranslation,
  },
});

const state = {
  form: {
    data: {
      urlLinks: [],
      feeds: [],
      posts: [],
      newData: [],
    },
    errors: [],
    uiState: {
      clickedPosts: [],
    },
  },
};

const view = new View(i18n);
view.init(state);

const {
  form, input, watchedState, notificationBox,
} = view;
const { urlLinks, newData } = watchedState.form.data;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  showLoadingMessage(notificationBox, i18n);
  const formData = new FormData(e.target);
  const url = formData.get('url');
  validateUrl(url, watchedState, urlLinks, input, form, i18n, parser)
    .then((parsedData) => {
      newData.push(parsedData);
    })
    .then(() => {
      updateData(parser, watchedState, urlLinks);
    })
    .catch((error) => {
      console.log('Форма невалидна', error);
    });
});
