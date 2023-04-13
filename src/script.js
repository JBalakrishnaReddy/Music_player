console.log("This is a music player")

//Initialize variables
let songIndex = 0;
let songList = [] ; //This list holds the cookies from which the song list and their respective paths will be present

//These are related to song control
let musicPlay = document.getElementById("musicPlay");
let musicBackward = document.getElementById("musicBackward")
let musicForward = document.getElementById("musicForward")
//Song progress bar
let myProgressBar = document.getElementById("myProgressBar");
// let audioElem = new Audio('../songs/1.mp3');

//Song details and their current time and duration details
let currentTime = document.getElementById('currentTime') 
let songDuration = document.getElementById('Duration')
let audioElem = document.getElementById('audioPlayer')
let songTitle = document.getElementById('songTitle')


let songContainer = document.getElementById("songContainer");
let currentSongIndex = 0
let playAnimation = document.getElementById('playAnimation');

let songs = [
    {songName:"song-1 ", filepath: "../songs/1.mp3", coverpath:"../images/covers/1.jpg"},
    {songName:"song-2 ", filepath: "../songs/2.mp3", coverpath:"../images/covers/2.jpg"},
    {songName:"song-3 ", filepath: "../songs/3.mp3", coverpath:"../images/covers/3.jpg"},
    {songName:"song-4 ", filepath: "../songs/4.mp3", coverpath:"../images/covers/4.jpg"},
    {songName:"song-5 ", filepath: "../songs/5.mp3", coverpath:"../images/covers/5.jpg"},
    {songName:"song-6 ", filepath: "../songs/6.mp3", coverpath:"../images/covers/6.jpg"},
    {songName:"song-7 ", filepath: "../songs/7.mp3", coverpath:"../images/covers/7.jpg"},
    {songName:"song-8 ", filepath: "../songs/8.mp3", coverpath:"../images/covers/8.jpg"},
    {songName:"song-9 ", filepath: "../songs/9.mp3", coverpath:"../images/covers/9.jpg"},
    ]

songContainer.innerHTML = ""
for(let i =0; i < songs.length; i++)
{
    let temp_song = new Audio(songs[i]['filepath'])
    // let duration = temp_song.duration
    let duration = '01:00'
    // console.log(duration)
    songContainer.innerHTML += `<div class="songItem", id = "song-${i}">
        <img src=${songs[i].coverpath}>
        <span>${songs[i].songName}</span>
        <span id="timestamp-${i}"><span class="timestamp">${duration}<i id="song-action-${i}" class="far fa fa-play-circle"></i></span></span>
        </div>`
        // <span class="timestamp-${i}"><span class="timestamp">${duration}<i class="far fa fa-play-circle"></i></span></span>
        
}
// Throughout this application I will try to use different ways of function implementation for my practise only
toTime = (seconds) => { // This is just an arrow function used for my practise and nothing else
    var date = new Date(null);
    date.setSeconds(seconds);
    return date.toISOString().substring(11, 19);
}

/*
const jsm  = window.jsmediatags
document.querySelector("#song-input").addEventListener("change", (event) => {
    const song = event.target.files[0]
    console.log(song)
    jsm.read(song, {
        onSuccess: function(tag) {
            console.log(tag)
            const data = tag.tags.picture.data;
            const format = tag.tags.picture.format;
            let baseString64 = ""
            for(var i=0; i< data.length; i++)
                baseString64 += String.fromCharCode(data[i])
            let img = `url(data:${format}; base64, ${window.btoa(baseString64)})`
            var title = tag.tags.title
            var artist = tag.tags.artist
            var time = tag.tags.time
            var album = tag.tags.album
            var genre = tag.tags.genre
        },
        onError: function(error) {
            console.log(error)
        }
    })
  }) */

/*
jsm.read(songs[1]['filepath'], {
    onSuccess: function(tag) {
      console.log(tag)
    },
    onError: function(error) {
        console.log(error)
    }
  })*/ 

/*
let fillsongs = (songsContainer, path) => ({
    songsContainer.innerHTML = '<div class="songItem">
    <img src="../images/covers/1.jpg">
    <span>Song name</span>
    <span class="song1"><span class="timestamp">05:20 <i class="far fa fa-play-circle"></i></span></span>
    </div>'
}) */


// Different ways of defining a funcion. Below is a type of arrow function and the other funcions\
// are normal functions that are widely available in all other programming languages
removeAndAdd = (handler, removeElem, addElem) => {
    handler.remove(removeElem)
    handler.add(addElem)
}

