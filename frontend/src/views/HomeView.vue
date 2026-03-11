<script setup>
import Footer from "./Header.vue";
</script>
<template>
  <div class="container">
    <div class="text">
      <section class="prezentare font-pacifico">
        <h2 class="titlu-principal">
          👋 Bine ai venit în universul nostru handmade!
        </h2>

        <p>
          Eu sunt Romana, mămica a patru copii minunați ❤️, și împreună cu
          echipa mea creativă aducem la viață produse personalizate care să facă
          momentele speciale și mai memorabile.
        </p>

        <p class="sectiune-text">
          💡 <strong>De ce am început handmade?</strong><br />
          Totul a început acum 7 ani și jumătate, din dorința de a-i face
          băiețelului nostru tricouri personalizate unice. Susținută de cel mai
          mare ajutor și critic al meu – soțul meu – am transformat această
          pasiune într-o mică afacere care aduce bucurie oamenilor de toate
          vârstele.
        </p>
        <p></p>
        <p class="sectiune-text">🎁 <strong>Ce oferim?</strong></p>
        <ul>
          <li>
            • Seturi cadou personalizate: sticle de băutură, pahare
            personalizate, licheni, plexiglas cu mesaje speciale
          </li>
          <li>• Tricouri personalizate pentru cei mici și cei mari</li>
          <li>
            • Seturi de mot și mărturii personalizate pentru botez sau alte
            evenimente
          </li>
          <li>
            • Invitații de nuntă și botez, pe hârtie sau electronic, pentru
            orice tematică
          </li>
        </ul>

        <p class="sectiune-text">
          ✨ <strong>Misiunea noastră:</strong><br />
          Nu căutăm perfecțiunea – căutăm să fim pe placul vostru și să aducem
          zâmbete și emoții prin fiecare creație. Portofoliul nostru este
          diversificat și continuăm să adăugăm produse noi, creative și
          personalizate.
        </p>
      </section>
    </div>
    <div class="galerie">
      <img src="/HomePage/homepage0.jpeg" alt="Imagine 1" />
      <img src="/HomePage/homepage1.png" alt="Imagine 2" />
    </div>
  </div>
</template>
<script setup></script>
<style scoped>
.galerie {
  display: flex;
  justify-content: center;
  flex-direction: row;
  gap: 50px;
}
.galerie img {
  width: 100%;
  max-width: 500px;
  height: 550px;
  object-fit: cover;
  border-radius: 10px;
  border: 2px solid #ffb6c1;
  cursor: pointer;
  transition: transform 0.4s;
  background-color: white;
}
.galerie img:hover {
  transform: scale(1.1);
}
.text {
  border-radius: 20px;
  flex: 1;
  padding-left: 20px;
  background-color: white;
  width: 50vw;
  text-align: center;
  border: solid rgb(201, 100, 100);
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  padding: 40px 20px;
}
.sectiune-text {
  text-decoration: none;
}
</style>
