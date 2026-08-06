<template>
  <div class="dashboard-page">
    <AdminNavbar/>
    <div class="dashboard-header">
      <h1>📊 Dashboard Administrativ</h1>
      <p>Managementul produselor din magazinul tău online</p>
    </div>

    <div class="dashboard-content">
      <div class="form-card">
        <h3>
          {{ isEditing ? "📝 Editează Produsul" : "✨ Adaugă Produs Nou" }}
        </h3>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label>Nume Produs:</label>
            <input
              v-model="form.name"
              type="text"
              required
              class="admin-input" />
          </div>

          <div class="form-group">
            <label>Fotografii Produs (Poți selecta mai multe):</label>
            <input
              type="file"
              accept="image/*"
              multiple
              @change="handleImageUpload"
              class="admin-input file-input" />

            <div v-if="isUploadingImage" class="uploading-spinner">
              Se încarcă fotografiile în Online_Shop... ⏳
            </div>

            <div
              v-if="form.images.length > 0 && form.images[0] !== ''"
              class="images-preview-grid">
              <div
                v-for="(imgUrl, idx) in form.images"
                :key="idx"
                class="preview-item">
                <img :src="imgUrl" class="preview-img" alt="Preview produs" />
                <button
                  type="button"
                  @click="removeUploadedImage(idx)"
                  class="btn-delete-img">
                  &times;
                </button>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label>Categorie:</label>
            <input
              v-model="form.category"
              type="text"
              class="admin-input"
              placeholder="ex: Invitatii, Tricouri" />
          </div>

          <div class="form-group">
            <label>Descriere Produs:</label>
            <textarea
              v-model="form.description"
              class="admin-input"
              rows="3"
              placeholder="Scrie câteva detalii despre produs..."></textarea>
          </div>

          <div class="section-block">
            <label>Modele / Variante & Prețuri:</label>
            <div
              v-for="(variant, index) in form.variants"
              :key="index"
              class="dynamic-row">
              <input
                v-model="variant.name"
                type="text"
                placeholder="Nume model"
                required
                class="admin-input" />
              <input
                v-model.number="variant.price"
                type="number"
                placeholder="Preț €"
                required
                class="admin-input price-input" />
              <button
                type="button"
                @click="removeVariantField(index)"
                v-if="form.variants.length > 1"
                class="btn-remove">
                &times;
              </button>
            </div>
            <button type="button" @click="addVariantField" class="btn-add-mini">
              + Adaugă Model
            </button>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn-submit">
              {{ isEditing ? "Salvează Modificările" : "Adaugă Produs" }}
            </button>
            <button
              type="button"
              v-if="isEditing"
              @click="resetForm"
              class="btn-cancel">
              Anulează
            </button>
          </div>
        </form>
      </div>

      <div class="table-card">
        <h3>Produse în Baza de Date ({{ products.length }})</h3>
        <div v-if="loading" class="loading-text">Se încarcă produsele...</div>
        <div v-else class="table-responsive">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Imagine</th>
                <th>Nume</th>
                <th>Categorie</th>
                <th>Preț de pornire</th>
                <th>Acțiuni</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product._id">
                <td>
                  <img
                    :src="product.images[0]"
                    class="table-thumb"
                    alt="Product icon" />
                </td>

                <td>
                  <strong>{{ product.name }}</strong>
                </td>
                <td>{{ product.category || "Generale" }}</td>
                <td>{{ product.variants[0]?.price }} €</td>
                <td>
                    <div class="edit">
                  <button
                    type="button"
                    @click="startEdit(product)"
                    class="btn-edit">
                    Editează
                  </button>
                  <button
                    type="button"
                    @click="deleteProduct(product._id)"
                    class="btn-delete">
                    Șterge
                  </button>
                </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { toast } from "../utils/toast";
import AdminNavbar from "./AdminNavbar.vue";
const products = ref([]);
const loading = ref(true);
const isEditing = ref(false);
const currentProductId = ref(null);
const isUploadingImage = ref(false);

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/df2jajqo/image/upload";
const UPLOAD_PRESET = "Preset Shop";

// Am adăugat 'description' în starea inițială a formularului
const form = ref({
  name: "",
  description: "",
  category: "",
  variants: [{ name: "", price: 0 }],
  images: [],
});

const resetForm = () => {
  form.value = {
    name: "",
    description: "",
    category: "",
    variants: [{ name: "", price: 0 }],
    images: [],
  };
  isEditing.value = false;
  currentProductId.value = null;
};

const fetchProducts = async () => {
  try {
    const res = await fetch(`/api/products`);
    if (res.ok) products.value = await res.json();
  } catch (err) {
    console.error("Eroare la incarcare:", err);
  } finally {
    loading.value = false;
  }
};

