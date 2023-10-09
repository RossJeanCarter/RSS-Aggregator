import fillContainer from './container.js';
import renderLiFeeds from './renderLiFeeds.js';
import renderLiPosts from './renderLiPosts.js';

export default (data, i18n, watchedState) => {
  const { parsedFeeds, parsedPosts } = data;
  const { feeds, posts } = watchedState.form.data;

  const filterData = (parsedData, collection) => parsedData.filter((item) => !collection
    .some((existingFeed) => existingFeed.title === item.title));

  const feedsFiltered = filterData(parsedFeeds, feeds);
  const postsFiltered = filterData(parsedPosts, posts);

  const feedsDiv = document.querySelector('.feeds');
  const postsDiv = document.querySelector('.posts');
  const existingDiv = document.querySelector('.card');

  if (!existingDiv) {
    feedsDiv.append(fillContainer('common.feeds', parsedFeeds, i18n, renderLiFeeds));
    postsDiv.append(fillContainer('common.posts', parsedPosts, i18n, renderLiPosts));
  } else {
    const feedsUl = feedsDiv.querySelector('ul');
    const postsUl = postsDiv.querySelector('ul');
    feedsUl.prepend(...renderLiFeeds(feedsFiltered));
    postsUl.prepend(...renderLiPosts(postsFiltered, i18n));
  }
  feeds.push(...feedsFiltered);
  posts.push(...postsFiltered);

  const links = document.querySelectorAll('.list-group-item');
  links.forEach((item) => {
    item.addEventListener('click', () => {
      const clickedItem = item.querySelector('a');
      const clickedId = clickedItem.getAttribute('data-id');
      const clickedPost = watchedState.form.data.posts
        .find((post) => post.id === clickedId);
      const { clickedPosts } = watchedState.form.uiState;
      clickedPosts.push(clickedPost);
    });
  });
};
