/*jshint esversion: 6*/

const App = {
  rootElement: '#app',
  numRows: 3,
  numCols: 3,
  rowHeight: 50,
  owner: 'X',
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
  },

  makeBoard: function(){
    this.board = new Array(this.numRows);
    for(let i=0;i<this.numRows;i++){
      this.board[i]= new Array(this.numCols);
      for(let j=0;j<this.numCols;j++){
        //this.board[i][j]=new Square(this.cellWidth,this.cellHeight,this.activePlayer);
        this.board[i][j]= new Square();
      }
    }
    //console.log(this.board);
  },

  resetBoard: function(){},
  bindEvents: function(){},

  render: function(){

    //draw grid
    this.boardLayout.innerHTML = '';
    this.board.forEach((row,rowIdx)=>{
      const rowOfSquares = document.createElement('div');
      rowOfSquares.classList.add('row-squares');
      //rowOfSquares.style.height = `${this.rowHeight}px`;
      row.forEach((square,colIndex)=>{
        const element = square.toHtml();
        rowOfSquares.appendChild(element);
      });
      this.boardLayout.appendChild(rowOfSquares);
    });


  },


};

App.start();
