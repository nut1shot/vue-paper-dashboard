import Vue from 'vue'
import VueRouter from 'vue-router'

// Plugins
import GlobalComponents from './globalComponents'
import GlobalDirectives from './globalDirectives'
import Notifications from './components/UIComponents/NotificationPlugin'
import SideBar from './components/UIComponents/SidebarPlugin'
import App from './App'

// router setup
import routes from './routes/routes'

// library imports
import Chartist from 'chartist'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/sass/paper-dashboard.scss'
import 'es6-promise/auto'

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
      score: 750,
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
      var url = window.api_host + 'get_score'
      axios.post(
        url,
        { email: 'nutp10.1@gmail.com' },
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      ).then((response) => {
        if (response.data.success) {
          this.score = response.data.score
        }
      })
    },
    setUser (data) {
      console.log(data)
      this.user = JSON.parse(data)
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  data: {
    Chartist: Chartist
  }
})
