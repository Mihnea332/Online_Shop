const imaginiPahare = [
  "../../../Resources/Pahare personalizate/pahare5.jpg",
  "../../../Resources/Pahare personalizate/pahare1.jpg",
  "../../../Resources/Pahare personalizate/pahare2.jpg",
  "../../../Resources/Pahare personalizate/pahare3.jpg",
  "../../../Resources/Pahare personalizate/pahare4.jpg",
];

let indexCurent = 0;

const mainImg = document.getElementById("main-img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".lightbox-prev");
const nextBtn = document.querySelector(".lightbox-next");

if (mainImg) {
  mainImg.addEventListener("click", () => {
    indexCurent = 0;
    deschideLightbox(indexCurent);
  });
}

function deschideLightbox(index) {
  lightbox.style.display = "flex";
  lightboxImg.src = imaginiPahare[index];
}

if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });
}

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    indexCurent = indexCurent > 0 ? indexCurent - 1 : imaginiPahare.length - 1;
    lightboxImg.src = imaginiPahare[indexCurent];
  });
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    indexCurent = indexCurent < imaginiPahare.length - 1 ? indexCurent + 1 : 0;
    lightboxImg.src = imaginiPahare[indexCurent];
  });
}

window.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});
const listaPreturi = {
  pahare: 12,
  cani: 12,
};
const selectProduse = document.getElementById("products");
const pretAfisat = document.querySelector("#display-price span");
selectProduse.addEventListener("change", function () {
  const valoareSelectata = this.value;
  const pretNou = listaPreturi[valoareSelectata];

  if (pretNou) {
    pretAfisat.textContent = pretNou;
  }
});
