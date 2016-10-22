$( document ).ready(function() {

  const textClamp = (e) => {
    e.target.classList.toggle('text-clamp-on');
  };

  const createNewsItem = (titleText, storyText) => {
    const div = document.createElement('div');
    div.className = 'container';
    const titleDiv = document.createElement('div');
    const title = document.createElement('h1');
    title.className = 'title';
    title.textContent = titleText;
    titleDiv.appendChild(title);
    const story = document.createElement('p');
    story.className = 'story';
    story.classList.add('text-clamp-on');
    story.addEventListener('click', textClamp, false);
    story.textContent = storyText;
    div.appendChild(titleDiv);
    div.appendChild(story);
    return div;
  };

  const newsItemsEl = (apiReturnArray) => {
    const div = document.createElement('div');
    apiReturnArray.forEach((item) => {
      const newsItem = createNewsItem(item.title, item.text);
      div.appendChild(newsItem);
    });
    return div;
  };

  const renderNewsItems = (toRender, selector) => {
    document.querySelector(selector).appendChild(toRender);
  };

  const success = (data) => {
    renderNewsItems(newsItemsEl(data.posts), '.main');
  };


  const initialize = () => {
    const WEBHOSE_ENDPOINT = "https://webhose.io/search?token=b758fae4-ecb1-4893-bafb-d50474d6e9fa&format=json&q=Grilled%20Cheese%20Sandwich";
    $.get(WEBHOSE_ENDPOINT, function( data ) {
      success(data);
    });
  };

  initialize();
});
