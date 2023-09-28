// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import extractFeedsPosts from './extractFeedsPosts.js';

export default (rssUrl) => axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(rssUrl)}`)
  .then((response) => {
    const rssData = response.data.contents;
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(rssData, 'text/xml');
    const parsedData = extractFeedsPosts(xmlDoc);
    return parsedData;
  })
  .catch((error) => Promise.reject(error.message));
