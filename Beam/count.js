'use strict';

countBtn.addEventListener('click', count.bind(this, beam));

function count(beam) {
  /*отладка 
  if (canvasContainer.children.length > 4) { //изначально строилось много эпюр единичных сил для отладки программы
    removeDomChildren(canvasContainer, 4);
  }
  конец отладки*/
  if (!beam.length) return;

  let beamCopy = cloneObj(beam);
  var vsf = [], //vertical support forces
      hsf = [], // horisontal support forces
      msf = []; // supports moments;
  beamCopy._addSupportReactions();
  fillSupportsForcesArrays(beamCopy, vsf, hsf, msf);

  if (!beamIsUnchangeable(vsf, hsf, msf)) return;

  let beamF = cloneObj(beamCopy); //балка основной системы
  chooseMainSystem(beamF);

  /* отладка 
  //Нарисует балку основной системы
  let canvas = addCanvas(500, 150);
  let c = canvas.getContext('2d');
  beamF.drawBeam(canvas, c, false, true); //добавил для отладки
  конец отладки*/

  mainSystemSupportReactions(beamF);

  if (beamF.unknownReactions.length) {
    divideDestributed(beamF);

    let beams = [beamF];
    for (let i = 0; i < beamF.unknownReactions.length; i++) {
      beams[i + 1] = buildSingleForceDiagramm(beamF, i, false); //для отладки true
    }
    /* отладка 
    let canvas = addCanvas(500, 150);
    let c = canvas.getContext('2d');
    beamF.drawMomentDiagram(canvas, c);
    c.strokeText('M', 10, 30);
    c.strokeText('f' + '', 20, 35);
     конец отладки */
    let vectorX = makeSystemOfLinearEquations(beams);

    let unknownLoads = beamF.loads.filter(function(item) {
        return typeof item.valueStart == "string";
        });

    unknownLoads.map(function(item, i) {
        item.valueStart = item.valueEnd = vectorX[i];
        });
    for (let i = 0; i < unknownLoads.length; i++) {
      beamCopy.loads.push(unknownLoads[i]);
    }
    beamCopy.supports = beamF.supports;
  }

  mainSystemSupportReactions(beamCopy);

  (function unnamed() { // Влом дальше придумывать имена переменным
   clearCanvases(false);
   let canvas = addCanvas(500, 150);
   let c = canvas.getContext('2d');

   beamCopy.drawBeam(canvas, c, false, true);
   c.strokeText("Итоговые нагрузки на балку", 10, 10);
   })();

  sumCoincidentLoads(beamCopy.loads); //иногда нагрузки приложены прямо на опорах. Предусмотрим этот случай

  divideDestributed(beamCopy);

  beamCounted = beamCopy;
  enableFields(form.elements.pointToShowIPF);
  drawPlots(beamCopy);

  return beam;
}

function fillSupportsForcesArrays(beam, vsf, hsf, msf) {
  for (i = 0; i < beam.supports.length; i++) {
    var reactions = beam.supports[i].reactions;

    if ('V' in reactions) vsf.push(reactions.V); // возможно, придется все-таки добавить ссылку на опору, т.к. для горизонтальных составляющих и моментов нумерация не совпадает
    if ('H' in reactions) hsf.push(reactions.H);
    if ('M' in reactions) msf.push(reactions.M);
  }
}

function beamIsUnchangeable(vsf, hsf, msf) {
  if (msf.length) return true; // Т.е. есть по крайней мере одна жесткая заделка
  if (vsf.length > 1 && hsf.length > 0) return true; //значит есть 2 опоры, одна из которых шарнирно-неподвижная

  alert('Балка неустойчива!');
  beamCounted = false;
  clearIPFValues();
  clearCanvases(false);
  return false;
}

