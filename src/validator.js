import * as yup from 'yup';

const validateUrl = (url, watchedState, urlLinks, input, form) => {
  /* eslint-disable no-param-reassign */
  const schema = yup.string().url('Введите корректный URL')
    .notOneOf(urlLinks, 'URL уже существует')
    .required('Поле обязательно для заполнения');

  schema.validate(url)
    .then((validData) => {
      watchedState.inputForm.valid = true;
      watchedState.inputForm.data.urlLinks.push(validData);
      form.reset();
      input.focus();
    })
    .catch((error) => {
      watchedState.inputForm.valid = false;
      watchedState.inputForm.errors.push(error.message);
    });
};

export default validateUrl;
