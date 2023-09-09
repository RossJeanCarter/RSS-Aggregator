import onChange from 'on-change';

class View {
  constructor() {
    this.form = null;
    this.input = null;
    this.watchedState = null;
  }

  init(state) {
    this.form = document.querySelector('.rss-form');
    this.input = document.getElementById('url-input');
    this.watchedState = this.createWatcher(state);
  }

  renderError() {
    this.input.style.border = '2px solid red';
  }

  renderValid() {
    this.input.style.border = '';
  }

  createWatcher(state) {
    return onChange(state, (path) => (path === 'inputForm.errors' ? this.renderError() : this.renderValid()));
  }
}

export default View;
