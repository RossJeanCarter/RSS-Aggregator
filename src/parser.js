// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import extractFeedsPosts from './extractFeedsPosts.js';

export default (rssUrl, watchedState) => axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(rssUrl)}`)
  .then((response) => {
    const rssData = response.data.contents; // получаем данные из response (ответ от axios)
    const parser = new DOMParser(); // создаем парсер с методами
    const xmlDoc = parser.parseFromString(rssData, 'text/xml'); // получили DOM дерево RSS.
    const dataAdded = extractFeedsPosts(xmlDoc, watchedState); // передаём это дерево, разделим
    // на посты и фиды

    return dataAdded; // возврат {feeds: [данные], posts: [данные]}
  })
  .catch((error) => {
    console.log('Ошибка загрузки', error);
  });
