function challenges(){
	this.challengeArray = [];
	this.challengeIdx = 0;

	paths = [];
	path = {};
	path.start = [200,200];
	path.angle = 0;
	path.mag = 50;

	paths.push(path);
	this.addChallenge(paths);

	paths = [];
	path1 = {};

	path1.start = [200,200];
	path1.angle = 90;
	path1.mag = 50;
	paths.push(path1);
	path2 = {};

	path2.start = [200,250];
	path2.angle = 0;
	path2.mag = 50;
	paths.push(path2);

	this.addChallenge(paths);

}

challenges.prototype.addChallenge = function(paths){
	theChallenge = {};
	theChallenge.paths = paths;
	theChallenge.solved = false;
	theChallenge.points = [];
	for(var i=0;i<theChallenge.paths.length;i++){
		start=theChallenge.paths[i].start;
		angle=theChallenge.paths[i].angle*Math.PI/180;
		mag=theChallenge.paths[i].mag;
		dx=Math.cos(angle);
		dy=Math.sin(angle);

		for(var x=start[0], y=start[1], m=0;m<mag;m++){
			theChallenge.points.push({x:x,y:y});
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
		cs.ctxt.arc(theChallenge.points[i].x,theChallenge.points[i].y,5,0,2*Math.PI);
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
	dx=p1.x-p2.x;
	dy=p1.y-p2.y;
	return Math.sqrt(dx*dx+dy*dy);
}