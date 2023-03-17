console.log("This is a music player")

//Initialize variables
let songIndex = 0;
let songList = [] ; //This list holds the cookies from which the song list and their respective paths will be present
let musicPlay = document.getElementById("musicPlay");
let myProgressBar = document.getElementById("myProgressBar");
let audioElem = new Audio('../songs/1.mp3');
let playAnimation = document.getElementById('playAnimation');

musicPlay.addEventListener('click', ()=>{
    // console.log('inside the event')
    myProgressBar.min = 0;
    myProgressBar.max = audioElem.duration;

    if(audioElem.paused || audioElem.currentTime<=0){
        playAnimation.style.opacity = 1
        audioElem.play();
        musicPlay.classList.remove('fa-play-circle');
        musicPlay.classList.add('fa-pause-circle');
    }
    else{
        playAnimation.style.opacity = 0;
        audioElem.pause();
        musicPlay.classList.remove('fa-pause-circle');
        musicPlay.classList.add('fa-play-circle');
    }
})

audioElem.addEventListener('timeupdate', ()=>{
    let progress = parseInt((audioElem.currentTime/audioElem.duration)*100);
    myProgressBar.value = audioElem.currentTime;
})

myProgressBar.addEventListener('change', ()=>
{
    audioElem.currentTime = myProgressBar.value;
})


//Event handlers down here

