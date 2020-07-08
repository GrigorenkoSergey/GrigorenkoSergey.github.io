Beam.prototype.drawingConstants = {
  r: 3, //не несет глубокого смысла, просто константа для масштабирования рисунка опоры
  maxDistributedLoadHeight: canvas.height / 5,
  minDistributerLoadHeight: canvas.height / 15,
  maxConcentratedLoadHeight: canvas.height / 3,
  minConcentratedLoadHeight: canvas.height / 9,
  maxMomentLoadHeight: canvas.height / 5,
  minMomentLoadHeight: canvas.height / 15,
  maxMomentDiagramHeight: canvas.height / 5,
  loadsFont: 'italic 10px sans-serif',
  fontHeight: 10,
  concentratedLoadsStyle: 'red',
  momentsLoadStyle: 'green',
  distributedLoadStyle: 'blue'
}

Beam.prototype.recountStartEndOptions = function(canvas) {
  this.beamStart = {
    x: canvas.width / 8,
    y: canvas.height / 2
  };
  this.beamEnd = {
    x: canvas.width * 7 / 8,
    y: canvas.height / 2
  };
}

Beam.prototype.drawBeam = function(canvas, context, drawDimensions, doNotDrawSupports) {
  if (!this.length) return;
  var c = context;

  c.clearRect(0, 0, canvas.width, canvas.height);

  var beamLength = Math.sqrt(
    Math.pow(this.beamStart.x - this.beamEnd.x, 2) +
    Math.pow(this.beamStart.y - this.beamEnd.y, 2)
  );

  this.drawingConstants.beamLength = beamLength;
  this.textCoords = [];

  //привязываем начало координат к началу балки
  c.save();
  c.translate(this.beamStart.x, this.beamStart.y);
  if (this.angle) c.rotate(this.angle);//вряд ли когда расширю

  c.beginPath();
  c.moveTo(0, 0);
  c.lineTo(this.drawingConstants.beamLength, 0);
  c.stroke();
  c.closePath();

  if (this.supports.length && doNotDrawSupports === undefined) {
    this.drawSupports(context);
    if (drawDimensions) this._drawDimensions();
  }

  if (this.loads.length) this._drawLoads(context);
  if (this.textCoords.length) this.drawText(context);
  this.textCoords.length = 0;

  c.restore();
}

Beam.prototype._drawDimensions = function() {
  let r = this.drawingConstants.r;
  let x = 0;
  let y = 50;
  let scaleX = this.drawingConstants.beamLength / this.length;
  let length = 0;

  c.textAlign = 'center';

  c.moveTo(x, y);
  c.lineTo(x - 2 * r, y);
  drawSerif(x, y);

  let prevX = 0;
  let deltaX = 0;
  for (let i = 0; i < this.supports.length; i++) {
    x = this.supports[i].x * scaleX;
    deltaX = x - prevX;
    if (!deltaX) continue;
    c.lineTo(x, y);
    drawSerif(x, y);

    length = Math.round(deltaX / scaleX);
    c.strokeText(length, x - deltaX / 2, y - r);

    prevX = x;
  }

  x = this.drawingConstants.beamLength;
  deltaX = x - prevX;

  if (deltaX) {
    c.lineTo(x, y);
    drawSerif(x, y);
    length = Math.round(deltaX / scaleX);

    c.strokeText(length, x - deltaX / 2, y - r);
    c.lineTo(x + 2 * r, y);
  }
  c.stroke();

  function drawSerif(x, y) {
    c.moveTo(x - 1.5 * r, y + 1.5 * r);
    c.lineTo(x + 1.5 * r, y - 1.5 * r);
    c.moveTo(x, y - 4 * r);
    c.lineTo(x, y + 2 * r);
    c.moveTo(x, y);
  }
}

Beam.prototype.drawSupports = function(context) {
  for (var i = 0; i < this.supports.length; i++) {
    var x = this.drawingConstants.beamLength * this.supports[i].x / this.length;

    switch (this.supports[i].type) {
      case 'hinged-fixed':
        this._drawHingedFixedSupport(x, context);
        break;
      case 'hinged-movable':
        this._drawHingedMovableSupport(x, context);
        break;
      case 'rigid-clamping':
        this._drawRigidClampingSupport(x, context);
        break;
    }
  }
}

