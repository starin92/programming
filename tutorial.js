var lastElement;

function startIntro(){
  var intro = introJs();
  intro.setOption('showBullets',false);
  intro.oncomplete(function(){
  	runSource('clearscreen');
  });
  intro.onchange(function(targetElement){
  	if(this._direction=='forward'){
  		switch(this._currentStep){
  			case 4:
  			case 8:
  				lastElement.click();
  				break;
  			case 7:
  				lastElement.firstElementChild.value='bk 100';
  				break;
  			case 10:
  				runSource('rt 111\nfd 16');
  				break;
  		}
  	}
  	lastElement = targetElement;
  });
  intro.setOptions({
	steps: [
	  { 
		intro: "This is the Logo Learning tool. Click next to learn about it or skip if you've aleady seen the tutorial."
	  },
	  {
		element: '#canvas',
		intro: "The turtle on the screen is your main tool. It can move forwards, backwards, and rotate leaving a line wherever it goes.",
		position: 'top'
	  },
	  {
		element: '#toolbarDiv',
		intro: "There are three methods of input. First, is the button toolbar.",
		position: 'left'
	  },
	  {
		element: '#fdBtn',
		intro: 'Click a button to move the turtle.',
		position: 'left'
	  },
	  {
		element: '#canvas',
		intro: "Notice the turtle moved forward in the direction it was pointed.",
		position: 'top'
	  },
	  {
		element: '#source',
		intro: 'Notice the button click also generated the command for moving the turtle forward.',
		position: 'right'
	  },
	  {
		element: '#sourceCodeDiv',
		intro: "The second method input is the soure code area. Here commands can be edited.",
		position: 'right'
	  },	  
	  {
		element: '#doItBtn',
		intro: "To run some code from here click the 'do it' button.",
		position: 'bottom'
	  },
	  {
		element: '#canvas',
		intro: "Notice the turtle moved 100 units backwards",
		position: 'top'
	  },
	  {
		element: '#canvas',
		intro: "The third method of input is the canvas itself. Clicking causes the turtle to turn and go to that location.",
		position: 'top'
	  },
	  {
		element: '#source',
		intro: "Observe that two commands were generated this time in the source code area.",
		position: 'right'
	  },
	  {
	  	element: '#challengeDiv',
	  	intro: "Once you can use all three inputs try to complete the challenges by selecting a category.",
		position: 'top'
	  },
	  {
	  	element: '#basicsGroupDiv',
	  	intro: "Start with basics and work your way through them all.",
		position: 'top'
	  },
	  {
	  	element: '#csBtn',
	  	intro: "Clicking 'clear screen' will reset the turtle. Draw some more or try one of the challenges.",
		position: 'left'
	  }
	]
  });

  intro.start();
}

