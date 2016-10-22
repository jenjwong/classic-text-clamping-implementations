$( document ).ready(function() {

  const walkDomSiblings = (node, selector, direction) => {
    let currentNode = node;
    let isFound = false;
    while (!isFound) {
      if (direction === 'up') {
        currentNode = currentNode.previousElementSibling;
      } else {
        currentNode = currentNode.nextElementSibling;
      }
      if (Array.from(currentNode.classList).indexOf(selector) > -1) {
        isFound = true;
      }
    }
    return currentNode;
  };

  const textClamp = (e) => {
    const node = walkDomSiblings(e.target, 'story', 'up');
    node.classList.toggle('text-clamp-on');
    if (e.target.textContent === 'Show More') {
      e.target.textContent = 'Show Less';
    } else {
      e.target.textContent = 'Show More';
    }
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
    story.textContent = storyText;
    div.appendChild(titleDiv);
    div.appendChild(story);
    const showMore = document.createElement('button');
    showMore.textContent = 'Show More';
    showMore.addEventListener('click', textClamp, false);
    div.appendChild(showMore);
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