function chooseMainSystem(beam) {
  var mainSystemSupports = [],
  replaceableSupports = beam.supports.slice(),
  i = beam.supports.length - 1;

  //проверки существования жестких опор на концах балки
  if (beam.supports[0].type == 'rigid-clamping') {
    mainSystemSupports.push(beam.supports[0]);
    replaceableSupports.shift();

  } else if (beam.supports[i].type == 'rigid-clamping') {
    mainSystemSupports.push(beam.supports[i]);
    replaceableSupports.pop();

  } else { //получается, что жестких заделок по краям нет
    mainSystemSupports.push(beam.supports[0]); //в любом случае оставляем самую первую опору
    replaceableSupports.shift();

    if (beam.supports[0].type == 'hinged-fixed') {
      mainSystemSupports.push(beam.supports[i]);
      replaceableSupports.pop();

    } else {
      for (i = replaceableSupports.length - 1; i >= 0; i--) {
        //поскольку балка неизменяемая и без жестких заделок, то
        //однозначно одна из оставшихся опор будет шарнирно-неподвижной
        if (replaceableSupports[i].type != "hinged-fixed") continue;

        mainSystemSupports.push(replaceableSupports[i]);
        replaceableSupports.splice(i, 1);
      }
    }
  }
  beam.supports = mainSystemSupports;

  var j = 1;
  for (i = 0; i < replaceableSupports.length; i++) {
    beam.addLoad('concentrated',
        replaceableSupports[i].x, 'X' + j++);
    if (replaceableSupports[i].type == 'rigid-clamping') {
      beam.addLoad('moment',
          replaceableSupports[i].x, 'X' + j++);
    }
  }
}

function outerForcesMomentsSum(beam, pointPositionX) {
  //Момент, действующий против часовой стрелки - со знаком плюс, по - со знаком минус
  //Единица измерения - кН*м
  //Если pointPositionX в точке приложения моментов, то его не учитываем
  var sum = 0,
      loads = beam.loads;

  beam.unknownReactions = []; //для последующего расчета по методу сил

  for (var i = 0; i < loads.length; i++) {
    if (typeof loads[i].valueStart == 'string') {
      beam.unknownReactions.push(loads[i]);
      continue;
    }

    switch (loads[i].type) {
      case "moment":
        sum += loads[i].valueStart;
        break;

      case "concentrated":
        sum += (pointPositionX - loads[i].xStart) * loads[i].valueStart / 1000; //pointPositionX в мм, отсюда и делим на 1000
        break;

      case "distributed":
        var a = loads[i].valueStart,
            b = loads[i].valueEnd,
            h = loads[i].xEnd - loads[i].xStart,
            xcg = h / 3 * (a + 2 * b) / (a + b); //xCenter of Gravity

        sum += (a + b) / 2 * h * (pointPositionX - loads[i].xStart - xcg) / 10e5;
        break;
    }
  }
  return sum;
}

function mainSystemSupportReactions(beam) {
  var a = beam.supports[0];
  var b = beam.supports[beam.supports.length - 1];

  if (a.type == "rigid-clamping") {
    a.reactions.M = -outerForcesMomentsSum(beam, a.x); //3-й закон Ньютона, мать его!
    beam.addLoad('moment', a.x, a.reactions.M);

    a.reactions.V = (-outerForcesMomentsSum(beam, a.x + beam.length)) /
      beam.length * 1000;

    beam.addLoad('concentrated', a.x, a.reactions.V);
  } else {
    //для реакций опор положительным направлением считается направление снизу вверх
    a.reactions.V = -outerForcesMomentsSum(beam, b.x) / (b.x - a.x) * 1000;
    b.reactions.V = outerForcesMomentsSum(beam, a.x) / (b.x - a.x) * 1000;

    beam.addLoad('concentrated', a.x, a.reactions.V);
    beam.addLoad('concentrated', b.x, b.reactions.V);
  }

  sortLoadsByX(beam.loads); //лучше не убирать )))
}

function countCurrentMoment(beam, pointPositionX, lastLoadIndex) {
  var sum = 0;
  var loads;

  if (lastLoadIndex == undefined) {
    loads = beam.loads.filter(function(item) {
        return item.xStart <= pointPositionX;
        });
  } else {
    loads = beam.loads.slice(0, lastLoadIndex + 1);
  }

  for (var i = 0; i < loads.length; i++) {
    if (typeof loads[i].valueStart == 'string') continue;

    sum += countMomentFromLoad(loads[i], pointPositionX);
  }
  return sum;
}

