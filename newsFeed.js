$( document ).ready(function(){
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
    return div;
  };

  const createNewsItemsList = (apiReturnArray) => {
    const div = document.createElement('div');
    apiReturnArray.forEach((item) => {
      !item.title ? item.title = 'Gilled Cheese!' : null;
      const newsItem = createNewsItem(item.title, item.text);
      div.appendChild(newsItem);
    });
    return div;
  };

  const renderNewsItems = (toRender, selector) => {
    document.querySelector(selector).appendChild(toRender);
  };

  const isOverflow = (node) => {
    const ratio = node.scrollHeight / window.innerHeight;
    return ratio > 0.07125;
  };

  const createOverflowButton = () => {
    const showMore = document.createElement('button');
    showMore.textContent = 'Show More';
    showMore.addEventListener('click', textClamp, false);
    return showMore;
  };

  const appendOverflowButton = () => {
    const contentArray = Array.from(document.getElementsByClassName('story'));
    contentArray.forEach((node) => {
      if (isOverflow(node)) {
        const button = createOverflowButton(node);
        node.parentNode.insertBefore(button, null);
      }
    });
  };

  const animateLoader = () => {
    document.querySelector('.loader img').classList.add('bike');
  };

  const removeLoader = () => {
    const loader = document.querySelector('.loader');
    loader.parentNode.removeChild(loader);
  };

  const success = (data) => {
    renderNewsItems(createNewsItemsList(data.posts), '.main');
    appendOverflowButton();
    animateLoader();
    setTimeout(() =>{ removeLoader() }, 3000)};

  const initialize = () => {
    const WEBHOSE_ENDPOINT = "https://webhose.io/search?token=b758fae4-ecb1-4893-bafb-d50474d6e9fa&format=json&q=Grilled%20Cheese%20Sandwich&size=10";

    $.get(WEBHOSE_ENDPOINT, (data) => {
      success(data);
    });
  };

  initialize();
});
