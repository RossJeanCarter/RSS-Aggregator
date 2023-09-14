import * as yup from 'yup';

// вся асинхронная валидация тут
const validateUrl = (url, watchedState, urlLinks, input, form, i18n) => {
  /* eslint-disable no-param-reassign */

  yup.setLocale({
    mixed: {
      required: () => i18n.t('errors.required'),
      oneOf: () => i18n.t('errors.shouldBeUnique'),
    },
    string: {
      url: () => i18n.t('errors.shouldBeValid'),
    },
  });

  const schema = yup.string()
    .url()
    .notOneOf(urlLinks, i18n.t('errors.shouldBeUnique'))
    .required();

  schema.validate(url)
    .then((validData) => {
      watchedState.inputForm.valid = true;
      watchedState.inputForm.data.urlLinks.push(validData);
      form.reset();
      input.focus();
    })
    .catch((error) => {
      watchedState.inputForm.valid = false;
      watchedState.inputForm.errors = [error.message];
      console.log(error.message);
    });
};

export default validateUrl;
