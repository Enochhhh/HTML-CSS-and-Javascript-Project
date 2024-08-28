function changeStyleButton(nameButton, nameOtherButtonFirst, nameOtherButtonSecond) {
  const genericButton = document.querySelector(`.${nameButton}`);
  const otherButtonFirst = document.querySelector(`.${nameOtherButtonFirst}`);
  const otherButtonSecond = document.querySelector(`.${nameOtherButtonSecond}`);
  if (genericButton.classList.contains('is-toggled')) {
    genericButton.classList.remove('is-toggled');
  } else {
    if (document.querySelector(`.${nameOtherButtonFirst}`).classList.contains('is-toggled') 
      || document.querySelector(`.${nameOtherButtonSecond}`).classList.contains('is-toggled')) {
        return;
    }
    genericButton.classList.add('is-toggled');
  }
}