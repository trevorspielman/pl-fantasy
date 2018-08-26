<template>
    <div class="Navbar navbar">
      <div class="col-sm-12">
        <nav class="navbar fixed-top navbar-expand-lg">
          <router-link :to="{name: 'Home'}">
            <img class="navbar-brand" src="../assets/user-circle.svg" alt="">
          </router-link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
            <span class="navbar-toggler-icon"><i class="fas fa-bars"></i></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="/#/" id="navbarDropdown" role="button" data-toggle="dropdown">
                  Pages
                </a>
                <div class="dropdown-menu">
                  <router-link :to="{name: 'LiveScores'}">cd
                    <a class="dropdown-item">Today's Games</a>
                  </router-link>
                  <router-link :to="{name: 'fantasy'}">
                    <a class="dropdown-item">Fantasy Team</a>
                  </router-link>
                  <router-link :to="{name: 'profile', params: {profileId: user._id}}" v-if="user._id">
                    <a class="dropdown-item">My Profile</a>
                  </router-link>
                  <!-- <a class="dropdown-item" href='#'>Find User</a> -->
                </div>
              </li>
            </ul>
            <div class="navBtn" v-if="!user._id">
              <button class="btn btn-outline-positive my-2 my-sm-0" data-toggle="modal" data-target="#loginModal">Login</button>
              <button class="btn btn-outline-main my-2 my-sm-0 ml-2" data-toggle="modal" data-target="#registerModal">Register</button>
            </div>
            <div class="navBtn" v-else>
              <button class="btn btn-negative my-2 my-sm-0" @click="logout">Logout</button>
            </div>
          </div>
        </nav>
        <div class="modal fade" id="loginModal" tabindex="-1" role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="loginModalLabel">Login</h5>
                <button type="button" class="close" data-dismiss="modal">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="login" class="d-flex flex-column">
                  <input class="email" type="email" v-model="loginUser.email" placeholder="email">
                  <input class="password" type="password" v-model="loginUser.password" placeholder="password">
                  <button type="submit" class="btn-positive">Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="modal fade" id="registerModal" tabindex="-1" role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="registerModalLabel">Register</h5>
                <button type="button" class="close" data-dismiss="modal">
                  <span>&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="register" class="d-flex flex-column">
                  <input class="username" type="text" v-model="newUser.name" placeholder="username">
                  <input class="email" type="email" v-model="newUser.email" placeholder="email">
                  <input class="profilePic" type="string" v-model="newUser.profilePic" placeholder="image url">
                  <input class="password" type="password" v-model="newUser.password" placeholder="password">
                  <input class="password" type="password" v-model="newUser.confirmPassword" placeholder="confirm password">
                  <button type="submit" class="btn-positive">Register</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
    import swal from 'sweetalert2'
    export default {
      name: 'Navbar',
      data() {
        return {
          loginUser: {
            email: '',
            password: ''
          },
          newUser: {
            name: '',
            email: '',
            profilePic: '',
            password: '',
            confirmPassword: ''
          }
        }
      },
      methods: {
        login() {
          this.$store.dispatch('login', this.loginUser)
          $('#loginModal').modal('hide')
        },
        register() {
          if (this.newUser.password !== this.newUser.confirmPassword) {
            swal({
              type: 'error',
              title: 'Oops...',
              text: 'Make sure passwords match!'
            })
          } else {
            this.$store.dispatch('createUser', this.newUser)
            $('#registerModal').modal('hide')
          }
        },
        logout() {
          this.$store.dispatch('logout')
        }
      },
      computed: {
        user() {
          return this.$store.state.user
        }
      }
    }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
    .navbar {
      height: 4rem;
      box-shadow: 5px 5px 20px rgba(53, 58, 63, 0.75);
    }
    .navbar-brand{
      height: 3.5rem;
    }
    .navbar-toggler{
      align-items: center;
      border: 2px solid white;
    }
    .navbar-toggler-icon{
      padding-top: 5px;
      color: white;
    }
  
    .navbar,
    .dropdown-menu,
    .dropdown-toggle,
    .navbar-nav,
    .navBtn {
      background-color: #222321;
    }
    .nav-item, .navBtn{
      padding-left: 10px;
    }
  
    a {
      color: white;
    }
  
    .dropdown-item:hover {
      background-color: grey;
    }
  
    .modal-body button{
      margin: .5rem;
    }
  
     .modal-body input{
      margin: 5px 0;
      background-position: 5px 0px;
      background-repeat: no-repeat;
      padding-left: 40px;
    }
  
    .email {
      background-image: url('../assets/envelope.svg');
    }
  
    .password {
      background-image: url('../assets/key.svg');
    }
  
    .username {
      background-image: url('../assets/user-circle.svg');
    }
  
    .profilePic {
      background-image: url('../assets/image.svg');
    }
  </style>