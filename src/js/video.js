;(function(){
  var player = document.querySelector("#player");
const playerContainer = document.querySelector(".player");
const splash = document.querySelector(".player__splash");
const startButton = document.querySelector(".player__start");
const playerBar = document.querySelector(".player__playback");
const playbackButton = document.querySelector(".player__playback-button");
const offVolume = document.querySelector(".player__volume-off");
const volumeBar = document.querySelector(".player__volume-bar");
const volumeButton = document.querySelector(".player__volume-button");
const playbackLine = document.querySelector(".player__playback-line");
const volumeLine = document.querySelector(".player__volume-line");

player.volume = 0.5;
let currentVolume = player.volume;

const startPlay = function(){
  playerContainer.classList.add("active");
  startButton.classList.add("duration__start--active");
  splash.style.display = "none";
  player.play(); 
}

const stopPlay = function(){
  playerContainer.classList.remove("active");
  startButton.classList.remove("duration__start--active");
  splash.style.display = "unset";
  player.pause();
}

startButton.addEventListener("click", e=>{
  e.preventDefault();
  if(!playerContainer.classList.contains("active") ){
    startPlay(); 
  }else{
    stopPlay();
  }
});

splash.addEventListener("click", e=>{
  startPlay();
})

var completedAction = function(clickedPosition, bar){
  return  (clickedPosition / bar.offsetWidth)*100;
}

var buttonPosition = function(buttonPos){
  return (player.duration/100)*buttonPos;
}

playerBar.addEventListener("click", e=>{
  const bar = e.currentTarget;
  const clickedPosition = e.layerX;
  const newButtonPositionPercent = completedAction(clickedPosition, bar);
  const newPlaybackPositionSec = buttonPosition(newButtonPositionPercent);
  playbackButton.style.left =`${newButtonPositionPercent}%`;
  player.currentTime = newPlaybackPositionSec;
  playbackLine.style.background = `linear-gradient(to right, #E01F3D ${newButtonPositionPercent}%, #333 ${newButtonPositionPercent}%)`;
});

volumeBar.addEventListener("click", e=>{
  const bar = e.currentTarget;
  const clickedPosition = e.layerX;
  if(clickedPosition <= 0){
    clickedPosition = 0;
  }
  const newVolumePositionPercent = completedAction(clickedPosition, bar);
  const newVolumePosition = buttonPosition(newVolumePositionPercent);
  volumeButton.style.left =`${newVolumePositionPercent}%`;
  player.volume = parseInt(newVolumePositionPercent)/100;
  volumeLine.style.background = `linear-gradient(to right, #E01F3D ${newVolumePositionPercent}%, #333 ${newVolumePositionPercent}%)`;
  currentVolume = player.volume;
})

const off = function(){
  offVolume.classList.add("player__volume-off--active");
  offVolume.classList.add("off");
  volumeLine.style.background = `#333`;
  volumeButton.style.left =`0`;
  player.volume = 0;
}
const on = function(){
  offVolume.classList.remove("player__volume-off--active");
  offVolume.classList.remove("off")
  console.log(currentVolume);
  player.volume = currentVolume;
  let volumeOn = player.volume*100;
  volumeButton.style.left =`${volumeOn}%`;
  volumeLine.style.background = `linear-gradient(to right, #E01F3D ${volumeOn}%, #333 ${volumeOn}%)`
}
offVolume.addEventListener("click", e=>{
  e.preventDefault();
  if(!offVolume.classList.contains("off")){
    off();
  } else{
    on();
  }
})


player.onplay = function(){
  interval = setInterval(()=>{
    const durationSec = player.duration;
    const completedSec = player.currentTime;
    const completedPercent = (completedSec / durationSec)*100;
    playbackButton.style.left = `${completedPercent}%`;
    playbackLine.style.background = `linear-gradient(to right, #E01F3D ${completedPercent}%, #333 ${completedPercent}%)`;
  }, 1000)
}

player.oncanplay = function(){
  volumeButton.style.left = `${currentVolume*100}%`;
  volumeLine.style.background = `linear-gradient(to right, #E01F3D ${currentVolume*100}%, #333 ${currentVolume*100}%)`;
}

player.onended = function(){
  playerContainer.classList.remove("active");
}
})()

