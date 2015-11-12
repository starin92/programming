function challenges(){
	this.challengeArray = [];
	this.challengeIdx = 0;

	var paths = [];
	
	//***repeat challenges***
	paths.push({start:[200,200],end:[220,200]});
	this.addChallenge(paths);

	//paths = [];
	paths=this.regularPolygon(4,20,200,200);
	this.addChallenge(paths.slice(0,2))
	this.addChallenge(paths);

	paths=this.regularPolygon(3,20,200,200,true);
	this.addChallenge(paths.slice(0,2))
	this.addChallenge(paths);

	var sides = [6,12,24];
	for(var sIdx=0;sIdx<sides.length;sIdx++){
		paths=this.regularPolygon(sides[sIdx],sIdx==2?10:20,200,200);
		this.addChallenge(paths.slice(0,2))
		this.addChallenge(paths);
	}

	//***function to..end challenges***
	//adding multiple triangles
	var i;
	paths=[];
	for(i=0;i<4;i++){
		paths=paths.concat(this.regularPolygon(3,20,200+20*i,200,true));
	}
	this.addChallenge(paths);

	//adding multiple squares
	var i;
	paths=[];
	for(i=0;i<4;i++){
		paths=paths.concat(this.regularPolygon(4,20,200+20*i,200));
	}
	this.addChallenge(paths);

	paths=[];
	for(i=0;i<4;i++){
		paths=paths.concat(this.regularPolygon(3,20,200+20*i,200,true));
		paths=paths.concat(this.regularPolygon(4,20,200+20*i,200));
	}
	this.addChallenge(paths);

	//***parameter to :arg...end challenges***
	paths=[];
	var size;
	var offset=0;
	for(i=0;i<4;i++){
		size=10*(i+1)+10;
		paths=paths.concat(this.regularPolygon(3,size,200+offset,200,true));
		offset+=size;
	}
	this.addChallenge(paths);

	paths=[];
	var size;
	var offset=0;
	for(i=0;i<4;i++){
		size=10*(i+1)+10;
		paths=paths.concat(this.regularPolygon(4,size,200+offset,200));
		offset+=size;
	}
	this.addChallenge(paths);

	paths=[];
	var size;
	var offset=0;
	for(i=0;i<4;i++){
		size=10*(i+1)+10;
		paths=paths.concat(this.regularPolygon(3,size,200+offset,200,true));
		paths=paths.concat(this.regularPolygon(4,size,200+offset,200));
		offset+=size;
	}
	this.addChallenge(paths);

}

challenges.prototype.regularPolygon = function(sides,len,x,y,optionalDirection){
	var paths=[];
	var dx,dy;
	var angle=2*Math.PI/sides;
	if(optionalDirection) angle=-angle;
	for(var i=0;i<sides;i++){
		dx=Math.cos(i*angle)*len;
		dy=Math.sin(i*angle)*len;
		paths.push({start:[x,y],end:[x+dx,y+dy]});
		x+=dx;
		y+=dy;
	}
	return paths;
}

challenges.prototype.addChallenge = function(paths){
	theChallenge = {};
	theChallenge.paths = paths;
	theChallenge.solved = false;
	theChallenge.points = [];
	for(var i=0;i<theChallenge.paths.length;i++){
		var start = theChallenge.paths[i].start;
		var end = theChallenge.paths[i].end;
		var angle,mag;
		var dx,dy;

		var vec = xy2vec(start[0],start[1],end[0],end[1]);

		angle = vec.angle;
		mag=vec.mag;
		dx=Math.cos(angle);
		dy=Math.sin(angle);

		for(var x=start[0], y=start[1], m=0;m<mag;m++){
			theChallenge.points.push([x,y]);
			x+=dx;
			y+=dy;
		}
	}
	this.challengeArray.push(theChallenge);
}

challenges.prototype.getChallenge = function(){
	return this.challengeArray[this.challengeIdx];
}

challenges.prototype.setChallenge = function(i){
	this.challengeIdx = i;
}

challenges.prototype.draw = function(cs){
	var theChallenge = this.getChallenge();

	var start;
	var angle;
	var mag;
	var dx,dy;
	
	cs.ctxt.fillStyle=theChallenge.solved?'#FFFF66':'#00BFFF';
	for(var i=0;i<theChallenge.points.length;i++){
		cs.ctxt.beginPath();
		cs.ctxt.arc(theChallenge.points[i][0],theChallenge.points[i][1],3,0,2*Math.PI);
		cs.ctxt.fill();
	}
	cs.ctxt.fillStyle='#000000';
}

challenges.prototype.checkSolved = function(cs){
	var theChallenge = this.getChallenge();

	if(theChallenge.solved) return;

	for(var i=0;i<theChallenge.points.length;i++){
		var p1 = theChallenge.points[i];
		for(var j=0;j<cs.points.length;j++){
			if(distBetween(p1,cs.points[j])<=5){
				break;
			}
		}
		if(j==cs.points.length) return;
	}
	theChallenge.solved = true;
	return;
}

function distBetween(p1,p2){
	dx=p1[0]-p2[0];
	dy=p1[1]-p2[1];
	return Math.sqrt(dx*dx+dy*dy);
}