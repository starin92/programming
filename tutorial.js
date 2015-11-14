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
	  	intro: "Clicking the 'clear screen' button will reset the turtle. Draw some more or try one of the challenges.",
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
	case 'functions':
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