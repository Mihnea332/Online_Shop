const imaginiSeturi = [
    "../../../Resources/Seturi cadou/seturi_cadou_principala.jpg",
    "../../../Resources/Seturi cadou/seturi_cadou1.jpg",
    "../../../Resources/Seturi cadou/seturi_cadou2.jpg",
    "../../../Resources/Seturi cadou/seturi_cadou3.jpg"
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
    lightboxImg.src = imaginiSeturi[index];
}

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        indexCurent = (indexCurent > 0) ? indexCurent - 1 : imaginiSeturi.length - 1;
        lightboxImg.src = imaginiSeturi[indexCurent];
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        indexCurent = (indexCurent < imaginiSeturi.length - 1) ? indexCurent + 1 : 0;
        lightboxImg.src = imaginiSeturi[indexCurent];
    });
}

window.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});
const listaPreturi={
    licheni:55,
    cani:55,
    sampanie:65,
    jack:85,
    mesaj:100
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