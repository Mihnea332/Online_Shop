const imaginiMot = [
    "../../../Resources/Seturi de mot/set_mot15.jpg",
    "../../../Resources/Seturi de mot/set_mot1.jpg",
    "../../../Resources/Seturi de mot/set_mot2.jpg",
    "../../../Resources/Seturi de mot/set_mot3.jpg"
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
    lightboxImg.src = imaginiMot[index];
}

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        indexCurent = (indexCurent > 0) ? indexCurent - 1 : imaginiMot.length - 1;
        lightboxImg.src = imaginiMot[indexCurent];
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        indexCurent = (indexCurent < imaginiMot.length - 1) ? indexCurent + 1 : 0;
        lightboxImg.src = imaginiMot[indexCurent];
    });
}

window.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});