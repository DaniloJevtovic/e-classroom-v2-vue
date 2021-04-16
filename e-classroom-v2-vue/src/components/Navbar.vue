<template>
  <div class="navbar">
    <nav>
      <img src="@/assets/logo.png" />
      <h2>e-classroom</h2>
      <div class="links">
        <router-link :to="{ name: 'Login' }">Login</router-link>
        <router-link :to="{ name: 'Signup' }">Signup</router-link>
      </div>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.navbar {
  padding: 16px 10px;
  margin-bottom: 50px;
  background: white;
}

nav {
  display: flex;
  align-items: center;
  margin: 0 auto;
}

nav h2 {
  margin-left: 10px; /*od lijeve ivice 20px */
}

nav .links {
  margin-left: auto; /*ovo ih poravna udesno?! */
}

nav .links a,
button {
  margin-left: 10px; /*razmak izmedju dugmica */
  font-size: 20px;
}

.links a.router-link-exact-active {
  background: cyan;
  color: indigo;
  padding: 10px;
  font-weight: bold;
  border-radius: 10px;
}

nav img {
  max-height: 30px;
}
</style>