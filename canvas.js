function canvasState(htmlCanvas){
	this.canvas = htmlCanvas;
	this.ctxt = htmlCanvas.getContext('2d');
	this.lines = [];
	this.challenge = new challenge([new path([200,200],0,100)]);
	//this.challenge = new challenge([new path([200,200],90,100),new path([200,300],0,100)]);
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

	this.challenge.draw(this);

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
}

canvasState.prototype.clear = function(){
	this.lines = [];
	this.ctxt.clearRect(0,0,this.canvas.width,this.canvas.height);
	this.drawTurtle();
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

function path(start,angle,mag){
	this.start=start;
	this.angle=angle;
	this.mag=mag;
}

function challenge(paths){
	this.paths = paths;
	this.solved = false;
}

challenge.prototype.draw = function(cs){
	var start;
	var angle;
	var mag;
	var dx,dy;
	for(var i=0;i<this.paths.length;i++){
		start=this.paths[i].start;
		angle=this.paths[i].angle*Math.PI/180;
		mag=this.paths[i].mag;
		dx=Math.cos(angle);
		dy=Math.sin(angle);

		cs.ctxt.fillStyle='#00BFFF';
		for(var x=start[0], y=start[1], m=0;m<mag;m++){
			cs.ctxt.beginPath();
			cs.ctxt.arc(x,y,5,0,2*Math.PI);
			cs.ctxt.fill();
			x+=dx;
			y+=dy;
		}
		cs.ctxt.fillStyle='#000000';
	}
}