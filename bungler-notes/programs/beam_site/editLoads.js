//Обработчик для кнопки "Новая нагрузка"
addLoadBtn.addEventListener('click', addLoadBtnOnClick);

//Обработчик на кнопку "Удалить нагрузку"
removeLoadBtn.addEventListener('click', removeLoadBtnOnClick);

//Обработчик на кнопку "Номер нагрузки"
loadSelector.addEventListener('change', loadSelectorOnChange);

//Обработчик на кнопку "Вид нагрузки"
loadType.addEventListener('change', loadTypeOnChange);

//Обработчик на кнопку "Принять изменения"
acceptLoad.addEventListener('click', addLoad);

//Пусть каждое поле ввода как-то реагирует на нажатие Enter
let loadInputs = form.elements.editLoads.querySelectorAll('input[type="text"]');
for (let i = 0; i < loadInputs.length; i++) {
  loadInputs[i].addEventListener('keydown', acceptLoadCatchEnter);
}

//Обработчик на кнопку "Единицы измерения"
measure.addEventListener('change', measureOnChange);

setInitialLoadValues(); //чтобы ограничить видимость полей точек приложения нагрузок и значений нагрузок при обновлении страницы
onChangeLoadRelativity(); //чтобы в поле "точка приложения нагрузки" сразу отображались единицы измерения

function measureOnChange() {
  if (beam.loads[loadSelector.selectedIndex]) { 
    showLoadValues(loadSelector.selectedIndex);
  }
  addStringNextToFields([valueStartSingle, valueStart, valueEnd], ' ,' + measure.value);
}

function onChangeLoadPositionFlags() {
  onChangeLoadRelativity();

  if (!beam.loads[loadSelector.selectedIndex]) return;

  showLoadValues(loadSelector.selectedIndex);
}

function loadSelectorOnChange() {
  showLoadValues(loadSelector.selectedIndex);
  loadType.dispatchEvent(automaticChange);
}

function loadTypeOnChange(e) {
  let type = e.target.value;
  renderMeasures(type);
  showLoadTypeAddictingFields(type);

  addStringNextToFields([valueStartSingle, valueStart, valueEnd], ' ,' + measure.value);
}

function showLoadValues(selectedLoad) {
  if (!beam.loads[selectedLoad]) {
    clearFields(xStartSingle, xStart, xEnd, valueStartSingle, valueStart, valueEnd);
    //добавил, т.к. при смене номера нагрузки на несуществующую, значения полей не обнуляются, что неудобно
    return;
  }

  let load = beam.loads[selectedLoad];

  loadType.value = beam.loads[selectedLoad].type;

  xStart.value = xStartSingle.value = recountInnerXToOuter(load.xStart);
  xEnd.value = recountInnerXToOuter(load.xEnd);

  valueStart.value = valueStartSingle.value = recountMeasureToORS(load.valueStart);
  valueEnd.value = recountMeasureToORS(load.valueEnd);
}

function showLoadTypeAddictingFields(type) {
  if (type === 'concentrated' || type === 'moment') {
    oneLoadPoint.style.display = 'block';
    multipleLoadPoints.style.display = 'none';
    loadValueSingle.style.display = 'block';
    loadValues.style.display = 'none';
  } else {
    oneLoadPoint.style.display = 'none';
    multipleLoadPoints.style.display = 'block';
    loadValueSingle.style.display = 'none';
    loadValues.style.display = 'block';
  }
}