Beam.prototype._drawHingedFixedSupport = function(x, context) {
  var r = this.drawingConstants.r;
  var c = context;

  c.beginPath();
  c.arc(x, r, r, 0, 2 * Math.PI);
  c.moveTo(x, 2 * r);
  c.lineTo(x - 3 * r, 5 * r);
  c.lineTo(x + 3 * r, 5 * r);
  c.lineTo(x, 2 * r);
  c.stroke();
  c.closePath();

  this._drawGround(x, 5 * r, r, 0, context);
}

Beam.prototype._drawGround = function(x, y, r, angle, context) {
  var c = context;

  c.save();
  c.translate(x, y);
  c.rotate(-angle * Math.PI / 180);

  c.beginPath();
  c.moveTo(-6 * r, 0);
  c.lineTo(6 * r, 0);
  for (var i = 0; i < 6; i++) {
    c.moveTo(-5 * r + 2 * r * i, 0);
    c.lineTo(-6 * r + 2 * r * i, 2 * r);
  }

  c.stroke();
  c.closePath();
  c.restore();
}

Beam.prototype._drawHingedMovableSupport = function(x, context) {
  var r = this.drawingConstants.r;
  var c = context;

  this._drawGround(x, 5 * r, r, 0, context);

  c.beginPath();
  c.arc(x, r, r, 0, 2 * Math.PI);
  c.moveTo(x, 2 * r);
  c.lineTo(x, 4 * r);
  c.closePath();
  c.stroke();

  c.beginPath();
  c.arc(x, 5 * r, r, 0, 2 * Math.PI);
  c.fillStyle = 'white';
  c.fill();
  c.stroke();
  c.closePath();
}

Beam.prototype._drawRigidClampingSupport = function(x, context) {
  var angle;
  var c = context;

  if (x == 0) {
    c.save();
    c.scale(1, -1);
    angle = -90;
    this._drawGround(x, 0, 3, angle, context);
    c.restore();
  } else if (x == this.drawingConstants.beamLength) {
    angle = 90;
    this._drawGround(x, 0, 3, angle, context);
  }
}

Beam.prototype._drawLoads = function(context) {
  var max = this.scalingLoads();
  var c = context;

  for (var i = 0; i < this.loads.length; i++) {
    var x = this.drawingConstants.beamLength * this.loads[i].xStart / this.length; //start of all kinds of loads

    c.textAlign = "center";

    switch (this.loads[i].type) {
      case 'concentrated':
        if (typeof this.loads[i].valueStart == 'string') {
          this._drawConcentratedLoad(x, -1, this.loads[i].valueStart, context);
        } else {
          this._drawConcentratedLoad(x, this.loads[i].valueStart / max.maxConcentrated, this.loads[i].valueStart, context);
        }
        break;

      case 'distributed':
        var valueStart = this.loads[i].valueStart,
          valueEnd = this.loads[i].valueEnd,
          maxValue = Math.max(Math.abs(valueStart), Math.abs(valueEnd)),
          scale = maxValue / max.maxDistributed,
          loadLength = (this.loads[i].xEnd - this.loads[i].xStart) * this.drawingConstants.beamLength / this.length;

        this._drawDistributedLoad(x, scale, valueStart, valueEnd, loadLength, context);
        break;

      case 'moment':
        valueStart = this.loads[i].valueStart;
        if (typeof this.loads[i].valueStart == 'string') {
          scale = -1;
        } else {
          scale = valueStart / max.maxMoment;
        }
        this._drawMoment(x, scale, valueStart, context);
        break;
    }
  }
  c.strokeStyle = 'black';
}

Beam.prototype.scalingLoads = function() {
  self = this;

  function findMax(type) {
    var max = -Infinity;
    for (var i = 0; i < self.loads.length; i++) {
      if (self.loads[i].type != type) continue;

      var maxCurrentLoadValue = Math.max(Math.abs(self.loads[i].valueStart), Math.abs(self.loads[i].valueEnd));

      if (maxCurrentLoadValue >= max) max = maxCurrentLoadValue;
    }

    return max;
  }

  return {
    maxConcentrated: findMax('concentrated'),
    maxDistributed: findMax('distributed'),
    maxMoment: findMax('moment')
  }
}

