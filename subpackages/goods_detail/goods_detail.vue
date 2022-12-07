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
				<image src="http://rmf8g6uw4.bkt.clouddn.com/default.png" mode=""></image>
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
				<image src="http://rmf8g6uw4.bkt.clouddn.com/shop.png" mode=""></image>
				<text>店铺</text>
			</view>
			<view class="cart" @click="toCart">
				<cl-badge type="error" :value="count">
					<image src="http://rmf8g6uw4.bkt.clouddn.com/cart.png" mode=""></image>
				</cl-badge>
				<text>购物车</text>
			</view>
			<view class="btn">
				<cl-button round class="cart-add" @click="addGoods">加入购物车</cl-button>
				<cl-button round class="buy-goods">立即购买</cl-button>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState , mapMutations , mapGetters} from 'vuex'
	import setBadge from '@/mixins/tabbar-badge.js'
	export default {
		mixins:[setBadge],
		data() {
			return {
				goodsDetailInfo:[],
				count:0
			}
		},
		computed:{
			...mapState('m_cart',['cart']),
			...mapGetters('m_cart',['total'])
		},
		watch:{
			// total(newVal) {
			// 	this.count=newVal
			// }
			
			total: {
				handler(newVal){
					this.count=newVal
				},
				immediate:true
			}
		},
		methods: {
			...mapMutations('m_cart',['addToCart']),
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
			},
			addGoods(){
				const goods = {
					goods_id:this.goodsDetailInfo.goods_id,
					goods_name:this.goodsDetailInfo.goods_name,
					goods_price:this.goodsDetailInfo.goods_price,
					goods_count:1,
					goods_small_logo:this.goodsDetailInfo.goods_small_logo,
					goods_state:true
				}
				this.addToCart(goods)
				uni.$showToast('添加成功亲~',1500,'success')
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
		padding-bottom: 120rpx;
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
		position: fixed;
		width: 100%;
		height: 100rpx;
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
