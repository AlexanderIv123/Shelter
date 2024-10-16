// Slider-Carusel

const checkScreenWidth = () => {
  if (window.innerWidth > 1279) {
    return 3;
  } if (window.innerWidth > 767) {
    return 2;
  }
  return 1;
};

const conditions = {
  current: [],
  previous: [],
  direction: null,
};

const fillCurrentArr = (n, obj) => {
  const newObj = structuredClone(obj);
  while (newObj.current.length < n) {
    const rundomNum = Math.floor(Math.random() * 8);
    if (!newObj.current.includes(rundomNum) && !newObj.previous.includes(rundomNum)) {
      newObj.current.push(rundomNum);
    }
  }
  return newObj;
};

const createPetCard = (pet) => {
  const card = document.createElement('div');
  const picture = document.createElement('img');
  const name = document.createElement('h5');
  const button = document.createElement('button');
  card.classList.add('friend-card');
  picture.src = `./assets/${pet.name}.png`;
  name.classList.add('friend-card-text');
  name.textContent = pet.name;
  button.classList.add('button', 'friend-card-button');
  button.textContent = 'Learn more';
  card.append(picture);
  card.append(name);
  card.append(button);
  return card;
};

const block = document.querySelector('.friends-block-pictures');

export const showCards = (petsArr, currArr, blockPictures) => {
  Array.from(blockPictures.children).forEach((el) => el.remove());
  currArr.forEach((el) => {
    blockPictures.append(createPetCard(petsArr[el]));
  });
};

const resizeShowCards = (petsArr, obj) => {
  const cardsNum = checkScreenWidth();
  if (cardsNum !== obj.current.length) {
    const resizedConditions = fillCurrentArr(cardsNum, conditions);
    showCards(petsArr, resizedConditions.current, block);
    return resizedConditions;
  }
  return obj;
};

const turnCards = (direction, petsArr, obj) => {
  const turnedConditions = structuredClone(obj);
  let filledTurnedConditions;
  if (obj.direction === null || obj.direction === direction) {
    turnedConditions.direction = direction;
    turnedConditions.previous = turnedConditions.current;
    turnedConditions.current = [];
    filledTurnedConditions = fillCurrentArr(checkScreenWidth(), turnedConditions);
    showCards(petsArr, filledTurnedConditions.current, block);
  } else {
    turnedConditions.direction = direction;
    showCards(petsArr, turnedConditions.previous, block);
    const arr = turnedConditions.current;
    turnedConditions.current = turnedConditions.previous;
    turnedConditions.previous = arr;
    return turnedConditions;
  }
  return filledTurnedConditions;
};

const moveCards = (direction, petsArr, obj) => {
  const chanegedCondition = turnCards(direction, petsArr, obj);
  document.querySelector('.friend-card').classList.add(`animation-${direction}`);
  return chanegedCondition;
};

const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

export const SLIDER = (pets) => {
  let newConditions = fillCurrentArr(checkScreenWidth(), conditions);

  showCards(pets, newConditions.current, block);

  leftArrow.addEventListener('click', () => {
    newConditions = moveCards('left', pets, newConditions);
  });

  rightArrow.addEventListener('click', () => {
    newConditions = moveCards('right', pets, newConditions);
  });

  window.addEventListener('resize', () => {
    newConditions = resizeShowCards(pets, newConditions);
  });
};
