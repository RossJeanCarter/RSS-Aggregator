import * as yup from 'yup';

export default (url, watchedState, urlLinks, input, form, i18n) => {
  /* eslint-disable no-param-reassign */
  yup.setLocale({ // установка локали
    mixed: {
      required: () => i18n.t('errors.required'), // результат вызова функции - текст из ru.js
      notOneOf: () => i18n.t('errors.shouldBeUnique'),
    },
    string: {
      url: () => i18n.t('errors.shouldBeValid'),
    },
  });

  const schema = yup.string() // определение какие параметры будут проверяться
    .required()
    .url()
    .notOneOf(urlLinks);

  return schema.validate(url) // запуск процесса валидации
    .then((validData) => { // validData = url, который ввели
      watchedState.inputForm.valid = true; // валидность формы true меняем
      watchedState.inputForm.data.urlLinks.push(validData); // добавляем url в urlLinks в state
      form.reset();
      input.focus();
      return validData; // возврат url, и в целом возврат schema, чтобы дальше работать
    })
    .catch((error) => { // ловим ошибку
      watchedState.inputForm.valid = false; // меняем состояние false
      watchedState.inputForm.errors = [error.message]; // добавляем в state errors ошибку.
      return Promise.reject(error); // возврат промиса с ошибкой в index.js чтобы дальше обработать.
    });
};
