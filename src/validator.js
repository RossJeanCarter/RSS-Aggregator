import * as yup from 'yup';

export default (url, watchedState, urlLinks, input, form, i18n) => {
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
    .required()
    .url()
    .notOneOf(urlLinks, i18n.t('errors.shouldBeUnique'));

  return schema.validate(url)
    .then((validData) => {
      watchedState.inputForm.valid = true;
      watchedState.inputForm.data.urlLinks.push(validData);
      form.reset();
      input.focus();
      return validData;
    })
    .catch((error) => {
      watchedState.inputForm.valid = false;
      watchedState.inputForm.errors = [error.message];
      return Promise.reject(error);
    });
};
