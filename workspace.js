// This code was adapted from Takashi Yamamiya's Javascript Workspace,
// which you can visit at http://metatoys.org/propella/js/workspace.js

//Global State Variables for Recording and Repeating functionality
var REPEAT=false;
var RECORDING=false;
var MYFUNDEFINED=false;

function ParseError() { }

/* event handler for short cut key */
function onShortCutKey(evt) {
  evt = evt ? evt : window.event;
  if (!evt)
    return undefined;
  if (!(evt.altKey || evt.ctrlKey || evt.metaKey))
    return true;
  var charCode = evt.charCode ? evt.charCode : evt.keyCode
  try {
    var handledIt = true
    switch (charCode) {
      case 68: doIt();            break
      case 80: printIt();         break
      default: handledIt = false; return true
    }
  }
  finally {
    if (handledIt) {
      if (evt.preventDefault) {
        evt.preventDefault()
        evt.stopPropagation()
      }
      else {
        evt.returnValue  = false
        evt.cancelBubble = true
      }
    }
  }
  return false
};

function printIt() {
  var result       = runSource(getSource());
  if (!result)
    return;
  alert(result.result);
};

function doIt() {
  var result = runSource(getSource());
  if (result)
    ;//result.source.editor.focus()
};

/* Get expression from textarea */
function getSource() {
  return $('workspaceForm').source.value;
};

function setSource(str) {
  if(RECORDING){
    $('workspaceForm').source.value += str + '\n';
  }else{
    $('workspaceForm').source.value = str;
  }
};

function runSource(source){
  if(REPEAT){
    REPEAT=false;
    var n = prompt("How many times should that repeat?", "2");
    
    if (n != null) {
      if(/^[1-9]\d*$/.test(n)){}
        source = "repeat " + n + " [ " + source + " ]";
      }else{
        alert('input '+n+'must be a positive number');
      }    
  }

  setSource(source);

  source = 'Logo.matchAll("'+source+'","topLevelCmds");';

  var translation, turtleCode;

  try{ translation = translateCode(source)
  } catch (e) {
    //Parse Error
    if (e.errorPos != undefined) {
      alert('Parse error:'+source.substring(0,e.errorPos)+' ERROR ->'+source.substring(e.errorPos,source.length));
    }
    return;
  }

  try{
    turtleCode = eval(translation);
  } catch (e) {
    //Syntax Error
    alert('Syntax Error');
    //throw e;
  }

  try{
    eval(turtleCode+'.apply(canvasState.turtle)');
  }catch (e){
    alert(e.message);
  }

  previewSource(getSource());
};

function previewSource(source){
  if(document.getElementById("previewingCheckbox").checked){
    canvasState.resetPreview();

    var previewCode,source;

    source = 'Logo.matchAll("'+source+'","topLevelCmds");';

    try { 
      translation = translateCode(source) 
    }catch (e){
    //Parse Error
      return;
    }

    try {
      previewCode = eval(translation);
    } catch (e) {
      return;
    }

    try{
      eval(previewCode+'.apply(canvasState.previewTurtle)');
    }catch (e){
      return;
    }

  }
}

function repeatClick(){
  if(!REPEAT){
    REPEAT=true;
  }else{
    REPEAT=false;
  }
};

function recordClick(){
  var rb = document.getElementById('recordButton')
  if(!RECORDING){
    setSource('to function1\n');
    RECORDING=true;
    rb.value = 'stop';

  }else{
    setSource('end');
    RECORDING=false;
    MYFUNDEFINED=true;
    rb.value = 'record';
    doIt();
  }
};

function playClick(){
  if(MYFUNDEFINED){
    runSource('function1');
  }else{
    alert('Error: You must record a funciton before pressing play');
  }
};

function previewCBchange(){
  if(document.getElementById('previewingCheckbox').checked){
    previewSource(getSource());
  }else{
    canvasState.resetPreview();
  }
};