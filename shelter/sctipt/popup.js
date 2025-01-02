// import { checkScreenWidth } from './functions';

const getPetObj = (arr, petName) => arr.find((el) => el.name === petName);

const createPetLiInfo = (pet, start, parentElement) => Object.entries(pet).forEach((el, i) => {
  if (i >= start) {
    const li = document.createElement('li');
    li.classList.add('h5', 'popup-li');
    li.innerHTML = `<b>${el[0][0].toLocaleUpperCase() + el[0].slice(1)}:</b> ${el[1]}`;
    parentElement.append(li);
  }
});

const createPopup = (petName, cardTarget, pets) => {
  const popup = document.createElement('div');
  popup.classList.add('popup');
  popup.style.top = `${window.pageYOffset}px`;
  popup.style.left = `${window.pageXOffset}px`;
  cardTarget.parentElement.parentElement.prepend(popup);
  const escCercle = document.createElement('div');
  escCercle.classList.add('popup-esc-cercle');
  popup.append(escCercle);
  const escX = document.createElement('img');
  escX.src = './assets/vector.png';
  escCercle.append(escX);
  const popupBlock = document.createElement('div');
  popupBlock.classList.add('popup-block');
  popup.append(popupBlock);
  const petPicture = document.createElement('img');
  petPicture.src = `./assets/${petName}.png`;
  petPicture.classList.add('popup-block-picture');
  popupBlock.append(petPicture);
  const textBlock = document.createElement('div');
  textBlock.classList.add('popup-block-text');
  popupBlock.append(textBlock);
  const name = document.createElement('h3');
  name.textContent = `${petName}`;
  name.classList.add('h3', 'popup-h3');
  textBlock.append(name);
  const type = document.createElement('h4');
  type.textContent = getPetObj(pets, petName).type;
  type.classList.add('h4', 'popup-h4');
  textBlock.append(type);
  const info = document.createElement('h5');
  info.textContent = getPetObj(pets, petName).info;
  info.classList.add('h5', 'popup-h5');
  textBlock.append(info);
  const ul = document.createElement('ul');
  ul.classList.add('popup-ul');
  textBlock.append(ul);
  const pet = getPetObj(pets, petName);
  createPetLiInfo(pet, 3, ul);
  return popup;
};

const removePopup = (popup) => {
  popup.remove();
  document.body.classList.remove('popup-remove-scroll');
};

export const POPUP = (pets) => {
  document.querySelector('.pet-card').addEventListener('click', (event) => {
    const clickedCard = event.target.closest('.friend-card');
    const petName = clickedCard.children[1].textContent;
    const popup = createPopup(petName, clickedCard, pets);
    document.body.classList.add('popup-remove-scroll');
    window.addEventListener('resize', () => {
      removePopup(popup);
    });
    popup.addEventListener('click', (event) => {
      if (event.target.closest('.popup-block') !== document.querySelector('.popup-block')) {
        removePopup(popup);
      }
    });
  });
};
