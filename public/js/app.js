/*jshint esversion: 6*/

const App = {
  rootElement: '#app',
  numRows: 3,
  numCols: 3,
  activePlayer: 'X',
  winningPlayer: '',
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
    this.banner = document.querySelector('.banner-space');
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
    if(this.winningPlayer.length > 0) return; //ignore click events if game over!

    if(this.board[rowIdx][colIdx].owner.length === 0){
      this.board[rowIdx][colIdx].owner = this.activePlayer;
    }

    this.checkForWin();
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
  render: function(){

    //clear out before re-rendering!
    this.boardLayout.innerHTML = '';
    this.controls.innerHTML = '';
    this.banner.innerHTML = '';

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

    //if winner display banner
    console.log('winning player is: ',this.winningPlayer);
    if(this.winningPlayer.length > 0){
      const displayBar = document.createElement('div');
      displayBar.classList.add('display-bar');
      displayBar.textContent = "Game over!! " + this.winningPlayer + " has won!!!";
      this.banner.appendChild(displayBar);
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

};

App.start();
