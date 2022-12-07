import Vuex from 'vuex'
import Vue from 'vue'
import moduleCart from './cart.js'
import moduleAdderss from './user.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules:{
		'm_cart': moduleCart,
		'm_user': moduleAdderss
	},
})

export default store