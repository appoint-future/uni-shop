<template>
	<view class="login-container">
		<cl-icon name="cl-icon-my" :size="150" color="#FF0000"></cl-icon>
		<button class="loginbtn" @click="getUserProfile">一键登录</button>
		<text>登录后尽享更多权益</text>
	</view>
</template>

<script>
	import { mapMutations , mapState} from 'vuex'
	export default {
		data() {
			return {
				hasUserInfo: false,
				canIUseGetUserProfile: false,
			}
		},
		computed:{
			...mapState('m_user',['redirectInfo'])
		},
		methods:{
			...mapMutations('m_user',['updateUserInfo','updateToken','updataRedirectInfo']),
			getUserProfile() {
			  uni.getUserProfile({
			    desc: '用于测试登录功能',
			    success: (res) => {
			      this.updateUserInfo(res)
						this.getToken(res)
			    },
					fail: (err) => {
						return uni.$showToast('您取消了授权')
					}
				})
			},
			async getToken(info){
				const [err,succ]=await uni.login().catch(err=>err)
				if( err || succ.errMsg!=="login:ok") return uni.$showToast('登录失败')
				// const query={
				// 	code:succ.code,
				// 	encryptedData:info.encryptedData,
				// 	iv:info.iv,
				// 	rawData:info.rawData,
				// 	signature:info.signature
				// }
				
				const query = {
					grant_type: 'client_credential',
					appid: 'wx5400b20e0dfcecb0',
					secret: 'c6186d1b9bea934310adcc5fca1ca519'
				}
				
				const {data:res} = await uni.request({
					url: 'https://api.weixin.qq.com/cgi-bin/token',
					data: query,
					success: (res) => {
						if(res.data.expires_in > 7200) uni.$showToast('登录失败')
						this.updateToken(res.data.access_token)
						uni.$showToast('登陆成功',1500,'success')
						this.hasUserInfo=true
						this.navigateBack()
					}
				})
			},
			navigateBack(){
				if(this.redirectInfo && this.redirectInfo.openType==='switchTab'){
					uni.switchTab({
						url: this.redirectInfo.from,
						complete: () => {
							this.updataRedirectInfo(null)
						}
					})
				}
			}
		},
		created(){
			this.canIUseGetUserProfile=true
		}
	}
</script>

<style lang="scss">
	.login-container{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 40%;
		left: 50%;
		transform: translate(-50%,-50%);
		.loginbtn{
			width: 500rpx;
			height: 100rpx;
			border-radius: 50rpx;
			background-color: rgb(255,84,0);
			color: #fff;
			margin: 40rpx;
		}
		text{
			font-size: 26rpx;
			color: #999;
		}
	}
</style>
