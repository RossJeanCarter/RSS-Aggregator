import './styles.scss';
import 'bootstrap';
import i18next from 'i18next';
import View from './view/view.js';
import validateUrl from './utils/validator.js';
import ruTranslation from './locales/ru.js';
import parser from './utils/parser.js';
import updateData from './updateData.js';

const i18n = i18next.createInstance();
i18n.init({
  lng: 'ru',
  resources: {
    ru: ruTranslation,
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

const { form, input, watchedState } = view;
const { urlLinks, newData } = state.form.data;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const url = formData.get('url');
  validateUrl(url, watchedState, urlLinks, input, form, i18n)
    .then((rssUrl) => parser(rssUrl))
    .then((parsedData) => {
      newData.push(parsedData);
    })
    .then(() => {
      updateData(parser, watchedState, urlLinks);
    })
    .catch((error) => {
      watchedState.form.errors = [i18n.t('errors.shouldContainRss')];
      console.log('Форма невалидна', error);
    });
});
