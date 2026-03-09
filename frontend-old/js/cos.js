document.addEventListener("DOMContentLoaded", () => {
  afiseazaCosul();
});

function afiseazaCosul() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart-items");
  const totalElement = document.getElementById("grand-total");

  container.innerHTML = "";
  let totalGeneral = 0;

  if (cart.length === 0) {
    container.innerHTML =
      '<tr><td colspan="5" style="text-align:center;">Coșul tău este gol. 🌸</td></tr>';
    totalElement.textContent = "0 €";
    return;
  }

  cart.forEach((item, index) => {
    const subtotal = item.pret * item.cantitate;
    totalGeneral += subtotal;
    container.innerHTML += `
      <tr>
        <td>${item.nume}</td>
        <td>${item.pret} €</td>
        <td>${item.cantitate}</td>
        <td>${subtotal} €</td>
        <td>
          <div class="cart-actions">
            <button class="btn-add" onclick="adaugaProdus(${index})">+</button>
            <button class="btn-remove" onclick="stergeProdus(${index})">-</button>
          </div>
        </td>
      </tr>
    `;
  });
  totalElement.textContent = `${totalGeneral} €`;
}

window.stergeProdus = function (index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  afiseazaCosul();
};

window.adaugaProdus = function (index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart[index]) cart[index].cantitate++;
  localStorage.setItem("cart", JSON.stringify(cart));
  afiseazaCosul();
};

const trimiteComanda = async (event) => {
  event.preventDefault();

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Coșul este gol!");
    return;
  }

  const total = cart.reduce((acc, item) => acc + item.pret * item.cantitate, 0);

  const orderData = {
    customerName: document.getElementById("customerName").value,
    phoneNumber: document.getElementById("phoneNumber").value,
    items: cart,
    totalPrice: total,
    country: document.getElementById("country").value,
    city: document.getElementById("city").value,
    address: {
      street: document.getElementById("street").value,
      block: document.getElementById("block").value || "",
      number: Number(document.getElementById("number").value), // Convertim în număr pentru model
    },
    description: document.getElementById("description").value, // Adăugat .value aici!
  };

  try {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    if (response.ok) {
      alert("Comanda a fost plasată cu succes! 🎀");
      localStorage.removeItem("cart");
    } else {
      const error = await response.json();
      alert("Eroare: " + error.message);
    }
  } catch (error) {
    console.error("Serverul nu răspunde", error);
    alert("Serverul este offline. Încearcă mai târziu!");
  }
};

const form = document.querySelector(".order-form");
if (form) {
  form.addEventListener("submit", trimiteComanda);
}
