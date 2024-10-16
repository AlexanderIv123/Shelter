import { SLIDER } from './slider.js';
import { BURGER } from './burger.js';

export const requestJson = async () => {
  const response = await fetch('./pets.json');
  const pets = await response.json();
  return pets;
};

requestJson().then((pets) => SLIDER(pets)).catch((err) => `slider ${err}`);

BURGER();
