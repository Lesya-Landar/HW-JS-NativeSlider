
let container = document.querySelector('#carousel');
let controls = document.querySelector('#controls-container');
let indicatorsContainer = document.querySelector('#indicators-container');
let indicators = document.querySelectorAll('.indicator');
let slides = document.querySelectorAll('.slide');
let pausePlayBtn = document.querySelector('#pause');
let nextBtn = document.querySelector('#next');
let prevBtn = document.querySelector('#prev');

let currentSlide = 0;
let isPlaying = true;
let interval = 2000;
let timerID = null;
let swipeStartX = null;
let swipeEndX = null;

const FA_PLAY = '<i class="far fa-play-circle"></i>';
const FA_PAUSE = '<i class="far fa-pause-circle"></i>';
const SPACE = ' ';
const LEFT_ARROW = 'ArrowLeft';
const RIGHT_ARROW = 'ArrowRight';


function goToNth(n) {
slides[currentSlide].classList.toggle('active');
indicators[currentSlide].classList.toggle('active');
currentSlide = (slides.length + n) % slides.length;
// if (currentSlide < slides.length - 1) {
//     slides.length + n;
// } else {
//     currentSlide = 0;
// };  
slides[currentSlide].classList.toggle('active');
indicators[currentSlide].classList.toggle('active');
}

function goToNext() {
    goToNth(currentSlide + 1);
}

function goToPrev() {
    goToNth(currentSlide - 1);
}

function pause() {
    if (isPlaying) {
        isPlaying = !isPlaying;  
        pausePlayBtn.innerHTML = FA_PLAY;
        clearInterval(timerID);
    }
}

function play() {
    
    isPlaying = !isPlaying;
    pausePlayBtn.innerHTML = FA_PAUSE;
    timerID = setInterval(goToNext, interval);
}

function next() {
    pause();
    goToNext(); 
}

function prev() {
    pause();
    goToPrev ();
}


// const pausePlay = () => (isPlaying ? pause() : play());

function pausePlay() {
    return isPlaying ? pause() : play();  
}

function indicate(e) {
    let target = e.target; 
    if (target.classList.contains('indicator')) {
    pause();
    goToNth (+target.getAttribute('data-slide-to'));

}
}

function pressKey(e) {
    if (e.key === LEFT_ARROW) prev();
    if (e.key === RIGHT_ARROW) next();
    if (e.key === SPACE) pausePlay();
}

function swipeStart(e) {
    swipeStartX = e.changedTouches[0].pageX;
    
}

function swipeEnd(e) {
    swipeEndX = e.changedTouches[0].pageX;
    swipeStartX - swipeEndX > 100 && next();
    swipeStartX - swipeEndX < -100 && prev();
}

pausePlayBtn.addEventListener('click', pausePlay);
nextBtn.addEventListener('click', next);
prevBtn.addEventListener('click', prev);
indicatorsContainer.addEventListener('click', indicate);
container.addEventListener('touchstart', swipeStart);
container.addEventListener('touchend', swipeEnd);
document.addEventListener('keydown', pressKey);


controls.style.display = 'block';
indicatorsContainer.style.display = 'flex';
timerID = setInterval(goToNext, interval);
    
