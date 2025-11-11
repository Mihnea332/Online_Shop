// Inițializăm coșul din localStorage sau cu un array gol
let cosProduse = JSON.parse(localStorage.getItem("cosProduse")) || [];

// Funcție pentru adăugarea unui produs în coș
function adaugaInCos(nume, pret) {
  const produsExist = cosProduse.find(p => p.nume === nume);

  if (produsExist) {
    produsExist.cantitate += 1;
  } else {
    cosProduse.push({ nume, pret, cantitate: 1 });
  }

  localStorage.setItem("cosProduse", JSON.stringify(cosProduse));
  actualizeazaNumarCos();
}

// Calculează totalul de produse (ex: 2 tricouri + 1 cană = 3)
function calculeazaTotalProduse() {
  return cosProduse.reduce((total, produs) => total + produs.cantitate, 0);
}

// Actualizează numărul afișat în header
function actualizeazaNumarCos() {
  const numarCos = document.getElementById("numar-cos");
  if (numarCos) {
    numarCos.textContent = calculeazaTotalProduse();
  }
}

// Când pagina e încărcată, actualizăm numărul și atașăm funcționalități
document.addEventListener("DOMContentLoaded", () => {
  actualizeazaNumarCos();

  const golesteCos = document.getElementById("goleste-cos");
  if (golesteCos) {
    golesteCos.addEventListener("click", () => {
      localStorage.removeItem("cosProduse");
      location.reload();
    });
  }
});
function stergeProdus(index) {
  produse.splice(index, 1);
  localStorage.setItem("cosProduse", JSON.stringify(produse));
  location.reload(); // forțăm reîncărcarea paginii
}