const handleImageUpload = (event) => {
  const files = event.target.files;
  if (!files || files.length === 0) return;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();

    reader.onload = (e) => {
      form.value.images.push(e.target.result);
    };
    reader.readAsDataURL(file);
  }
};

const removeUploadedImage = (index) => {
  form.value.images.splice(index, 1);
};

const addVariantField = () => form.value.variants.push({ name: "", price: 0 });
const removeVariantField = (index) => form.value.variants.splice(index, 1);

const handleSubmit = async () => {
  if (form.value.images.length === 0) {
    toast.warning("Te rog adaugă cel puțin o fotografie! 🌸");
    return;
  }

  // Pornim spinner-ul de loading în timp ce backend-ul face upload-ul
  isUploadingImage.value = true;

  const cleanVariants = form.value.variants.map((variant) => ({
    name: variant.name,
    price: Number(variant.price),
  }));

  const payload = {
    name: form.value.name,
    description:
      form.value.description && form.value.description.trim()
        ? form.value.description.trim()
        : "Produs premium lucrat manual.",
    category: form.value.category || "Generale",
    variants: cleanVariants,
    images: form.value.images, // Trimitem array-ul de string-uri Base64 direct la backend
    selectedVariantIndex: 0,
  };

const url = isEditing.value
  ? `/api/products/${currentProductId.value}`
  : `/api/products`;

  const method = isEditing.value ? "PUT" : "POST";

  try {
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      toast.success(
        isEditing.value
          ? "Produs actualizat! 🌸"
          : "Produs adăugat cu succes în magazin și Cloudinary! 🌸",
      );
      resetForm();
      fetchProducts();
    } else {
      const errorData = await res.json();
      toast.error(`Eroare backend: ${errorData.message}`);
    }
  } catch (err) {
    console.error("Eroare la trimitere:", err);
  } finally {
    isUploadingImage.value = false; // Oprim loading-ul
  }
};

const startEdit = (product) => {
  isEditing.value = true;
  currentProductId.value = product._id;
  form.value = JSON.parse(JSON.stringify(product));
};

const deleteProduct = async (id) => {
  if (!confirm("Sigur vrei să ștergi acest produs?")) return;
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) {
      toast.success("Produs șters! 🌸");
      fetchProducts();
    }
  } catch (err) {
    console.error("Eroare la ștergere:", err);
  }
};

onMounted(fetchProducts);
</script>

<style scoped>
.dashboard-page {
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
  font-family: "Poppins", sans-serif;
  animation: fadeIn 0.6s ease-out; /* <-- ADAUGĂ */
}
.images-preview-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 15px;
  padding: 12px;
  border: 1px dashed #ffb6c1;
  border-radius: 10px;
  background-color: #fffafb;
}

.preview-item {
  position: relative;
  width: 80px;
  height: 80px;
}

.preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #ffe4e8;
}

