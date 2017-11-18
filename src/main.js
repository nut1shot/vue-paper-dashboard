import Vue from 'vue'
import VueRouter from 'vue-router'

// Plugins
import GlobalComponents from './globalComponents'
import GlobalDirectives from './globalDirectives'
import Notifications from './components/UIComponents/NotificationPlugin'
import SideBar from './components/UIComponents/SidebarPlugin'
import App from './App'

// Custom
import { store } from './store/store'

// router setup
import routes from './routes/routes'

// library imports
import Chartist from 'chartist'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/sass/paper-dashboard.scss'
import 'es6-promise/auto'
import axios from 'axios'

// plugin setup
Vue.use(VueRouter)
Vue.use(GlobalComponents)
Vue.use(GlobalDirectives)
Vue.use(Notifications)
Vue.use(SideBar)

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'active'
})

// global library setup
Object.defineProperty(Vue.prototype, '$Chartist', {
  get () {
    return this.$root.Chartist
  }
})
export const evtBus = new Vue({
  data () {
    return {
      chart: {},
      user: {
        firstname: '',
        lastname: '',
        email: '',
        dob: '',
        age: '',
        job: '',
        income: '',
        otherIncome: '',
        creditDebt: '',
        sumDebt: '',
        homeDebt: '',
        carDebt: '',
        personDebt: ''
      }
    }
  },
  methods: {
    setScore (x) {
      alert('score = ' + x)
    },
    getScore () {
      return 123
    },
    setUser (json) {
      console.log(json)
      this.user = JSON.parse(json)
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App),
  router,
  data: {
    Chartist: Chartist
  }
})
