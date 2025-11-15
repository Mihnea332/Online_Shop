
const imagini = [
  "Resources/Seturi de mot/set_mot1.jpg",
  "Resources/Seturi de mot/set_mot2.jpg",
  "Resources/Seturi de mot/set_mot3.jpg",
  "Resources/Seturi de mot/set_mot0.jpg",
];

let index = 0;
const slide = document.getElementById("slide");

// Funcții pentru schimbarea imaginilor
function schimbaImagineNext() {
  index = (index + 1) % imagini.length;
  slide.src = imagini[index];
}

function schimbaImaginePrev() {
  index = (index - 1 + imagini.length) % imagini.length;
  slide.src = imagini[index];
}

// Evenimente pentru butoane
document.querySelector(".next").addEventListener("click", schimbaImagineNext);
document.querySelector(".prev").addEventListener("click", schimbaImaginePrev);

// Schimbare automată la fiecare 4 secunde
setInterval(schimbaImagineNext, 4000);