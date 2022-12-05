<template>
	<view v-if="goodsDetailInfo.goods_name" class="goods-detail-container">
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular>
			<block v-if="goodsDetailInfo.pics.length!==0">
				<swiper-item v-for="(item,index) in goodsDetailInfo.pics" :key="item.pics_id" @click="preview(index)">
					<image :src="item.pics_big"></image>
				</swiper-item>
			</block>
			<swiper-item v-else>
				<image src="../../static/default.png" mode=""></image>
			</swiper-item>
		</swiper>
		<!-- 商品信息区域 -->
		<view class="goods-info-box">
			<!-- 商品价格 -->
			<view class="goods-price">￥{{ goodsDetailInfo.goods_price }}</view>
			<!-- 商品信息区域 -->
			<view class="goods-info-body">
				<text class="goods-name">{{ goodsDetailInfo.goods_name }}</text>
				<view class="like">
					<cl-icon name="cl-icon-like" :size="50" color="gray"></cl-icon>
					<text>收藏</text>
				</view>
			</view>
			<!-- 运费区域 -->
			<view class="yf">快递：免运费</view>
		</view>
		<!-- 商品富文本内容 -->
		<view class="goods-pic-info">
			<rich-text :nodes="goodsDetailInfo.goods_introduce"></rich-text>
		</view>
		<!-- 底部导航区域 -->
		<view class="goods-Bar">
			<view class="shop">
				<image src="../../static/shop.png" mode=""></image>
				<text>店铺</text>
			</view>
			<view class="cart" @click="toCart">
				<cl-badge type="error" :value="2">
					<image src="../../static/cart.png" mode=""></image>
				</cl-badge>
				<text>购物车</text>
			</view>
			<view class="btn">
				<cl-button round class="cart-add">加入购物车</cl-button>
				<cl-button round class="buy-goods">立即购买</cl-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsDetailInfo:[]
			}
		},
		methods: {
			async getGoodsDetailInfo(id){
				const {data:res}=await uni.$http.get('/api/public/v1/goods/detail',{goods_id:id})
				if(res.meta.status!==200) return uni.$showToast()
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g,'<img style="display: block;"').replace(/.webp/g,'.jpg')
				this.goodsDetailInfo=res.message
			},
			preview(index){
				uni.previewImage({
					current:index,
					urls:this.goodsDetailInfo.pics.map(x=>x.pics_big)
				})
			},
			toCart(){
				uni.switchTab({
					url:'/pages/cart/cart'
				})
			}
		},
		onLoad(options){
			this.getGoodsDetailInfo(options.goods_id)
		}
	}
</script>

<style lang="scss">
	.goods-detail-container{
		background-color: #efefef;
	}
	
	swiper{
		height: 750rpx;
		image {
			width: 100%;
			height: 100%;
		}
	}
	
	.goods-info-box{
		padding: 20rpx;
		margin: 20rpx;
		background-color: #fff;
		border-radius: 20rpx;
		.goods-price{
			color: #FF0000;
			font-size: 36rpx;
			margin: 20rpx 0;
		}
		
		.goods-info-body{
			display: flex;
			justify-content: space-between;
			.goods-name{
				font-size: 26rpx;
				margin-right: 20rpx;
				font-weight: 700;
			}
			.like{
				width: 240rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				border-left: 1px solid #ccc;
				font-size: 24rpx;
				color: gray;
			}
		}
		.yf {
			font-size: 24rpx;
			color: gray;
			margin: 20rpx 0;
		}
	}
	
	.goods-pic-info{
		margin: 20rpx;
		background-color: #fff;
		border-radius: 20rpx;
		padding: 20rpx;
	}
	
	.goods-Bar{
		position: sticky;
		background-color: #fff;
		z-index: 999;
		bottom: 0;
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 10rpx;
		image{
			width: 50rpx;
			height: 50rpx;
		}
		.shop,.cart{
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: 24rpx;
		}
		.shop{
			text{
				margin-top: 5rpx;
			}
		}
		.cart-add .cl-button{
			background-image: linear-gradient(to right,rgb(255,203,0),rgb(255,150,2));
		}
		.buy-goods .cl-button{
			background-image: linear-gradient(to right,rgb(255,118,0),rgb(255,84,0));
		}
		.cl-button__text{
			color: #fff;
			font-weight: 700;
		}
	}
</style>
