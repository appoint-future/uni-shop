<template>
	<!-- 结算面板 -->
	<view v-if="!edit" class="settile-container">
		<label class="radio">
			<radio :checked="allChecked" @click="canelAllChecked" style="zoom: 80%;" color="#ff9f43"/>
			<text>全选</text>
		</label>
		<view class="total">
			<text>合计：<text class="num">￥{{ aggregate | toFix}}</text></text>
			<button class="settlement">结算<text>({{ checkedCount }})</text></button>
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
	import { mapGetters ,mapMutations } from 'vuex'
	export default {
		data() {
			return {
				edit:''
			}
		},
		computed:{
			...mapGetters('m_cart',['checkedCount','total','aggregate']),
			allChecked(){
				return this.total===this.checkedCount
			}
		},
		methods:{
			...mapMutations('m_cart',['allUnChecked','removeGoodsByState']),
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
			}
		},
		filters:{
			toFix(num){
				return num.toFixed(2)
			}
		},
		created(){
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
