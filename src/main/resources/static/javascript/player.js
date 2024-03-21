let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let mute_btn = document.querySelector('.mute-track');
let like_btn = document.querySelector('.like-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let progress = document.querySelector('.progress');
let progressContainer = document.querySelector('.progress_container');


let volume_slider = document.querySelector('.volume_slider');
let volume_slider_container = document.querySelector('.volume_slider_container');

let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let repeatIcon = document.querySelector('.fa-repeat');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let isRepeat = false;
let isLiked = false;
let isDark = true;
let updateTimer;

const urlParams = new URLSearchParams(window.location.search);
const ipAddress = urlParams.get('ip');
const port = urlParams.get('port');

// Display IP address and port
document.getElementById('textToCopy').innerText = `${ipAddress}:${port}`;

const music_list = [
    {
        img: 'https://firebasestorage.googleapis.com/v0/b/live-sync-7015a.appspot.com/o/stay.png?alt=media&token=97e9368e-d516-4652-afa1-9accc2aee5ec',
        name: 'Stay',
        artist: 'The Kid LAROI, Justin Bieber',
        music: '../assets/music/stay.mp3'
    },
    {
        img: 'https://firebasestorage.googleapis.com/v0/b/live-sync-7015a.appspot.com/o/fallingdown.jpg?alt=media&token=c5b51615-f53d-46e9-93cd-e395fbc319c7',
        name: 'Falling Down',
        artist: 'Wid Cards',
        music: '../assets/music/fallingdown.mp3'
    },
    {
        img: 'https://firebasestorage.googleapis.com/v0/b/live-sync-7015a.appspot.com/o/faded.png?alt=media&token=e2304ca3-2c51-43cc-abc4-621282206086',
        name: 'Faded',
        artist: 'Alan Walker',
        music: '../assets/music/Faded.mp3'
    },
    {
        img: 'https://firebasestorage.googleapis.com/v0/b/live-sync-7015a.appspot.com/o/ratherbe.jpg?alt=media&token=d32d00c5-abf0-4014-be8e-29743d7729ec',
        name: 'Rather Be',
        artist: 'Clean Bandit',
        music: '../assets/music/Rather Be.mp3'
    },
    {
        img: 'https://firebasestorage.googleapis.com/v0/b/live-sync-7015a.appspot.com/o/dhaga.jpeg?alt=media&token=aa81f2ea-8db3-4d43-b138-9267dbb85179',
        name: 'Dhaaga',
        artist: 'Niloptal Bora',
        music: '../assets/music/Dhaga.mp3'
    }
];

// loadTrack(track_index);

// function loadTrack(track_index) {
//     clearInterval(updateTimer);
//     reset();
//
//     // curr_track.src = music_list[track_index].music;
//     curr_track.src ="https://firebasestorage.googleapis.com/v0/b/live-sync-7015a.appspot.com/o/Kun%20Faya%20Kun%20-%20A.R.%20Rahman.mp3?alt=media&token=cd615ace-2e38-479c-89dc-b91f444e2fd8";
//
//     curr_track.load();
//
//     track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
//     track_name.textContent = music_list[track_index].name;
//     track_artist.textContent = music_list[track_index].artist;
//     now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;
//
//
//     curr_track.addEventListener('ended', nextTrack);
//
//
//     dominant_bg_color(track_index);
// }
let loadedSongs = [];
function loadTrack(track_index, songData) {
    clearInterval(updateTimer);
    reset();

    const isLoaded = loadedSongs.some(song => song.title === songData.title && song.movie === songData.movie);
    let songIndex = -1;

    if (!isLoaded) {
        loadedSongs.push(songData);
        songIndex = loadedSongs.length - 1;
        // console.log(loadedSongs)
    }else{
        songIndex = loadedSongs.findIndex(song => song.title === songData.title && song.movie === songData.movie);
    }
    curr_track.src = songData.url;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + songData.imgUrl + ")";
    track_name.textContent = songData.title;
    track_artist.textContent = songData.movie;
    now_playing.textContent = "Playing music " + (songIndex + 1) + " of " + loadedSongs.length;

    curr_track.addEventListener('ended', nextTrack);
    dominant_bg_color(songData);
    playTrack();

}


function dominant_bg_color(songData) {

    // Get the reference to the div
    let div = document.body;

    // Set the background image using JavaScript
    div.style.backgroundImage = "url('" + songData.imgUrl + "')";
    div.style.backgroundSize = "cover";
    div.style.backgroundSize = "cover";
    div.style.backgroundPosition = "center"; // Center the background image
    div.style.backgroundAttachment = "fixed";
    div.style.overflow = "hidden";

}


function reset() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    // seek_slider.value = 0;
    progress.style.width = `0`;
}