function divideDestributed(beam) {
  /*функция разбивает распределенные нагрузки, внутри которых встречаются
   **сосредоточенные нагрузки на участки.
   **Необходимо для более простой логики построений
   ** Нагрузка должна быть отсортирована по X
   */
  var target, //распределенная нагрузка, которую разобъем на кусочки
      start = 0, //ее начало
      end = 0, //ее конец
      loads = beam.loads;
  for (var i = 0; i < beam.loads.length; i++) {

    var p = loads[i].type != 'distributed';
    var q = (loads[i].xStart > start && beam.loads[i].xEnd < end); // текущая нагрузка лежит внутри распределенной (start и end - собственно начало и конец распределенной нагрузки)
    if (p && !q) continue; //сосредоточенная нагрузка вне границ (или на границе с) распределенной

    if (!p) { //т.е. нагрузка распределенния
      var a = loads[i].valueStart,
          h = loads[i].xEnd - loads[i].xStart,
          b = loads[i].valueEnd;
      target = loads[i];
      start = target.xStart;
      end = target.xEnd;

    } else {
      //т.е. встретилась сосредоточенная нагрузки или момент
      //в одной точке может сочетаться сразу 2 нагрузки (не распределенные) - F, M
      var currentValue = a + (b - a) / h * (loads[i].xStart - start);

      target.xEnd = loads[i].xStart;
      target.valueEnd = currentValue;
      start = loads[i].xStart;

      if (loads[i + 1] &&
          loads[i + 1].type != 'distributed' &&
          loads[i + 1].xStart == loads[i].xStart) {
        i++; //если в одной точке приложены 2 нераспределенные нагрузки
      }

      loads.splice(i + 1, 0, { //вставляем распределенную за сосредоточенной
type: 'distributed',
xStart: loads[i].xStart,
valueStart: currentValue,
xEnd: end,
valueEnd: b
});
}
}
}

function buildSingleForceDiagramm(beam, index, drawDiagramm) {
  //drawDiagramm - boolean;
  beam = cloneObj(beam);
  beam.loads = [beam.unknownReactions[index]];
  beam.loads[0].valueStart = beam.loads[0].valueEnd = -1;

  mainSystemSupportReactions(beam);
  if (drawDiagramm) {
    let canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 100;
    let c = canvas.getContext('2d');
    beam.recountStartEndOptions(canvas);

    canvasContainer.appendChild(canvas);

    beam.drawMomentDiagram(canvas, c);
    c.strokeText('M', 10, 10);
    c.strokeText(index + 1 + '', 20, 15);
  }

  return beam;
}

function multiplyDiagrams(beam1, beam2) {
  //На первом месте среди аргументов стоит балка с распределенной нагрузкой

  let loads1 = beam1.loads.filter(function(item) {
      return typeof item.valueStart != 'string';
      }),
      loads2 = beam2.loads, //здесь уже нет неизвестных реакций
      sum = 0;

  let points = findCharactericalPoint(beam1, beam2);
  /* С помощью функции findCharactericalPoint балка  разбита по участкам
   * В пределах границы каждого участка однозначно не встретится экстремум (перепад), т.к. все нагрузки приложены по краям участка
   * Следовательно, мы можем применить правило Верещагина
   * В общем случае на участке действуют нагрузки от:
   * - момента, который дает прямоугольную эпюру
   * - суммы поперечных сил - вычисленное в начале участка значение Q, которая дает треугольную эпюру
   *   - значения равномерной распределенной силы (если есть), который дает эпюру квадратичной функции
   *   - значения трапецевидной нагрузки (если есть), которое дает эпюру кубической функции
   * Суммируя площади эпюр всех составляющих, получим итоговую эпюру.
   */

  for (let i = 1; i < points.length; i++) {
    var sectionLength = points[i] - points[i - 1];

    //теперь нужно определиться со знаками
    let valueM = countCurrentMoment(beam1, points[i - 1]);
    let valueQ = countCurrentShareForce(beam1, points[i - 1]);

    //Интеграл произведения функций от момента и функции от единичной силы (по правилу Верещагина)
    let sM = valueM * (sectionLength / 1000) * countCurrentMoment(beam2, points[i - 1] + sectionLength / 2);
    let sQ = 0.5 * valueQ * (sectionLength / 1000) ** 2 * countCurrentMoment(beam2, points[i - 1] + sectionLength * 2 / 3);

    sum += sM + sQ;

    //Посмотрим, есть ли на участке распределенная нагрузка
    let loadDistributed = loads1.filter(function(item) {
        return item.xEnd == points[i] && item.type == 'distributed';
        });

    if (loadDistributed.length) {
      let valueQEven = loadDistributed[0].valueStart;

      let sQEven = valueQEven * ((sectionLength / 1000) ** 3) / 6 *
        countCurrentMoment(beam2, points[i - 1] + 0.75 * sectionLength);

      sum += sQEven;

      let valueQTrapezoidal = loadDistributed[0].valueEnd - loadDistributed[0].valueStart;

      if (valueQTrapezoidal == 0) continue;
      let sQTrapeziodal = 0;

      sQTrapeziodal = valueQTrapezoidal * ((sectionLength / 1000) ** 3) / 24 *
        countCurrentMoment(beam2, points[i - 1] + 0.8 * sectionLength);

      sum += sQTrapeziodal;
    }
  }

  if (beam1.E != 1 && beam1.I != 1) {
    return sum / (beam1.E / 1e4) / (beam1.I / 1e4);
    //чтобы минимизировать ошибку округления, а затем получить результат прогиба в мм
    //т.к. [E] = [МПа], [I] = [см^4].
  } else {
    return sum;
  }
}

