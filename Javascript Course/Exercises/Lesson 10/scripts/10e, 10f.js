function changeStyleButton(nameButton) {
  const genericButton = document.querySelector(`.${nameButton}`);
  if (genericButton.classList.contains('is-toggled')) {
    genericButton.classList.remove('is-toggled');
  } else {
    genericButton.classList.add('is-toggled');
  }
}