/* Butonul mic de „X” roșu de deasupra fiecărei poze */
.btn-delete-img {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ff8da1;
  color: white;
  border: none;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.btn-delete-img:hover {
  background: #c9184a;
}
.file-input {
  padding: 8px;
  background: #ffffff;
  cursor: pointer;
}

.image-preview-wrapper {
  margin-top: 15px;
  text-align: center;
  padding: 12px;
  border: 1px dashed #ffb6c1;
  border-radius: 10px;
  background-color: #fffafb;
}

.preview-img {
  max-width: 100%;
  max-height: 160px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #ffe4e8;
}

.preview-status {
  font-size: 12px;
  color: #7cc3a1;
  margin-top: 5px;
  font-weight: 600;
}

.uploading-spinner {
  font-size: 13px;
  color: #ff8da1;
  margin-top: 10px;
  font-weight: bold;
}
.dashboard-page {
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
  font-family: "Poppins", sans-serif;
}
.dashboard-header {
  /* Forțează lățimea să fie exact cât lățimea ferestrei browserului */
  width: 100vw;
  
  /* Trucul magic care centrează și împinge marginile în afara containerului */
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  
  /* Padding pentru a-i da respirație (sus/jos și stânga/dreapta) */
  padding: 40px 20px;
  
  /* Centrarea textului */
  text-align: center;
  
  /* Opțional: Adaugă un fundal ca să vezi clar că se întinde pe tot ecranul */
  background: linear-gradient(135deg, var(--primary-pink, #ff69b4), var(--light-pink, #ffb6c1));
  color: white;
  
  /* Asigură-te că padding-ul nu strică dimensiunea */
  box-sizing: border-box;
}

/* Ajustăm titlul și paragraful ca să arate bine în interior */
.dashboard-header h1 {
  margin: 0;
  font-size: 2rem;
  margin-bottom: 10px;
}

.dashboard-header p {
  margin: 0;
  font-size: 1.1rem;
  opacity: 0.9;
}

.dashboard-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
}

@media (min-width: 992px) {
  .dashboard-content {
    grid-template-columns: 4fr 6fr; /* Formularul în stânga, tabelul mai lat în dreapta */
    align-items: start;
  }
}

@media (max-width: 991px) {
  .dashboard-page {
    margin: 24px auto;
    padding: 0 16px;
  }

  .dashboard-header h1 {
    font-size: 2rem;
  }

  .form-card,
  .table-card {
    padding: 20px;
  }

  .form-actions {
    flex-direction: column;
  }

  .btn-submit,
  .btn-cancel {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .dashboard-page {
    margin: 16px auto;
    padding: 0 12px;
  }

  .dashboard-header {
    margin-bottom: 24px;
  }

  .dashboard-header h1 {
    font-size: 1.6rem;
    line-height: 1.2;
  }

  .dashboard-header p {
    font-size: 0.95rem;
  }

  .form-card,
  .table-card {
    padding: 16px;
    border-radius: 14px;
  }

  .dynamic-row {
    flex-wrap: wrap;
  }

  .dynamic-row .admin-input {
    width: 100%;
  }

  .price-input {
    max-width: none;
  }

  .btn-remove {
    align-self: flex-start;
  }

  .admin-table th,
  .admin-table td {
    padding: 10px;
    font-size: 13px;
  }

  .table-thumb {
    width: 42px;
    height: 42px;
  }

  .btn-edit,
  .btn-delete {
    width: 100%;
    margin: 0 0 8px 0;
  }
}
.edit{
    display: flex;
}
@media (max-width: 480px) {
  .dashboard-page {
    margin: 12px auto;
    padding: 0 10px;
  }

  .dashboard-header h1 {
    font-size: 1.35rem;
  }

  .dashboard-header p {
    font-size: 0.88rem;
  }

  .form-card,
  .table-card {
    padding: 14px;
    border-radius: 12px;
  }

  .section-block {
    padding: 12px;
  }

  .admin-input {
    padding: 10px 12px;
    font-size: 13px;
  }

  .btn-submit,
  .btn-cancel,
  .btn-add-mini {
    padding: 10px 14px;
    font-size: 13px;
  }

  .table-responsive {
    margin: 0 -14px;
    padding: 0 14px;
  }

  .admin-table {
    min-width: 620px;
  }

  .admin-table th,
  .admin-table td {
    padding: 8px;
    font-size: 12px;
  }
}

.form-card,
.table-card {
  background: white;
  padding: 25px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(255, 192, 203, 0.15);
  border: 1px solid #ffe4e8;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}
label {
  font-weight: 600;
  color: #555;
  margin-bottom: 5px;
  font-size: 14px;
}

.admin-input {
  padding: 12px 14px;
  border: 1px solid #ffe4e8;
  border-radius: 10px;
  background-color: #fffafb;
  outline: none;
  font-size: 14px;
  transition: all 0.3s;
}
.admin-input:focus {
  border-color: #ffb6c1;
  background-color: #fff;
  box-shadow: 0 0 0 3px rgba(255, 182, 193, 0.2);
}

.section-block {
  margin: 20px 0;
  padding: 15px;
  background: #fffafb;
  border-radius: 10px;
  border: 1px dashed #ffe4e8;
}

.dynamic-row {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  align-items: center;
}
.price-input {
  max-width: 90px;
}
.btn-remove {
  background: #ff8da1;
  border: none;
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  font-weight: bold;
}

.btn-add-mini {
  background: none;
  border: 1px dashed #ffb6c1;
  color: #ff8da1;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
}
.btn-add-mini:hover {
  background: #fff0f2;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}
.btn-submit {
  background: #ffb6c1;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  flex: 2;
  transition: background 0.3s;
}
.btn-submit:hover {
  background: #ff9aa9;
}
.btn-cancel {
  background: #f5f5f5;
  border: none;
  padding: 12px 20px;
  border-radius: 10px;
  cursor: pointer;
  flex: 1;
}

.table-responsive {
  overflow-x: auto;
}
.admin-table {
  width: 100%;
  border-collapse: collapse;
}
.admin-table th,
.admin-table td {
  padding: 14px;
  text-align: left;
  border-bottom: 1px solid #ffe4e8;
  font-size: 14px;
}
.admin-table th {
  background-color: #fffafb;
  color: #4a4a4a;
  font-weight: 600;
}

.table-thumb {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #ffe4e8;
}
.btn-edit {
  background: #a3e2c1;
  color: #2d6a4f;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  margin-right: 5px;
  font-weight: 600;
}
.btn-delete {
  background: #ffccd5;
  color: #c9184a;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}
.btn-edit:hover {
  background: #85d1a9;
}
.btn-delete:hover {
  background: #ffb3c1;
}
.loading-text {
  text-align: center;
  color: #888;
  padding: 20px;
}
</style>