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
    } else {
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

document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        playpauseTrack();
    }
});

function playTrack() {
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    // wave.classList.add('loader');
    // playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    //wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
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

function nextTrack() {

    if(isRandom==false && isRepeat==false){
        track_index=(track_index+1)%loadedSongs.length;
    }
    else if(isRandom==true){
        let random_index = Number.parseInt(Math.random() * loadedSongs.length);
        track_index = random_index;
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
        const trackData = {
            objectId: loadedSongs[track_index].id,
            currentTime: curr_track.currentTime,
            // totalTime: curr_track.duration
        };
        fetch(`http://localhost:8080/send_msg`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(trackData)

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
                // Process the retrieved data and update the UI accordingly
                // Clear previous search results
                search_data.length = 0;
                searchResultDiv.innerHTML = ''; // Clear existing results
                if (data.length === 0) {
                    searchResultDiv.innerHTML = '<p>No results found</p><div class="animation-container-2"></div>';
                    const animationContainer2 = document.querySelector('.animation-container-2');
                    const animData2 = {
                        container: animationContainer2,
                        renderer: 'svg',
                        loop: true,
                        autoplay: true,
                        path: '../assets/media/Empty.json'
                    };
                    const anim2 = lottie.loadAnimation(animData2);
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
                        titlePara.innerHTML = `${song.title} <br> <span style="font-size: 14px;">${song.movie} | ${song.artist}</span>`


                        resultDiv.appendChild(titlePara);

                        const playerscreen = document.querySelector('.player-screen');
                        const initscreen = document.querySelector('.init-screen');
                        const bgAnimation = document.querySelector('.bgAnimation');
                        const bodyElement = document.querySelector('body');




                        resultDiv.addEventListener('click', function () {
                            if (playerscreen.classList.contains('invisible')) {
                                playerscreen.classList.remove('invisible');
                            }
                            if(!initscreen.classList.contains('invisible')){
                                initscreen.classList.add('invisible');
                            }
                            if (bgAnimation) {
                                bgAnimation.parentElement.removeChild(bgAnimation);
                            }
                            bodyElement.style.setProperty('--opacity', '0.8');

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