Beam.prototype._drawConcentratedLoad = function(x, scale, value, context) {
  if (value == 0) return;

  var c = context;

  var maxLineLength = this.drawingConstants.maxConcentratedLoadHeight,
    minLineLength = this.drawingConstants.minConcentratedLoadHeight;
  var lineLength = scale >= 0 ? Math.max(maxLineLength * scale, minLineLength) :
    Math.min(maxLineLength * scale, -minLineLength);

  var r = scale > 0 ? this.drawingConstants.r : -this.drawingConstants.r;

  c.textBaseline = scale < 0 ? 'top' : 'bottom';
  c.strokeStyle = this.drawingConstants.concentratedLoadsStyle;
  c.font = this.drawingConstants.loadsFont;

  c.beginPath();
  c.moveTo(x, -lineLength);
  c.lineTo(x, 0);
  c.moveTo(x - r, -3 * r);
  c.lineTo(x, 0);
  c.lineTo(x + r, -3 * r);
  c.stroke();
  c.closePath();

  var add = (lineLength < 0) ? 10 : 0;
  if (typeof value != 'string') value = Math.abs(value);
  this._addTextCoord(value, Math.round(x), Math.round(-lineLength + add), c.strokeStyle, context);
  c.textBaseline = 'bottom';
}

Beam.prototype._drawDistributedLoad = function(x, scale, valueStart, valueEnd, loadLength, context) {
  var c = context;
  var maxLineLength = this.drawingConstants.maxDistributedLoadHeight,
    minLineLength = this.drawingConstants.minDistributerLoadHeight;

  var lineLength = Math.max(maxLineLength * scale, minLineLength),
    r = this.drawingConstants.r,
    max = Math.max(Math.abs(valueStart), Math.abs(valueEnd)),
    valueStartScaling = valueStart / max * lineLength, // ордината начала линии нагрузки
    valueEndScaling = valueEnd / max * lineLength; // ордината конца линии нагрузки

  c.strokeStyle = this.drawingConstants.distributedLoadStyle;
  c.font = this.drawingConstants.loadsFont;

  var step = 3 * r,
    repeats = Math.round(loadLength / step) + 1,
    i;
  step = loadLength / repeats;

  c.beginPath();
  c.moveTo(x, 0);
  c.lineTo(x, -valueStartScaling);
  c.lineTo(x + loadLength, -valueEndScaling);
  c.lineTo(x + loadLength, 0);
  c.stroke();
  c.closePath();
  c.save();
  c.clip();

  for (i = 0; i < repeats; i++) {
    c.beginPath();
    c.moveTo(x + step * i, lineLength);
    c.lineTo(x + step * i, -lineLength);
    c.stroke();
    c.closePath();
  }
  c.restore();

  var addStart = (valueStartScaling < 0) ? 10 : 0, //для положительного и отрицательного Y
    addEnd = (valueEndScaling < 0) ? 10 : 0;

  this._addTextCoord(valueStart, Math.round(x), Math.round(-valueStartScaling * 1.1 + addStart), c.strokeStyle, context);
  this._addTextCoord(valueEnd, Math.round(x + loadLength), Math.round(-valueEndScaling * 1.1 + addEnd), c.strokeStyle, context);
}

