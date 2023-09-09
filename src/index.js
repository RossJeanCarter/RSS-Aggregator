import './styles.scss';
import 'bootstrap';
import View from './view.js';
import validateUrl from './validator.js';

const state = {
  inputForm: {
    valid: true,
    data: {
      urlLinks: [],
    },
    errors: [],
  },
};

const view = new View();
view.init(state);

const { form, input, watchedState } = view;
const { urlLinks } = state.inputForm.data;

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const url = formData.get('url');

  validateUrl(url, watchedState, urlLinks, input, form);
});
