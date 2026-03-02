// Aici poți adăuga interactivitate pe viitor
console.log("Scriptul Handmade Mom a fost încărcat cu succes!");

// Exemplu: Un efect simplu la click pe imaginile din galerie
document.querySelectorAll('.galerie img').forEach(img => {
    img.addEventListener('click', () => {
        console.log("Ai dat click pe o imagine din galerie!");
    });
});