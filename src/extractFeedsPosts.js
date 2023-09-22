export default (xmlDoc) => {
  const newPosts = [];
  const newFeeds = [];
  newFeeds.push( // запушили в feeds
    {
      id: Date.now().toString(),
      title: xmlDoc.querySelector('channel > title').textContent, // нашли title фида
      description: xmlDoc.querySelector('channel > description').textContent, // нашли desc фида
    },
  );
  let postIdCounter = 1;
  const postItems = xmlDoc.querySelectorAll('item'); // нашли все посты по селектору item
  postItems.forEach((item) => {
    newPosts.push({ // пушим в posts.
      id: Date.now().toString() + postIdCounter,
      feedsId: newFeeds[newFeeds.length - 1].id, // id фида, которому принадлежит этот сет из постов
      title: item.querySelector('title').textContent, // получаем title
      link: item.querySelector('link').textContent, // получаем линк
    });
    postIdCounter += 1;
  });

  return { // возвращаем объект с feeds и posts
    newPosts,
    newFeeds,
  };
};
