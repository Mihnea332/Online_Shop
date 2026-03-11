<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const isLoading = ref(false);

const handleLogin = async () => {
  errorMessage.value = "";
  isLoading.value = true;

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminName", data.user.username);

      router.push("/admin/");
    } else {
      errorMessage.value = data.message || "Date de logare incorecte!";
    }
  } catch (error) {
    console.error("Eroare la conectare:", error);
    errorMessage.value = "Serverul nu răspunde. Verifică backend-ul!";
  } finally {
    isLoading.value = false;
  }
};
</script>
<template>
  <div class="content">
    <div class="formular-login">
      <h2 class="font-pacifico">Login Admin</h2>

      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email Admin:</label>
          <input
            v-model="email"
            type="email"
            id="email"
            placeholder="admin@exemplu.ro"
            required />
        </div>

        <div class="form-group">
          <label for="password">Parolă:</label>
          <input
            v-model="password"
            type="password"
            id="password"
            placeholder="••••••••"
            required />
        </div>

        <button type="submit" class="btn-login" :disabled="isLoading">
          {{ isLoading ? "Se verifică..." : "Accesează Panoul" }}
        </button>
      </form>

      <p style="margin-top: 20px">
        <router-link to="/" style="color: #ff69b4; text-decoration: none">
          ← Înapoi la magazin
        </router-link>
      </p>
    </div>
  </div>
</template>
<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #fff0f5;
  margin: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header-login {
  background-color: #ffb6c1;
  padding: 40px;
  text-align: center;
}

.font-pacifico {
  font-family: "Pacifico", cursive;
  color: #333;
}

.content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.formular-login {
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(255, 105, 180, 0.2);
  text-align: center;
}

.formular-login h2 {
  margin-bottom: 30px;
  font-size: 2rem;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #555;
}

.formular-login input {
  width: 100%;
  padding: 12px;
  border: 2px solid #ffb6c1;
  border-radius: 8px;
  box-sizing: border-box;
  font-size: 1rem;
}

.btn-login {
  width: 100%;
  background-color: #ff69b4;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 10px;
}

.btn-login:hover {
  background-color: #ff1493;
}

.error-message {
  color: #d9534f;
  background: #f2dede;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  display: none; /* Ascuns implicit */
}

footer {
  background-color: #333;
  color: white;
  padding: 20px;
  text-align: center;
  margin-top: auto;
}
</style>
