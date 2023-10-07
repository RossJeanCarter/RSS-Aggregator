// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import extractFeedsPosts from './extractFeedsPosts.js';

export default (rssUrl, i18n) => axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(rssUrl)}`)
  .then((response) => {
    const rssData = response.data.contents;
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(rssData, 'text/xml');
    const parsedData = extractFeedsPosts(xmlDoc);
    return { parsedData, rssUrl };
  })
  .catch(() => {
    const error = new Error(i18n.t('errors.shouldContainRss'));
    return Promise.reject(error);
  });