function addLoad() {
  if (loadType.value != 'distributed') {
    if (!addLoadPoint(xStartSingle)) {
      alert('Поле "Точка приложения нагрузки" не заполнено');
      xStartSingle.focus();
      return;
    }

    if (!addLoadValue(valueStartSingle)) {
      alert('Поле "Значения нагрузок" не заполнено');
      valueStartSingle.focus();
      return;
    }

    if (valueStartSingle.value == 0) return;

  } else {
    //теперь проверим правильность заданий расстояний
    if (!addLoadPoint(xStart)) {
      alert('Поле "Начальная точка приложения" не заполнено');
      xStart.focus();
      return;
    }

    if (!addLoadPoint(xEnd)) {
      alert('Поле "Конечная точка приложения" не заполнено"');
      xEnd.focus();
      return;
    }

    if (!addLoadValue(valueStart)) {
      alert('Поле "Начальное значение" не заполнено');
      valueStart.focus();
      return;
    }

    if (!addLoadValue(valueEnd)) {
      alert('Поле "Конечное значение" не заполнено');
      valueEnd.focus();
      return;
    }

    if (newLoad.valueStart > 0 && newLoad.valueEnd < 0 ||
        newLoad.valueStart < 0 && newLoad.valueEnd > 0) {
      alert('Знак распределенной нагрузки не может меняться.');
      return;
    }

    if (newLoad.valueStart == 0 && newLoad.valueEnd == 0) {
      alert('Нельзя задать нулевую распределенную нагрузку.');
      return;
    }
    if (newLoad.xStart >= newLoad.xEnd) {
      let tempObj = {
xStart: newLoad.xEnd,
        xEnd: newLoad.xStart
      }
      newLoad.xStart = tempObj.xStart;
      newLoad.xEnd = tempObj.xEnd;

      xStart.value = recountInnerXToOuter(tempObj.xStart);
      xEnd.value = recountInnerXToOuter(tempObj.xEnd);
    }

  }

  beam.loads.splice(loadSelector.selectedIndex, 1); //why??

  newLoad.type = loadType.value;
  beam.addLoad(newLoad.type, newLoad.xStart, +newLoad.valueStart, newLoad.xEnd, +newLoad.valueEnd);

  let currentLoad = beam.loads[beam.loads.length - 1]; //сохраним в переменной текущий объект, потом понадобится для поиска в массиве после сортировки

  i = loadAreImposed(currentLoad);
  if (i === 0 || i) {
    currentLoad = beam.loads[i]; //пусть покажет исходную нагрузку
  }


  renderLNL(beam.loads.length);
  sortLoadsByX(beam.loads);

  //выделение в селекте "номер нагрузки" текущей нагрузки
  loadSelector.selectedIndex = beam.loads.indexOf(currentLoad);
  loadSelectorOnChange();

  beam.drawBeam(canvas, c, true);

  if (beamCounted) count(beam);

  newLoad = {};
}

function addLoadPoint(fieldToCheck) {
  let pos = fieldToCheck.value;

  if (!pos) return;
  pos = pos.replace(',', '.');

  if (!isNumeric(pos)) {
    alert('Вы ввели не число!');
    fieldToCheck.value = '';
    return;
  }

  pos = recountOuterXToInner(+pos); //Для внутренней реализации используем абсолютную систему координат

  if (pos < 0 || pos > beam.length) {
    alert('Точка приложения нагрузки находится вне балки');
    fieldToCheck.value = '';
    return;
  }

  if (fieldToCheck == xStartSingle) {
    newLoad.xStart = newLoad.xEnd = pos;
  } else {
    newLoad[fieldToCheck.name] = pos;
  }

  return newLoad;
}

function addLoadValue(fieldToCheck) {
  let value = fieldToCheck.value;

  if (!value) return;

  value = value.replace(',', '.');

  if (!isNumeric(value)) {
    alert('Вы ввели не число!');
    fieldToCheck.value = '';
    return;
  }
  value = +value;
  if (fieldToCheck == valueStartSingle) {
    newLoad.valueStart = newLoad.valueEnd = recountMeasureToIRS(value);
  } else {
    newLoad[fieldToCheck.name] = recountMeasureToIRS(value);
  }

  return newLoad;
}

function recountMeasureToIRS(value) { //ToIRS == to internal reference sistem
  let unit = measure.value.slice(0, 2),
      factor;
  //Для внутренней реализации используем кН
  switch (unit) {
    case ('тс'):
      factor = 9.8;
      break;

    case ('кН'):
      factor = 1;
      break;

    case ('кг'):
      factor = 0.0098;
      break;
  }

  value = Math.round(factor * value * 1000) / 1000;

  return value;
}

function recountMeasureToORS(value) { //ToORS == ToOuterReferenceSystem
  //Силы в кН, моменты в кН*м
  let unit = measure.value.slice(0, 2),
      factor;

  switch (unit) {
    case ('тс'):
      factor = 1 / 9.8;
      break;

    case ('кН'):
      factor = 1;
      break;

    case ('кг'):
      factor = 1000 / 9.8;
      break;
  }

  value = Math.round(factor * value * 1000) / 1000;

  return value;
}

function acceptLoadCatchEnter(e) {
  if (e.code == 'Enter' || e.code == 'NumpadEnter' ||
      e.key == 'Enter' || e.keyCode == 13 || e.which == 13) acceptLoad.click();
}
//не используется
function valueStartSingleCatchEnter(e) {
  if (e.code == 'Enter' || e.code == 'NumpadEnter' ||
      e.key == 'Enter' || e.keyCode == 13 || e.which == 13) valueStartSingleOkBtn.click();
}

function addLoadBtnOnClick() {
  renderLNL(beam.loads.length + 1);
  loadSelector.lastElementChild.selected = true;
  newLoad = {};
  clearFields(xStartSingle, xStart, xEnd, valueStartSingle, valueStart, valueEnd);
  enableFields(xStartSingle, xStart, xEnd, valueStartSingle, valueStart, valueEnd);
}

