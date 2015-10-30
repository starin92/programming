function canvasState(htmlCanvas){
	this.canvas = htmlCanvas;
	this.ctxt = htmlCanvas.getContext('2d');
	this.lines = [];
	this.previewLines = [];
	this.points = [];

	this.challengesObj = new challenges();

	this.draw();
}

canvasState.prototype.drawTurtle = function(turtleObj){
	var x = turtleObj.x();
	var y = turtleObj.y();
	var angle = turtleObj.angle();
	this.ctxt.fillStyle=turtleObj.isPreview()?"#999999":"#000000";
	
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

	this.ctxt.strokeStyle = "#999999";
	for(var i=0;i<this.previewLines.length;i++){
		this.ctxt.beginPath();
		this.ctxt.moveTo(this.previewLines[i][0][0],this.previewLines[i][0][1]);
		this.ctxt.lineTo(this.previewLines[i][1][0],this.previewLines[i][1][1]);
		this.ctxt.stroke();
	}

	this.ctxt.strokeStyle = "#000000";
	for(var i=0;i<this.lines.length;i++){
		this.ctxt.beginPath();
		this.ctxt.moveTo(this.lines[i][0][0],this.lines[i][0][1]);
		this.ctxt.lineTo(this.lines[i][1][0],this.lines[i][1][1]);
		this.ctxt.stroke();
	}

	this.drawTurtle(previewTurtle);
	this.drawTurtle(turtle);
}

canvasState.prototype.addLine = function(startPos,endPos){
	this.lines.push([startPos,endPos]);

	var vec = xy2vec(startPos[0],startPos[1],endPos[0],endPos[1]);
	sx = Math.cos(vec.angle);
	sy = Math.sin(vec.angle);

	for(var d=0,x=startPos[0],y=startPos[1];d<vec.mag;d++){
		this.points.push([x,y]);
		x+=sx;
		y+=sy;
	}
}

canvasState.prototype.addPreviewLine = function(startPos,endPos){
	this.previewLines.push([startPos,endPos]);
}

canvasState.prototype.clear = function(){
	this.lines = [];
	this.ctxt.clearRect(0,0,this.canvas.width,this.canvas.height);
	this.draw();
}

canvasState.prototype.clearPreview = function(){
	this.previewLines = [];
	//this.draw();
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

  var vec=xy2vec(turtle.x(),turtle.y(),mx,my);

  degreeTurn = Math.round( (vec.angle - turtle.angle())/Math.PI*180 );
  disp = Math.round(vec.mag);

  turnCmd = degreeTurn<0?'lt '+(-degreeTurn):'rt '+degreeTurn;

  //console.log('rt '+degreeTurn+' fd '+disp);
  evalSource(turnCmd+' fd '+ disp);
}

function xy2vec(x1,y1,x2,y2){
	var dx,dy;
	dx = x2-x1;
	dy = y2-y1;
	var result = {};
	result.angle = Math.atan2(dy,dx);
	result.mag = Math.sqrt(dx*dx+dy*dy);
	return result;
}