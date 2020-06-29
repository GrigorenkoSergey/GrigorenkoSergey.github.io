﻿'use strict';
//Общие переменные
var beam = new Beam({
    angle: 0 * Math.PI / 180 //чтобы не забыть единицы измерения
  }),
  newLoad = {},
  alertLabel = false, //для избежания проблем с некорректным выбором жесткой заделки в середине балки.
  supportTypeBeforeEditing, //то же.. Долго вкуривал, зачем я эти переменные ввел...
  i, //просто счетчик для циклов
  beamCounted = false; //хранит либо ложь, либо объект балки с рассчитынными нагрузками

var canvasContainer = document.body.querySelector('.canvasContainer');

//Автоматически сгенерированные события
var automaticChange = new Event('change', {
  bubbles: true,
  cancellable: true
}); //используется для изменения взыимосвязанных полей, вожможно уберу

//Длина балки и характеристики
var form = document.forms.inputBeamData,
  beamLength = form.elements.beamLength,
  beamLengthOkBtn = form.elements.beamLengthOkBtn,
  beamLengthResetBtn = form.elements.beamLengthResetBtn,
  inputE = form.elements.inputE,
  inputI = form.elements.inputI;
  

//Вводим подсказки
var helpDiv = document.querySelectorAll('div.help'),
  formInputs = form.querySelectorAll('form input[type="text"]');

//Добавление опор
var addSupportBtn = form.elements.addSupportBtn,
  supportType = form.elements.supportType,
  supportPosition = form.elements.supportPosition,
  supportPositionOkBtn = form.elements.supportPositionOkBtn,
  supportSelector = form.elements.supportSelector,
  relativityPositionFlags = document.body.querySelector('div.relativityPositionFlags'),
  removeSupportBtn = form.elements.removeSupportBtn;


//Добавление нагрузок	
var addLoadBtn = form.elements.addLoadBtn,
  loadSelector = form.elements.loadSelector,

  xStartSingle = form.elements.xStartSingle,

  xStart = form.elements.xStart,
  xEnd = form.elements.xEnd,

  valueStartSingle = form.elements.valueStartSingle,

  valueStart = form.elements.valueStart,
  valueEnd = form.elements.valueEnd,

  removeLoadBtn = form.elements.removeLoadBtn,

  loadType = form.elements.loadType,
  measure = form.elements.measure,

  oneLoadPoint = document.querySelector('fieldset[name="oneLoadPoint"]'),
  multipleLoadPoints = document.querySelector('fieldset[name="multipleLoadPoints"]'),
  loadValueSingle = document.querySelector('fieldset[name="loadValueSingle"]'),
  loadValues = document.querySelector('fieldset[name="loadValues"]'),

  acceptLoad = form.elements.acceptLoad;

var togglers = document.getElementsByClassName('toggler');

var deleteSupports = form.elements.deleteSupports,
  deleteLoads = form.elements.deleteLoads,
  deleteAll = form.elements.deleteAll;

var resetField = document.querySelector('fieldset[name="reset"]'),
  countBtn = resetField.querySelector('input[name="countBtn"]');

var maxFactorsContainer = form.maximums.querySelector('DIV[name="maxFactors"]');
