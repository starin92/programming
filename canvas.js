function CanvasState(htmlCanvas,turtle,previewTurtle){
	this.canvas = htmlCanvas;
	this.ctxt = htmlCanvas.getContext('2d');
	this.turtle = turtle;
	this.previewTurtle = previewTurtle; 
	this.points = [];

	this.challengesObj = new challenges();

	this.draw();
}

CanvasState.prototype.drawTurtle = function(turtleObj){
	var x = turtleObj.x();
	var y = turtleObj.y();
	var angle = turtleObj.angle();
	this.ctxt.fillStyle=turtleObj.isPreview?"#999999":"#000000";
	
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

CanvasState.prototype.draw = function(){
	this.ctxt.clearRect(0,0,this.canvas.width,this.canvas.height);

	//TODO: may want to move the checkSovled fxn call
	this.challengesObj.checkSolved(this);
	this.challengesObj.draw(this);

	this.ctxt.strokeStyle = "#999999";
	for(var i=0;i<this.previewTurtle.lines.length;i++){
		this.ctxt.beginPath();
		this.ctxt.moveTo(this.previewTurtle.lines[i][0][0],this.previewTurtle.lines[i][0][1]);
		this.ctxt.lineTo(this.previewTurtle.lines[i][1][0],this.previewTurtle.lines[i][1][1]);
		this.ctxt.stroke();
	}

	this.ctxt.strokeStyle = "#000000";
	for(var i=0;i<this.turtle.lines.length;i++){
		this.ctxt.beginPath();
		this.ctxt.moveTo(this.turtle.lines[i][0][0],this.turtle.lines[i][0][1]);
		this.ctxt.lineTo(this.turtle.lines[i][1][0],this.turtle.lines[i][1][1]);
		this.ctxt.stroke();
	}

	this.drawTurtle(this.previewTurtle);
	this.drawTurtle(this.turtle);
}

CanvasState.prototype.addLine = function(startPos,endPos){
	this.turtle.lines.push([startPos,endPos]);

	var vec = xy2vec(startPos[0],startPos[1],endPos[0],endPos[1]);
	sx = Math.cos(vec.angle);
	sy = Math.sin(vec.angle);

	for(var d=0,x=startPos[0],y=startPos[1];d<vec.mag;d++){
		this.points.push([x,y]);
		x+=sx;
		y+=sy;
	}
}

CanvasState.prototype.addPreviewLine = function(startPos,endPos){
	this.previewTurtle.lines.push([startPos,endPos]);
}

CanvasState.prototype.clear = function(){
	this.turtle.lines = [];
	this.ctxt.clearRect(0,0,this.canvas.width,this.canvas.height);
	this.draw();
}

CanvasState.prototype.clearPreview = function(){
	this.previewTurtle.lines = [];
	//this.draw();
}

CanvasState.prototype.changeChallenge = function(i){
	this.challengesObj.setChallenge(i);
	this.draw();
}

function setUpCanvas(){
	var canvas = document.createElement('canvas');

	var dim = 400;
	canvas.setAttribute('width',dim)
	canvas.setAttribute('height',dim)
	canvas.setAttribute('style','border:1px solid #000000;')
	canvas.setAttribute('id','canvas');
    
    document.getElementById('playArea').appendChild(canvas);

    canvas.addEventListener('click', line2click);

    var t = new Turtle(dim/2,dim/2,false);
    var pt = new Turtle(dim/2,dim/2,true);

    var state = new CanvasState(canvas,t,pt);

    return state;
}

function getCursorPosition(e) {
    var x;
    var y;

    if (e.pageX != undefined && e.pageY != undefined) {
        x = e.pageX;
        y = e.pageY;
    } else {
        x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    
    return [x, y];
}

function line2click(e){
  context = this.getContext('2d');

  var p = getCursorPosition(e);
  mx = p[0] - this.offsetLeft;
  my = p[1] - this.offsetTop;

  var vec=xy2vec(canvasState.turtle.x(),canvasState.turtle.y(),mx,my);

  degreeTurn = Math.round( (vec.angle - canvasState.turtle.angle())/Math.PI*180 )%360;
  disp = Math.round(vec.mag);

  turnCmd = degreeTurn<0?'lt '+(-degreeTurn):'rt '+degreeTurn;

  //console.log('rt '+degreeTurn+' fd '+disp);
  runSource(turnCmd+' fd '+ disp);
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

CanvasState.prototype.resetPreview = function(){
  this.clearPreview();
  this.previewTurtle.x(this.turtle.x());
  this.previewTurtle.y(this.turtle.y());
  this.previewTurtle.angle(this.turtle.angle());
  canvasState.draw();
};