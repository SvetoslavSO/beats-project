var player = document.querySelector("#player");
const playerContainer = document.querySelector(".player");
const splash = document.querySelector(".player__splash");
const startButton = document.querySelector(".player__start");
const playerBar = document.querySelector(".player__playback");
const playbackButton = document.querySelector(".player__playback-button");
const offVolume = document.querySelector(".player__volume-off");
const volumeBar = document.querySelector(".player__volume-bar");
const volumeButton = document.querySelector(".player__volume-button");
player.volume = 0.5;
let currentVolume = player.volume;

startButton.addEventListener("click", e=>{
  e.preventDefault();
  if(!playerContainer.classList.contains("active") ){
    playerContainer.classList.add("active");
    splash.style.display = "none";
    player.play();  
  }else{
    playerContainer.classList.remove("active");
    splash.style.display = "unset";
    player.pause();
  }
});

splash.addEventListener("click", e=>{
  playerContainer.classList.add("active");
  player.play();
  splash.style.display = "none";
})

playerBar.addEventListener("click", e=>{
  const bar = e.currentTarget;
  const clickedPosition = e.layerX;
  const newButtonPositionPercent = (clickedPosition / bar.offsetWidth)*100;
  const newPlaybackPositionSec = (player.duration/100)*newButtonPositionPercent;
  playbackButton.style.left =`${newButtonPositionPercent}%`;
  player.currentTime = newPlaybackPositionSec;
  
});

offVolume.addEventListener("click", e=>{
  e.preventDefault();
  if(!offVolume.classList.contains("off")){
    offVolume.classList.add("off")
    player.volume = 0;
  } else{
    offVolume.classList.remove("off")
    player.volume = currentVolume;
  }
})

volumeBar.addEventListener("click", e=>{
  const vol = e.currentTarget;
  const clicked = e.layerX;
  console.log(clicked);
  const newVolumePositionPercent = (clicked / vol.offsetWidth)*100;
  console.log(vol.offsetWidth);
  const newVolumePosition = (player.volume/100)*newVolumePositionPercent;
  console.log(volumeButton);
  volumeButton.style.left =`${newVolumePositionPercent}%`;
  player.volume = parseInt(newVolumePositionPercent)/100;
})

player.onplay = function(){
  interval = setInterval(()=>{
    const durationSec = player.duration;
    const completedSec = player.currentTime;
    const completedPercent = (completedSec / durationSec)*100;
    playbackButton.style.left = `${completedPercent}%`;
  }, 1000)
}

player.oncanplay = function(){
  volumeButton.style.left = `${currentVolume*100}%`;
  console.log(volumeButton.style.left);
}

player.onended = function(){
  playerContainer.classList.remove("active");
}
