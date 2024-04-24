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

let playerscreen = document.querySelector('.player-screen');
let initscreen = document.querySelector('.init-screen');
let bgAnimation = document.querySelector('.bgAnimation');
let bodyElement = document.querySelector('body');

var songIndex;
var track_index = 0;
var isPlaying = false;
let isRandom = false;
let isRepeat = false;
let isLiked = false;
let isDark = true;
let updateTimer;

let urlParams = new URLSearchParams(window.location.search);
const ipAddress = urlParams.get('ip');
const port = urlParams.get('port');

if (urlParams.get('participant_type') === "guest") {
    document.querySelector('.end-btn').innerText = 'Leave Collab';
}
// Display IP address and port
document.getElementById('textToCopy').innerText = `${ipAddress}:${port}`;

var loadedSongs = [];

function loadTrack(track_index, songData) {
    clearInterval(updateTimer);
    reset();

    const isLoaded = loadedSongs.some(song => song.title === songData.title && song.movie === songData.movie);
    songIndex = -1;

    if (!isLoaded) {
        loadedSongs.push(songData);
        songIndex = loadedSongs.length - 1;
        console.log(loadedSongs)
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

//
// // Modify loadTrack function to accept track index as parameter
// function loadTrack(trackIndex, songData) {
//     // Your existing code for loading a track
// }
//
// // Modify message handler to load track upon receiving a message
// worker.onmessage = function (event) {
//     const data = event.data;
//
//     if (data.message) {
//         // Handle message content, then load track if necessary
//         // For example:
//         if (data.message.endsWith(':')) {
//             // Handle user info message
//         } else if (data.message !== previousMessage) {
//             // Handle track load message
//             const songInfo = JSON.parse(data.message);
//             // Assuming songInfo contains track index and song data
//             loadTrack(songInfo.trackIndex, songInfo.songData);
//         }
//     } else if (data.error) {
//         // Handle error
//     }
// }
//
// // Example of how to load initial track on page load (if needed)
window.addEventListener('load', function () {
    // Example: Load the first track in loadedSongs array
    if (loadedSongs.length > 0) {
        loadTrack(0, loadedSongs[0]);
    }
});

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
    sendMsg();
}

document.addEventListener("keydown", function (event) {
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
    // sendMsg();
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    //wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
    //sendMsg();
}

function prevTrack() {
    if (track_index > 0) {
        track_index -= 1;
    } else {
        track_index = loadedSongs.length - 1;
    }
    loadTrack(track_index, loadedSongs[track_index]);
    sendMsg();
    playTrack();
}

function nextTrack() {
    if (isRandom == false && isRepeat == false) {
        track_index = (track_index + 1) % loadedSongs.length;
    } else if (isRandom == true) {
        let random_index = Number.parseInt(Math.random() * loadedSongs.length);
        track_index = random_index;
    }
    loadTrack(track_index, loadedSongs[track_index]);
    sendMsg();
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
        sendMsg();
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
    } else {
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
    if (usrbtn.childNodes[0].classList.contains('active')) {
        usrscreen.classList.remove('invisible')
        searchscreen.classList.add('invisible')
    } else {
        searchscreen.classList.remove('invisible')
        usrscreen.classList.add('invisible')
    }
    this.classList.add('invisible')

})

closebtn.addEventListener('click', function () {

    document.querySelector('.search-box').style.width = '1%'
    expandbtn.classList.remove('invisible')
    searchcontent.classList.add('invisible')
    if (!usrscreen.classList.contains('invisible')) {
        usrscreen.classList.add('invisible')
    }
})

usrbtn.addEventListener('click', function () {
    usrbtn.childNodes[0].classList.toggle('active')
    if (usrbtn.childNodes[0].classList.contains('active')) {
        usrscreen.classList.remove('invisible')
        searchscreen.classList.add('invisible')
    } else {
        searchscreen.classList.remove('invisible')
        usrscreen.classList.add('invisible')
    }
})

document.querySelector('.end-btn').addEventListener('click', function () {

        if(urlParams.get('participant_type') === 'host'){

            if (confirm("Want to end collab?")) {

                fetch(`http://localhost:8080/send_msg`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'text/plain'
                    },
                    // body: JSON.stringify(send_msg)
                    body: 'End collab!!'
                    // body: JSON.stringify({send_msg,closeFlag})

                })
                    .then(response => response.text())
                    .then(data => console.log(data))
                    .catch(error => console.error('Error:', error));


                fetch(`http://localhost:8080/close_client`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(response => {
                    if (response.ok) {
                        return response.text();
                    } else {
                        throw new Error('Failed to close client');
                    }
                }).then(data => {
                    console.log(data);
                }).catch(error => {
                    // Send error message back to the main thread
                    console.log({error: error.message});
                });

                fetch(`http://localhost:8080/close_server`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(response => {
                    if (response.ok) {
                        return response.text();
                    } else {
                        throw new Error('Failed to close server');
                    }
                }).then(data => {
                    console.log(data);
                }).catch(error => {
                    // Send error message back to the main thread
                    console.log({error: error.message});
                });

            }

        }else{
            if(confirm("Want to leave collab?")){

                fetch(`http://localhost:8080/close_client`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(response => {
                    if (response.ok) {
                        return response.text();
                    } else {
                        throw new Error('Failed to close client');
                    }
                }).then(data => {
                    console.log(data);
                }).catch(error => {
                    // Send error message back to the main thread
                    console.log({error: error.message});
                });

            }
        }

        const username = urlParams.get('username')
        window.location.href = `collab.html?username=${username}`;

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
                } else {
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

                        resultDiv.addEventListener('click', function () {
                            if (playerscreen.classList.contains('invisible')) {
                                playerscreen.classList.remove('invisible');
                            }
                            if (!initscreen.classList.contains('invisible')) {
                                initscreen.classList.add('invisible');
                                bgAnimation.classList.add('invisible');
                            }
                            bodyElement.style.setProperty('--opacity', '0.8');
                            document.querySelector('.user-playing').textContent = urlParams.get('username') + ' is playing now';

                            loadTrack(search_data.findIndex(item => item[0] === song.title && item[1] === song.movie), song);
                            sendMsg();
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


const copyBtn = document.getElementById('copyButton');

copyBtn.addEventListener('click', function () {
    const textToCopy = document.getElementById('textToCopy');
    const ip_port = textToCopy.innerText
    // Use the Clipboard API to copy the text to the clipboard
    navigator.clipboard.writeText(ip_port)
        .then(() => {
// First part animation
            copyBtn.classList.add('animate-out');
            textToCopy.classList.add('animate-out');
            setTimeout(function () {
                copyBtn.innerHTML = '<i class="fa fa-check-circle fa-2x content" aria-hidden="true" style="color:white"></i>'
                textToCopy.innerText = 'Copied to clipboard!!';
                copyBtn.classList.remove('animate-out');
                textToCopy.classList.remove('animate-out');
                setTimeout(function () {
                    copyBtn.classList.add('animate-out');
                    textToCopy.classList.add('animate-out');
                    setTimeout(function () {
                        copyBtn.innerHTML = '<i class="fa fa-clone fa-2x content" aria-hidden="true" style="color:white"></i>'
                        textToCopy.innerText = ip_port;
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


// Inside main.js
let previousMessage = null;
const worker = new Worker('../javascript/worker.js');

// Set interval for fetching messages from worker thread
const fetchInterval = 1000;

// Send fetch interval to worker thread
worker.postMessage(fetchInterval);

// Listen for messages from worker thread
worker.onmessage = function (event) {
    const data = event.data;

    if (data.message) {
        // console.log('Message received from server:', data.message);

        if (data.message.endsWith(':')) {
            const messageParts = data.message.split(':').filter(part => part.trim() !== ''); // Split message and filter out empty parts
            const userResultContainer = document.querySelector('.user-result');

            // Clear previous content in userResultContainer
            userResultContainer.innerHTML = '';

            for (let i = 0; i < messageParts.length - 1; i++) {
                const part = messageParts[i];

                const resultDiv = document.createElement('div');
                resultDiv.classList.add('result');

                const headerDiv = document.createElement('div');
                headerDiv.textContent = part.charAt(0).toUpperCase();

                const paragraph = document.createElement('p');
                paragraph.textContent = part;

                resultDiv.appendChild(headerDiv);
                resultDiv.appendChild(paragraph);

                userResultContainer.appendChild(resultDiv);
            }

            const nameDiv = document.createElement('div');
            nameDiv.textContent = messageParts[messageParts.length - 1];
            nameDiv.classList.add('pop-up');
            document.querySelector('.pop-up-container').appendChild(nameDiv);

            // Fade in the pop-up
            setTimeout(() => {
                nameDiv.style.opacity = '1';
            }, 100); // Adjust the delay if needed

            // Remove the pop-up after a certain time (e.g., 3 seconds)
            setTimeout(() => {
                nameDiv.style.opacity = '0'; // Fade out
                setTimeout(() => {
                    nameDiv.remove(); // Remove from DOM
                }, 500); // Adjust timing to match the transition duration
            }, 3000); // 3000 milliseconds = 3 seconds

            sendMsg();

        } else if (data.message.slice(data.message.indexOf(':') + 1) === 'End collab!!') {
            //Host ended the collab


            // if(isPlaying){pauseTrack();}
            const username = urlParams.get('username');
            // alert("Host has ended the collab...");
            window.location.href = `collab.html?username=${username}`;

        } else if (data.message !== previousMessage) {
            let firstColonIndex = data.message.indexOf(":");
            if (firstColonIndex !== -1) {
                var part1 = data.message.slice(0, firstColonIndex);
                var part2 = data.message.slice(firstColonIndex + 1);
            }
            console.log("loadtrack");
            try {
                const songinfo = JSON.parse(part2);
                fetchSongById(songinfo.objectId)
                    .then(songData => {
                        console.log(songData); // You can access the resolved data here
                        if (playerscreen.classList.contains('invisible')) {
                            playerscreen.classList.remove('invisible');
                            bodyElement.style.setProperty('--opacity', '0.8');
                        }
                        if (!initscreen.classList.contains('invisible')) {
                            initscreen.classList.add('invisible');
                            bgAnimation.classList.add('invisible');
                        }

                        // if (loadedSongs[songIndex].id !== songData.objectId) {
                        //     loadTrack(search_data.findIndex(item => item[0] === songData.title && item[1] === songData.movie), songData);
                        //     console.log("Alag hu")
                        // }

                        loadTrack(search_data.findIndex(item => item[0] === songData.title && item[1] === songData.movie), songData);

                        curr_track.currentTime = songinfo.currentTime;
                        isPlaying = songinfo.play_status;
                        isPlaying ? playTrack() : pauseTrack();
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
            } catch (e) {
                console.log(part1);

                bodyElement.style.setProperty('--name', part1.charAt(0).toUpperCase());
                document.querySelector('.user-playing').textContent = part1 + ' is playing now';
            }

        }
        previousMessage = data.message;
    } else if (data.error) {
        // console.error('Error:', data.error);
    }
}


async function fetchSongById(id) {
    try {
        const response = await fetch(`/songs/id/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const songData = await response.json();
        const row = [songData.title, songData.movie, songData.artist, songData.imgUrl, songData.url];
        const isRowDuplicate = search_data.some(existingRow => {
            return existingRow.every((value, index) => value === row[index]);
        });
        if (!isRowDuplicate) {
            console.log('Added')
            search_data.push(row);
        } else {
            console.log('Row already exists:', row);
        }
        return songData;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}


function sendMsg() {
    if (loadedSongs.length !== 0) {
        const trackData = {
            objectId: loadedSongs[songIndex].id,
            songName: loadedSongs[songIndex].title,
            currentTime: curr_track.currentTime,
            play_status: isPlaying
        };
        console.log(JSON.stringify(trackData))
        const sendData = {
            send_msg: trackData,
            closeFlag: false

        }

        const closeFlag=false;

        fetch(`http://localhost:8080/send_msg`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify({trackData, closeFlag})
            body: JSON.stringify(trackData)

        })
            .then(response => response.text())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    }

}




