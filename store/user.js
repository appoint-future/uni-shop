export default {
	namespaced : true,
	
	state:()=>({
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
		isEditing: uni.getStorageSync('isEditing'),
		token: uni.getStorageSync('token') || '',
		userInfo: JSON.parse(uni.getStorageSync('userInfo') || '{}'),
		redirectInfo: null
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
		updateUserInfo(state,userInfo){
			state.userInfo=userInfo
			this.commit('m_user/saveUserInfoToStorage')
		},
		updateToken(state,token){
			state.token=token
			this.commit('m_user/saveTokenToStorage')
		},
		updataRedirectInfo(state,info){
			state.redirectInfo=info
			this.commit('m_user/saveRedirectInfoToStorage')
		},
		saveAddressToStorage(state){
			uni.setStorageSync('address',JSON.stringify(state.address))
		},
		saveIsEditingToStorage(state){
			uni.setStorageSync('isEditing',state.isEditable)
		},
		saveUserInfoToStorage(state){
			uni.setStorageSync('userInfo',JSON.stringify(state.userInfo))
		},
		saveTokenToStorage(state){
			uni.setStorageSync('token',state.token)
		},
		saveRedirectInfoToStorage(state){
			uni.setStorageSync('redirectInfo',JSON.stringify(state.redirectInfo))
		}
	},
	
	getters: {
		fullAddress(state){
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
		}
	},
}