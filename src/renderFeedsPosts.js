import fillContainer from './container.js';
import renderLiFeeds from './renderLiFeeds.js';
import renderLiPosts from './renderLiPosts.js';

export default (data, i18n, watchedState) => {
  const { newFeeds, newPosts } = data;
  const { feeds, posts } = watchedState.inputForm.data;

  //  если в feeds уже есть элемент с title как в newsfeed не добавляем
  const feedsFiltered = newFeeds.filter((newFeed) => !feeds
    .some((existingFeed) => existingFeed.title === newFeed.title));

  const postsFiltered = newPosts.filter((newPost) => !posts
    .some((existingPost) => existingPost.title === newPost.title));

  const feedsDiv = document.querySelector('.feeds'); // главный контейнер feeds
  const postsDiv = document.querySelector('.posts'); // главный контейнер posts
  const existingDiv = document.querySelector('.card');

  if (!existingDiv) { // если дива с классом card не существует, то
    feedsDiv.append(fillContainer('feeds', newFeeds, i18n, renderLiFeeds));
    postsDiv.append(fillContainer('posts', newPosts, i18n, renderLiPosts));
  } else {
    const feedsUl = feedsDiv.querySelector('ul');
    const postsUl = postsDiv.querySelector('ul');

    feedsUl.prepend(...renderLiFeeds(feedsFiltered));
    postsUl.prepend(...renderLiPosts(postsFiltered));
  }
  posts.push(...newPosts);
  feeds.push(...newFeeds); // добавляем новые данные в feeds
};