Beam.prototype._drawMoment = function(x, scale, value, context) {
  var c = context;
  var maxLineLength = this.drawingConstants.maxMomentLoadHeight,
    minLineLength = this.drawingConstants.minMomentLoadHeight;

  var lineLength = scale >= 0 ? Math.max(maxLineLength * scale, minLineLength) :
    Math.min(maxLineLength * scale, -minLineLength),

    r = Math.max(this.drawingConstants.r * Math.abs(scale), this.drawingConstants.r / 1.5), //иначе иногда стрелочки просто пропадают при малых значениях нагрузок
    R = Math.cos(45 * Math.PI / 180) * Math.abs(lineLength),

    startArcX = x + lineLength * Math.cos(45 * Math.PI / 180),
    startArcY = -Math.abs(lineLength) * Math.sin(45 * Math.PI / 180),
    startAngle = lineLength > 0 ? 0 : Math.PI,
    endAngle = lineLength > 0 ? Math.PI : 0,
    antiClockWise = lineLength > 0 ? true : false;

  c.strokeStyle = this.drawingConstants.momentsLoadStyle;
  c.font = this.drawingConstants.loadsFont;

  c.beginPath();
  c.moveTo(x, 0);
  c.lineTo(startArcX, startArcY);
  c.arc(x, startArcY, R, startAngle, endAngle, antiClockWise);

  //draw arrow
  if (scale < 0) {
    c.moveTo(startArcX + 2 * R - 1.5 * r, startArcY - 1.5 * r);
    c.lineTo(startArcX + 2 * R, startArcY);
    c.lineTo(startArcX + 2 * R + 0.5 * r, startArcY - 2 * r);
  } else {
    c.moveTo(startArcX - 2 * R + 1.5 * r, startArcY - 1.5 * r);
    c.lineTo(startArcX - 2 * R, startArcY);
    c.lineTo(startArcX - 2 * R - 0.5 * r, startArcY - 2 * r);
  }

  c.stroke();
  c.closePath();
  if (value < 0) value = -value;
  this._addTextCoord(value, Math.round(x), Math.round(-2.2 * R), c.strokeStyle, context);
}

Beam.prototype._addTextCoord = function(value, x, y, color, context) {
  var c = context;
  var temp = {
    text: value,
    x: +x, //(x, y) будут постоянными, будем изменять значения свойств x0, y0
    y: +y,
    x0: +x,
    y0: +y,
    width: +c.measureText(value).width,
    color: color
  }

  temp.x0Min = Math.round(temp.x - temp.width / 2 - 10); //крайнее левое положение начала текста
  temp.x0Max = Math.round(temp.x + temp.width / 2 + 10); // крайнее правое положение начала текста
  temp.y0Min = Math.round(temp.y - this.drawingConstants.fontHeight / 2); // крайнее верхнее положение начала текста
  temp.y0Max = Math.round(temp.y + this.drawingConstants.fontHeight / 2); //крайнее нижнее положение начала текста

  this.textCoords.push(temp);
}

Beam.prototype.drawText = function(context) {
  var c = context;

  this.fixTextIntersections();

  for (i = 0; i < this.textCoords.length; i++) {
    c.strokeStyle = this.textCoords[i].color;

    if ('xNewStart' in this.textCoords[i]) {
      c.strokeText(roundToFourSignificantDigits(this.textCoords[i].text),
        this.textCoords[i].xNewStart, this.textCoords[i].y);
    } else {
      c.strokeText(roundToFourSignificantDigits(this.textCoords[i].text),
        this.textCoords[i].x0 + this.textCoords[i].width / 2, this.textCoords[i].y0);
    }
  }
  c.strokeStyle = 'black';
}

