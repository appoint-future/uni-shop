export default {
	namespaced : true,
	
	state:()=>({
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
		isEditing: uni.getStorageSync('isEditing')
	}),
	
	mutations: {
		updateAddress(state,address){
			state.address=address
			this.commit('m_user/saveAddressToStorage')
		},
		updateIsEditing(state,isEditing){
			state.isEditable=isEditing
			this.commit('m_user/saveIsEditingToStorage')
		},
		saveAddressToStorage(state){
			uni.setStorageSync('address',JSON.stringify(state.address))
		},
		saveIsEditingToStorage(state){
			uni.setStorageSync('isEditing',state.isEditable)
		}
	},
	
	getters: {

	},
}