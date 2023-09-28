import _ from 'lodash';

export default (xmlDoc) => {
  const parsedPosts = [];
  const parsedFeeds = [];
  parsedFeeds.push(
    {
      id: Date.now().toString(),
      title: xmlDoc.querySelector('channel > title').textContent,
      description: xmlDoc.querySelector('channel > description').textContent,
    },
  );
  let postIdCounter = 1;
  const postItems = xmlDoc.querySelectorAll('item');

  postItems.forEach((item) => {
    parsedPosts.push({
      id: Date.now().toString() + postIdCounter,
      feedsId: _.last(parsedFeeds).id,
      title: item.querySelector('title').textContent,
      description: item.querySelector('description').textContent,
      link: item.querySelector('link').textContent,
    });
    postIdCounter += 1;
  });
  return { parsedFeeds, parsedPosts };
};
