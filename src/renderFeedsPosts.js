import renderUl from './renderUl.js';
import renderLiFeeds from './renderLiFeeds.js';
import renderLiPosts from './renderLiPosts.js';

export default (data, i18n) => {
  const { feeds, posts } = data;

  const feedsDiv = document.querySelector('.feeds');
  const postsDiv = document.querySelector('.posts');

  const existingDiv = document.querySelector('.card');

  if (!existingDiv) {
    feedsDiv.append(renderUl('feeds', feeds, i18n, renderLiFeeds));
    postsDiv.append(renderUl('posts', posts, i18n, renderLiPosts));
  } else {
    const feedsUl = feedsDiv.querySelector('ul');
    const postsUl = postsDiv.querySelector('ul');
    feedsUl.prepend(...renderLiFeeds(feeds));
    postsUl.prepend(...renderLiPosts(posts));
  }
};
