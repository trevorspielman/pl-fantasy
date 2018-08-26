import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import swal from 'sweetalert2'



var production = !window.location.host.includes('localhost')
var baseUrl = production ? '//brewbros.herokuapp.com/' : '//localhost:3000/'

let matchData = axios.create({
    baseURL: "https://api.football-data.org/v2/",
    timeout: 30000,
})

//sets my header token to allow me to make requests to the API
axios.defaults.headers.common['X-Auth-Token'] = '208910faa1a0449c8af3014d26f02a40' // for all requests

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
        user: {},
        profileUser: {},
        competitions: [],
        plTeams: [],
        date: Date.now,
        todayMatches: [],
    },
    mutations: {
        updateUser(state, payload) {
            state.user = payload
        },
        setProfileUser(state, payload) {
            state.profileUser = payload
        },
        setCompetitions(state, payload) {
            state.competitions = payload;
        },
        setTeams(state, payload) {
            state.plTeams = payload;
        },
        todayMatches(state, payload){
            state.todayMatches = payload;
            console.log(state.todayMatches)
        }
    },
    actions: {
        getCompetitions({ commit, dispatch, state }, payload) {
            matchData.get("competitions")
                .then(res => {
                    commit('setCompetitions', res.data.competitions)
                })
                .catch(err => {
                    console.error(err)
                })
        },
        getTeams({ commit, dispatch, state }, payload) {
            matchData.get("competitions/2021/teams")
                .then(res => {
                    commit('setTeams', res.data.teams)
                })
                .catch(err => {
                    console.error(err)
                })
        },
        getCurrentMatchDay({commit, dispatch,state }, payload){
            matchData.get("competitions/2021/matches?dateFrom=" + payload.todayDate + "&dateTo=" + payload.tomorrowDate)
            .then(res =>{
                console.log(res.data)
                commit('todayMatches', res.data.matches)
            })
            .catch(err => {
                console.error(err)
            })
        },
        //region user and login actions
        createUser({ commit, dispatch, state }, payload) {
            auth.post('register', payload)
                .then(res => {
                    commit('updateUser', res.data)
                    swal({
                        position: 'top-end',
                        width: 300,
                        type: 'success',
                        title: 'Registration Successful',
                        showConfirmButton: false,
                        timer: 1000
                    })
                    router.push({ name: 'profile', params: { profileId: state.user._id } })
                })
                .catch(err => {
                    console.error(err)
                    swal({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!'
                    })
                })
        },
        editProfile({ commit, dispatch }, payload) {
            ourDB.put('users/' + payload._id, payload)
                .then(res => {
                    commit('updateUser', res.data)
                    commit('setProfileUser', res.data)
                })
                .catch(err => {
                    console.error(err)
                })
        },
        login({ commit, dispatch, state }, payload) {
            auth.post('login', payload)
                .then(res => {
                    commit('updateUser', res.data.user)
                    swal({
                        position: 'top-end',
                        width: 300,
                        type: 'success',
                        title: 'Login successful',
                        showConfirmButton: false,
                        timer: 1000
                    })
                    router.push({ name: 'profile', params: { profileId: state.user._id } })
                })
                .catch(err => {
                    console.error(err)
                    swal({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!'
                    })
                })

        },
        authenticate({ commit, dispatch }, payload) {
            auth.get('authenticate', payload).then(res => {
                commit('updateUser', res.data)
            })
                .catch(err => {
                    console.error(err);
                    router.push({ name: 'Home' })
                })
        },
        logout({ commit, dispatch, state }, payload) {
            auth.delete('logout')
                .then(res => {
                    commit('updateUser', {})
                    router.push({ name: 'Home' })
                })
                .catch(err => {
                    console.error(err)
                    swal({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!'
                    })
                })
        }
        //endregion
    }
})