import { BURGER } from './burger.js';
import { PAGINATION } from './pagination.js';
import { POPUP } from './popup.js';

const requestJson = async () => {
  const response = await fetch('./pets.json');
  const pets = await response.json();
  return pets;
};

requestJson().then((pets) => {
  PAGINATION(pets);
  POPUP(pets);
}).catch((err) => `pagination ${err}`);

BURGER();
