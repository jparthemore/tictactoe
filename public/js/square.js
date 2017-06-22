// function Square(width, height,claimedOwner){
//   this.width = width || 100;
//   this.height = height || 100;
//   this.owner = claimedOwner || '';
//
// }

function Square(){
  this.owner ='';
}

Square.prototype.toHtml = function(){
  //return document.createElement('button');
  const btn = document.createElement('button');
  btn.classList.add('btn-square');
  //btn.style.width = `${this.width}px`;
  //btn.style.height = `${this.height}px`;
  //btn.textContent = this.owner;
  return btn;
}
