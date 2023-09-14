import './styles.scss';
import 'bootstrap';
import i18next from 'i18next';
import View from './view.js';
import validateUrl from './validator.js';
import ruTranslation from './locales/ru.js';

const i18n = i18next.createInstance();
i18n.init({
  lng: 'ru',
  resources: {
    ru: ruTranslation,
  },
});

// состояние
const state = {
  inputForm: {
    valid: true,
    data: {
      urlLinks: [],
    },
    errors: [],
  },
};

const view = new View(i18n); // класс с конструктором

view.init(state); // запускаем переменные форм, инпут и создаем watchedstate

const { form, input, watchedState } = view; // выделяем переменные
const { urlLinks } = state.inputForm.data;

form.addEventListener('submit', (e) => { // обработчик на форму, при сабмите - валидация
  e.preventDefault();

  const formData = new FormData(e.target);
  const url = formData.get('url');
  console.log('suka');
  validateUrl(url, watchedState, urlLinks, input, form, i18n); // валидатор
});
