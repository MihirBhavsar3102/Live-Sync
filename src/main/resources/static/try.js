// script.js
document.addEventListener("DOMContentLoaded", function () {
    const playButton = document.getElementById("playButton");
    const audioPlayer = document.getElementById("audioPlayer");

    playButton.addEventListener("click", async function () {
        // Fetch a song from the backend
        const response = await fetch("/api/songs/1"); // You may need to replace '1' with the actual song ID
        const song = await response.json();

        // Set the audio source and play
        audioPlayer.src = song.url;
        audioPlayer.play();
    });
});
