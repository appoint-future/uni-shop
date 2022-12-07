<template>
  <view v-if="cart.length !== 0" class="cart-container">
		<!-- 头部区域 -->
    <my-address @editChanged="getNewEdit"></my-address>
		<!-- 主体区域 -->
		<view class="cart-body">
			<view v-if="cart.length!==0" v-for="item in cart" :key="item.goods_id" class="cart-item">
				<myGoods :edit="newEdit" :goods="item" :show-radio="true" @stateChange="radioChangeHandler" @numChange="countChangeHandler"></myGoods>
			</view>
		</view>
		<!-- 底部区域 -->
		<my-settle></my-settle>
  </view>
	<view class="empty-cart" v-else>
		<image src="http://rmf8g6uw4.bkt.clouddn.com/cart-empty.png" mode="heightFix"></image>
		<text>一件宝贝也没有啦{{ '(*>﹏<*)' }}</text>
	</view>
</template>

<script>
	import setBadge from '@/mixins/tabbar-badge.js'
	import myGoods from '../../components/my-goods-item/my-goods-item.vue'
	import { mapState , mapMutations } from 'vuex'
  export default {
		mixins:[setBadge],
		components:{myGoods},
    data() {
      return {
				newEdit:false
      }
    },
		computed:{
			...mapState('m_cart',['cart'])
		},
		methods:{
			...mapMutations('m_cart',['updateGoodsState','updateGoodsCount']),
			radioChangeHandler(obj){
				this.updateGoodsState(obj)
			},
			countChangeHandler(obj){
				this.updateGoodsCount(obj)
			},
			getNewEdit(newEdit){
				this.newEdit=newEdit
			}
		}
  }
</script>

<style lang="scss">
	.cart-container{
		padding-bottom: 100rpx;
	}
	
	.cart-body{
		width: 100%;
		border-radius: 40rpx 40rpx 0 0;
		position: relative;
		background-color: #efefef;
		margin-top: 70rpx;
		image{
			width: 100%;
			position: relative;
			left: 50%;
			transform: translateX(-50%);
		}
		&::before{
			position: absolute;
			top: 0;
			left: 0;
			content: '';
			display: block;
			z-index: -999;
			background-color: #FFD524;
			width: 40rpx;
			height: 40rpx;
		}
		&::after{
			position: absolute;
			top: 0;
			right: 0;
			content: '';
			display: block;
			z-index: -999;
			background-color: #FFD524;
			width: 40rpx;
			height: 40rpx;
		}
	}
	
	.empty-cart{
		display: flex;
		flex-direction: column;
		align-items: center;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		color: #E6A23C;
	}
</style>
