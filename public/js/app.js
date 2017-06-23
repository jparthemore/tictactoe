/*jshint esversion: 6*/

const App = {
  rootElement: '#app',
  numRows: 3,
  numCols: 3,
  rowHeight: 50,
  owner: '',
  activePlayer: 'X',
  victoriousPlayer: 'none',//none!
  isThereAWinner: false,
  board: [],

  start: function(){
    this.cacheDOM();
    this.makeBoard();
    this.bindEvents();
    this.render();
  },

  cacheDOM: function(){
    this.root = document.querySelector(this.rootElement);
    this.boardLayout = document.querySelector('.squares-layout');
    this.controls = document.querySelector('.controls');
  },

  makeBoard: function(){
    this.board = new Array(this.numRows);
    for(let i=0;i<this.numRows;i++){
      this.board[i]= new Array(this.numCols);
      for(let j=0;j<this.numCols;j++){
        this.board[i][j]= new Square();
      }
    }
  },

  resetBoard: function(){},
  bindEvents: function(){},

  claimSquare: function(rowIdx,colIdx){
    if(this.board[rowIdx][colIdx].owner.length === 0){
      this.board[rowIdx][colIdx].owner = this.activePlayer;
    }
    this.render();
    if(this.activePlayer==='X'){
      this.activePlayer='O';
    }
    else {
      this.activePlayer = 'X';
    }
  },
  clearBoard: function(){
    this.activePlayer = 'X';
    this.makeBoard();
    this.render();
  },

  render: function(){


    //clear out before re-rendering!
    this.boardLayout.innerHTML = '';
    this.controls.innerHTML = '';

    //draw grid
    this.board.forEach((row,rowIdx)=>{
      const rowOfSquares = document.createElement('div');
      rowOfSquares.classList.add('row-squares');
      row.forEach((square,colIdx)=>{
        const element = square.toHtml();
        element.addEventListener('click',()=>this.claimSquare(rowIdx,colIdx));
        //console.dir(element);
        rowOfSquares.appendChild(element);
      });
      this.boardLayout.appendChild(rowOfSquares);
    });
    //create a 'reset' button
    const resetButton = document.createElement('button');
    resetButton.classList.add('btn');
    resetButton.textContent = 'Clear';
    resetButton.addEventListener('click',()=>this.clearBoard());
    this.controls.appendChild(resetButton);
  },

};

App.start();
