import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import router from '../router'


var production = !window.location.host.includes('localhost')
var baseUrl = production ? '//brewbros.herokuapp.com/' : '//localhost:3000/'

let liveScores = axios.create({
    baseURL: "https://api.football-data.org/v2/competitions",
    timeout: 30000,
  
  })

var ourDB = axios.create({
    baseURL: baseUrl + 'api/',
    timeout: 10000,
    withCredentials: true
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