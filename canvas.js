function canvasState(htmlCanvas){
	this.canvas = htmlCanvas;
	this.ctxt = htmlCanvas.getContext('2d');
	this.lines = [];
	this.points = [];

	this.challengesObj = new challenges();

	this.draw();
}

canvasState.prototype.drawTurtle = function(){
	var x = turtle.x();
	var y = turtle.y();
	var angle = turtle.angle();

	this.ctxt.beginPath();
	xdisp = Math.cos(angle)*5;
	ydisp = Math.sin(angle)*5;
	this.ctxt.moveTo(x+xdisp, y+ydisp);
	xdisp = Math.cos(angle+Math.PI*7/6)*5;
	ydisp = Math.sin(angle+Math.PI*7/6)*5;
	this.ctxt.lineTo(x+xdisp,y+ydisp);
	xdisp = Math.cos(angle+Math.PI*5/6)*5;
	ydisp = Math.sin(angle+Math.PI*5/6)*5;
	this.ctxt.lineTo(x+xdisp,y+ydisp);
	this.ctxt.fill();
}

canvasState.prototype.draw = function(){
	this.ctxt.clearRect(0,0,this.canvas.width,this.canvas.height);

	//TODO: may want to move the checkSovled fxn call
	this.challengesObj.checkSolved(this);
	this.challengesObj.draw(this);

	for(var i=0;i<this.lines.length;i++){
		this.ctxt.beginPath();
		this.ctxt.moveTo(this.lines[i][0].x,this.lines[i][0].y);
		this.ctxt.lineTo(this.lines[i][1].x,this.lines[i][1].y);
		this.ctxt.stroke();
	}

	this.drawTurtle();
}

canvasState.prototype.addLine = function(startPos,endPos){
	this.lines.push([startPos,endPos]);

	dx = endPos.x - startPos.x;
	dy = endPos.y - startPos.y;
	angle = Math.atan2(dy,dx);
	disp = Math.sqrt(dx*dx+dy*dy);
	sx = Math.cos(angle);
	sy = Math.sin(angle);

	for(var d=0,x=startPos.x,y=startPos.y;d<disp;d++){
		this.points.push({x:x,y:y});
		x+=sx;
		y+=sy;
	}
}

canvasState.prototype.clear = function(){
	this.lines = [];
	this.ctxt.clearRect(0,0,this.canvas.width,this.canvas.height);
	this.draw();
}

canvasState.prototype.changeChallenge = function(i){
	this.challengesObj.setChallenge(i);
	this.draw();
}

function setUpCanvas(){
	var canvas = document.createElement('canvas');

	canvas.setAttribute('width','400')
	canvas.setAttribute('height','400')
	canvas.setAttribute('style','border:1px solid #000000;')
	canvas.setAttribute('id','canvas');
    
    document.getElementById('playArea').appendChild(canvas);

    canvas.addEventListener('click', line2click);

    var state = new canvasState(canvas);

    return state;
}

function line2click(e){
  context = this.getContext('2d');

  var p = getCursorPosition(e);
  mx = p[0] - this.offsetLeft;
  my = p[1] - this.offsetTop;

  dx = mx - turtle.x();
  dy = my - turtle.y();

  angleFinal = Math.atan2(dy,dx);
  degreeTurn = Math.round( (angleFinal - turtle.angle())/Math.PI*180 );
  disp = Math.round(Math.sqrt(dx*dx+dy*dy));

  turnCmd = degreeTurn<0?'lt '+(-degreeTurn):'rt '+degreeTurn;

  //console.log('rt '+degreeTurn+' fd '+disp);
  evalSource(turnCmd+' fd '+disp);
}