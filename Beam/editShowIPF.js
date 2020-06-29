'use strict';

let pointToShowIPF = form.elements.pointToShowIPF;

//Флажки для вычерчивания эпюр
let plotM = document.getElementById("plotM");
let plotQ = document.getElementById("plotQ");
let plotV = document.getElementById("plotV");

plotM.addEventListener('change', plotFactorOnChange.bind(null, plotM, "momentDiagramm", "drawMomentDiagram", "M", "кН*м"));
plotQ.addEventListener('change', plotFactorOnChange.bind(null, plotQ, "shareForceDiagram", "drawShareForceDiagram", "Q", "кН"));
plotV.addEventListener('change', plotFactorOnChange.bind(null, plotV, "beamDeflectionsDiagram", "drawBeamDeflections", "V", findMeasuresV()));

pointToShowIPF.addEventListener('change', showIPFValues);

let maximums = form.elements.maximums;

function showIPFValues() {
  let M = form.elements.showIPF.querySelector('span[name="M"]');
  let Q = form.elements.showIPF.querySelector('span[name="Q"]');
  let V = form.elements.showIPF.querySelector('span[name="V"]');

  if (!isNumeric(pointToShowIPF.value) || !beamCounted) return;

  beamCounted.x = +recountOuterXToInner(pointToShowIPF.value);

  M.textContent = " " + roundToFourSignificantDigits(-countCurrentMoment(beamCounted, beamCounted.x)) + " кН*м";
  Q.textContent = " " + roundToFourSignificantDigits(countCurrentShareForce(beamCounted, beamCounted.x)) + " кН";
  V.textContent = " " + roundToFourSignificantDigits(countBeamDeflection(beamCounted, beamCounted.x)) + " " + findMeasuresV();

}

function clearIPFValues() {
  let M = form.elements.showIPF.querySelector('span[name="M"]');
  let Q = form.elements.showIPF.querySelector('span[name="Q"]');

  M.textContent = "";
  Q.textContent = "";
  clearFields(pointToShowIPF);
  disableFields(pointToShowIPF);
}

function showIPFDistance() {
  if (!pointToShowIPF.value) return;

  let x = beamCounted.x;

  if (form.distanceRelativity.value == "absolute") {
    pointToShowIPF.value = roundToFourSignificantDigits(recountInnerXToOuter(x));
  } else {
    pointToShowIPF.value = recountInnerXToOuter(x);
  }
}

function drawPlots(beam) {
  beam.recountStartEndOptions(canvas); //требуется, т.к. следующие холсты меньше по высоте

  plotFactorOnChange(plotM, "momentDiagramm", "drawMomentDiagram", "M", "кН*м");
  plotFactorOnChange(plotQ, "shareForceDiagram", "drawShareForceDiagram", "Q", "кН");
  plotFactorOnChange(plotV, "beamDeflectionsDiagram", "drawBeamDeflections", "V", findMeasuresV());
}

function addCanvas(width, height) {
  let canvas = document.createElement('canvas');

  canvas.width = width || 500;
  canvas.height = height || 100;

  canvasContainer.appendChild(canvas);

  return canvas;
}

function plotFactorOnChange(checkBtn, canvasId, drawingFunction, legend, measures) {
  //checkBtn = plotM || plotQ || plotV;
  //canvasId = "momentDiagram" || "shareForceDiagram" || "beamDeflectionsDiagram"
  //drawingFunction = 'drawMomentDiagram' || 'drawShareForceDiagram' || 'drawBeamDeflections' 
  //legend = "M" || "Q" || "V"
  //measures = "кН*м" || "кН" || "1/EI" || "мм"

  if (!beamCounted) return;

  let maxFactor = maximums.querySelector('span[name="' + legend + 'max"]');
  let minFactor = maximums.querySelector('span[name="' + legend + 'min"]');

  if (checkBtn.checked) {
    let canvas = addCanvas(500, 100);
    canvas.id = canvasId;
    let c = canvas.getContext('2d');
    beamCounted.recountStartEndOptions(canvas);
    beamCounted[drawingFunction](canvas, c);
    c.font = 'italic 18px sans-serif';
    c.strokeText(legend + ',  ', 10, 15);
    c.font = 'italic 14px sans-serif';
    c.strokeText('[' + measures + ']', 3, 35);

    let maxFactorPropertyName = 'max' + legend;

    maxFactor.innerHTML = '<span>' + legend + '<sub>max</sub>' + '= ' +
      roundToFourSignificantDigits(beamCounted[maxFactorPropertyName].yMax.y) + ' ' + measures +
      ', при x = ' + Math.round(beamCounted[maxFactorPropertyName].yMax.x) + '<br>';

    minFactor.innerHTML = '<span>' + legend + '<sub>min</sub>' + '= ' +
      roundToFourSignificantDigits(beamCounted[maxFactorPropertyName].yMin.y) + ' ' + measures +
      ', при x = ' + Math.round(beamCounted[maxFactorPropertyName].yMin.x) + '<br>';

  } else {
    let canvas = document.getElementById(canvasId);
    if (!canvas) return;

    maxFactor.innerHTML = "";
    minFactor.innerHTML = "";
    canvas.parentNode.removeChild(canvas);
  }
}

function findMeasuresV() {
  return (beam.E == 1 || beam.I == 1) ? "1/EI" : "мм";
}
