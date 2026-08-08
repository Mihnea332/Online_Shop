<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <h1>🔐 Panou Administrator</h1>
          <p>Accesează panoul de control</p>
        </div>

        <form @submit.prevent="handleLogin" class="login-form">
          <div v-if="errorMessage" class="error-message">
            <span class="error-icon">⚠️</span>
            {{ errorMessage }}
          </div>

          <div class="form-group">
            <label for="identifier">
              <span class="label-icon">👤</span>
              Email sau username administrator
            </label>
            <input
              v-model="identifier"
              type="text"
              id="identifier"
              class="form-input"
              placeholder="mihnea332 sau admin@exemplu.ro"
              required />
          </div>

          <div class="form-group">
            <label for="password">
              <span class="label-icon">🔑</span>
              Parolă
            </label>
            <input
              v-model="password"
              type="password"
              id="password"
              class="form-input"
              placeholder="••••••••"
              required />
          </div>

          <button type="submit" class="btn-login" :disabled="isLoading">
            <span v-if="!isLoading">✓ Accesează Panoul</span>
            <span v-else>⏳ Se verifică...</span>
          </button>
        </form>

        <div class="login-footer">
          <router-link to="/" class="back-link">
            ← Înapoi la magazin
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { apiUrl } from "../utils/api";

const router = useRouter();

const identifier = ref("");
const password = ref("");
const errorMessage = ref("");
const isLoading = ref(false);

const handleLogin = async () => {
  errorMessage.value = "";
  isLoading.value = true;

  try {
    const response = await fetch(apiUrl("/api/auth/login"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        identifier: identifier.value,
        password: password.value,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      if (data.token) {
        localStorage.setItem("adminToken", data.token);
      }
      localStorage.setItem("adminName", data.user.username); // păstrezi doar numele, dacă vrei să-l afișezi undeva
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

<style scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--primary-pink), var(--light-pink));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-lg);
  animation: fadeIn 0.6s ease-out;
}

.login-container {
  width: 100%;
  max-width: 450px;
}

.login-card {
  background: var(--white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  animation: slideInUp 0.6s ease-out;
}

.login-header {
  background: linear-gradient(135deg, var(--primary-pink), var(--light-pink));
  color: var(--white);
  padding: var(--spacing-xl);
  text-align: center;
}

.login-header h1 {
  font-size: 1.8rem;
  margin: 0 0 var(--spacing-xs) 0;
  color: var(--white);
}

.login-header p {
  margin: 0;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.9);
}

.login-form {
  padding: var(--spacing-xl);
}

.error-message {
  background: linear-gradient(
    135deg,
    rgba(255, 107, 107, 0.1),
    rgba(255, 135, 135, 0.1)
  );
  border: 2px solid #ff6b6b;
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  color: #d9534f;
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  font-weight: 500;
  animation: slideInUp 0.3s ease-out;
}

.error-icon {
  font-size: 1.3rem;
}

.form-group {
  margin-bottom: var(--spacing-lg);
}

.form-group:last-of-type {
  margin-bottom: var(--spacing-xl);
}

.form-group label {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: var(--spacing-sm);
  font-size: 0.95rem;
}

.label-icon {
  font-size: 1.2rem;
}

.form-input {
  width: 100%;
  padding: var(--spacing-md);
  border: 2px solid var(--light-pink);
  border-radius: var(--radius-md);
  font-family: inherit;
  font-size: 1rem;
  transition: var(--transition);
  background: var(--white);
  color: var(--text-dark);
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-pink);
  box-shadow: 0 0 0 3px rgba(255, 105, 180, 0.1);
  background: rgba(255, 240, 245, 0.5);
}

.form-input::placeholder {
  color: var(--text-light);
}

.btn-login {
  width: 100%;
  background: linear-gradient(135deg, var(--primary-pink), var(--light-pink));
  color: var(--white);
  border: none;
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
}

.btn-login:hover:not(:disabled) {
  background: linear-gradient(135deg, var(--dark-pink), var(--primary-pink));
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

.btn-login:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-login:active:not(:disabled) {
  transform: translateY(0);
}

.login-footer {
  padding: var(--spacing-lg);
  text-align: center;
  border-top: 1px solid var(--light-pink);
  background: var(--very-light-pink);
}

.back-link {
  color: var(--primary-pink);
  text-decoration: none;
  font-weight: 600;
  transition: var(--transition);
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.back-link:hover {
  color: var(--dark-pink);
  transform: translateX(-3px);
}

/* Responsive */
@media (max-width: 768px) {
  .login-page {
    padding: var(--spacing-lg);
  }

  .login-container {
    max-width: 95%;
  }

  .login-header h1 {
    font-size: 1.5rem;
  }

  .login-header p {
    font-size: 0.9rem;
  }

  .form-group label {
    font-size: 0.95rem;
  }

  .form-input {
    padding: var(--spacing-md);
    font-size: 1rem;
  }

  .btn-login {
    padding: var(--spacing-md) var(--spacing-lg);
    font-size: 1rem;
  }
}

@media (max-width: 600px) {
  .login-page {
    padding: var(--spacing-md);
  }

  .login-container {
    max-width: 100%;
  }

  .login-card {
    border-radius: var(--radius-md);
  }

  .login-header {
    padding: var(--spacing-lg) var(--spacing-md);
  }

  .login-header h1 {
    font-size: 1.4rem;
  }

  .login-header p {
    font-size: 0.85rem;
  }

  .login-form {
    padding: var(--spacing-lg) var(--spacing-md);
  }

  .error-message {
    padding: var(--spacing-md);
    font-size: 0.9rem;
  }

  .form-group {
    margin-bottom: var(--spacing-md);
  }

  .form-group label {
    font-size: 0.9rem;
    gap: var(--spacing-xs);
  }

  .label-icon {
    font-size: 1rem;
  }

  .form-input {
    padding: var(--spacing-md);
    font-size: 0.95rem;
  }

  .btn-login {
    padding: var(--spacing-md);
    font-size: 0.95rem;
  }

  .login-footer {
    padding: var(--spacing-md);
  }

  .back-link {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .login-page {
    padding: var(--spacing-sm);
  }

  .login-container {
    width: 100%;
    max-width: 100%;
  }

  .login-card {
    border-radius: var(--radius-md);
    box-shadow: var(--shadow);
  }

  .login-header {
    padding: var(--spacing-md);
  }

  .login-header h1 {
    font-size: 1.2rem;
    margin-bottom: 2px;
  }

  .login-header p {
    font-size: 0.8rem;
  }

  .login-form {
    padding: var(--spacing-md);
  }

  .error-message {
    padding: var(--spacing-sm);
    font-size: 0.8rem;
    gap: var(--spacing-xs);
  }

  .error-icon {
    font-size: 1rem;
    flex-shrink: 0;
  }

  .form-group {
    margin-bottom: var(--spacing-md);
  }

  .form-group:last-of-type {
    margin-bottom: var(--spacing-lg);
  }

  .form-group label {
    font-size: 0.8rem;
    gap: 4px;
  }

  .label-icon {
    font-size: 0.9rem;
    flex-shrink: 0;
  }

  .form-input {
    padding: var(--spacing-sm);
    font-size: 0.9rem;
  }

  .form-input::placeholder {
    font-size: 0.8rem;
  }

  .btn-login {
    padding: var(--spacing-sm) var(--spacing-md);
    font-size: 0.85rem;
    gap: 4px;
  }

  .login-footer {
    padding: var(--spacing-sm);
    border-top: 1px solid var(--light-pink);
  }

  .back-link {
    font-size: 0.8rem;
    gap: 2px;
  }
}
</style>
