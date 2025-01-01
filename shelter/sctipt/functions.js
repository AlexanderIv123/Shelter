export const checkScreenWidth = (arr) => {
  if (window.innerWidth > 1279) {
    return arr[0];
  } if (window.innerWidth > 767) {
    return arr[1];
  }
  return arr[2];
};