Beam.prototype.fixTextIntersections = function() {
  var arr = this.textCoords;
  var h = this.drawingConstants.fontHeight;

  for (var i = 0; i < arr.length; i++) { //немного изменим отсчет начала координат текста (изначально привязка была к центру)
    arr[i].x0 = Math.round(arr[i].x - arr[i].width / 2); //свойство x0 - координаты левой точки текста
    arr[i].y0 = Math.round(arr[i].y0);
  }



  arr.sort(function(a, b) {
    return a.x0 - b.x0;
  });

  var intersections = findIntersections(arr);

  for (var k = 0; k < 5; k++) { //чтобы не сильно нагружать процессор, ограничу 5 шагами
    if (intersections) break;
    intersections = findIntersections(arr);
    if (k == 5) console.log('Текст выровнять так и не удалось'); //не выровнял за 5 попыток, ну и хер с ним
  }

  return true;

  function findIntersections(arr) {
    var missedElements = [];
    for (var i = 0; i < arr.length - 1; i++) {
      var intersectionsGroup = [];

      var xMin = arr[i].x0,
        xMax = arr[i].x0 + arr[i].width,
        yMin = arr[i].y0 - h,
        yMax = arr[i].y0;

      var intersectionsGroup = findElementsInBoundaries(arr, xMin, xMax, yMin, yMax, arr[i], i);

      if (!intersectionsGroup.length) continue;

      while (intersectionsGroup.length) {

        var target = findElementWithMaxPropertyValueInArray(intersectionsGroup, 'intersectionArea'); //будем взаимодействовать с наиболее сильно перекрывающим элементом    
        //теперь сдвигаем в зависимости от соотношения ширины элемента и пересечения

        if (target.intersectionX < target.intersectionY) {
          if (!moveLeftRight(arr[i], target.self, target.intersectionX) &&
            !moveUpDown(arr[i], target.self, target.intersectionY)) {
            missedElements.push(arr[i]);
          }
        } else {
          if (!moveUpDown(arr[i], target.self, target.intersectionY) &&
            !moveLeftRight(arr[i], target.self, target.intersectionX)) {
            missedElements.push(arr[i]);
          }
        }

        intersectionsGroup.splice(intersectionsGroup.indexOf(target), 1);
      }
    }
    return missedElements.length ? false : true;
  }

  function moveUpDown(item1, item2, intersection) {
    var topElement = item1.y0 < item2.y0 ? item1 : item2;
    var lowElement = topElement == item1 ? item2 : item1;

    var topFreeSpace = 0,
      lowFreeSpace = 0;
    //Определение свободного пространства сверху для верхнего элемента
    var xMin = topElement.x0,
      xMax = topElement.x0 + topElement.width,
      yMin = topElement.y0Min,
      yMax = topElement.y0 - h;

    var higherElements = findElementsInBoundaries(arr, xMin, xMax, yMin, yMax, topElement, 0);

    if (higherElements.length) {
      higherElements.sort(function(a, b) {
        return b.y0 - a.y0;
      });

      topFreeSpace = Math.max(topElement.y0 - h - higherElements[0].self.y0, 0);
    } else {
      topFreeSpace = h / 2;
    }

    //Определение свободного пространства снизу для нижнего элемента
    xMin = lowElement.x0,
      xMax = lowElement.x0 + lowElement.width,
      yMin = lowElement.y0,
      yMax = lowElement.y0Max;

    var lowerElements = findElementsInBoundaries(arr, xMin, xMax, yMin, yMax, lowElement, 0);

    if (lowerElements.length) {
      lowerElements.sort(function(a, b) {
        return a.y0 - b.y0;
      });

      lowFreeSpace = Math.min(lowerElements[0].self.y0 - h - lowElement.y0, 0);
    } else {
      lowFreeSpace = h / 2;
    }

    var deltaXY = estimateSpace(topFreeSpace, lowFreeSpace, intersection);
    if (!deltaXY[2]) return false;

    topElement.y0 = Math.floor(Math.max(topElement.y0 - deltaXY[0], topElement.y0Min));
    lowElement.y0 = Math.ceil(Math.min(lowElement.y0 + deltaXY[1], lowElement.y0Max));

    return true;
  }

  function moveLeftRight(item1, item2, intersection) {

    var leftElement = item1.x0 < item2.x0 ? item1 : item2;
    var rightElement = leftElement == item1 ? item2 : item1;

    var leftFreeSpace = 0,
      rightFreeSpace = 0;

    //Определение свободного пространства слева для левого элемента
    var xMin = leftElement.x0Min,
      xMax = leftElement.x0,
      yMin = leftElement.y0 - h,
      yMax = leftElement.y0;

    var elementsToTheLeft = findElementsInBoundaries(arr, xMin, xMax, yMin, yMax, leftElement, 0);

    if (elementsToTheLeft.length) {

      elementsToTheLeft.sort(function(a, b) {
        return (b.x0 + b.width) - (a.x0 + a.width);
      });

      leftFreeSpace = Math.max(elementsToTheLeft[0].self.x0 + elementsToTheLeft[0].self.width - leftElement.x0, 0);
    } else {
      leftFreeSpace = leftElement.width / 2; //можно потом перевести в константу
    }

    //Определение свободного пространства справа для правого элемента
    xMin = rightElement.x0 + rightElement.width, //округление чтобы исключить левый элемент
      xMax = rightElement.x0Max,
      yMin = rightElement.y0 - h,
      yMax = rightElement.y0;

    var elementsToTheRight = findElementsInBoundaries(arr, xMin, xMax, yMin, yMax, rightElement, 0);

    if (elementsToTheRight.length) {
      rightFreeSpace = Math.max(elementsToTheRight[0].self.x0 - rightElement.x0 - rightElement.width, 0);
    } else {
      rightFreeSpace = rightElement.width / 2;
    }

    var deltaXY = estimateSpace(leftFreeSpace, rightFreeSpace, intersection);

    if (!deltaXY[2]) return false;

    leftElement.x0 = Math.floor(Math.max(leftElement.x0 - deltaXY[0], leftElement.x0Min));
    rightElement.x0 = Math.ceil(Math.min(rightElement.x0 + deltaXY[1], rightElement.x0Max));

    return true;
  }

  function findElementsInBoundaries(arr, xMin, xMax, yMin, yMax, excludedItem, startIndex) {
    var result = [];

    for (var j = startIndex; j < arr.length; j++) {
      if (arr[j].x0 >= xMax) break;
      if (arr[j].x0 + arr[j].width <= xMin) continue;
      if (arr[j].y0 - h >= yMax || arr[j].y0 <= yMin) continue;
      if (arr[j] == excludedItem) continue;

      var intersectionX = xMax - arr[j].x0,
        intersectionY = yMax < arr[j].y0 ? yMax - arr[j].y0 + h : yMin - arr[j].y0, //если значение отрицательное, то пересечение сверху, если положительное, то снизу.
        intersectionY = Math.abs(intersectionY),
        intersectionArea = intersectionX * intersectionY;

      var cover = {
        self: arr[j],
        intersectionX: intersectionX,
        intersectionY: intersectionY,
        intersectionArea: intersectionArea
      }

      result.push(cover);
    }
    return result;
  }

  function estimateSpace(a, b, intersection) {
    var delta = intersection;
    var halfDelta = delta / 2;

    if (a + b < delta) return [a, b, false];
    if (a > halfDelta && b > halfDelta) return [halfDelta, halfDelta, true];
    if (a < halfDelta) return [a, delta - a, true];
    return [delta - b, b, true];
  }
}

