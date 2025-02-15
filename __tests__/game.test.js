/**
 * @jest-environment jsdom
 */
import _ from 'lodash';
import onChange from 'on-change';
import spottiesgame, { generateTable, render } from '../src/application';

describe('generateTable', () => {
  test('should create a table with correct dimensions', () => {
    const table = generateTable(4, 4);
    expect(table.tagName).toBe('TABLE');
    expect(table.rows.length).toBe(4);
    expect(table.rows[0].cells.length).toBe(4);
  });
});

describe('Game State', () => {
  let state;
  let watchedState;

  beforeEach(() => {
    document.body.innerHTML = `
      <div class="gem-puzzle"></div>
      <div class="counter">0</div>
      <div id="modal" style="display: none;"></div>
      <div id="move-count"></div>
      <button id="restart"></button>
    `;

    state = {
      completed: false,
      fieldNums: [],
      moveCount: 0,
    };

    watchedState = onChange(state, render);
    spottiesgame(_.identity);
  });

  test('should update move count in DOM', () => {
    watchedState.moveCount = 5;
    expect(document.querySelector('.counter').textContent).toBe('5');
  });

  test('should show modal on game completion', () => {
    watchedState.completed = true;
    render('completed', true);
    expect(document.getElementById('modal').style.display).toBe('flex');
  });
});