playOrPause = (event="")=>{
    // console.log('inside the event')
    // console.log(event)
    myProgressBar.max = audioElem.duration;
    if(audioElem.src == '')
    {
        myProgressBar.min = 0;
        audioElem.src = songs[0].filepath;
    }
    if(audioElem.paused || audioElem.currentTime<=0){
        playAnimation.style.opacity = 1
        audioElem.play();
        removeAndAdd(musicPlay.classList, 'fa-play-circle', 'fa-pause-circle')
        // musicPlay.classList.remove('fa-play-circle');
        // musicPlay.classList.add('fa-pause-circle');
    }
    else{
        playAnimation.style.opacity = 0;
        audioElem.pause();
        removeAndAdd(musicPlay.classList, 'fa-pause-circle', 'fa-play-circle')
        // musicPlay.classList.remove('fa-pause-circle');
        // musicPlay.classList.add('fa-play-circle');
    }
}

function playSong(songPath){
    // console.log(songPath)
    // This function takes arguments from the events when clicked on play or pause or next or back 
    playAnimation.style.opacity = 0
    myProgressBar.min = 0;
    if (!audioElem.paused)
    {
        playOrPause()
        // audioElem.pause()
        // musicPlay.classList.remove('fa-pause-circle');
        // musicPlay.classList.add('fa-play-circle');
    }
    // audioElem = new Audio(songPath)
    audioElem.src = songPath
    // songTitle.textContent = songPath.split('/').slice(-1).split('.')[0]
    songTitle.textContent = songPath.split('/').slice(-1)[0].split('.')[0]

    playAnimation.style.opacity = 1
    playOrPause()
    // audioElem.play()
    // musicPlay.classList.remove('fa-play-circle');
    // musicPlay.classList.add('fa-pause-circle');
}

function playNextSong()
{
    ++currentSongIndex
    if(currentSongIndex >= songs.length)
        currentSongIndex = 0;
    
    playSong(songs[currentSongIndex]['filepath']);
}

function makeAllPlays()
{
    songElements.forEach((element)=>{
        element.classList.remove('fa-pause-circle')
        element.classList.add('fa-play-circle')
    })
}

function method(e){
    currentSongIndex = parseInt(e.target.id.split('-')[2])
    let _temp = new Audio(songs[currentSongIndex]['filepath'])
    if(audioElem.src == _temp.src){
        if(audioElem.paused){
            playOrPause()
            removeAndAdd(e.target.classList, 'fa-play-circle', 'fa-pause-circle')
            return
        }
        playOrPause()
        removeAndAdd(e.target.classList, 'fa-pause-circle', 'fa-play-circle')
        return
    }
    playOrPause()
    // makeAllPlays()
    playSong(songs[currentSongIndex]['filepath'])
    removeAndAdd(e.target.classList, 'fa-play-circle', 'fa-pause-circle')
}

songElements = Array.from(document.getElementsByClassName('fa'))
songElements.forEach((element)=>{
    // console.log(element)
    element.addEventListener('click', method)
})

function changeIcon(){
    // This function deals with changing the play pause icons at song level and at the bottom of the page.
    
}

/* 
Actions to be performed when few of the buttons are clicked
1. When play or pause button at the bottom is clcked. 
    a. the song has to play if it is not playing and pause if it is playing.
    b. The icon has to change to pause after playing starts and similarly 
        the button has to change to play after pausing.
    c. Also similar icon change and action change has to happen in song bar
2. When next button is pressed the song.
    a. Should change the song to next and start playing it immediately.
    b. Relevant icon play button has to change to pause,
    c. If any song was previously playing then its pause icon has to change to play.
    c. Changing the index of the song is internal action and will not be displayed on the main application.
    The index  will change and all the relevant actions 
    updating the song index and changing the song, updating its icon
3. Samething is valid when we previous button
4. If the song is ended
    a. Change the song, change the song icons also.

*/


//Event handlers down here

musicPlay.addEventListener('click', playOrPause)

musicForward.addEventListener('click', playNextSong)

musicBackward.addEventListener('click', ()=>{
    // console.log('back button clicked')
    --currentSongIndex;
    if(currentSongIndex <= 0)
        currentSongIndex = songs.length-1
    playSong(songs[currentSongIndex]['filepath'])
})

audioElem.addEventListener('loadedmetadata', ()=>{
    songDuration.textContent = toTime(audioElem.duration);
    myProgressBar.max = audioElem.duration
})

audioElem.addEventListener('timeupdate', ()=>{
    let progress = parseInt((audioElem.currentTime/audioElem.duration)*100);
    myProgressBar.value = audioElem.currentTime;
    currentTime.textContent = toTime(audioElem.currentTime)
})

audioElem.addEventListener('ended', playNextSong)

myProgressBar.addEventListener('change', ()=>
{
    audioElem.currentTime = myProgressBar.value;
})


// Maintain a list of songs that are currently in present in the container and their dynamic ids.
// Modfify the inner HTML from this script file so as to accomodate more number of files.


// document.querySelector("#song-input").addEventListener("change", (event) => {
//     const song = event.target.files[0]
//     console.log(song)
//     jsmediatags.read(song, {
//       onSuccess: function(tag) {
//         console.log(tag)
//       },
//       onError: function(error) {
//           console.log(error)
//       }
//     })  
//   })