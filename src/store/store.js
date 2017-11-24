import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    counter: 100,
    user: {email: '', score: 250},
    chartData: {
      labels: ['250', ' '],
      series: [250, 850 - 250]},
    bank: {scb: false, kbank: false}
  }
})
