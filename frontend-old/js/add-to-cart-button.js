const getProductName = () => {
  const selectElement = document.getElementById("products");
  const staticNameElement = document.getElementById("product-name");
  if (selectElement)
    return selectElement.options[selectElement.selectedIndex].text;
  else if (staticNameElement) {
    return staticNameElement.textContent;
  }
  return "Produs Necunoscut";
};
const getProductPrice = () => {
  const priceSpan = document.querySelector("#display-price span");
  if (priceSpan) return parseFloat(priceSpan.textContent);
  const oldPriceSpan = document.querySelector("#pret-produs");
  return oldPriceSpan ? parseFloat(oldPriceSpan.textContent) : 0;
};
const addToCart = () => {
  const name = getProductName();
  const price = getProductPrice();
  if (price === 0) {
    alert("Selectati o optiune valida!");
    return;
  }
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const index = cart.findIndex((item) => item.nume === name);
  if (index > -1) cart[index].cantitate += 1;
  else {
    cart.push({
      nume: name,
      pret: price,
      cantitate: 1,
    });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} a fost adăugat în coș! `);
};
const btn = document.getElementById("priceButton");
if (btn) {
  btn.addEventListener("click", addToCart);
}
