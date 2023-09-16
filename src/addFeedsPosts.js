const bigFeed = [];
const bigPosts = [];
export default (xmlDoc) => {
  const feeds = [];
  const posts = [];
  feeds.push(
    {
      id: Date.now().toString(),
      title: xmlDoc.querySelector('channel > title').textContent,
      description: xmlDoc.querySelector('channel > description').textContent,
    },
  );
  let postIdCounter = 1;
  const postItems = xmlDoc.querySelectorAll('item');
  postItems.forEach((item) => {
    posts.push({
      id: Date.now().toString() + postIdCounter,
      feedsId: feeds[feeds.length - 1].id,
      title: item.querySelector('title').textContent,
      link: item.querySelector('link').textContent,
    });
    postIdCounter += 1;
  });
  bigFeed.push(...feeds);
  bigPosts.push(...posts);

  return {
    feeds,
    posts,
  };
};
