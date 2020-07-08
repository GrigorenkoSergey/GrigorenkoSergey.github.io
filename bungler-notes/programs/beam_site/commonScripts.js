'use strict';

disableAllFields(3); //закроем все поля от изменения

for (i = 0; i < helpDiv.length; i++) {
  helpDiv[i].addEventListener('click', showHide);
}

for (i = 0; i < togglers.length; i++) {
  togglers[i].addEventListener("click", toggle);
}

deleteSupports.onclick = function() {
  beam.supports.length = 0;

  clearFields(supportSelector, supportPosition);
  clearCanvases();
  clearIPFValues();
  clearMaxFactorsContainer();

  beam.drawBeam(canvas, c, false);
  beamCounted = false;
}

deleteLoads.onclick = function() {
  beam.loads.length = 0;

  clearFields(loadSelector, xStartSingle, valueStartSingle, xStart, xEnd,
    valueStart, valueEnd);
  clearCanvases();
  clearIPFValues();
  clearMaxFactorsContainer();

  beamCounted = false;
  beam.drawBeam(canvas, c, false);
}


function showHide(e) {
  if (e.target.tagName != 'IMG') return;
  this.classList.toggle('open');
}

function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

function clearFields(fields) {
  for (let i = 0; i < arguments.length; i++) {
    if (arguments[i].tagName == 'SELECT') arguments[i].innerHTML = '';
    else arguments[i].value = '';
  }
}

function disableFields(fields) {
  for (let i = 0; i < arguments.length; i++) {
    arguments[i].disabled = true;
  }
}

function disableAllFields(fromInput) {
  if (fromInput == undefined) formInput = 0;
  for (i = fromInput; i < formInputs.length; i++) { //очистим поля, т.к. при обновлении страницы в них остаются кешированные значения
    formInputs[i].value = '';
    disableFields(formInputs[i]);
  }
}

function enableFields(fields) {
  for (let i = 0; i < arguments.length; i++) {
    arguments[i].disabled = false;
  }
}

function toggle(e) {
  let target = e.target;
  while (target.tagName != 'FIELDSET') {
    target = target.parentNode;
  }

  target.classList.toggle('open');
  target.classList.toggle('closed');
}

function findElementWithMaxPropertyValueInArray(arr, property) {
  let max = arr[0][property],
    element = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i][property] < max) continue;
    max = arr[i][property];
    element = arr[i];
  }
  return element;
}

function findElementWithMinPropertyValueInArray(arr, property) {
  let min = arr[0][property],
    element = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i][property] > min) continue;
    min = arr[i][property];
    element = arr[i];
  }
  return element;
}

function cloneObj(obj) {
  let newObj = Object.create(obj);
  for (let key in obj) {

    if (typeof obj[key] == 'object' && obj[key] != undefined) {
      newObj[key] = cloneObj(obj[key]);
    } else {
      newObj[key] = obj[key];
    }

  }
  return newObj;
}

function roundToFourSignificantDigits(value) {
  if (!isNumeric(value)) return value;

  let integerPart = ~~value;

  value = integerPart < 1 ? value = Math.round(value * 10000) / 10000 :
    integerPart < 10 ? value = Math.round(value * 1000) / 1000 :
    integerPart < 100 ? value = Math.round(value * 100) / 100 :
    integerPart < 1000 ? value = Math.round(value * 10) / 10 :
    value = Math.round(value);
  return value;
}

function removeDomChildren(parentNode, from, to) {
  if (from < 0) return;
  if (!to || to > parentNode.children.length - 1) {
    to = parentNode.children.length - 1;
  }

  for (let i = to; i >= from; i--) {
    parentNode.removeChild(parentNode.children[i]);
  }
}

function clearCanvases(clearFirstCanvas) {
  for (let i = canvasContainer.children.length - 1; i > 0; i--) {
    canvasContainer.removeChild(canvasContainer.children[i]);
  }
  if (clearFirstCanvas == undefined) { //т.е. без аргументов вообще..
    c.clearRect(0, 0, canvas.width, canvas.height);
  }
}

function recountInnerXToOuter(x) { //для записи данных в поля
  if (form.querySelector('input[name="countFrom"]:checked').value === 'fromEnd') {
    x = Math.round((beam.length - x) * 1000) / 1000;
  }

  if (form.querySelector('input[name="distanceRelativity"]:checked').value === 'relative') {
    x = Math.round(x * 1000 / beam.length) / 1000;
  }

  return x;
}

function recountOuterXToInner(x) { //для записи данных из полей
  let relativity = form.distanceRelativity.value; //relative/absolute
  let startPoint = form.countFrom.value; //fromBegin/fromEnd

  if (relativity == 'relative') x = x * beam.length;
  if (startPoint == 'fromEnd') x = beam.length - x;

  return x;
}

function clearMaxFactorsContainer() {
  for (let i = 0; i < maxFactorsContainer.children.length; i++) {
    maxFactorsContainer.children[i].innerHTML = "";
  }
}
