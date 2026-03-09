const imaginiInvitatii = [
    "../../../Resources/Invitatii/invitatii5.jpg",
    "../../../Resources/Invitatii/invitatii1.jpg",
    "../../../Resources/Invitatii/invitatii2.jpg",
    "../../../Resources/Invitatii/invitatii3.jpg",
    "../../../Resources/Invitatii/invitatii4.jpg"
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
    lightboxImg.src = imaginiInvitatii[index];
}

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        indexCurent = (indexCurent > 0) ? indexCurent - 1 : imaginiInvitatii.length - 1;
        lightboxImg.src = imaginiInvitatii[indexCurent];
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        indexCurent = (indexCurent < imaginiInvitatii.length - 1) ? indexCurent + 1 : 0;
        lightboxImg.src = imaginiInvitatii[indexCurent];
    });
}

window.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});