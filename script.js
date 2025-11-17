// === GALERIE CU LIGHTBOX ===
const imaginiMot = [
  "resources/Seturi de mot/set_mot0.jpg",
  "resources/Seturi de mot/set_mot1.jpg",
  "resources/Seturi de mot/set_mot2.jpg",
  "resources/Seturi de mot/set_mot3.jpg"
];

const imaginiMarturii = [
  "resources/Marturii botez/marturii_botez0.jpg",
  "resources/Marturii botez/marturii_botez1.jpg",
  "resources/Marturii botez/marturii_botez2.jpg",
  "resources/Marturii botez/marturii_botez3.jpg"
];

const imaginiPahare = [
  "Resources/Pahare personalizate/pahare0.jpg",
  "Resources/Pahare personalizate/pahare1.jpg",
  "Resources/Pahare personalizate/pahare2.jpg",
  "Resources/Pahare personalizate/pahare3.jpg"
];

const imaginiTricouri = [
  "Resources/Tricouri personalizate/tricouri0.jpg",
  "Resources/Tricouri personalizate/tricouri1.jpg",
  "Resources/Tricouri personalizate/tricouri2.jpg",
  "Resources/Tricouri personalizate/tricouri3.jpg"
];

const imaginiTrusouri = [
  "Resources/Trusouri botez/trusou_botez0.jpg",
  "Resources/Trusouri botez/trusou_botez1.jpg",
  "Resources/Trusouri botez/trusou_botez2.jpg",
  "Resources/Trusouri botez/trusou_botez3.jpg"
];

const imaginiSeturiCadou = [
  "Resources/Seturi cadou/seturi_cadou0.jpg",
  "Resources/Seturi cadou/seturi_cadou1.jpg",
  "Resources/Seturi cadou/seturi_cadou2.jpg",
  "Resources/Seturi cadou/seturi_cadou3.jpg"
];

const imaginiInvitatii = [
  "Resources/Invitatii/invitatii0.jpg",
  "Resources/Invitatii/invitatii1.jpg",
  "Resources/Invitatii/invitatii2.jpg",
  "Resources/Invitatii/invitatii3.jpg"
];

// === LIGHTBOX ===
const mainImg = document.getElementById("main-img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

if (mainImg && lightbox && lightboxImg) {
  let currentGallery = [];
  const galleryType = mainImg.dataset.gallery;

  if (galleryType === "mot") currentGallery = imaginiMot;
  else if (galleryType === "marturii") currentGallery = imaginiMarturii;
  else if (galleryType === "pahare") currentGallery = imaginiPahare;
  else if (galleryType === "tricouri") currentGallery = imaginiTricouri;
  else if (galleryType === "trusouri") currentGallery = imaginiTrusouri;
  else if (galleryType === "seturi_cadou") currentGallery = imaginiSeturiCadou;
  else if (galleryType === "invitatii") currentGallery = imaginiInvitatii;

  let index = 0;

  mainImg.addEventListener("click", () => {
    index = 0;
    lightboxImg.src = currentGallery[index];
    lightbox.style.display = "flex";
  });

  document.querySelector(".close")?.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  document.querySelector(".lightbox-next")?.addEventListener("click", () => {
    index = (index + 1) % currentGallery.length;
    lightboxImg.src = currentGallery[index];
  });

  document.querySelector(".lightbox-prev")?.addEventListener("click", () => {
    index = (index - 1 + currentGallery.length) % currentGallery.length;
    lightboxImg.src = currentGallery[index];
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });
}

// === EMAILJS ===
(function() {
  emailjs.init("l2Zi2yl3gvIzRGOYl"); // cheia ta publică
})();

const formular = document.getElementById("formular-contact");
if (formular) {
  formular.addEventListener("submit", function(e) {
    e.preventDefault();

    emailjs.sendForm("service_eyvaylg", "template_ptcredn", this)
      .then(function() {
        alert("Mesajul a fost trimis cu succes! 🎉");
      }, function(error) {
        alert("A apărut o eroare. Încearcă din nou.");
        console.error("EmailJS error:", error);
      });
  });
}