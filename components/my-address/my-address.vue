<template>
	<view>
		<view class="cart-title">
			<!-- 左侧区域 -->
			<view class="container">
				<text class="cart-words">购物车</text>
				<view class="address" @click="chooseAddress">
					<cl-icon name="cl-icon-map" :size="24"></cl-icon>
					<view>{{ address.detailInfo ? address.detailInfo : '请填写收货地址'}}</view>
					<cl-icon name="cl-icon-arrow-right" :size="24"></cl-icon>
				</view>
			</view>
			<!-- 编辑区域 -->
			<view class="edit" @click="editGoods">
				<cl-icon name="cl-icon-edit" :size="28" v-if="!edit"></cl-icon>
				<text v-if="!edit">管理</text>
				<text v-else>退出管理</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapMutations , mapState} from 'vuex'
	export default {
		data() {
			return {
				edit:null
			}
		},
		computed:{
			...mapState('m_user',['address'])
		},
		watch:{
			edit(){
				this.$emit('editChanged',this.edit)
				this.sendEdit()
			}
		},
		methods:{
			...mapMutations('m_user',['updateAddress','updateIsEditing']),
			async chooseAddress(){
				const [err,succ]=await uni.chooseAddress().catch(err=>err)
				if(err===null && succ.errMsg==='chooseAddress:ok'){
					this.updateAddress(succ)
				}
			},
			editGoods(){
				this.edit=!this.edit
				this.updateIsEditing(this.edit)
			},
			sendEdit(){
				this.$eventBus.$emit('share',this.edit)
			}
		},
		created(){
			this.updateIsEditing(false)
			this.edit=uni.getStorageSync('isEditing')
		}
	}
</script>

<style lang="scss">
	.cart-title{
		position: fixed;
		width: 100%;
		height: 50rpx;
		z-index: 999;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #FFD524;
		padding: 20rpx;
		padding-top: 0;
		color: #fff;
		.container{
			display: flex;
			.cart-words{
				font-size: 40rpx;
				font-weight: 700;
			}
		}
		.address{
			margin-left: 10rpx;
			display: flex;
			align-items: center;
			view{
				max-width: 250rpx;
				min-width: 150rpx;
				word-break:keep-all;
				white-space:nowrap;
				overflow:hidden;
				text-overflow:ellipsis;
				font-size: 26rpx;
				text-align: center;
			}
		}
		.edit{
			margin-right: 50rpx;
			font-size: 30rpx;
			cl-icon{
				margin-right: 10rpx;
			}
		}
	}
</style>
