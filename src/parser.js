// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import addFeedsPosts from './addFeedsPosts.js';

export default (rssUrl) => axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(rssUrl)}`)
  .then((response) => {
    const rssData = response.data.contents;
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(rssData, 'text/xml'); // получили DOM дерево RSS.
    const dataAdded = addFeedsPosts(xmlDoc); // передаём это дерево, где мы разделим на посты и фиды
    return dataAdded; // возврат объекта с двумя массивами из объектов постов и фидов
  })
  .catch((error) => {
    console.log('Ошибка загрузки', error);
  });
