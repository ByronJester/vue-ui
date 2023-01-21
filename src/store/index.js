import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    client: {
      grant_type: 'password',
      client_id: null,
      client_secret: null,
      username: null,
      password: null
    },
    token: localStorage.getItem('access_token') || null,
    loginErr: null
  },

  mutations: {
    getClient(state, arg) {
      state.client.client_id = arg.id,
      state.client.client_secret = arg.secret
    },
    inputUsername(state) {
      state.client.username
    },
    inputPassword(state) {
      state.client.password
    },
    getLoginError(state, arg){
      state.loginErr = arg
    },
    getBearer(state, arg) {
      state.token = 'Bearer ' + arg
    }
  },
  actions: {
    getClient({ commit }) {
      axios.post('http://localhost:8080/api/client', {})
        .then(function (response) {
          commit('getClient', response.data.client)
        })
        .catch(function (error) {
        });
    },
    login({ getters, commit }) {
      return new Promise((resolve, reject) => {
        let client = getters.client

        let formData = new FormData()

        formData.append('grant_type', client.grant_type);
        formData.append('client_id', client.client_id);
        formData.append('client_secret', client.client_secret);
        formData.append('username', client.username);
        formData.append('password', client.password);

        axios.post('http://localhost:8080/oauth/token', formData)
          .then(function (response) {
            commit('getBearer', response.data.access_token)

            localStorage.setItem('access_token', 'Bearer ' + response.data.access_token)

            resolve(response)
          })
          .catch(function (error) {
            commit('getLoginError', error.response.data.message)

            reject(error)
          });
      })
    },
    logout({ getters, commit }) {
      let loggedIn = getters.loggedIn
      let header = getters.headerReq

      if(loggedIn) {
        return new Promise((resolve, reject) => {
          axios.post('http://localhost:8080/api/logout', {}, header)
          .then(function (response) {
            commit('getBearer', null)

            localStorage.removeItem('access_token')

            resolve(response)

            location.reload()
          })
          .catch(function (error) {
            reject(error)
          });
        })
      }
      
    }
  },
  getters: {
    client(state) {
      return state.client
    },
    token(state) {
      return state.token
    },
    loggedIn(state) {
      return state.token !== null
    },
    headerReq(state) {
      return {
        headers: {
         'Accept': 'application/json',
         'Authorization' : state.token
        }
      }
    }
  },
  modules: {
  }
})
