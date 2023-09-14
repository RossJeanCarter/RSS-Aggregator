import onChange from 'on-change';
// вся отрисовка тут
class View {
  constructor(i18n) {
    this.form = null;
    this.input = null;
    this.watchedState = null;
    this.divMessage = null;
    this.i18n = i18n;
  }

  init(state) {
    this.form = document.querySelector('.rss-form');
    this.input = document.getElementById('url-input');
    this.watchedState = this.createWatcher(state);
    this.divMessage = document.querySelector('.text-danger');
  }

  renderError() {
    const { errors } = this.watchedState.inputForm;
    this.input.style.border = '2px solid red';
    const [error] = errors;
    this.divMessage.textContent = error;
    this.divMessage.classList.add('text-danger');
  }

  renderValid() {
    this.input.style.border = '';
    this.divMessage.textContent = '';
    this.divMessage.classList.remove('text-danger');
    this.divMessage.style.color = 'green';
    this.divMessage.textContent = this.i18n.t('validated');
  }

  createWatcher(state) {
    return onChange(state, (path) => (path === 'inputForm.errors' ? this.renderError() : this.renderValid()));
  }
}

export default View;
