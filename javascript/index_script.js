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

        var newImageSize = 65 - scrollPosition / 25;
        collage.style.opacity = 1;
        collage.style.width = newImageSize + '%';
        collage.style.transform='translate(-50%,-10%)';
        collage.style.marginTop = scrollPosition + 'px';

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
        
        collage.style.marginTop = scrollPosition + 'px';
        collage.style.transform='translate(-50%,-10%)';


    }
})


