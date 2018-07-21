import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import swal from 'sweetalert2'


var production = !window.location.host.includes('localhost')
var baseUrl = production ? '//brewbros.herokuapp.com/' : '//localhost:3000/'


var ourDB = axios.create({
  baseURL: baseUrl + 'api/',
  timeout: 10000,
  withCredentials: true
})

// var key = '?key=e96ab9f00ea6c4d6e6ad50967fc0627d'
let beerDB = axios.create({
  baseURL: 'https://fantasy.premierleague.com/drf/bootstrap-static',
  timeout: 10000
})

var auth = axios.create({
  baseURL: baseUrl + 'auth/',
  timeout: 5000,
  withCredentials: true
})

vue.use(vuex)

export default new vuex.Store({
  state: {


  },
  mutations: {

  },
  actions: {

  }
})