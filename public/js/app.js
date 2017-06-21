/*jshint esversion: 6*/

const App = {
  rootElement: '#app',
  numRows: 3,
  numCols: 3,
  cellWidth:50,
  cellHeight:50,
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
    this.board = document.querySelector('.squares-layout');
  },

  makeBoard: function(){
    this.board = new Array(this.numRows);
    for(let i=0;i<this.numRows;i++){
      this.board[i]= new Array(this.numCols);
      for(let j=0;j<this.numCols;j++){
        this.board[i][j]=new Square(this.cellWidth,this.cellHeight,this.owner);
      }
    }
    console.log(this.board);
  },
  resetBoard: function(){},
  bindEvents: function(){},
  render: function(){},


};

App.start();
