"use strict";

const board = document.querySelector('#board'),
      SQUARES_NUMBER = 220,
      colors = ['red', 'blue', 'green', 'yellow', 'purple'];

for (let i = 0; i < SQUARES_NUMBER; i++) {
    const square = document.createElement('div');
    square.classList.add('square');

    square.addEventListener('mouseover', () => {
        setColor(square);
    });
    square.addEventListener('mouseleave', () => {
        removeColor(square);
    });

    board.append(square);
}

function setColor(el) {
    const color = getRandomColor();
    el.style.backgroundColor = color;
    el.style.boxShadow = `0 0 2px ${color}, 0 0 20px ${color}`;
}
function removeColor(el) {
    el.style.backgroundColor = '#1d1d1d';
    el.style.boxShadow = `0 0 2px #1d1d1d`;
}

// function getRandomColor() {
//     const index = Math.floor(Math.random() * colors.length);
//     return colors[index];
// }

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let customColor = '#';
    for (let i = 0; i < 6; i++) {
      customColor += letters[Math.floor(Math.random() * 16)];
    }
    return customColor;
  }