Beam.prototype.drawMomentDiagram = function(canvas, context) {
  var c = context;
  c.clearRect(0, 0, canvas.width, canvas.height);

  c.translate(this.beamStart.x, this.beamStart.y);

  if (this.angle) c.rotate(this.angle);
  c.beginPath();

  c.moveTo(0, 0);
  c.lineTo(this.drawingConstants.beamLength, 0);
  c.stroke();

  var loads = this.loads;
  var step = 0.01 * this.length;
  var maxY = this.drawingConstants.maxMomentDiagramHeight,
    x, y;

  var points = [{x:0, y:0}]; 

  for (var i = 0; i < loads.length; i++) {
    if (loads[i].type == 'moment') {
      x = loads[i].xStart;
      y = -countCurrentMoment(this, x, i - 1);
      points.push({
        x: x,
        y: y
      });

      y = -countCurrentMoment(this, x, i);
      points.push({
        x: x,
        y: y
      });

    } else if (loads[i].type == 'concentrated') {

      x = loads[i].xStart;
      y = -countCurrentMoment(this, x, i);
      points.push({
        x: x,
        y: y
      });

    } else { //теперь строим эпюры от распределенной нагрузки
      //здесь надо предусмотреть нахождение точки экстремума
      let extremumPoint = findExtremum(this, loads[i], i);

      //построим до точки экстремума
      for (x = loads[i].xStart; x < extremumPoint; x += step) {
        y = -countCurrentMoment(this, x);
        points.push({
          x: x,
          y: y
        });
      }

      //построим после точки экстремума
      for (x = extremumPoint; x < loads[i].xEnd; x += step) {
        y = -countCurrentMoment(this, x);
        points.push({
          x: x,
          y: y
        });
      }

      if (!loads[i + 1] || loads[i + 1].xStart != loads[i].xEnd) {
        x = loads[i].xEnd;
        y = -countCurrentMoment(this, x);
        points.push({
          x: x,
          y: y
        });
      }
    }
  }

  this.maxM = this.drawPointsAndScale(points, c, maxY);
  c.setTransform(1, 0, 0, 1, 0, 0);
}

