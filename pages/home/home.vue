<template>
  <view>
	<!-- 搜索组件 -->
	<view class="my-search-box">
		<my-search @click="gotoSearch"></my-search>
	</view>
	<!-- 轮播图模块 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
    	<swiper-item v-for="(item,index) in swiperList" :key="item.goods_id">
    		<navigator class="swiper-item" :url="'/subpackages/goods_detail/goods_detail?goods_id='+item.goods_id">
				<image :src="item.image_src" mode=""></image>
			</navigator>
    	</swiper-item>
    </swiper>
	
	<!-- 导航部分 -->
	<view class="nav">
		<view v-for="(item,index) in navList" :key="index" class="nav-list" @click="navClickHandler(item)">
			<image :src="item.image_src"></image>
		</view>
	</view>
	
	<!-- 楼层区域 -->
	<view class="floor">
		<view class="floor-item" v-for="(item,index) in floorList" :key="index">
			<image :src="item.floor_title.image_src" mode="widthFix"></image>
			<view class="floor-item-content">
				<navigator class="img-left-content" :url="item.product_list[0].url">
					<image :src="item.product_list[0].image_src" :style="{width:item.product_list[0].image_width+'rpx'}" mode="widthFix"></image>
				</navigator>
				<view class="img-right-content">
					<navigator v-for="(item2,index2) in item.product_list" :key="index2" v-if="index2!==0" :url="item2.url" class="img-right-item">
						<image :src="item2.image_src" :style="{width:item2.image_width + 'rpx'}" mode="widthFix"></image>
					</navigator>
				</view>
			</view>
		</view>
	</view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
		// 轮播图数据
		swiperList:[],
		// 导航数据
		navList:[],
		// 楼层数据
		floorList:[]
      };
    },
	methods:{
		async getSwiperList(){
			const {data:res}=await uni.$http.get('/api/public/v1/home/swiperdata')
			if(res.meta.status!==200) return uni.$showToast()
			this.swiperList=res.message
		},
		async getNavList(){
			const {data:res}=await uni.$http.get('/api/public/v1/home/catitems')
			if(res.meta.status!==200) return uni.$showToast()
			this.navList=res.message
		},
		async getFloorList(){
			const {data:res}=await uni.$http.get('/api/public/v1/home/floordata')
			if(res.meta.status!==200) return uni.$showToast()
			res.message.forEach(floor=>{
				floor.product_list.forEach(pro=>{
					pro.url='/subpackages/goods_list/goods_list?'+pro.navigator_url.split('?')[1]
				})
			})
			this.floorList=res.message
		},
		navClickHandler(item){
			if(item.name==='分类'){
				uni.switchTab({
					url:'/pages/cart/cart'
				})
			}
		},
		gotoSearch() {
			uni.navigateTo({
				url: '/subpackages/search/search',
			})
		}
	},
	onLoad(){
		this.getSwiperList()
		this.getNavList()
		this.getFloorList()
	}
  }
</script>

<style lang="scss">
	swiper{
		width: 100%;
		height: 330rpx;
		.swiper-item,
		image{
			width: 100%;
			height: 100%;
		}
	}
	
	.nav{
		width: 100%;
		display: flex;
		justify-content: space-around;
		margin: 15rpx 0 15rpx 0;
		.nav-list{
			image{
				width: 128rpx;
				height: 128rpx;
			}
		}
	}
	
	.floor-item{
		image{
			width: 100%;
		}
		.floor-item-content{
			display: flex;
			.img-right-content{
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
			}
		}
	}
	
	.my-search-box{
		position: sticky;
		margin-bottom: 40px;
		top: 0;
		z-index: 999;
	}
</style>
