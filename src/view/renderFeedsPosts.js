import fillContainer from './container.js';
import renderLiFeeds from './renderLiFeeds.js';
import renderLiPosts from './renderLiPosts.js';

export default (data, i18n, watchedState) => {
  const { parsedFeeds, parsedPosts } = data;
  const { feeds, posts } = watchedState.form.data;

  const feedsFiltered = parsedFeeds.filter((feed) => !feeds
    .some((existingFeed) => existingFeed.title === feed.title));

  const postsFiltered = parsedPosts.filter((post) => !posts
    .some((existingPost) => existingPost.title === post.title));

  const feedsDiv = document.querySelector('.feeds');
  const postsDiv = document.querySelector('.posts');
  const existingDiv = document.querySelector('.card');

  if (!existingDiv) {
    feedsDiv.append(fillContainer('feeds', parsedFeeds, i18n, renderLiFeeds));
    postsDiv.append(fillContainer('posts', parsedPosts, i18n, renderLiPosts));
  } else {
    const feedsUl = feedsDiv.querySelector('ul');
    const postsUl = postsDiv.querySelector('ul');
    feedsUl.prepend(...renderLiFeeds(feedsFiltered));
    postsUl.prepend(...renderLiPosts(postsFiltered));
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
