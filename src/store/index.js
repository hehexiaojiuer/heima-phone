import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storge.js'

Vue.use(Vuex)
const TOKEN_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
  state: {
    user: getItem(TOKEN_KEY)
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
      console.log(state.user)
      setItem(TOKEN_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
  }
})
