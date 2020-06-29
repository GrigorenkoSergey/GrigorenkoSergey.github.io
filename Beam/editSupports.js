'use strict';
//Обработчики на кнопку "Добавить опору"
addSupportBtn.addEventListener('click', renderSupportsList);

//Обработчики на кнопку "Расстояние" и "OK"
supportPositionOkBtn.addEventListener('click', supportPositionOkBtnOnClick);
supportPosition.addEventListener('keydown', supportPositionCatchEnter);

//Обработчики на кнопку "Удалить опору"
removeSupportBtn.addEventListener('click', removeSupportBtnOnClick);

//Навесим обработчики на селект supportSelector.
supportSelector.addEventListener('change', showSupportValues);
supportSelector.addEventListener('focus', supportSelectorOnFocus);

//Обработчики для селекта "Вид опоры"
supportType.addEventListener('focus', supportTypeOnFocus); //для избежания проблем с жесткими заделками в середине пролета
supportType.addEventListener('blur', supportTypeOnBlur); //для избежания проблем с жесткими заделками в середине пролета
supportType.addEventListener('change', supportTypeOnChange);

function renderSupportsList(e) {
  renderSCS(beam.supports.length + 1);
  supportSelector.lastElementChild.selected = true;
}

function supportPositionOkBtnOnClick(e) {
  // Т.к. Dom не гарантирует порядок выполнения обработчиков, а здесь важен именно порядок
  supportPosition.value = supportPosition.value.replace(',', '.'); //обработаем ввод запятой для русской раскладки

  let obj = addSupport();
  if (!obj) return; //довольно спорная строчка

  sortSupportsByX();
  renderSCS(beam.supports.length);

  let selected = beam.supports.indexOf(obj);
  supportSelector.selectedIndex = selected; //как-то заменить эту строчку...
  beam.drawBeam(canvas, c, true);

  showSupportValues();

  if (beamCounted) count(beam);
}

function addSupport() {
  let check = checkSupportPosition();

  if (!check) {
    alert('Неправильно задано (или вообще не задано) положение опоры. \n' +
      'Возможно, не там поставлен флажок "Способы задания расстояния".');

    supportPosition.classList.add('error');
    return;
  }

  let type = supportType.value;
  let x = +supportPosition.value;

  x = recountOuterXToInner(x); //пересчитаем в миллиметры

  if (!rigidClampingCheck(type, x)) return;
  removeSupport();

  //Проверим существование опоры с заданным положением, если есть, то удалим ее, а на ее место место поставим заданную
  for (let i = 0; i < beam.supports.length; i++) {
    if (beam.supports[i].x != x) continue;

    beam.supports.splice(i, 1);
    break;
  }
  supportPosition.classList.remove('error');
  let obj = beam.addSupport(type, x);

  sortSupportsByX();

  return obj;
}

function renderSCS(amountOfElements) {
  //render SupportSelector Select == scs
  supportSelector.innerHTML = '';
  supportPosition.value = '';

  //формируем список существующих опор
  let option = document.createElement('option');
  for (let i = 0; i < amountOfElements; i++) {
    option = option.cloneNode(false);
    option.textContent = i + 1;
    supportSelector.appendChild(option);
  }
}

function supportPositionCatchEnter(e) {
  if (e.code == 'Enter' || e.code == 'NumpadEnter' ||
    e.key == 'Enter' || e.keyCode == 13 || e.which == 13) supportPositionOkBtn.click();
}

function removeSupportBtnOnClick() {
  removeSupport();
  showSupportValues();
  beam.drawBeam(canvas, c, true);

  if (beamCounted) count(beam);
}

function removeSupport() {
  let selected = supportSelector.selectedIndex;
  beam.supports.splice(selected, 1);
  supportSelector.selectedIndex = 0;
}

function supportSelectorOnFocus(e) {
  let currentSupportIndex = supportSelector.selectedIndex;
  renderSCS(beam.supports.length);

  if (currentSupportIndex < beam.supports.length) {
    supportSelector.selectedIndex = currentSupportIndex;
  }
  showSupportValues();
}

function showSupportValues() {
  beamLength.classList.remove('error');

  if (beam.supports.length == 0) return;

  let selected = supportSelector.selectedIndex;
  if (selected === undefined) return;

  if (beam.supports[selected] !== undefined) {
    supportPosition.value = recountInnerXToOuter(beam.supports[selected].x);
    supportType.value = beam.supports[selected].type;
  }
}

function supportTypeOnFocus(e) {
  if (alertLabel) return;
  supportTypeBeforeEditing = supportType.value;
  alertLabel = false;
}

function supportTypeOnBlur(e) {
  //sortSupportsByX();
  supportTypeBeforeEditing = null;
}

function supportTypeOnChange(e) {
  let supportNumber = supportSelector.selectedIndex;

  if (supportType.value === supportTypeBeforeEditing) return;

  if (!beam.supports[supportNumber]) return;

  if (!addSupport()) {
    supportType.value = beam.supports[supportNumber].type;
    return;
  }

  supportSelector.selectedIndex = supportNumber;
  showSupportValues();

  beam.drawBeam(canvas, c, true);

  supportType.blur();

  if (beamCounted) count(beam);
}

function sortSupportsByX() {
  beam.supports.sort(function(a, b) {
    return a.x - b.x;
  });
}


function checkSupportPosition() {
  if (supportPosition.value === '') return false;

  if (form.distanceRelativity.value == 'relative') {
    return supportPosition.value >= 0 && supportPosition.value <= 1;
  } else {
    return supportPosition.value >= 0 &&
      supportPosition.value <= +beamLength.value;
  }
}

function rigidClampingCheck(type, x) {
  if (type == 'rigid-clamping' && x != 0 && x != beam.length) {
    alert('Жесткая заделка может быть установлена только по краям балки');
    alertLabel = true;
    supportPosition.classList.add('error');
    return;
  }
  return true;
}
