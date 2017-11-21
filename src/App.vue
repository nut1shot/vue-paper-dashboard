<template>
  <div :class="{'nav-open': $sidebar.showSidebar}">
    <router-view></router-view>
    <!--This sidebar appears only for screens smaller than 992px-->
    <side-bar type="navbar" :sidebar-links="$sidebar.sidebarLinks">
      <ul class="nav navbar-nav">
         <li>
           <a v-on:click="goToLogin">
             <i class="ti-shift-right"></i>
             <p>{{isLoggedIn()}}</p>
           </a>
         </li> 
         <li class="divider"></li>
      </ul>
    </side-bar>
  </div>
</template>

<script>
  import { evtBus } from 'main'
  export default {
    methods: {
      isLoggedIn () {
        if (this.$store.state.user.email !== '') {
          return 'Log out'
        } else {
          return 'Log In'
        }
      },
      goToLogin () {
        evtBus.user.userTmp = false
        if (localStorage.getItem('user_login') != null) {
          localStorage.removeItem('user_login')
          localStorage.removeItem('user')
          evtBus.setUser(evtBus.newUser())
          this.$sidebar.displaySidebar(false)
          window.location.href = '#/admin/register'
        } else {
          this.$sidebar.displaySidebar(false)
          window.location.href = '#/admin/register'
        }
      }
    }
  }
</script>

<style lang="scss"></style>
