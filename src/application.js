import _ from 'lodash';
import onChange from 'on-change';

/* eslint-disable no-param-reassign */
export function generateTable(rowNum, colNum) {
  const tbl = document.createElement('table');
  const tblBody = document.createElement('tbody');
  for (let i = 0; i < rowNum; i += 1) {
    const row = document.createElement('tr');
    for (let j = 0; j < colNum; j += 1) {
      const cell = document.createElement('td');
      const cellText = document.createTextNode('');
      cell.appendChild(cellText);
      cell.setAttribute('class', 'p-3');
      row.appendChild(cell);
    }
    tblBody.appendChild(row);
  }
  tbl.appendChild(tblBody);
  tbl.setAttribute('border', 2);
  tbl.setAttribute('class', 'table-bordered table-success game-field');

  return tbl;
}

const values = [1, 5, 9, 13, 2, 6, 10, 14, 3, 7, 11, 15, 4, 8, 12];

// VIEW: ----------------------------------------------
export const render = (path, value) => {
  const counterEl = document.querySelector('.counter');
  const gameField = document.querySelector('.game-field');
  const modal = document.getElementById('modal');
  const resultCount = document.getElementById('move-count');

  if (path === 'fieldNums') {
    const fieldNums = value;
    for (let i = 0; i < 4; i += 1) {
      for (let j = 0; j < 4; j += 1) {
        const curValue = fieldNums[4 * i + j];
        gameField.rows[i].cells[j].classList.remove('table-active');
        gameField.rows[i].cells[j].textContent = curValue;
        if (!curValue) {
          gameField.rows[i].cells[j].classList.add('table-active');
        }
      }
    }
  }

  if (path === 'moveCount') {
    counterEl.textContent = value;
  }

  if (path === 'completed') {
    if (value === true) {
      modal.style.display = 'flex';
      modal.classList.add('active');
      resultCount.textContent = `Number of movements is ${counterEl.textContent}`;
    } else {
      modal.classList.remove('active');
    }
  }
};
// ---------------------------------------------------

export default (randomize = _.shuffle) => {
  // MODEL
  const state = {
    completed: false,
    fieldNums: [],
    moveCount: 0,
  };

  // initialisation =================================
  const fieldContainer = document.querySelector('.gem-puzzle');
  const newField = generateTable(4, 4);
  fieldContainer.appendChild(newField);
  const restartButton = document.getElementById('restart');

  const watchedState = onChange(state, render);

  const initialField = randomize(values);
  initialField.push(null);
  watchedState.fieldNums = initialField;

  // CONTROLLER==========================================
  const keyHandler = (actionKey, appState) => {
    const acceptableKeys = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'];
    if (!acceptableKeys.includes(actionKey)) {
      return;
    }

    const prevActiveIndex = appState.fieldNums.indexOf(null);
    let newIndex;
    switch (actionKey) {
      case 'ArrowRight':
        if (prevActiveIndex % 4 !== 0 && prevActiveIndex !== 0) {
          newIndex = prevActiveIndex - 1;
          appState.moveCount += 1;
        } else {
          return;
        }
        break;
      case 'ArrowLeft':
        if ((prevActiveIndex + 1) % 4 !== 0) {
          newIndex = prevActiveIndex + 1;
          appState.moveCount += 1;
        } else {
          return;
        }
        break;
      case 'ArrowDown':
        if (prevActiveIndex - 4 >= 0) {
          newIndex = prevActiveIndex - 4;
          appState.moveCount += 1;
        } else {
          return;
        }
        break;
      case 'ArrowUp':
        if (prevActiveIndex + 4 < 16) {
          newIndex = prevActiveIndex + 4;
          appState.moveCount += 1;
        } else {
          return;
        }
        break;
      default:
        return;
    }

    const temp = appState.fieldNums[newIndex];
    appState.fieldNums[newIndex] = appState.fieldNums[prevActiveIndex];
    appState.fieldNums[prevActiveIndex] = temp;
    // to make the on-change handle the changes of array
    appState.fieldNums = [...appState.fieldNums];
  };

  document.body.addEventListener('keyup', e => {
    if (!watchedState.completed) {
      keyHandler(e.key, watchedState);
    }

    const completedField = [
      1,
      5,
      9,
      13,
      2,
      6,
      10,
      14,
      3,
      7,
      11,
      15,
      4,
      8,
      12,
      null,
    ];

    if (_.isEqual(watchedState.fieldNums, completedField)) {
      watchedState.completed = true;
    }
  });

  restartButton.addEventListener('click', () => {
    const newInitialField = randomize(values);
    newInitialField.push(null);
    watchedState.fieldNums = newInitialField;

    watchedState.completed = false;
    watchedState.moveCount = 0;
  });
};
