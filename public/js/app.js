/*jshint esversion: 6*/

const App = {
  rootElement: '#app',
  numRows: 3,
  numCols: 3,
  activePlayer: 'X',
  winningPlayer: '',
  isGameOver: false,
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

  bindEvents: function(){},

  claimSquare: function(rowIdx,colIdx){
    if(this.board[rowIdx][colIdx].owner.length === 0){
      this.board[rowIdx][colIdx].owner = this.activePlayer;
    }

    this.checkForWin();
    if(this.winningPlayer.length >0 ){
      this.isGameOver = 'true';
      this.findUnusedSquares();
    }
    if (this.winningPlayer.length === 0){
      this.checkForTie();
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
    this.winningPlayer = '';
    this.isGameOver = 'false';
    this.makeBoard();
    this.render();
  },

  checkForWin: function(){
    //there are only 8 possible checks, but...
    if((this.board[0][0].owner.length>0) &&
       (this.board[0][0].owner === this.board[0][1].owner) &&
       (this.board[0][1].owner === this.board[0][2].owner)){
      this.winningPlayer = this.board[0][0].owner;
      this.board[0][0].isWinningSquare = 'true';
      this.board[0][1].isWinningSquare = 'true';
      this.board[0][2].isWinningSquare = 'true';
    }
    else if ((this.board[1][0].owner.length >0) &&
            (this.board[1][0].owner === this.board[1][1].owner) &&
            (this.board[1][1].owner === this.board[1][2].owner)){
        this.winningPlayer = this.board[1][0].owner;
        this.board[1][0].isWinningSquare = 'true';
        this.board[1][1].isWinningSquare = 'true';
        this.board[1][2].isWinningSquare = 'true';
    }
    else if ((this.board[2][0].owner.length > 0) &&
             (this.board[2][0].owner === this.board[2][1].owner) &&
             (this.board[2][1].owner === this.board[2][2].owner)){
        this.winningPlayer = this.board[2][0].owner;
        this.board[2][0].isWinningSquare = 'true';
        this.board[2][1].isWinningSquare = 'true';
        this.board[2][2].isWinningSquare = 'true';
    }
    else if ((this.board[0][0].owner.length > 0) &&
             (this.board[0][0].owner === this.board[1][0].owner) &&
             (this.board[1][0].owner === this.board[2][0].owner)){
        this.winningPlayer = this.board[0][0].owner;
        this.board[0][0].isWinningSquare = 'true';
        this.board[1][0].isWinningSquare = 'true';
        this.board[2][0].isWinningSquare = 'true';
    }
    else if ((this.board[0][1].owner.length > 0) &&
             (this.board[0][1].owner === this.board[1][1].owner) &&
             (this.board[1][1].owner === this.board[2][1].owner)){
        this.winningPlayer = this.board[0][1].owner;
        this.board[0][1].isWinningSquare = 'true';
        this.board[1][1].isWinningSquare = 'true';
        this.board[2][1].isWinningSquare = 'true';
    }
    else if ((this.board[0][2].owner.length > 0) &&
             (this.board[0][2].owner === this.board[1][2].owner) &&
             (this.board[1][2].owner === this.board[2][2].owner)){
        this.winningPlayer = this.board[0][2].owner;
        this.board[0][2].isWinningSquare = 'true';
        this.board[1][2].isWinningSquare = 'true';
        this.board[2][2].isWinningSquare = 'true';
    }
    else if ((this.board[0][0].owner.length > 0) &&
             (this.board[0][0].owner === this.board[1][1].owner) &&
             (this.board[1][1].owner === this.board[2][2].owner)){
        this.winningPlayer = this.board[0][0].owner;      ;
        this.board[0][0].isWinningSquare = 'true';
        this.board[1][1].isWinningSquare = 'true';
        this.board[2][2].isWinningSquare = 'true';
    }
    else if ((this.board[0][2].owner.length > 0) &&
             (this.board[0][2].owner === this.board[1][1].owner) &&
             (this.board[1][1].owner === this.board[2][0].owner)){
        this.winningPlayer = this.board[0][2].owner;
        this.board[0][2].isWinningSquare = 'true';
        this.board[1][1].isWinningSquare = 'true';
        this.board[2][0].isWinningSquare = 'true';
    }
  },
 //need to know which squares were never used after game is won
  findUnusedSquares: function(){
    for(let i=0;i<this.numRows;i++){
      for(let j=0;j<this.numCols;j++){
        if(this.board[i][j].owner.length === 0){
          this.board[i][j].isUnusedSquare = 'true';
        }
      }
    }
  },

  checkForTie: function(){
    for(let i=0;i<this.numRows;i++){
      for(let j=0;j<this.numCols;j++){
        if(this.board[i][j].owner.length === 0){
          return;
        }
      }
    }
    //if all squares are owned and no winner - we have a tie! (game is over)
    if (this.winningPlayer.length ===0){
      this.isGameOver = 'true';
    }
    return;
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
        rowOfSquares.appendChild(element);
      });
      this.boardLayout.appendChild(rowOfSquares);
    });

    //if game over display banner
    if(this.isGameOver === 'true'){
       const displayBar = document.createElement('div');
       displayBar.classList.add('display-bar');
       if (this.winningPlayer.length > 0){
         displayBar.innerHTML = "Game over!! " + this.winningPlayer + " has won!!!\&#x263A";
       }
       else{
         displayBar.innerHTML = "Draw!! NO Winner \&#x2639";
       }
       this.boardLayout.appendChild(displayBar);
       //this.showBanner(displayBar);
       setTimeout(function(){
         displayBar.classList.add('hide-it');
       },2000);
    }

    //create a 'reset' button
    const resetButton = document.createElement('button');
    resetButton.classList.add('btn');
    if(this.winningPlayer.length ===0)
      resetButton.textContent = 'Clear';
    else {
      resetButton.textContent = 'Replay';
    }
    resetButton.addEventListener('click',()=>this.clearBoard());
    this.controls.appendChild(resetButton);
  },

  //see https://codepen.io/arosenb2/pen/Hdbna
  // showBanner: function (displayBar){
  //   setTimeout(function(){
  //     displayBar..add('hide-it');
  //   },2000);
  //   return false;
  // }

};

App.start();
