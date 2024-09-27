// BURGER
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');
const main = document.body.children[1];

const openNav = () => {
  nav.classList.toggle('nav-active');
  burger.classList.toggle('burger-active');
  main.classList.toggle('shadow-active');
  document.body.classList.toggle('overflow');
};

const scrolByNav = () => {
  nav.classList.remove('nav-active');
  burger.classList.remove('burger-active');
  main.classList.remove('shadow-active');
  document.body.classList.remove('overflow');
};

burger.addEventListener('click', openNav);
nav.addEventListener('click', scrolByNav);

// Slider-Carusel

async function requestJson() {
  const response = await fetch('./pets.json');
  const pets = await response.json();
  return pets;
}

const initApp = (pets) => {
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

  const fillCurrentArr = (n) => {
    while (conditions.current.length < n) {
      const rundomNum = Math.round(Math.random() * 7);
      if (!conditions.current.includes(rundomNum) && !conditions.previous.includes(rundomNum)) {
        conditions.current.push(rundomNum);
      }
    }
  };

  fillCurrentArr(checkScreenWidth());

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
    document.querySelector('.friends-block-pictures').append(card);
  };

  const showCards = (petsArr, arr) => {
    Array.from(document.querySelector('.friends-block-pictures').children).forEach((el) => el.remove());
    arr.forEach((el) => {
      createPetCard(petsArr[el]);
    });
  };

  showCards(pets, conditions.current);

  const resizeShowCards = () => {
    const cardsNum = checkScreenWidth();
    if (cardsNum !== conditions.current.length) {
      conditions.current = [];
      conditions.direction = null;
      fillCurrentArr(checkScreenWidth());
      showCards(pets, conditions.current);
    }
  };

  const turnCards = (direction) => {
    if (conditions.direction === null || conditions.direction === direction) {
      conditions.direction = direction;
      conditions.previous = conditions.current;
      conditions.current = [];
      fillCurrentArr(checkScreenWidth());
      showCards(pets, conditions.current);
    } else {
      conditions.direction = direction;
      showCards(pets, conditions.previous);
      const arr = conditions.current;
      conditions.current = conditions.previous;
      conditions.previous = arr;
    }
  };
  const leftArrow = document.querySelector('.left-arrow');
  const rightArrow = document.querySelector('.right-arrow');

  const moveLeft = () => {
    turnCards('left');
    document.querySelector('.friend-card').classList.add('animation-left');
  };

  const moveRight = () => {
    turnCards('right');
    document.querySelector('.friend-card').classList.add('animation-right');
  };

  leftArrow.addEventListener('click', moveLeft);
  rightArrow.addEventListener('click', moveRight);

  window.addEventListener('resize', resizeShowCards);
};

requestJson().then((pets) => initApp(pets));
