import * as yup from 'yup';

export default (url, watchedState, urlLinks, input, form, i18n, parser) => {
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

  const schema = yup.string().required().url().notOneOf(urlLinks);

  return schema.validate(url)
    .then((validUrl) => {
      const validData = parser(validUrl, i18n); // сократить до parser
      return validData;
    })
    .then((validData) => {
      const { parsedData, rssUrl } = validData;
      urlLinks.push(rssUrl);
      form.reset();
      input.focus();
      return parsedData;
    })
    .catch((error) => {
      watchedState.form.errors = [error.message];
      return Promise.reject(error);
    });
};
