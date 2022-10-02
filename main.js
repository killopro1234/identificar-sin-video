function setup(){
  canvas=createCanvas(270,270);
  canvas.center();
  canvas.mouseReleased(classifyCanvas);
  synth=window.speechSynthesis
}

function preload(){
classifier=ml5.imageClassifier("DoodleNet");
}

function clearCanvas(){
  background("withe");
}

function draw(){
  strokeWeight(5);
  stroke(0);
  if(mouseIsPressed){
    line(pmouseX,pmouseY,mouseX,mouseY);
  }
}

function classifyCanvas(){
  classifier.classify(canvas,gotResult);
}

function gotResult(error,results){
  if (error){
    console.log(error);
  }
  console.log(results);
  document.getElementById('label').innerHTML="etiqueta: "+ results[0].label;
  document.getElementById('confidence').innerHTML="Confianza: "+ Math.round(results[0].confidence*100)+"%";
  utterThis =new SpeechSynthesisUtterance(results[0].label);
  synth.speak(utterThis)
}