function removeLoadBtnOnClick(e) {
  if (!beam.loads.length) return;

  let selected = loadSelector.selectedIndex;
  if (beam.loads[selected]) {
    beam.loads.splice(selected, 1);
  }

  renderLNL(beam.loads.length);
  showLoadValues(0);
  loadType.dispatchEvent(automaticChange);
  beam.drawBeam(canvas, c, true);

  if (beamCounted) count(beam);
}

function renderLNL(amountOfElements) { //Loads Number List
  loadSelector.innerHTML = '';

  let option = document.createElement('option');

  for (i = 0; i < amountOfElements; i++) {
    option = option.cloneNode(false);
    option.textContent = i + 1;
    loadSelector.appendChild(option);
  }
}

function renderMeasures(type) {
  let currentMeasure = measure.selectedIndex,
      measures = [];

  measure.innerHTML = '';

  switch (type) {
    case 'concentrated':
      measures = ['тс', 'кН', 'кгс'];
      break;

    case 'distributed':
      measures = ['тс/м', 'кН/м', 'кгс/м'];
      break;

    case 'moment':
      measures = ['тс*м', 'кН*м', 'кгс*м'];
      break;
  }

  let option = document.createElement('option');

  for (i = 0; i < 3; i++) {
    option = option.cloneNode(false);
    option.textContent = measures[i];
    measure.appendChild(option);
  }

  measure.selectedIndex = currentMeasure;
}

function setInitialLoadValues() {
  loadType.value = 'concentrated';
  renderMeasures('concentrated');

  measure.selectedIndex = 1;
  measure.dispatchEvent(automaticChange);

  multipleLoadPoints.style.display = 'none';
  loadValues.style.display = 'none';
  disableFields(xStartSingle, valueStartSingle, xStart, xEnd, valueStart, valueEnd);
}

function sortLoadsByX(beamLoads) {
  //примем, что первыми идут сосредоточенные силы, потом моменты, ну а последними - распределенные нагрузки
  beamLoads.sort(function(a, b) {
      let result = a.xStart - b.xStart;

      if (result == 0) {
      if (a.type == 'concentrated' || b.type == 'concentrated') {
      result = a.type == 'concentrated' ? -1 : 1;
      } else {
      result = a.type == 'moment' ? -1 : 1;
      }
      }
      return result;
      });
}

function loadAreImposed(load) {
  //возвращает номер нагрузки, с которой конфликтует (накладывается или совпадает) новая нагрузка
  //if (load.type == 'distributed') return;//проработать эту строчку )) веселуха получается

  if (load.type == 'distributed') {
    let distributedLoads = beam.loads.filter(function(item) {
        return item.type == 'distributed';
        });
    for (let i = 0; i < distributedLoads.length; i++) {
      if (load.xStart > distributedLoads[i].xStart &&
          load.xStart < distributedLoads[i].xEnd ||
          load.xEnd > distributedLoads[i].xStart &&
          load.xEnd < distributedLoads[i].xEnd) {
        alert("Распределенные нагрузки накладываются друг на друга, \n \
            программа не обрабатывает такие значения");
        beam.loads.pop();
        clearFields(xStartSingle, xStart, xEnd, valueStartSingle, valueStart, valueEnd);
        return beam.loads.length - 1;
      }
    }
  }

  for (i = 0; i < beam.loads.length - 1; i++) {

    if (beam.loads[i].xStart > load.xStart) break;
    if (beam.loads[i].xStart != load.xStart) continue;

    if (beam.loads[i].type !== load.type) continue;

    let choice = prompt('Нагрузка такого же типа в этой точке уже существует. \n \
        Выберите вариант дейтвий: \n \
        1.Сложить нагрузки (введите "1") \n \
        2.Удалить старую нагрузку (введите "2") \n \
        3.Отменить ввод нагрузки (введите "3"),  \n \
        При нажатии "Отмена" текущая нагрузка будет удалена', '3');

    if (choice == 1) {
      beam.loads[i].valueStart = beam.loads[i].valueEnd = load.valueStart + beam.loads[i].valueStart;
      beam.loads.pop();
      clearFields(xStartSingle, xStart, xEnd, valueStartSingle, valueStart, valueEnd);
      return i;
    }
    if (choice == 2) {
      beam.loads.splice(i, 1);
      return i;
    }
    if (choice == 3 || choice == null) {
      beam.loads.pop();
      return i;
    }
  }
}

function onChangeLoadRelativity() {
  if (form.distanceRelativity.value == "absolute") {
    addStringNextToFields([xStartSingle, xStart, xEnd], ", мм");
  } else {
    addStringNextToFields([xStartSingle, xStart, xEnd], "");
  }
}

function addStringNextToFields(fieldsArr, string) {
  //предполагается, что за полем следует пустой span
  for (i = 0; i < fieldsArr.length; i++) {
    fieldsArr[i].nextElementSibling.innerText = string;
  }
}
