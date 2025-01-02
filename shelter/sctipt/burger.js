// BURGER
export const BURGER = () => {
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
};