Beam.prototype.drawPointsAndScale = function(arrayOfPoints, context, maxY) {
  //maxY - аргумент, показывающий, какое максимальное значение может принимать график функции(т.е. масштабирование, если требуется)
  var c = context;
  var scaleX = this.drawingConstants.beamLength / this.length;

  var yMax = findElementWithMaxPropertyValueInArray(arrayOfPoints, 'y'),
    xMax = yMax.x;
  var yMin = findElementWithMinPropertyValueInArray(arrayOfPoints, 'y'),
    xMin = yMin.x,
    scaleY;

  var h = this.drawingConstants.fontHeight;
  c.save();
  c.strokeStyle = 'green';
  c.textAlign = 'center';

  c.beginPath();
  c.moveTo(arrayOfPoints[0].x * scaleX, arrayOfPoints[0].y * scaleY);

  if (Math.abs(yMax.y) > Math.abs(yMin.y)) {
    scaleY = maxY / yMax.y;
  } else {
    scaleY = maxY / Math.abs(yMin.y);
  }

  for (var i = 0; i < arrayOfPoints.length; i++) {
    c.lineTo(arrayOfPoints[i].x * scaleX, arrayOfPoints[i].y * scaleY);
  }

  if (yMax.y.toFixed(5) != 0) {
    var maxValueText = roundToFourSignificantDigits(yMax.y);
    c.strokeText(maxValueText, xMax * scaleX, yMax.y * scaleY + h);
  }

  if (yMin.y.toFixed(5) != 0) {
    var minValueText = roundToFourSignificantDigits(Math.abs(yMin.y));
    c.strokeText(minValueText, xMin * scaleX, yMin.y * scaleY - 3);
  }
  c.stroke();
  c.restore();

  return {
    "yMax": yMax,
    "yMin": yMin
  }
}

Beam.prototype.drawShareForceDiagram = function(canvas, context) {
  var c = context;
  c.clearRect(0, 0, canvas.width, canvas.height);

  c.translate(this.beamStart.x, this.beamStart.y);

  if (this.angle) c.rotate(this.angle);
  c.beginPath();

  c.moveTo(0, 0);
  c.lineTo(this.drawingConstants.beamLength, 0);
  c.stroke();

  var loads = this.loads;
  var step = 0.01 * this.length;
  var maxY = this.drawingConstants.maxMomentDiagramHeight, //не стал заводить отдельное свойство вроде maxShareForceDiagram
    x, y;

  var points = [{x:0, y:0}];

  for (var i = 0; i < loads.length; i++) {
    if (loads[i].type == 'moment') continue;

    x = loads[i].xStart;
    if (loads[i].type == 'concentrated') {
      y = countCurrentShareForce(this, x, i - 1);
      points.push({
        x: x,
        y: y
      });

      y = countCurrentShareForce(this, x);
      points.push({
        x: x,
        y: y
      });

    } else {
      if (loads[i].valueStart == loads[i].valueEnd) {
        x = loads[i].xEnd;
        y = countCurrentShareForce(this, x, i);

        points.push({
          x: x,
          y: y
        });

      } else { //теперь придется рисовать много точек, т.к. эпюра для трапецивидной нагрузки будет криволинейная
        while (x < loads[i].xEnd) {
          y = countCurrentShareForce(this, x);

          points.push({
            x: x,
            y: y
          });

          x += step;
        }
        points.push({
          x: loads[i].xEnd,
          y: countCurrentShareForce(this, loads[i].xEnd, i)
        });
      }
    }
  }

  this.maxQ = this.drawPointsAndScale(points, c, maxY);

  c.setTransform(1, 0, 0, 1, 0, 0);
}

Beam.prototype.drawBeamDeflections = function(canvas, context) {
  var c = context;
  c.clearRect(0, 0, canvas.width, canvas.height);

  c.translate(this.beamStart.x, this.beamStart.y);

  if (this.angle) c.rotate(this.angle);
  c.beginPath();

  c.moveTo(0, 0);
  c.lineTo(this.drawingConstants.beamLength, 0);
  c.stroke();

  var step = 0.01 * this.length;
  var maxY = this.drawingConstants.maxMomentDiagramHeight; //не стал заводить отдельное свойство вроде maxShareForceDiagram

  var points = [],
    x = 0;

  while (x < this.length) {
    y = countBeamDeflection(this, x);

    points.push({
      x: x,
      y: y
    });

    x += step;
  }

  points.push({
    x: this.length,
    y: countBeamDeflection(this, this.length)
  });

  this.maxV = this.drawPointsAndScale(points, c, maxY);

  c.setTransform(1, 0, 0, 1, 0, 0);
}
