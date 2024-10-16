import { BURGER } from './burger.js';
import { PAGINATION } from './pagination.js';

const requestJson = async () => {
  const response = await fetch('./pets.json');
  const pets = await response.json();
  return pets;
};

requestJson().then((pets) => PAGINATION(pets)).catch((err) => `pagination ${err}`);

BURGER();
