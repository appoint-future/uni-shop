<template>
	<!-- 结算面板 -->
	<view v-if="!edit" class="settile-container">
		<label class="radio">
			<radio :checked="allChecked" @click="canelAllChecked" style="zoom: 80%;" color="#ff9f43"/>
			<text>全选</text>
		</label>
		<view class="total">
			<text>合计：<text class="num">￥{{ aggregate | toFix}}</text></text>
			<button class="settlement" @click="settlement">结算<text>({{ checkedCount }})</text></button>
		</view>
	</view>
	<!-- 管理面板 -->
	<view v-else class="settile-container">
		<label class="radio">
			<radio :checked="allChecked" @click="canelAllChecked" style="zoom: 80%;" color="#ff9f43"/>
			<text>全选</text>
		</label>
		<view class="total">
			<button class="delete" @click="deleteGoods">删除</button>
		</view>
	</view>
</template>

<script>
	import { mapGetters ,mapMutations ,mapState} from 'vuex'
	export default {
		data() {
			return {
				edit:'',
				// 跳转秒数
				second:3,
			}
		},
		computed:{
			...mapGetters('m_cart',['checkedCount','total','aggregate']),
			...mapState('m_cart',['cart']),
			...mapState('m_user',['token','address']),
			...mapGetters('m_user',['fullAddress']),
			allChecked(){
				return this.total===this.checkedCount
			}
		},
		methods:{
			...mapMutations('m_cart',['allUnChecked','removeGoodsByState']),
			...mapMutations('m_user',['updataRedirectInfo']),
			canelAllChecked(){
				this.allUnChecked(!this.allChecked)
			},
			setEdit(){
				this.$eventBus.$on('share',(msg)=>{
					this.edit=msg
				})
			},
			deleteGoods(){
				this.removeGoodsByState()
			},
			settlement(){
				if(!this.checkedCount) return uni.$showToast('请选择要结算的商品')
				if(this.address==='{}') return uni.$showToast('请选择收货地址')
				if(!this.token) return this.delayNavigate()
				
				
				this.payOrder()
			},
			async payOrder(){
				// 1、创建订单
				// 1.1组织订单的信息对象
				const orderInfo={
					// order_price: this.aggregate
					order_price: 0.01,
					consignee_addr: this.fullAddress,
					goods: this.cart.filter(x => x.goods_state).map(x => ({ goods_id: x.goods_id, goods_number: x.goods_count, goods_price: x.goods_price }))
				}
				
				// 1.2发起请求创建订单
				const {data:res}=await uni.$http.post('/api/public/v1/my/orders/create',orderInfo)
				
				
				if(res.meta.status !== 200) return uni.$showToast('订单创建失败')
				// 1.3 得到服务器响应的“订单编号”
				const orderNumber = res.message.order_number
				
				// 2、发起订单预支付
				const {data:res2} = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder',{order_number:orderNumber})
				if(res.meta.status !== 200) return uni.$showToast('订单预支付失败')
				const payInfo=res2.message.pay
				
				// 3. 发起微信支付
				   // 3.1 调用 uni.requestPayment() 发起微信支付
				   const [err, succ] = await uni.requestPayment(payInfo)
				   // 3.2 未完成支付
				   if (err) return uni.$showToast('订单未支付！')
				   // 3.3 完成了支付，进一步查询支付的结果
				   const { data: res3 } = await uni.$http.post('/api/public/v1/my/orders/chkOrder', { order_number: orderNumber })
				   // 3.4 检测到订单未支付
				   if (res3.meta.status !== 200) return uni.$showToast('订单未支付！')
				   // 3.5 检测到订单支付完成
				   uni.showToast({
				     title: '支付完成！',
				     icon: 'success'
				   })
			},
			delayNavigate(){
				this.showTips(this.second)
				
				const time = setInterval(()=>{
					this.second--
					if(this.second<=0) {
						clearInterval(time)
						uni.switchTab({
							url:'/pages/my/my',
							success: () => {
								this.updataRedirectInfo({
									openType:'switchTab',
									from:'/pages/cart/cart'
								})
							}
						})
						return
					}
					this.showTips(this.second)
				},1000)
			},
			showTips(n){
				uni.showToast({
					title:`请先登录，${n}秒后跳转至登录页`,
					duration:1500,
					mask:true,
					icon:'none'
				})
			}
		},
		filters:{
			toFix(num){
				return num.toFixed(2)
			}
		},
		mounted(){
			this.setEdit()
		}
	}
</script>

<style lang="scss">
	.settile-container{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100rpx;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		z-index: 999;
		.radio{
			display: flex;
			align-items: center;
			font-size: 26rpx;
			color: #ccc;
			margin-left: 30rpx;
		}
		
		.total{
			font-size: 26rpx;
			display: flex;
			align-items: center;
			.num{
				color: #FF0000;
				font-size: 36rpx;
			}
			.settlement{
				width: 220rpx;
				height: 70rpx;
				border-radius: 40rpx;
				color: #fff;
				line-height: 70rpx;
				margin:0 30rpx;
				font-size: 30rpx;
				background-image: linear-gradient(to right,rgb(255,118,0),rgb(255,84,0));
			}
			.delete{
				width: 220rpx;
				height: 70rpx;
				border-radius: 40rpx;
				color: #fff;
				line-height: 70rpx;
				margin:0 30rpx;
				font-size: 30rpx;
				background-image: linear-gradient(to right,rgb(255,118,0),rgb(255,84,0));
			}
		}
	}
</style>
