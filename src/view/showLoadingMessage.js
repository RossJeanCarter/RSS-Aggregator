/* eslint-disable no-param-reassign */
export default (notificationBox, i18n) => {
  notificationBox.textContent = i18n.t('submit');
  notificationBox.classList.remove('text-danger');
  notificationBox.style.color = 'white';
};