function startChallengeIntro(name){
  var intro = introJs();
  intro.setOption('showBullets',false);
  switch(name){
  	case 'basics':
	  intro.onchange(function(targetElement){
	  	if(this._direction=='forward'){
	  		switch(this._currentStep){
	  			case 1:
	  				runSource('clearscreen');
	  				break;
	  			case 2:
	  			case 4:
	  			case 7:
	  				lastElement.click();
	  				break;
	  			case 6:
	  				console.log(lastElement);
	  				lastElement.value='fd 30';
	  				break;

	  		}
	  	}
	  	lastElement = targetElement;
	  });
	  intro.setOptions({
		steps: [
		  { 
			intro: "The challenges present a path to complete. Move the turtle through the entire path to complete the challenge."
		  },
		  {
			element: '#challenge0Btn',
			intro: "Select a challenge by clicking on it to display it in the canvas.",
			position: 'bottom'
		  },
		  {
			element: '#canvas',
			intro: "The blue path is the one you must complete.",
			position: 'bottom'
		  },
		  {
			element: '#fdBtn',
			intro: "It appears the turtle needs to move forward.",
			position: 'left'
		  },
		  {
			element: '#canvas',
			intro: "It appears the turtle needs to go a bit farther.",
			position: 'top'
		  },
		  {
			element: '#source',
			intro: "Edit the generated code to move the remaining distance",
			position: 'right'
		  },
		  {
			element: '#doItBtn',
			intro: "Press 'do it' to run the newly typed code.",
			position: 'right'
		  },
		  {
			element: '#canvas',
			intro: "Notice the path changed colors to indicate it was completed.",
			position: 'top'
		  },
		  {
			element: '#basicsGroupDiv',
			intro: "Try to complete the rest of the challenges here.",
			position: 'top'
		  }
		]
	  });
	  break;
	case 'repeat':
	  intro.onchange(function(targetElement){
	  	if(this._direction=='forward'){
	  		switch(this._currentStep){
	  			case 0:
	  				runSource('clearscreen');
	  				document.getElementById('challenge3Btn').click();
	  				break;
	  			case 1:
	  				setSource('fd 40\nlt 120');
	  				break;
	  			case 4:
	  				lastElement.click();
	  				break;
	  			case 5:
	  				lastElement.click();
	  		}
	  	}
	  	lastElement = targetElement;
	  });
	  intro.setOptions({
		steps: [
		  { 
			intro: "This set of challenges makes use of the repeat commands."
		  },
		  {
			element: '#canvas',
			intro: "The first challenge requires you to draw a line and turn. This can be acheived doing the same thing twice.",
			position: 'top'
		  },
		  {
			element: '#source',
			intro: "These two commands draw the line and turn the proper amount.",
			position: 'right'
		  },
		  {
			element: '#repeatBtn',
			intro: "Click the repeat button then another command to do it multiple times.",
			position: 'left'
		  },
		  {
			element: '#doItBtn',
			intro: "Next click the 'do it' button. In the dialog enter 2 then press OK to run the commands twice.",
			position: 'right'
		  },
		  {
			element: '#source',
			intro: "Notice the command that was generated. Anything in the [] is done the specified number of times.",
			position: 'right'
		  },
		  {
			element: '#repeatGroupDiv',
			intro: "Try to complete the rest of the challenges using repeat.",
			position: 'top'
		  }

		]
	  });
	  break;
	case 'functions':
      intro.onchange(function(targetElement){
	  	if(this._direction=='forward'){
	  		switch(this._currentStep){
	  			case 1:
	  				runSource('clearscreen');
	  				document.getElementById('challenge11Btn').click();
	  				break;
	  			case 3:
	  			case 12:
	  				if(!RECORDING) lastElement.click();
	  				break;
	  			case 4:
	  			case 6:
	  			case 9:
	  			case 11:
	  			case 13:
	  			case 14:
	  			case 19:
	  				lastElement.click();
	  				break;
	  			case 7:
	  				document.getElementById("source").value = 'to function'+MYFUNNUM+'\nfd 40\nlt 120\nend\n';
	  				break;
	  			case 8:
	  				if(RECORDING) lastElement.click();
	  				break;
	  			case 15:
	  				document.getElementById("source").value = 'to triangle\nrepeat 3 [ function'+(MYFUNNUM-1)+' ]\nend\n';
	  				break;
	  			case 17:
	  				if(RECORDING) lastElement.click();
	  				setSource('triangle\nfd 40\ntriangle');
	  				break;
	  		}
	  	}
	  	lastElement = targetElement;
	  });
	  intro.setOptions({
		steps: [
		  { 
			intro: "These challenges use functions with the 'to ... end' syntax."
		  },
		  {
			element: '#canvas',
			intro: "The first challenge requires you to draw 4 triangles. You can do this by recording funtions.",
			position: 'top'
		  },
		  {
			element: '#recordBtn',
			intro: "Press 'record' to create a function. A function will be a set of commands you can run with one command.",
			position: 'left'
		  },
		  {
			element: '#fdBtn',
			intro: "Once you press 'record', it adds each command you enter to the function until you press 'stop'",
			position:'left'
		  },
		  {
			element: '#source',
			intro: "Notice the to function# ... end was added to the source area.",
			position: 'right'
		  },		  
		  {//5
			element: '#ltBtn',
			intro: "To finish one side of a triangle you need to turn as well as go forward.",
			position: 'left'
		  },		  
		  {
			element: '#source',
			intro: "Edit the code to make the turtle move and turn the right amount for a triangle.",
			position: 'right'
		  },		  
		  {
			element: '#recordBtn',
			intro: "Press 'stop' to exit recording mode and to store the function.",
			position: 'left'
		  },
		  {
		  	element: '#playBtn',
			intro: "Once you have recorded a function you can run it by pressing 'play'",
			position: 'left'
		  },
		  {
			element: '#canvas',
			intro: "Notice the one command moves the turtle forward and turns it.",
			position: 'top'
		  },
		  {//10
			element: '#csBtn',
			intro: "Clear the screen to erase the scratch work.",
			position: 'left'
		  },
		  {
			element: '#recordBtn',
			intro: "Next we will try to record a full triangle function.",
			position: 'left'
		  },
		  {
			element: '#repeatBtn',
			intro: "It will include repeating the last function for a side 3 times.",
			position: 'left'
		  },
		  {
			element: '#playBtn',
			intro: "Click 'play' and then enter 3 to repeat the side funtion 3 times.",
			position: 'left'
		  },
		  {
			element: '#source',
			intro: "You can change the name of the function to help you remember what it does.",
			position: 'right'
		  },
		  {//15
			element: '#source',
			intro: "Notice the function is now called 'triangle'. To call it you just type the word 'triangle' in the source area.",
			position: 'right'
		  },
		  {
			element: '#recordBtn',
			intro: "Pressing 'stop' will exit recording mode and store the function.",
			position: 'left'
		  },
		  {
			element: '#source',
			intro: "Now the single command 'triangle' will draw the entire triangle for you like the other commands.",
			position: 'right'
		  },
		  {
		  	element: '#doItBtn',
		  	intro: "Press 'do it' to draw the triangle in the canvas",
		  	position: 'right'
		  },
		  {
			element: '#canvas',
			intro: "Notice the single command now draws a whole triangle.",
			position: 'top'
		  },
		  {//20
			element: '#functionsGroupDiv',
			intro: "Try to complete the challenges using functions.",
			position: 'top'
		  }
		]
	  });
	  break;
	case 'parameters':
      intro.onchange(function(targetElement){
	  	if(this._direction=='forward'){
	  		switch(this._currentStep){
	  			case 1:
	  				runSource('clearscreen');
	  				break;
	  		}
	  	}
	  	lastElement = targetElement;
	  });
	  intro.setOptions({
		steps: [
		  { 
			intro: ""
		  },
		  {
			element: '#',
			intro: "",
			position: ''
		  }
		]
	  });
	  break;
  }

  intro.start();
}