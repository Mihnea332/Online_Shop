<template>
    <div class="login-container">
    <h2>Login Admin</h2>
    <form @submit.prevent"="handleLogin">
    <input v-model="email" type="email" placeholder="Email required"/>
    <input v-model="password" type="password" placeholder="Parola" required />
   </form>
   </div>
</template>
<script setup>
import  { ref } from 'vue';
const email=ref('')
const password=ref('')
const handleLogin =()=>
{
    console.log("Incercare login pentru",email.value)

}


</script>
<style scoped>
.login-container { max-width: 300px; margin: 50px auto; text-align: center; }
input { display: block; width: 100%; margin-bottom: 10px; padding: 8px; }
button { width: 100%; padding: 10px; background-color: #42b983; color: white; border: none; cursor: pointer; }
</style>