const imaginiTrusouri = [
    "../../../Resources/Trusouri botez/trusouri_botez7.jpg",
    "../../../Resources/Trusouri botez/trusouri_botez1.jpg",
    "../../../Resources/Trusouri botez/trusouri_botez2.jpg",
    "../../../Resources/Trusouri botez/trusouri_botez3.jpg"
];

let indexCurent = 0;

const mainImg = document.getElementById('main-img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.lightbox-prev');
const nextBtn = document.querySelector('.lightbox-next');

if (mainImg) {
    mainImg.addEventListener('click', () => {
        indexCurent = 0;
        deschideLightbox(indexCurent);
    });
}

function deschideLightbox(index) {
    lightbox.style.display = 'flex';
    lightboxImg.src = imaginiTrusouri[index];
}

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        indexCurent = (indexCurent > 0) ? indexCurent - 1 : imaginiTrusouri.length - 1;
        lightboxImg.src = imaginiTrusouri[indexCurent];
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        indexCurent = (indexCurent < imaginiTrusouri.length - 1) ? indexCurent + 1 : 0;
        lightboxImg.src = imaginiTrusouri[indexCurent];
    });
}

window.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});