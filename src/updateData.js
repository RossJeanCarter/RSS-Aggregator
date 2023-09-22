export default (i18n, parser, watchedState, urlLinks, renderFeedsPosts) => {
  const updateData = () => {
    Promise.all(urlLinks.map((rssUrl) => parser(rssUrl, watchedState)))
      .then((dataArray) => {
        dataArray.forEach((data) => {
          renderFeedsPosts(data, i18n, watchedState);
        });
      })
      .catch((error) => {
        console.error('Ошибка при обновлении данных:', error);
      });
    setTimeout(updateData, 5000);
  };
  updateData();
};