function randomTrack() {
    isRandom ? pauseRandom() : playRandom();
}

function playRandom() {
    pauseRepeat();
    isRandom = true;
    randomIcon.classList.add('randomActive');
}

function pauseRandom() {
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}

function repeatTrack() {
    isRepeat ? pauseRepeat() : playRepeat();
}

function playRepeat() {
    pauseRandom();
    isRepeat = true;
    repeatIcon.classList.add('randomActive');
}

function pauseRepeat() {
    isRepeat = false;
    repeatIcon.classList.remove('randomActive');
}

function likeTrack() {
    like_btn.innerHTML = isLiked ? ' <i class="far fa-heart hollow-heart-icon fa-2x" title="heart"></i>' : '<i class="fas fa-heart heart-icon fa-2x" style="color:var(--brand-color)"></i>';
    isLiked = !isLiked;
}

function playpauseTrack() {
    isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    //wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {

    if (track_index <= loadedSongs.length - 1) {        //Bug: Last song not repeating the first
        if (isRandom === false && isRepeat === false) {
            track_index += 1;
        }
        else if (isRandom === true) {
            let random_index = Number.parseInt(Math.random() * loadedSongs.length);
            track_index = random_index;
        }
    } else {
        track_index = 0;
    }

    loadTrack(track_index,loadedSongs[track_index]);
    playTrack();
}

function prevTrack() {
    if (track_index > 0) {
        track_index -= 1;
    } else {
        track_index = loadedSongs.length - 1;
    }
    loadTrack(track_index,loadedSongs[track_index]);
    playTrack();
}


volume_slider_container.addEventListener('click', setVolume)

function setVolume(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const volumeRatio = (clickX / width);
    if (volumeRatio <= 1) {
        volume_slider.style.width = `${volumeRatio * 100}%`;
        console.log(volumeRatio);
        curr_track.volume = volumeRatio;
    }
}


function muteTrack() {
    mute_btn.innerHTML = curr_track.muted ? '<i class="fa fa-volume-down fa-2x"></i>' : '<i class="fas fa-volume-mute fa-2x"></i>';
    volume_slider.style.width = curr_track.muted ? '100%' : '0%'
    curr_track.muted = !curr_track.muted;
}

curr_track.addEventListener('timeupdate', updateProgress)

function updateProgress() {
    if (!isNaN(curr_track.duration)) {
        const progressPercent = (curr_track.currentTime / curr_track.duration) * 100;
        progress.style.width = `${progressPercent}%`;
        setText();
           //
    }
}

progressContainer.addEventListener('click', setProgress)

function setProgress(e) {

    if (!isNaN(curr_track.duration)) {

        const width = this.clientWidth;
        const clickX = e.offsetX;
        curr_track.currentTime = (clickX / width) * curr_track.duration;
        setText();
        const msg="hello";
        fetch(`http://localhost:8080/send_msg`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({query:msg})

        })
            .then(response=>response.text())
            .then(data=>console.log(data))
            .catch(error=>console.error('Error:',error));



    }
}

function setText() {
    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) {
        currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
        durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
        currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
        durationMinutes = "0" + durationMinutes;
    }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
}

function toggleMode() {
    const root = document.documentElement;
    isDark = !isDark;

    if (isDark === true) {
        // document.querySelector('#toggle').innerHTML = '<i class="fas fa-moon fa-2x" style="color:white"></i>';
        root.style.setProperty('--primary-color', '#000000');
        root.style.setProperty('--secondary-color', '#ffffff');
        root.style.setProperty('--gray-color', '#484848');
    }
    else {
        // document.querySelector('#toggle').innerHTML = '<i class="fas fa-sun fa-2x" style="color:black"></i>';
        root.style.setProperty('--primary-color', '#ffffff');
        root.style.setProperty('--secondary-color', '#000000');
        root.style.setProperty('--gray-color', '#b6b6b6');
    }
}

