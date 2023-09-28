import * as yup from 'yup';

export default (url, watchedState, urlLinks, input, form, i18n) => {
  /* eslint-disable no-param-reassign */
  yup.setLocale({
    mixed: {
      required: () => i18n.t('errors.required'),
      notOneOf: () => i18n.t('errors.shouldBeUnique'),
    },
    string: {
      url: () => i18n.t('errors.shouldBeValid'),
    },
  });

  const schema = yup.string()
    .required()
    .url()
    .notOneOf(urlLinks);

  return schema.validate(url)
    .then((validData) => {
      watchedState.form.data.urlLinks.push(validData);
      form.reset();
      input.focus();
      return validData;
    })
    .catch((error) => {
      watchedState.form.errors = [error.message];
      return Promise.reject(error);
    });
};
