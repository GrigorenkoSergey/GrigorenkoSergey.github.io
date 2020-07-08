'use strict';

function solveLinearEquations(matrixA, vectorB) {
  /*В решении использован метод LU-разложения в комбинации с т.н. rook's pivoting.
   * Литература:
   * Matthew W. Reid "Pivoting for LU Factorization", 
   * George Poole, Larry Neal "The Rook's pivoting strategy".
   */

  //Во первых, перепишем коэффициенты матрицы так, чтобы максимальный элемент в строке был равен единице
  //let matrixACopy = matrixA.slice(); //копируем массив для внутреннего пользования
  let matrixACopy = matrixA; //копируем массив для внутреннего пользования
  let scalingVector = scaleMatrix(matrixACopy);
  let result = LUDecomposition(matrixACopy);
  //переставим правосторонний вектор.
  let b = result.b; //так же является временным хранилищем значений vectorB
  //однако, если далее потребуется вспомнить значение result.b, то необходимо будет здесь клонировать объект, т.к.
  //сейчас b - это просто ссылка на объект, который мы сейчас поменяем
  for (let i = 0; i < matrixACopy.length; i++) {
    b[i] = vectorB[b[i]] * scalingVector[b[i]];
  }

  let y = directSubstitution(result.lu, b);
  let x = reverseSubstitution(result.lu, y);

  //теперь переставим строки ответа 
  let xIndexes = result.x;
  let vectorX = [];;
  for (let i = 0; i < matrixACopy.length; i++) {
    vectorX[xIndexes[i]] = x[i];
  }
  return vectorX;
}

function scaleMatrix(matrixA) {
  let scalingVector = []; //для последующего масштабирования правостороннего вектора //Можно было бы в одном цикле поменять и вектор "B", но для LU-разложения можно использовать разные правосторонние вектора,
  //поэтому, пока не будем менять, т.к., возможно, далее воспользуемся этим преимуществом
  for (let i = 0; i < matrixA.length; i++) {

    let max = matrixA[i].reduce(function(max, item) {
      let temp = Math.abs(item);
      if (temp > max) max = temp;
      return max;
    }, Math.abs(matrixA[i][0]));

    matrixA[i] = matrixA[i].map(function(item) {
      return item / max;
    });
    scalingVector[i] = 1 / max;
  }
  return scalingVector;
}

function LUDecomposition(matrixA) {
  let n = matrixA.length;
  let b = []; //перестановки правостороннего вектора
  let x = []; //перестановки столбцов
  let lu = [];

  for (let i = 0; i < n; i++) {
    lu[i] = matrixA[i].slice();
    b[i] = x[i] = i;
  }

  for (let k = 0; k < n - 1; k++) {
    rookPivoting(lu, k, b, x);
    for (let i = k + 1; i < n; i++) {
      let factor = lu[i][k] / lu[k][k];
      lu[i][k] = factor;

      for (let j = k + 1; j < n; j++) {
        lu[i][j] = lu[i][j] - lu[k][j] * factor;
      }
    }
  }
  return {
    "lu": lu,
    "b": b,
    "x": x
  }
}

function rookPivoting(matrixA, k, b, x) {
  /* matrixA - матрица, которую подают на вход
   *  k - элемент диагонали, ниже которого происходит поиск
   *  b - вектор перестановок правостороннего вектора
   *  x - перестановки столбцов
   */
  let row, col;
  let maxInRow, maxInCol;
  /*
    maxInCol = {
      value: maximumValueInCol,
      row: correspondingRow,
      col: correspondingColumn
    }
  */
  row = col = k;
  do {
    maxInCol = findMaxAbsInCol(matrixA, col, k);
    row = maxInCol.row;
    maxInRow = findMaxAbsInRow(matrixA, row, k);
    col = maxInRow.col;
  } while (maxInCol.value < maxInRow.value);

  let pivot = maxInCol; //переменная введена просто для понимания

  swapLines(matrixA, k, pivot.row);
  swapLines(b, k, pivot.row);

  swapCols(k, pivot.col);
  swapLines(x, k, pivot.col);

  return;

  function swapLines(matrixElem, line1, line2) {
    if (line1 == line2) return;
    let tmp = matrixElem[line1];
    matrixElem[line1] = matrixElem[line2];
    matrixElem[line2] = tmp;
  }

  function swapCols(col1, col2) {
    if (col1 == col2) return;
    let tmp;
    for (let i = 0; i < matrixA.length; i++) {
      tmp = matrixA[i][col1];
      matrixA[i][col1] = matrixA[i][col2];
      matrixA[i][col2] = tmp;
    }
  }
}

function findMaxAbsInCol(matrixA, col, startingRow) {
  //подразумевается квадратная матрица
  //нумерация с нуля 
  let max = Math.abs(matrixA[startingRow][col]);

  let result = {
    value: matrixA[startingRow][col],
    row: startingRow,
    col: col
  };

  let temp;

  for (let i = startingRow + 1; i < matrixA.length; i++) {
    if ((temp = Math.abs(matrixA[i][col])) <= max) continue;
    max = temp;
    result.value = matrixA[i][col];
    result.row = i;
  }

  if (max == 0) throw new Error('Матрица вырожденная');
  return result;
}

function findMaxAbsInRow(matrixA, row, startingCol) {
  //подразумевается квадратная матрица
  //нумерация с нуля
  let max = Math.abs(matrixA[row][startingCol]);

  let result = {
    value: matrixA[row][startingCol],
    row: row,
    col: startingCol
  };

  let temp;

  for (let j = startingCol + 1; j < matrixA.length; j++) {
    if ((temp = Math.abs(matrixA[row][j])) <= max) continue;
    max = temp;
    result.value = matrixA[row][j];
    result.col = j;
  }

  if (max == 0) throw new Error('Матрица вырожденная');
  return result;
}

function directSubstitution(lu, vectorB) {
  let y = []; //его и возвратим в качестве результата
  y[0] = lu[0][0];
  let sum;
  for (let i = 0; i < lu.length; i++) {
    sum = 0;
    for (let k = 0; k < i; k++) {
      sum += y[k] * lu[i][k];
    }
    y[i] = vectorB[i] - sum;
  }
  return y;
}

function reverseSubstitution(lu, vectorY) {
  let n = lu.length;
  let x = new Array(n);
  x[n - 1] = vectorY[n - 1] / lu[n - 1][n - 1];

  let sum;
  for (let i = n - 2; i >= 0; i--) {
    sum = 0;
    for (let k = i + 1; k < n; k++) {
      sum += lu[i][k] * x[k];
    }
    x[i] = (vectorY[i] - sum) / lu[i][i];

  }
  return x;
}
