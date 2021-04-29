Gesture_name="";
Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot(){
  Webcam.snap(function (data_uri){
     document.getElementById("result").innerHTML='<img id="captured_img" src="'+data_uri+'"/>'
  });
}
console.log("ml5 version: ", ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/xgI0s3Y-U/model.json', modelLoaded);

function modelLoaded(){
    console.log("model Loaded");
}
function speak(){
  synth=window.speechSynthesis;
  speak_data="The hand gesture means "+Gesture_name;
  utterThis=new SpeechSynthesisUtterance(speak_data)
  synth.speak(utterThis);
}
function check(){
  img=document.getElementById('captured_img');
  classifier.classify(img, gotResult)
}
 function gotResult(error,results){
   if(error){
     console.error(error);
   }
   else{
    console.log(results);
    document.getElementById("gesture_name").innerHTML=results[0].label;
    Gesture_name=results[0].label;
    speak();
    if(results[0].label=="Yes great!"){
      document.getElementById("gesture").innerHTML="&#128077";
    }
    if(results[0].label=="Victory"){
      document.getElementById("gesture").innerHTML="&#x270C";
    }
    if(results[0].label=="Amazing"){
      document.getElementById("gesture").innerHTML="&#128076";
    }
    if(results[0].label=="No thank you"){
      document.getElementById("gesture").innerHTML="&#128078";
    }
    if(results[0].label=="Greetings!"){
      document.getElementById("gesture").innerHTML="&#128406";
    }
   }
 }