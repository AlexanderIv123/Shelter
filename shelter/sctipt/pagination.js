// Pagination
import { showCards } from './slider.js';

const checkScreenWidth = () => {
  if (window.innerWidth > 1279) {
    return 8;
  } if (window.innerWidth > 767) {
    return 6;
  }
  return 3;
};

const fillPaginArr = (n) => {
  const paginArr = [];
  const nextCards = [];
  let previousCards = [];
  while (paginArr.length < n) {
    while (paginArr.length < 8) {
      const rundomNum = Math.floor(Math.random() * 8);
      if (!paginArr.includes(rundomNum)) {
        paginArr.push(rundomNum);
        previousCards.push(rundomNum);
      }
    }
    while (nextCards.length < 8) {
      const rundomNum = Math.floor(Math.random() * 8);
      while (nextCards.length < 3) {
        const rundomNumFirst = Math.floor(Math.random() * 3);
        if (!nextCards.includes(previousCards[rundomNumFirst])) {
          nextCards.push(previousCards[rundomNumFirst]);
        }
      }
      while (nextCards.length < 6) {
        const rundomNumSix = Math.floor(Math.random() * 6);
        if (!nextCards.includes(previousCards[rundomNumSix])) {
          nextCards.push(previousCards[rundomNumSix]);
        }
      }
      if (!nextCards.includes(rundomNum)) {
        nextCards.push(rundomNum);
      }
    }
    nextCards.forEach((el) => paginArr.push(el));
    previousCards = [...nextCards];
    nextCards.length = 0;
  }
  return paginArr;
};

const cardsArr = fillPaginArr(48);

const conditions = {
  currentPos: 0,
  cardsWidthAmount: checkScreenWidth(),
};

const currentArr = (arr, obj) => {
  const currArr = arr.slice(obj.currentPos, (obj.currentPos + obj.cardsWidthAmount));
  return currArr;
};

const block = document.querySelector('.pets-friends-block-pictures');

const resizeShowCards = (petsArr, obj) => {
  const cardsNum = checkScreenWidth();
  if (cardsNum !== obj.cardsWidthAmount) {
    const newConditions = structuredClone(obj); /* structured? */
    newConditions.currentPos = 0;
    newConditions.cardsWidthAmount = cardsNum;
    showCards(petsArr, currentArr(cardsArr, newConditions), block);
    return newConditions;
  }
  return obj;
};

const doubleLeftBtn = document.querySelectorAll('.round-button')[0];
const leftBtn = document.querySelectorAll('.round-button')[1];
const numberBtn = document.querySelectorAll('.round-button')[2];
const rightBtn = document.querySelectorAll('.round-button')[3];
const doubleRightBtn = document.querySelectorAll('.round-button')[4];

const changeNumberBtn = (obj) => {
  numberBtn.textContent = (obj.currentPos / obj.cardsWidthAmount) + 1;
};

const clickRightBtn = (petsArr, obj) => {
  if ((obj.currentPos + obj.cardsWidthAmount) < cardsArr.length) {
    const newConditions = structuredClone(obj); /* structured? */
    newConditions.currentPos = (obj.currentPos + obj.cardsWidthAmount);
    showCards(petsArr, currentArr(cardsArr, newConditions), block);
    return newConditions;
  }
  return obj;
};

const clickLefttBtn = (petsArr, obj) => {
  if ((obj.currentPos - obj.cardsWidthAmount) >= 0) {
    const newConditions = structuredClone(obj); /* structured? */
    newConditions.currentPos = (obj.currentPos - obj.cardsWidthAmount);
    showCards(petsArr, currentArr(cardsArr, newConditions), block);
    return newConditions;
  }
  return obj;
};

const clickDoubleLeftBtn = (petsArr, obj) => {
  if ((obj.currentPos - obj.cardsWidthAmount) >= 0) {
    const newConditions = structuredClone(obj); /* structured? */
    newConditions.currentPos = 0;
    showCards(petsArr, currentArr(cardsArr, newConditions), block);
    return newConditions;
  }
  return obj;
};

const clickDoubleRightBtn = (petsArr, obj) => {
  if ((obj.currentPos + obj.cardsWidthAmount) !== cardsArr.length) {
    const newConditions = structuredClone(obj); /* structured? */
    newConditions.currentPos = (cardsArr.length - obj.cardsWidthAmount);
    showCards(petsArr, currentArr(cardsArr, newConditions), block);
    return newConditions;
  }
  return obj;
};

const activateInactivateBtn = (obj) => {
  if (numberBtn.textContent > 1) {
    doubleLeftBtn.classList.remove('inactive');
    leftBtn.classList.remove('inactive');
  } else {
    doubleLeftBtn.classList.add('inactive');
    leftBtn.classList.add('inactive');
  }
  if (obj.currentPos + obj.cardsWidthAmount === cardsArr.length) {
    doubleRightBtn.classList.add('inactive');
    rightBtn.classList.add('inactive');
  } else {
    doubleRightBtn.classList.remove('inactive');
    rightBtn.classList.remove('inactive');
  }
};

export const PAGINATION = (pets) => {
  let newConditions = structuredClone(conditions); /* structured? */

  showCards(pets, currentArr(cardsArr, newConditions), block);

  window.addEventListener('resize', () => {
    newConditions = resizeShowCards(pets, newConditions);
    changeNumberBtn(newConditions);
    activateInactivateBtn(newConditions);
  });

  rightBtn.addEventListener('click', () => {
    newConditions = clickRightBtn(pets, newConditions);
    changeNumberBtn(newConditions);
    activateInactivateBtn(newConditions);
  });

  leftBtn.addEventListener('click', () => {
    newConditions = clickLefttBtn(pets, newConditions);
    changeNumberBtn(newConditions);
    activateInactivateBtn(newConditions);
  });

  doubleRightBtn.addEventListener('click', () => {
    newConditions = clickDoubleRightBtn(pets, newConditions);
    changeNumberBtn(newConditions);
    activateInactivateBtn(newConditions);
  });

  doubleLeftBtn.addEventListener('click', () => {
    newConditions = clickDoubleLeftBtn(pets, newConditions);
    changeNumberBtn(newConditions);
    activateInactivateBtn(newConditions);
  });
};
