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
  splash.style.display = "none";
  player.play(); 
}

const stopPlay = function(){
  playerContainer.classList.remove("active");
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
  const newVolumePositionPercent = completedAction(clickedPosition, bar);
  const newVolumePosition = buttonPosition(newVolumePositionPercent);
  volumeButton.style.left =`${newVolumePositionPercent}%`;
  player.volume = parseInt(newVolumePositionPercent)/100;
  volumeLine.style.background = `linear-gradient(to right, #E01F3D ${newVolumePositionPercent}%, #333 ${newVolumePositionPercent}%)`;
  currentVolume = player.volume;
})

offVolume.addEventListener("click", e=>{
  e.preventDefault();
  if(!offVolume.classList.contains("off")){
    offVolume.classList.add("off")
    volumeLine.style.background = `#333`;
    volumeButton.style.left =`0`;
    player.volume = 0;
  } else{
    offVolume.classList.remove("off")
    player.volume = currentVolume;
    volumeOn = currentVolume*100;
    volumeButton.style.left =`${volumeOn}%`;
    volumeLine.style.background = `linear-gradient(to right, #E01F3D ${volumeOn}%, #333 ${volumeOn}%)`
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