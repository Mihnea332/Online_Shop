const imaginiTricouri = [
    "../../../Resources/Tricouri personalizate/tricouri9.jpg",
    "../../../Resources/Tricouri personalizate/tricouri1.jpg",
    "../../../Resources/Tricouri personalizate/tricouri2.jpg",
    "../../../Resources/Tricouri personalizate/tricouri3.jpg"
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
    lightboxImg.src = imaginiTricouri[index];
}

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        indexCurent = (indexCurent > 0) ? indexCurent - 1 : imaginiTricouri.length - 1;
        lightboxImg.src = imaginiTricouri[indexCurent];
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        indexCurent = (indexCurent < imaginiTricouri.length - 1) ? indexCurent + 1 : 0;
        lightboxImg.src = imaginiTricouri[indexCurent];
    });
}

window.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});
const listaPreturi={
   negru:15,
   alb:11
}
const selectProduse=document.getElementById('products')
const pretAfisat=document.querySelector('#display-price span')
selectProduse.addEventListener('change', function() {
  const valoareSelectata = this.value; 
  const pretNou = listaPreturi[valoareSelectata];

  if (pretNou) {
    pretAfisat.textContent = pretNou; 
  }
});