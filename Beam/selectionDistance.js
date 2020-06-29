'use strict';

let beamNew = new Beam({
length: 1000,
angle: 0
});

beamNew.loads = [{
type: "distributed",
        xStart: 0,
        xEnd: 1000,
        valueStart: 0,
        valueEnd: 10
}];

let x0, x1, x2, x3, x4;
let minM = Infinity;
let supports;
/*
//для двух опор
for (x1 = 300; x1 < 501; x1 += 10) {
for (x2 = 800; x2 < 1001; x2 += 10) {
beamNew.supports = [{
type: "hinged-fixed",
x: x1
},
{
type: "hinged-fixed",
x: x2
}
];

count(beamNew);

let tempMax = Math.max(Math.abs(beamCounted.maxM.yMax.y), Math.abs(beamCounted.maxM.yMin.y));
if (tempMax < minM) {
minM = tempMax;
supports = [x1, x2];
}
}
}
/*
//для трех опор
for (x1 = 200; x1 < 401; x1 += 10) {
for (x2 = 550; x2 < 750; x2 += 10) {
for (x3 = 800; x3 < 1001; x3 += 10) {
beamNew.supports = [{
type: "hinged-fixed",
x: x1
},
{
type: "hinged-fixed",
x: x2
},
{
type: "hinged-fixed",
x: x3
}
];

count(beamNew);

let tempMax = Math.max(Math.abs(beamCounted.maxM.yMax.y), Math.abs(beamCounted.maxM.yMin.y));
if (tempMax < minM) {
minM = tempMax;
supports = [x1, x2, x3];
}
}
}
}
*/
/*
//для четырех опор
for (x1 = 200; x1 < 401; x1 += 50) {
for (x2 = x1 + 200; x2 < 701; x2 += 50) {
for (x3 = x2 + 200; x3 < 901 ; x3 += 50) {
for (x4 = x3 + 200; x4 < 1001; x4 += 50) {
beamNew.supports = [{
type: "hinged-fixed",
x: x1
},
{
type: "hinged-fixed",
x: x2
},
{
type: "hinged-fixed",
x: x3
},
{
type: "hinged-fixed",
x: x4
}
];

count(beamNew);
let tempMax = Math.max(Math.abs(beamCounted.maxM.yMax.y), Math.abs(beamCounted.maxM.yMin.y));
if (tempMax <= minM) {
minM = tempMax;
supports = [x1, x2, x3, x4];
}
}
}
}
}
*/

//для пяти опор
for (x0 = 0; x0 < 90; x0 += 10) {
  for (x1 = 290; x1 < 331; x1 += 10) {
    for (x2 = 590; x2 < 631; x2 += 10) {
      for (x3 = 780; x3 < 851 ; x3 += 10) {
        for (x4 = 1000; x4 < 1001; x4 += 20) {
          beamNew.supports = [{
type: "hinged-fixed",
        x: x0
          },

            {
type: "hinged-fixed",
      x: x1
            },
            {
type: "hinged-fixed",
      x: x2
            },
            {
type: "hinged-fixed",
      x: x3
            },
            {
type: "hinged-fixed",
      x: x4
            }
          ];

          count(beamNew);
          let tempMax = Math.max(Math.abs(beamCounted.maxM.yMax.y), Math.abs(beamCounted.maxM.yMin.y));
          if (tempMax <= minM) {
            minM = tempMax;
            supports = [x0, x1, x2, x3, x4];
          }
        }
      }
    }
  }
}
console.log(supports);