function findCharactericalPoint(beam1, beam2) {
  //Ищет все точки возможных переломов функций моментов балок
  let points = [];
  let xStarts, xEnds;

  for (let i = 0; i < 2; i++) {
    xStarts = arguments[i].loads.map(function(item) {
        return item.xStart;
        });
    xEnds = arguments[i].loads.map(function(item) {
        return item.xEnd;
        });

    points = points.concat(xStarts);
    points = points.concat(xEnds);
  }

  let result = new Set(points);
  result = [...result];
  result.sort((a, b) => a - b);
  return result;
}

function countMomentFromLoad(load, pointPositionX) {
  var moment;
  var s = pointPositionX - load.xStart;

  switch (load.type) {
    case "moment":
      moment = load.valueStart;
      break;

    case "concentrated":
      moment = s * load.valueStart / 1000; //pointPositionX в мм, отсюда и делим на 1000
      break;

    case "distributed":
      var a = load.valueStart,
          h = load.xEnd - load.xStart,
          b, xcg;

      if (pointPositionX > load.xEnd) {
        b = load.valueEnd;
        xcg = h / 3 * (a + 2 * b) / (a + b) + load.xStart;

        moment = (a + b) / 2 * h * (pointPositionX - xcg) / 10e5;

      } else {
        b = a + (load.valueEnd - a) / h * s;
        xcg = (s !== 0) ? s / 3 * (a + 2 * b) / (a + b) + load.xStart : 0;
        moment = (a + b) / 2 * s * (pointPositionX - xcg) / 10e5;
      }

      break;
  }
  return moment;
}

function makeSystemOfLinearEquations(beams) {
  let matrixA = [];
  let vectorB = [];
  let vectorX = [];

  //multiplyDiagrams(beams[0], beams[1]);
  for (let i = 0; i < beams.length - 1; i++) {
    matrixA.push([]);
    for (let j = 0; j < beams.length - 1; j++) {
      matrixA[i][j] = multiplyDiagrams(beams[i + 1], beams[j + 1]);
      vectorB[i] = multiplyDiagrams(beams[0], beams[i + 1]);
    }
  }

  vectorX = solveLinearEquations(matrixA, vectorB);
  return vectorX;
}

function countCurrentShareForce(beam, pointPositionX, lastLoadIndex) {
  let sum = 0;
  let loads;

  if (lastLoadIndex == undefined) {
    loads = beam.loads.filter(function(item) {
        return item.xStart <= pointPositionX && item.type != 'moment' &&
        typeof item.valueStart != 'string';
        });
  } else {
    loads = beam.loads.filter(function(item, i) {
        return item.type != 'moment' && i < lastLoadIndex + 1 &&
        typeof item.valueStart != 'string';
        });
  }

  for (let i = 0; i < loads.length; i++) {

    if (loads[i].type == "concentrated") sum += loads[i].valueStart; //чтобы минимизировать ошибку округления, а затем получить результат в мм //чтобы минимизировать ошибку округления, а затем получить результат в мм
    else {
      let x = Math.min(pointPositionX, loads[i].xEnd);
      let a = loads[i].valueStart;
      let b = loads[i].valueEnd;
      let c = a + (b - a) * (x - loads[i].xStart) / (loads[i].xEnd - loads[i].xStart);
      sum += (a + c) / 2 * (x - loads[i].xStart) / 1000;
    }
  }
  return sum;
}