// $(document).ready(function() {
//     $('.second-half').hover(function() {
//         $('.track-art').stop().animate({
//           width: '100px', height: '100px'
//         }, 300);
//     }, function() {
//         $('.track-art').stop().animate({
//             width: '200px', height: '200px' // Restore default color
//         }, 300);
//     });
// });

const expandbtn = document.querySelector('.expand-search')
const closebtn = document.querySelector('.close-search')
const usrbtn = document.querySelector('.users-btn')
const searchcontent = document.querySelector('.search-box-content')
const searchscreen = document.querySelector('.search-screen')
const usrscreen = document.querySelector('.user-screen')



expandbtn.addEventListener('click', function () {
    document.querySelector('.search-box').style.width = '25%'
    searchcontent.classList.remove('invisible')
    this.classList.add('invisible')
})

closebtn.addEventListener('click', function () {
    document.querySelector('.search-box').style.width = '1%'
    expandbtn.classList.remove('invisible')
    searchcontent.classList.add('invisible')
})

usrbtn.addEventListener('click',function(){
    usrbtn.childNodes[0].classList.toggle('active')
    searchscreen.classList.toggle('invisible')
    usrscreen.classList.toggle('invisible')
})

document.querySelector('.end-btn').addEventListener('click',function(){
    if(confirm("Want to end collab?")){
        window.location.href = 'collab.html';
    }
})

const search_data = [];
const searchfld = document.querySelector('.search-fld');
const searchResultDiv = document.querySelector('.search-result');

searchfld.addEventListener('keypress', function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        console.log(this.value);
        const query = this.value; // Get the value from the input field

        // Fetch data from the server
        fetch(`http://localhost:8080/songs/query/${query}`)
            .then(response => response.json())
            .then(data => {
                // Clear previous search results
                search_data.length = 0;
                searchResultDiv.innerHTML = ''; // Clear existing results
                if (data.length === 0) {
                    searchResultDiv.innerHTML = '<p>No results found</p>';
                }
                else {
                    // Process the retrieved data and update the UI accordingly
                    data.forEach(song => {
                        const row = [song.title, song.movie, song.artist, song.imgUrl, song.url];
                        search_data.push(row);


                        const resultDiv = document.createElement('div');
                        resultDiv.classList.add('result');
                        const img = document.createElement('img');
                        img.src = song.imgUrl; // Set the image source
                        img.alt = `${song.title} Poster`; // Set alternative text
                        resultDiv.appendChild(img); // Append image to result div


                        const titlePara = document.createElement('p');
                        titlePara.innerHTML = `${song.title} <br> <span style="font-size: 14px;">${song.movie}</span>`


                        resultDiv.appendChild(titlePara);


                        resultDiv.addEventListener('click', function () {
                            loadTrack(search_data.findIndex(item => item[0] === song.title && item[1] === song.movie), song);
                        });

                        // Append the new div to the search result container
                        searchResultDiv.appendChild(resultDiv);

                    });
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
});

console.log(search_data);

const copyBtn=document.getElementById('copyButton');

copyBtn.addEventListener('click', function() {
    const textToCopy = document.getElementById('textToCopy');
    const ip_port=textToCopy.innerText

    // Use the Clipboard API to copy the text to the clipboard
    navigator.clipboard.writeText(ip_port)
        .then(() => {

// First part animation
            copyBtn.classList.add('animate-out');
            textToCopy.classList.add('animate-out');

            setTimeout(function() {
                copyBtn.innerHTML='<i class="fa fa-check-circle fa-2x content" aria-hidden="true" style="color:white"></i>'
                textToCopy.innerText='Copied to clipboard!!';

                copyBtn.classList.remove('animate-out');
                textToCopy.classList.remove('animate-out');

                setTimeout(function() {
                    copyBtn.classList.add('animate-out');
                    textToCopy.classList.add('animate-out');

                    setTimeout(function() {
                        copyBtn.innerHTML='<i class="fa fa-clone fa-2x content" aria-hidden="true" style="color:white"></i>'
                        textToCopy.innerText=ip_port;

                        copyBtn.classList.remove('animate-out');
                        textToCopy.classList.remove('animate-out');
                    }, 200);
                }, 3000);
            }, 200);


        })
        .catch(err => {
            console.error('Error copying text to clipboard:', err);
        });
});
