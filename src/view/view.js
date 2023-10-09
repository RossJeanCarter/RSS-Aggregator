import onChange from 'on-change';
import _ from 'lodash';
import renderFeedsPosts from './renderFeedsPosts.js';

class View {
  constructor(i18n) {
    this.form = null;
    this.input = null;
    this.watchedState = null;
    this.notificationBox = null;
    this.i18n = i18n;
  }

  init(state) {
    this.form = document.querySelector('.rss-form');
    this.input = document.getElementById('url-input');
    this.watchedState = this.createWatcher(state);
    this.notificationBox = document.querySelector('.text-danger');
  }

  renderError() {
    const [error] = this.watchedState.form.errors;
    this.input.style.border = '2px solid red';
    this.notificationBox.textContent = error;
    this.notificationBox.classList.add('text-danger');
  }

  renderValid() {
    this.input.style.border = '';
    this.notificationBox.classList.remove('text-danger');
    this.notificationBox.style.color = 'green';
    this.notificationBox.textContent = this.i18n.t('common.validated');
  }

  renderLink() {
    const { clickedPosts } = this.watchedState.form.uiState;
    const { id } = _.last(clickedPosts);
    const postToChange = document.querySelector(`[data-id="${id}"]`);
    postToChange.classList.remove('fw-bold');
    postToChange.classList.add('fw-normal');
    postToChange.style.color = 'grey';
  }

  renderUi() {
    const { newData } = this.watchedState.form.data;
    const data = _.last(newData);
    renderFeedsPosts(data, this.i18n, this.watchedState);
  }

  createWatcher(state) {
    return onChange(state, (path) => {
      switch (path) {
        case 'form.errors': return this.renderError();
        case 'form.data.urlLinks': return this.renderValid();
        case 'form.uiState.clickedPosts': return this.renderLink();
        case 'form.data.newData': return this.renderUi();
        default: return undefined;
      }
    });
  }
}

export default View;
