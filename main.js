var boombayah = ""
var KTL = ""
var lalisa = ""
var dyna = ""
var song = ""
var wristlx = 0
var wristly = 0
var wristrx = 0
var wristry = 0
scoreRightWrist = 0;
scoreLeftWrist = 0;



function preload(){
boombayah = loadSound("Boombayah_bp.mp3")
KTL = loadSound("ktl.mp3")
dyna = loadSound("dyna_bts.mp3")
song = loadSound("music.mp3")
lalisa = loadSound("lalisa.mp3")
}

function setup(){
canvas = createCanvas(400, 320)
canvas.position(479, 300)
video = createCapture(VIDEO)
video.hide();

poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses)
}

function draw(){
image(video,0,0,400,320);

fill("#FF0000");
stroke("#FF0000");

if(scoreRightWrist > 0.2){
    circle(rightWristX, rightWristY,20)

    if(rightWristY >0 && rightWristY<= 100)
    {
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
        fill("red")
    }
    else if(rightWristY >100 && rightWristY <=200){
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1);
        fill("hotpink")
    }
    else if(rightWristY >200 && rightWristY <=300){
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
        fill("black")
    }
    else if(rightWristY >300 && rightWristY <=400){
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(2);
        fill("purple")
    }
    else if(rightWristY <=400){
        document.getElementById("speed").innerHTML = "Speed = 2.5x";
        song.rate(2.5);
        fill("green")
    }
}

if(scoreLeftWrist > 0.2)
{
    circle(wristlx, wristly,20);
    InNumberWristly = Number(wristly);
    remove_decimals = floor(InNumberWristly);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
     song.setVolume(volume);
}
}

function update4(){
    boombayah.play();
    boombayah.setVolume(1);
    boombayah.rate(1);
    KTL.stop()
    dyna.stop()
    lalisa.stop()
}

function update1(){
    KTL.play();
    KTL.setVolume(1);
    KTL.rate(1);
    boombayah.stop()
    dyna.stop()
    lalisa.stop()
}

function update2(){
    lalisa.play();
    lalisa.setVolume(1);
    lalisa.rate(1);
    KTL.stop()
    dyna.stop()
    boombayah.stop()

}

function update3(){
    dyna.play();
    dyna.setVolume(1);
    dyna.rate(1);
    KTL.stop()
    lalisa.stop()
    boombayah.stop()
}
function update5(){
    song.play();
    song.setVolume(1);
    song.rate(1);
    KTL.stop()
    lalisa.stop()
    boombayah.stop()
    dyna.stop()
}

function stop(){
    boombayah.stop()
    KTL.stop()
    lalisa.stop()
    dyna.stop()
    song.stop()
}

function modelLoaded(){
    console.log('PoseNet is Working')
}

function gotPoses(results){
    if(results.length>0){
        //console.log(results)
        wristlx = results[0].pose.leftWrist.x
        wristly = results[0].pose.leftWrist.y
        wristrx = results[0].pose.rightWrist.x
        wristry = results[0].pose.rightWrist.y
        console.log("leftWristx = "+ wristlx+ " , leftWristY = "+ wristly)
        console.log("rightWristx = "+ wristrx+ " , rightWristY = "+ wristry)

        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);

    }
}

