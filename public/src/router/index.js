import Vue from 'vue'
import Router from 'vue-router'
import swal from 'sweetalert2'
import store from '../store/index'
import Home from '@/components/Home'
import Profile from '@/components/Profile'
import LiveScores from '@/components/LiveScores'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/livescores',
      name: 'LiveScores',
      component: LiveScores
    },
    {
      path: '/profile/:profileId',
      name: 'profile',
      component: Profile,
      beforeEnter: (to, from, next) => {
        if (!store.state.user.name && from.name) {
          swal({
            type: 'error',
            title: 'Oops...',
            text: 'Please login to continue!'
          })
          next(false)
        } else {
          next()
        }
      }
    },
  ]
})
