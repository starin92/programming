var HACKER = false;
var MIDDLE = 150;
var THICKNESS = 5;

function foundHacker(){
	HACKER=true;
	var fileref=document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", "hack.css")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}

function challenges(){
	this.challengeArray = [];
	this.challengeIdx = 0;

	this.challengeGroupsSolved = 0;

	this.loadPaths();
	this.addButtons();
}

function toggleDiv(name){
	var e = document.getElementById(name+'Div');
	if(e.style.display == 'block'){
	  	e.style.display = 'none';
	}else{
		startChallengeIntro(name);
	  	e.style.display = 'block';
	}
}

challenges.prototype.addButtonGroup = function(name,startIdx,endIdx,cDiv){
	var i;
	var div;
	var gDiv;
	var toggle;

	gDiv = document.createElement('div');
	gDiv.id = name+'GroupDiv';
	gDiv.style.border = 'solid #00BFFF';
	gDiv.style['margin-bottom'] = '3pt';

	toggle = document.createElement('button');
	toggle.setAttribute('class','text-button');
	toggle.id = name + 'Toggle';
	toggle.innerHTML = name;
	toggle.onclick = function(){toggleDiv(name);};
	gDiv.appendChild(toggle);

	div = document.createElement('div');
	div.setAttribute('id',name+'Div');
	div.style.display = 'none'
	gDiv.appendChild(div);
	cDiv.appendChild(gDiv);
	
	for(i=startIdx;i<endIdx+1;i++){
		this.createButton(i,div);
	}
}

challenges.prototype.addButtons = function(){
	var cDiv = document.getElementById('challengeDiv');

	this.addButtonGroup('basics',0,2,cDiv);

	this.addButtonGroup('repeat',3,10,cDiv);

	this.addButtonGroup('functions',11,13,cDiv);

	this.addButtonGroup('parameters',14,16,cDiv);
}

challenges.prototype.createButton = function(i,parent){
	var btn = document.createElement('button');
	var t = document.createTextNode('Challenge '+i);
	btn.id = 'challenge'+i+'Btn';
	btn.appendChild(t);
	btn.setAttribute('onclick', 'canvasState.changeChallenge('+i+')');
	btn.setAttribute('class', 'challenge-button');
	parent.appendChild(btn);
}

challenges.prototype.checkGroupSolved = function(i){
	var floor,top,name;
	if(i<3){
		floor=0;
		top=2;
		name='basics';
	}else if(i<11){
		floor=3;
		top=10;
		name='repeat';	
	}else if(i<14){
		floor=11;
		top=13;
		name='functions';
	}else{
		floor=14;
		top=16;
		name='parameters';
	}
	for(var j=floor;j<top+1;j++){
		if(!this.challengeArray[j].solved) break;
	}
	var c='chartreuse';
	if(j===top+1){
		c='#FFFF66';
		if(++this.challengeGroupsSolved===4){
			foundHacker();
		}
	}
	document.getElementById(name+'GroupDiv').style['borderColor'] = c;

}

challenges.prototype.loadPaths = function(){
	var paths = [];
	var dim = 30;

	//***repeat challenges***
	paths.push({start:[MIDDLE,MIDDLE],end:[MIDDLE+dim,MIDDLE]});
	this.addChallenge(paths);

	//paths = [];
	paths=this.regularPolygon(4,dim,MIDDLE,MIDDLE);
	this.addChallenge(paths.slice(0,2))
	this.addChallenge(paths);

	paths=this.regularPolygon(3,dim,MIDDLE,MIDDLE,true);
	this.addChallenge(paths.slice(0,2))
	this.addChallenge(paths);

	var sides = [6,12,24];
	for(var sIdx=0;sIdx<sides.length;sIdx++){
		paths=this.regularPolygon(sides[sIdx],sIdx==2?dim/2:dim,MIDDLE,MIDDLE,sIdx==2);
		this.addChallenge(paths.slice(0,2))
		this.addChallenge(paths);
	}

	//***function to..end challenges***
	//adding multiple triangles
	var i;
	paths=[];
	for(i=0;i<4;i++){
		paths=paths.concat(this.regularPolygon(3,dim,MIDDLE+dim*i,MIDDLE,true));
	}
	this.addChallenge(paths);

	//adding multiple squares
	var i;
	paths=[];
	for(i=0;i<4;i++){
		paths=paths.concat(this.regularPolygon(4,dim,MIDDLE+dim*i,MIDDLE));
	}
	this.addChallenge(paths);

	paths=[];
	for(i=0;i<4;i++){
		paths=paths.concat(this.regularPolygon(3,dim,MIDDLE+dim*i,MIDDLE,true));
		paths=paths.concat(this.regularPolygon(4,dim,MIDDLE+dim*i,MIDDLE));
	}
	this.addChallenge(paths);

	//***parameter to :arg...end challenges***
	paths=[];
	var size;
	var offset=0;
	for(i=0;i<3;i++){
		size=10*i+dim;
		paths=paths.concat(this.regularPolygon(3,size,MIDDLE+offset,MIDDLE,true));
		offset+=size;
	}
	this.addChallenge(paths);

	paths=[];
	var size;
	var offset=0;
	for(i=0;i<3;i++){
		size=10*i+dim;
		paths=paths.concat(this.regularPolygon(4,size,MIDDLE+offset,MIDDLE));
		offset+=size;
	}
	this.addChallenge(paths);

	paths=[];
	var size;
	var offset=0;
	for(i=0;i<3;i++){
		size=10*i+dim;
		paths=paths.concat(this.regularPolygon(3,size,MIDDLE+offset,MIDDLE,true));
		paths=paths.concat(this.regularPolygon(4,size,MIDDLE+offset,MIDDLE));
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
		cs.ctxt.arc(theChallenge.points[i][0],theChallenge.points[i][1],THICKNESS,0,2*Math.PI);
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
			if(distBetween(p1,cs.points[j])<=THICKNESS*2){
				break;
			}
		}
		if(j==cs.points.length) return;
	}
	theChallenge.solved = true;
	document.getElementById('challenge'+this.challengeIdx+'Btn').setAttribute('class','challenge-button-solved');
	this.checkGroupSolved(this.challengeIdx);
	return;
}

function distBetween(p1,p2){
	dx=p1[0]-p2[0];
	dy=p1[1]-p2[1];
	return Math.sqrt(dx*dx+dy*dy);
}
