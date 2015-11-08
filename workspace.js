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

function evalSource(source) {
  var translation;

  try { translation = translateCode(source) }
  catch (e) {
    //Parse Error
    if (e.errorPos != undefined) {
      console.log(e);
      alert('Parse error:'+source.substring(0,e.errorPos)+' ERROR ->'+source.substring(e.errorPos,source.length));
    }
    return undefined
  }
  try {
    return eval(translation);
  } catch (e) {
    console.log(e);
    alert('Syntax Error');
    //alert("Oops!\n\n" + e);
    throw e;
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
  var turtleCode = evalSource(source);
  eval(turtleCode+'.apply(canvasState.turtle)');
  previewSource(getSource());
};

function previewSource(source){
  if(document.getElementById("previewingCheckbox").checked){
    canvasState.resetPreview();

    source = 'Logo.matchAll("'+source+'","topLevelCmds");';
    var previewCode = evalSource(source);
    eval(previewCode+'.apply(canvasState.previewTurtle)');

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