function countBeamDeflection(beam, point) {
  let beamWithSingleLoad = cloneObj(beam);
  let beamF = cloneObj(beam);

  let singleLoad = {
type: "concentrated",
      valueStart: 1,
      valueEnd: 1,
      xStart: point,
      xEnd: point
  };

  beamWithSingleLoad.loads = [singleLoad];

  //теперь, чтобы грамотно разбить нагрузку по участкам, необходимо добавить нулевую силу в проверяемой точке
  beamF.loads.push({
type: "concentrated",
valueStart: 0,
valueEnd: 0,
xStart: point,
xEnd: point
});

sortLoadsByX(beamF.loads);
divideDestributed(beamF);

mainSystemSupportReactions(beamWithSingleLoad);
return multiplyDiagrams(beamF, beamWithSingleLoad);
}

function quadraticEquationSolution(a, b, c) {
  //Если нет корней, возвращает пустой массив нулевой длины,
  //если бесконечное множество корней, возвращает массив с единиственным элементом == Infinity
  //Возвращает либо один корень, либо 2
  let roots = [];
  let d;
  if (c == 0 && b == 0 && a == 0) {
    roots.push(Infinity);
  } else if (c != 0 && b == 0 && a == 0) {
    //ничего не делаем
  } else if (c != 0 && b != 0 && a == 0) {
    roots.push(-c / b);
  } else {
    d = b * b - 4 * a * c;
    if (d == 0) {
      roots.push(-b / (2 * a));
    } else if (d > 0) {
      if (a > 0) {
        roots.push((-b - Math.sqrt(d)) / (2 * a));
        roots.push((-b + Math.sqrt(d)) / (2 * a));
      } else {
        roots.push((-b + Math.sqrt(d)) / (2 * a));
        roots.push((-b - Math.sqrt(d)) / (2 * a));
      }
    } else {
      //ничего не делаем
    }
  }
  return roots;
}

function findExtremum(beam, load, loadIndex) {
  //сведем к решению квадратного уравнения
  //все выкладки были предварительно проведены аналитически
  //load - распределенная нагрузка
  let QStart = countCurrentShareForce(beam, load.xStart);
  let QEnd = countCurrentShareForce(beam, load.xEnd, loadIndex);

  if (QStart * QEnd >= 0) { //т.е. эпюра Q не обращается в нуль
    return load.xStart;
  }

  let a = 0,
      b = 0,
      c = 0; //коэффициенты квадратного уравнения, к решению которого все и сведется
  let g = Math.min(load.valueStart, load.valueEnd); //прямогольная часть трапецевидной нагрузки или просто распределенная
  let q; //треугольная часть трапецивидной нагрузки
  let l = (load.xEnd - load.xStart) / 1000; //длина участка

  if (load.valueStart > load.valueEnd) {
    q = load.valueStart - load.valueEnd;
    a = -q / (2 * l);
    b = g + q;
  } else {
    q = load.valueEnd - load.valueStart;
    a = q / (2 * l);
    b = g;
  }
  c = QStart;
  let roots = quadraticEquationSolution(a, b, c); //надо помнить, что roots в метрах

  let extremumPoint = roots.filter(function(item) {
      return item > 0 && item < load.xEnd / 1000;
      })[0];
  extremumPoint *= 1000;

  extremumPoint += load.xStart;
  beam.momentExtremum.push(extremumPoint);
  return extremumPoint;
}

function sumCoincidentLoads(loads) {
  //Совпадать могут только моменты и силы.
  for (let i = 1; i < loads.length; i++) {
    if (loads[i].xStart == loads[i - 1].xStart &&
        loads[i].type == loads[i - 1].type) {
      loads[i - 1].valueStart = loads[i - 1].valueEnd += loads[i].valueStart;
      loads.splice(i--, 1);
    }
  }
}
