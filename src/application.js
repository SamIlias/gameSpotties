import _ from 'lodash';

function generateTable(rowNum, colNum) {
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
  tbl.setAttribute('class', 'table-bordered');
  tbl.setAttribute('class', 'table-success');

  return tbl;
}

const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const render = (table, tableValues) => {
  for (let i = 0; i < 4; i += 1) {
    for (let j = 0; j < 4; j += 1) {
      /* eslint-disable no-param-reassign */
      const curValue = tableValues[4 * i + j];
      table.rows[i].cells[j].classList.remove('table-active');
      table.rows[i].cells[j].textContent = curValue;
      if (!curValue) {
        table.rows[i].cells[j].classList.add('table-active');
      }
    }
  }
};

const moveActiveCell = (actionKey, fieldValues) => {
  const acceptableKeys = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'];
  if (!acceptableKeys.includes(actionKey)) {
    return;
  }

  const prevActiveIndex = fieldValues.indexOf(null);
  let newIndex;
  switch (actionKey) {
    case 'ArrowRight':
      if (prevActiveIndex % 4 !== 0 && prevActiveIndex !== 0) {
        newIndex = prevActiveIndex - 1;
      } else {
        return;
      }
      break;
    case 'ArrowLeft':
      if ((prevActiveIndex + 1) % 4 !== 0) {
        newIndex = prevActiveIndex + 1;
      } else {
        return;
      }
      break;
    case 'ArrowDown':
      if (prevActiveIndex - 4 >= 0) {
        newIndex = prevActiveIndex - 4;
      } else {
        return;
      }
      break;
    case 'ArrowUp':
      if (prevActiveIndex + 4 < 16) {
        newIndex = prevActiveIndex + 4;
      } else {
        return;
      }
      break;
    default:
      return;
  }

  const temp = fieldValues[newIndex];
  fieldValues[newIndex] = fieldValues[prevActiveIndex];
  fieldValues[prevActiveIndex] = temp;
};

export default (randomize = _.shuffle) => {
  const divEl = document.querySelector('.gem-puzzle');
  const newTable = generateTable(4, 4);
  divEl.appendChild(newTable);

  const shuffleValues = randomize(values);
  shuffleValues.push(null);

  const table = divEl.firstElementChild;
  render(table, shuffleValues);

  document.body.addEventListener('keyup', e => {
    const { key } = e;
    moveActiveCell(key, shuffleValues);
    render(table, shuffleValues);
  });
};
