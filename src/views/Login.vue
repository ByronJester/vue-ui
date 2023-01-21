<template>
  <div class="login-container">
    <div class="form">
      <div style="width: 100%">
        <input type="text" v-model="$store.state.client.username" @input="$store.commit('inputUsername')"
          placeholder="Email"
        >
      </div>

      <div style="width: 100%">
        <input type="password" v-model="$store.state.client.password" @input="$store.commit('inputPassword')"
          placeholder="Password"
        >
      </div>

      <div style="width: 100%">
        <button @click="loginUser"
        >
          LOGIN
        </button>
      </div>

      <div style="width: 100%">
        <p v-if="$store.state.loginErr">
          {{$store.state.loginErr}}
        </p>
      </div>
    </div>
    
  </div>
</template>

<script>

export default {
  name: 'login',
  created() {
    this.$store.dispatch('getClient')
    // this.$store.dispatch('login')
  },

  methods: {
    loginUser() {
      this.$store.dispatch('login')
       .then( () => {
        this.$router.push({name: 'company'})
       })
    }
  }
}
</script>

<style scoped>

  .login-container {
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .form  {
    width: 20%;
    height: 12vw;
    border: 1px solid black;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
  }

  input {
    height: 40px;
    width: 90%;
    border: 1px solid black;
    margin-top: 1vw;
    margin-bottom: 1vw;
    text-align: center;
    cursor: pointer;
  }

  button {
    height: 43px;
    width: 91.5%;
    border: none;
    margin-top: 1vw;
    margin-bottom: 1vw;
    text-align: center;
    background: #08A1FE;
    font-weight: bold;
    cursor: pointer;
  }
</style>