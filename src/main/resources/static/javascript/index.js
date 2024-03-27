const title = document.querySelector('.title')
const collage = document.querySelector('.collage')
const circle = document.querySelector('.circle')
const about = document.querySelector('.about')

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
    if (isUserSignedIn()) {
        // Redirect to collaboration page if signed in
        startCollaborationButton.addEventListener('click', function () {
            window.location.href = '../html/collab.html';
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
    function isUserSignedIn() {

//         // Check if the user is authenticated (example for session-based authentication)
//         function isUserAuthenticated() {
//             // Check if a session cookie exists or any other authentication indicator
//             return document.cookie.includes('session_id');
//         }
//
// // Redirect logic based on authentication status
//         document.addEventListener('DOMContentLoaded', function() {
//             if (!isUserAuthenticated()) {
//                 // Redirect to login page if not authenticated
//                 window.location.href = '/login.html';
//             }
//         });

        // You can implement your logic to check if the user is signed in using Google sign-in
        // For example, if you're using Google Sign-In, you can check the auth2.currentUser.get() method
        // Here, I'm assuming a dummy check where the user's information is displayed on the page
        return document.querySelector('.user-info') !== null;
    }
});




