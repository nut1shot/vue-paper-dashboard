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
        tel: '',
        job: '',
        workMonth: '',
        workProvince: '',
        basicSalary: '',
        comIncome: '',
        otIncome: '',
        otherIncomeE: '',
        otherIncomeN: '',
        creditCardType: '',
        getSalaryBy: '',
        score: 250
      }
    }
  },
  methods: {
    getUser () {
      return this.user
    },
    setUser (u) {
      this.user = u
      let score = u.score || 197
      store.state.user = u
      store.state.chartData.series[0] = score
      store.state.chartData.series[1] = 850 - score
      store.state.chartData.labels[0] = score + ' '
    },
    newUser () {
    /* create a new empty user object */
      return {
        firstname: '',
        lastname: '',
        email: '',
        dob: '',
        age: '',
        tel: '',
        job: '',
        workMonth: '',
        workProvince: '',
        basicSalary: '',
        comIncome: '',
        otIncome: '',
        otherIncomeE: '',
        otherIncomeN: '',
        creditCardType: '',
        getSalaryBy: '',
        score: 250
      }
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
  },
  created () {
    /* try loading saved user data */
    if (localStorage.user !== undefined) {
      let u = JSON.parse(localStorage.user)
      evtBus.setUser(u)
    }
  }
})
