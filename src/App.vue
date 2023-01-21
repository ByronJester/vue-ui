<template>
  <nav>
    <router-link to="/company" v-if="loggedIn">Companies |</router-link> 
    <router-link to="/user" v-if="loggedIn">Users |</router-link>
    <router-link to="/department" v-if="loggedIn">Departments |</router-link>
    <router-link to="/employee" v-if="loggedIn">Employees |</router-link>
    <router-link to="/logout" v-if="loggedIn">Logout</router-link>
  </nav>
  <router-view/>
</template>

<script>

export default {
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
