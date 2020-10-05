"use strict";
document.addEventListener('DOMContentLoaded', () => {
  //initialising variables etc
  let arrayFurtherDelete = [];
  const resetButton = document.querySelector('[reset-button]');
  const table = document.querySelector('.table-grid');
  const width = 5;
  const tableElements = [];
  const deleted = '';
  const inputSymbols = [
    '♡',
    '♢',
    '♣',
    '♤'
  ]

  //creating a table with elements and everything
  function createTable() {
    for (let i = 0; i < 25; i++) {
      const tableElement = document.createElement('button');
      let randomSymbol = Math.floor(Math.random() * inputSymbols.length);
      tableElement.innerText = inputSymbols[randomSymbol];
      table.appendChild(tableElement);
      tableElements.push(tableElement);
    }
  }

  //get the coordinates array
  function getCoordinates() {
    let coordinates = [];
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        coordinates.push([i,j]);
      }
    }
    return coordinates;
  }

  //distance function which we will use to decide if the element is in area for delete
  function distance(coordinate1,coordinate2) {
    let a = coordinate1[0] - coordinate2[0];
    let b = coordinate1[1] - coordinate2[1];
    return Math.sqrt(a*a + b*b);
  }

  //function to delete our area
  function deleteFunction (tableElements, symbol, element) {
    let indexOfClick = tableElements.indexOf(element);
    for (let i = 0; i < tableElements.length; i++) {
      //we delete element if the distance from 'clicked' element equals 1, and symbols are the same
      //which in our situation is enough to detect elements to delete
      if (tableElements[i].innerText === symbol && distance(coordinatesArray[i],coordinatesArray[indexOfClick]) <= 1) {
        tableElements[i].innerText = deleted;
        tableElements[i].style.background = '#888888';
        /*i decided to just go for recursive method to delete further tableElements
        which works good here*/
        deleteFunction(tableElements, symbol, tableElements[i]);
      }
    }
  }

  createTable();
  let coordinatesArray = getCoordinates();

  //event listeners for buttons
  tableElements.forEach(button => {
    button.addEventListener('click', () => {
      deleteFunction(tableElements, button.innerText, button);
    });
    });

  resetButton.addEventListener('click', () => {
      window.location.reload();
    });
});
