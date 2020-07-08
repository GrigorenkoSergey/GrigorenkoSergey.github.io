'use strict'

function Beam(options) {
  if (!options) throw new Error('не задано ни одной опции');
  this.length = +options.length; //длина в мм
  this.supports = options.supports || [];
  this.loads = options.loads || [];
  this.beamStart = options.beamStart || { //на случай, если надумаю расширить программу
    x: canvas.width / 8,
    y: canvas.height / 2
  };
  this.beamEnd = options.beamEnd || { //на случай, если надумаю расширить программу
    x: canvas.width * 7 / 8,
    y: canvas.height / 2
  };
  this.angle = options.angle || 0;
  this.E = options.E || 1; //Young modulus
  this.I = options.I || 1; //Moment of Inertia
	this.momentExtremum = [];
}

Beam.prototype.addLoad = function(type, xStart, valueStart, xEnd, valueEnd) {
  if (type != "distributed") {
    xEnd = +xStart;
    valueEnd = +valueStart;
  }

  var newLoad = {
    type: type,
    xStart: +xStart,
    valueStart: valueStart, //значения нагрузок не преобразовал в числа специально, т.к. строковые значения потребуются при последующем расчете
    xEnd: +xEnd,
    valueEnd: valueEnd
  };

  this.loads.push(newLoad);

  return this;
}
// пока предположим, что все задано корректно, не буду прицеплять проверки на правильность данных
Beam.prototype.addSupport = function(type, x) {
  var obj = {
    type: type,
    x: +x
  };
  this.supports.push(obj);
  return obj;
}

//внутренняя функция
Beam.prototype._addSupportReactions = function() {
  for (var i = 0, len = this.supports.length; i < len; i++) {
    var support = this.supports[i];
    switch (support.type) {
      case 'hinged-movable':
        support.reactions = {
          'V': null
        };
        break;
      case 'hinged-fixed':
        support.reactions = {
          'V': null,
          'H': null
        };
        break;
      case 'rigid-clamping':
        support.reactions = {
          'V': null,
          'H': null,
          'M': null
        };
        break;
    }
  }
}

Beam.prototype.drawBeam = null; //эта, а также многие другие фундкции именно расования задаются в файле drawBeam
