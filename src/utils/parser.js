export default (rssData, i18n) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(rssData, 'text/xml');
  const rootTagName = xmlDoc.documentElement.tagName.toLowerCase();
  if (rootTagName !== 'rss') throw new Error(i18n.t('errors.shouldContainRss'));

  const itemsElements = xmlDoc.querySelectorAll('item');

  const items = [...itemsElements].map((item) => {
    const title = item.querySelector('title').textContent;
    const description = item.querySelector('description').textContent;
    const link = item.querySelector('link').textContent;
    return { title, description, link };
  });

  const parsedData = {
    title: xmlDoc.querySelector('channel > title').textContent,
    description: xmlDoc.querySelector('channel > description').textContent,
    items,
  };
  return parsedData;
};
