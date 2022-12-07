export default {
	namespaced: true,
	
	state: ()=>({
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	}),
	
	mutations:{
		addToCart(state,goods){
			const findGoods = state.cart.find(x=>x.goods_id===goods.goods_id)
			if(!findGoods) {
				state.cart.push(goods)
			} else {
				findGoods.goods_count++
			}
			this.commit('m_cart/saveToStorage')
		},
		saveToStorage(state){
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		},
		updateGoodsState(state,goods){
			const findGoods = state.cart.find(item=>item.goods_id===goods.goods_id)
			findGoods.goods_state=!findGoods.goods_state
			this.commit('m_cart/saveToStorage')
		},
		updateGoodsCount(state,goods){
			const findGoods = state.cart.find(item=>item.goods_id===goods.goods_id)
			findGoods.goods_count=goods.goods_count
			this.commit('m_cart/saveToStorage')
		},
		removeGoodsById(state,id){
			state.cart=state.cart.filter(item=>item.goods_id!==id)
			this.commit('m_cart/saveToStorage')
		},
		allUnChecked(state,newState){
			state.cart.forEach(item=>item.goods_state=newState)
			this.commit('m_cart/saveToStorage')
		},
		removeGoodsByState(state){
			state.cart = state.cart.filter(item=>!item.goods_state)
			this.commit('m_cart/saveToStorage')
		}
	},
	
	getters:{
		total(state){
			// let total=0
			// state.cart.forEach(x=> total += x.goods_count)
			// return total
			
			return state.cart.reduce((total,item)=>total+=item.goods_count,0)
		},
		checkedCount(state){
			return state.cart.filter(item=>item.goods_state).reduce((total,item)=>total+=item.goods_count,0)
		},
		aggregate(state){
			return state.cart.filter(item=>item.goods_state).reduce((num,item)=>num+=item.goods_count*item.goods_price,0)
		}
	}
}