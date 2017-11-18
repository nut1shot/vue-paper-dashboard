import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    counter: 100,
    chartData: {
      labels: [' ', ' '],
      series: [10, 30]}
  }
})
