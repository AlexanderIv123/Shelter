import { SLIDER } from './slider.js';
import { BURGER } from './burger.js';
import { POPUP } from './popup.js';

const requestJson = async () => {
  const response = await fetch('./pets.json');
  const pets = await response.json();
  return pets;
};

requestJson().then((pets) => {
  SLIDER(pets);
  POPUP(pets);
}).catch((err) => `${err}`);

BURGER();
