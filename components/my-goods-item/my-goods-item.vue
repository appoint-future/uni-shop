<template>
	<view class="goods-item">
		<view class="goods-pic">
			<image :src="goods.goods_small_logo || '/static/default.png'"></image>
		</view>
		<view class="goods-item-info">
			<view class="goods-name">{{ goods.goods_name }}</view>
			<text class="goods-price">￥{{ goods.goods_price | tofixed }}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			goods:{
				type: Object,
				default: {}
			}
		},
		filters:{
			tofixed(num){
				return Number(num).toFixed(2)
			}
		},
		data() {
			return {
				
			};
		},
	}
</script>

<style lang="scss">
		.goods-item{
			display: flex;
			background-color: #fff;
			border-radius: 20rpx;
			overflow: hidden;
			margin-bottom: 20rpx;
			.goods-pic{
				width: 250rpx;
				height: 250rpx;
				image{
					width: 250rpx;
					height: 250rpx;
					border-radius: 20rpx;
				}
			}
			.goods-item-info{
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				margin-left: 20rpx;
				font-size: 28rpx;
				.goods-price{
					color: #FF0000;
					font-size: 36rpx;
				}
			}
		}
</style>
