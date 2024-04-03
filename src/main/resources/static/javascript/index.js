const title = document.querySelector('.title')
const collage = document.querySelector('.collage')
const circle = document.querySelector('.circle')
const about = document.querySelector('.about')
let isUserSignedIn=false;
document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const userName = urlParams.get('username');

    // Use the parameters as needed
    console.log('User Name:', userName);
    if (userName) {
        isUserSignedIn=true;
        // Update the inner HTML of the element with ID 'loginLabel' to display the username
        const loginLabel = document.getElementById('loginLabel');
        loginLabel.innerHTML = '<img id="userDP" src="../assets/media/listen.png" alt="User DP" style="height: 35px; width: 35px; border-radius: 17px; align-items: center">'
        loginLabel.innerHTML += userName;
        document.getElementById("login_btn").href = "";
    }
});




document.addEventListener('scroll', function () {
    let scrollPosition = window.scrollY

    console.log(scrollPosition)



    if (scrollPosition <= 200) {

        title.style.opacity= scrollPosition/200;
        title.style.transform = 'translate(-50%,-40%)';
        title.style.marginTop = -scrollPosition * 1.0 + 'px';
        title.style.setProperty('--pseudo-width','0%')

        var newSize = 50 + scrollPosition / 7;
        circle.style.width = newSize + '%';
        circle.style.transform = 'translate(-50%,-10%)';
        circle.style.marginTop = -scrollPosition * 1.1 + 'px';

        var newImageSize = 65 - scrollPosition /50;
        collage.style.opacity = 1;
        collage.style.width = newImageSize + '%';
        collage.style.transform='translate(-50%,-125%)';
        // collage.style.marginTop = scrollPosition + 'px';
        collage.style.marginBottom = -scrollPosition + 'px';

    }
    else {
        title.style.opacity=1;
        title.style.marginTop = scrollPosition + 'px';
        title.style.transform = 'translate(-50%,-223%)';
        const width=(scrollPosition/9)>70?70:scrollPosition/9;
        title.style.setProperty('--pseudo-width',width+'%');

        var newSize = 50 + scrollPosition / 6.5;
        circle.style.width = newSize + '%';
        circle.style.marginTop = scrollPosition + 'px';
        circle.style.transform = 'translate(-50%,-45%)'
        
        // collage.style.marginTop = scrollPosition + 'px';
        collage.style.marginBottom = -scrollPosition + 'px';
        collage.style.transform='translate(-50%,-125%)';

    }
})

document.addEventListener('DOMContentLoaded', function () {
    const signInButton = document.querySelector('.g-signin2');
    const startCollaborationButton = document.querySelector('.cta-btn');

    // Check if the user is signed in
    if (isUserSignedIn) {
        // Redirect to collaboration page if signed in
        startCollaborationButton.addEventListener('click', function () {
            const urlParams = new URLSearchParams(window.location.search);
            const userName = urlParams.get('username');
            const url = `collab.html?username=${userName}`;
            window.location.href = url;
        });
    } else {
        // Redirect to login page if not signed in
        startCollaborationButton.addEventListener('click', function () {
            window.location.href = '../html/login.html';
        });
        signInButton.addEventListener('click', function () {
            window.location.href = '../html/login.html';
        });
    }

});




