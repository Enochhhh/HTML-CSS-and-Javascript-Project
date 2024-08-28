function changeStyleButton() {
  const gamingButton = document.querySelector('.js-gaming-button');
  if (gamingButton.classList.contains('is-toggled')) {
    gamingButton.classList.remove('is-toggled');
  } else {
    gamingButton.classList.add('is-toggled');
  }
}