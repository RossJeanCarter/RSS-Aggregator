import './styles.scss';
import 'bootstrap';
import i18next from 'i18next';
import View from './view.js';
import validateUrl from './validator.js';
import ruTranslation from './locales/ru.js';
import parser from './parser.js';
import renderFeedsPosts from './renderFeedsPosts.js';
import updateData from './updateData.js';

// инициализация библиотеки переводов
const i18n = i18next.createInstance();
i18n.init({
  lng: 'ru',
  resources: {
    ru: ruTranslation,
  },
});

// начальное состояние
const state = {
  inputForm: {
    valid: true,
    data: {
      urlLinks: [], // каждые 5 секунда проверка всех urlLinks, запросы через parser.
      feeds: [],
      posts: [],
    },
    errors: [],
  },
};
// создаём класс View, отвечает за отображение, watchedstate
const view = new View(i18n);
view.init(state); // инициализируем метод init, создаётся watchedstate и основные элементы для работ
// получаем элементы
const { form, input, watchedState } = view;
const { urlLinks } = state.inputForm.data;

// при отправки формы, внутри обработчика происходит следующее.
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const url = formData.get('url'); // получили URL, который ввели
  validateUrl(url, watchedState, urlLinks, input, form, i18n) // валидный url (ссылка) в промисе,
  // либо ошибка в промисе
  // теперь в parser нужно сделать запрос по url для получения данных
    .then((rssUrl) => parser(rssUrl, watchedState)) // объект {feeds, posts}
    .then((data) => {
      // передаем {feeds, posts}  в renderFeedsPosts
      renderFeedsPosts(data, i18n, watchedState); // функция наполняет div на основе данных
      // в объекте feed posts
    })
    .then(() => {
      updateData(i18n, parser, watchedState, urlLinks, renderFeedsPosts); // обновляем данные
      // каждые 5 сек
    })
    .catch((error) => {
      console.log('Форма невалидна, нет смысла продолжать', error);
    });
});
