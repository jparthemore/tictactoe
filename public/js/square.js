function Square(){
  this.owner ='';
}

Square.prototype.toHtml = function(){

  const btn = document.createElement('button');
  btn.classList.add('btn-square');
  btn.textContent = this.owner;
  if(this.owner==='X'){
    btn.classList.add('claimed-by-X');
    btn.disabled = 'true';
  }
  else if(this.owner==='O'){
    btn.classList.add('claimed-by-O');
    btn.disabled = 'true';
  }
  else{
    btn.classList.add('unclaimed');
  }
  if(this.isWinningSquare){
    btn.classList.add('winner-square');
  }
  return btn;
}
