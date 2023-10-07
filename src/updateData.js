export default (parser, watchedState, urlLinks) => {
  const updateData = () => {
    Promise.all(urlLinks.map((rssUrl) => parser(rssUrl, watchedState)))
      .then((dataArray) => {
        dataArray.forEach(({ parsedData }) => {
          // eslint-disable-next-line no-param-reassign
          const { newData } = watchedState.form.data;
          newData.push(parsedData);
        });
      })
      .catch((error) => {
        console.error('Ошибка при обновлении данных:', error);
      });
    setTimeout(updateData, 5000);
  };
  updateData();
};
