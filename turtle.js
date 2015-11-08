function Turtle(x,y,isPreview){
	this._x=x;
	this._y=y;
	this._angle=0;
	this._penDown=true;
	this.lines=[];
	this.isPreview=isPreview;
	this.logoFunctions={};

	this.logoFunctions.fd = function(n){
		if(arguments.length<1) throw new MissingArgErr('fd',1);
		this.forwardBy(n);
	};

	this.logoFunctions.bk = function(n){
		if(arguments.length<1) throw new MissingArgErr('bk',1);
		this.forwardBy(-n);
	};

	this.logoFunctions.rt = function(n){
		if(arguments.length<1) throw new MissingArgErr('rt',1);
		this.turnBy(n);
	};

	this.logoFunctions.lt = function(n){
		if(arguments.length<1) throw new MissingArgErr('lt',1);
		this.turnBy(-n)
	};

	this.logoFunctions.pd = function(){
		this.penDown(true);
	};

	this.logoFunctions.pu = function(){
		this.penDown(false);
	};

	this.logoFunctions.clearscreen = function(){
		this.clear();
	};

	this.logoFunctions.if = function(cond,block){
		if(arguments.length<2) throw new MissingArgErr('if',2);
		if(cond){block();}else{undefined;}
	};

	this.logoFunctions.repeat = function(n,block){
		if(arguments.length<2) throw new MissingArgErr('repeat',2);
		for(var i=0;i<n;i++){
			block();
		}
	};
};

function UndefFuncErr(functionName){ 
	this.message = 'Don\'t know how to "'+functionName+'"';
	this.stack = (new Error()).stack; 
};

UndefFuncErr.prototype = new Error;
UndefFuncErr.prototype.name='UndefinedFunctionError';

function MissingArgErr(functionName,n){
	this.message = 'Can\'t "'+functionName+'" needs '+n+' argument(s)';
	this.stack = (new Error()).stack;
};

MissingArgErr.prototype = new Error;
MissingArgErr.prototype.name = 'MissingArgumentError';

Turtle.prototype.lookup = function(name){
	if(this.logoFunctions[name]){
		return this.logoFunctions[name];
	}else{
		throw new UndefFuncErr(name);
	}
};

Turtle.prototype.x = function(val){
	if(arguments.length) this._x=val;
	else return this._x;
};

Turtle.prototype.y = function(val){
	if(arguments.length) this._y=val;
	else return this._y;
};

Turtle.prototype.angle = function(val){
	if(arguments.length) this._angle=val;
	else return this._angle;
};

Turtle.prototype.penDown = function(val){
	if(arguments.length) this._penDown=val;
	else return this._penDown;
};

Turtle.prototype.printPositionAndAngle = function(){
  text = Math.round(this.x()) + ',';
  text += Math.round(this.y()) + ',';
  text += ((Math.round(this.angle()*180/Math.PI)%360)+360)%360;
  document.getElementById('locationText').innerHTML = text;
};

// ******************START TURTLE COMMANDS**************************
Turtle.prototype.forwardBy = function(n){        
  var x1,y1,x2,y2;
  var start = [];
  var end = [];
  start[0] = this.x();
  start[1] = this.y();
  end[0] = start[0] + n*Math.cos(this.angle());
  end[1] = start[1] + n*Math.sin(this.angle());
  this.x(end[0]);
  this.y(end[1]);

  if(this.penDown()){
    if(!this.isPreview){
      canvasState.addLine(start,end);
    }else{
      canvasState.addPreviewLine(start,end);
    }
  }
  canvasState.draw();

  if(!this.isPreview) this.printPositionAndAngle();
}            

Turtle.prototype.turnBy = function(n){
  this._angle += (n * Math.PI / 180);
  canvasState.draw();
  if(!this.isPreview) this.printPositionAndAngle();
} 

Turtle.prototype.setPen = function(writeBool){
  this.penDown(writeBool);
}

Turtle.prototype.clear = function(){
  this.x(200);
  this.y(200);
  this.angle(0);
  if(!this.isPreview){
    canvasState.clear();
  }else{
    canvasState.clearPreview();
  }
}