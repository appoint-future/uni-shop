<template>
	<view v-if="wh" class="search-container noScrolling">
		<!-- 搜索框区域 -->
		<view class="search-box">
			<image src="http://rmf8g6uw4.bkt.clouddn.com/search.png" class="icon-saerch"></image>
			<input focus @blur="blur" type="text" placeholder="请输入搜索的内容" v-model="searchInfo" @input="input"/>
		</view>
		<!-- 搜索列表建议 -->
		<view class="list-container">
			<scroll-view scroll-y :style="{'height': wh + 'px'}" :show-scrollbar="false" :enhanced="true">
				<!-- 搜索列表 -->
				<view v-if="searchList.length!==0" class="search-list">
					<view v-for="item in searchList" :key="item.goods_id" @click="gotoDetail(item.goods_id)" class="search-list-item">
						<image src="http://rmf8g6uw4.bkt.clouddn.com/search.png"></image>
						<text>{{ item.goods_name }}</text>
					</view>
				</view>
				<!-- 搜索历史 -->
				<view v-else class="history-list">
					<view class="history-title">
						<text>搜索历史</text>
						<image src="http://rmf8g6uw4.bkt.clouddn.com/delete.png" @click="clean"></image>
					</view>
					<view class="history-list-item">
						<text v-for="(item,index) in histories" :key="index" @click="gotoGoodsList(item)">{{ item }}</text>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 输入框的数据
				searchInfo:'',
				// 防抖处理
				time: null,
				// 搜索建议列表
				searchList:[],
				wh:0,
				// 搜索历史
				historyList:[]
			};
		},
		methods: {
			input() {
				clearTimeout(this.time)
				this.time=setTimeout(()=>{
					this.getSearchList()
				},30)
			},
			blur(){
				this.searchInfo=this.searchInfo.trim()
			},
			async getSearchList(){
				if(this.searchInfo.trim().length!==0){
					const {data:res}=await uni.$http.get('/api/public/v1/goods/qsearch?query='+this.searchInfo.trim())
					if(res.meta.status!==200) return uni.$showToast()
					this.searchList=res.message
				} else this.searchList=[]
			},
			gotoDetail(id){
				uni.navigateTo({
					url: '/subpackages/goods_detail/goods_detail?goods_id='+id,
				})
				this.saveHistoryList()
			},
			saveHistoryList(){
				// this.historyList.push(this.searchInfo)
				const set=new Set(this.historyList)
				set.delete(this.searchInfo)
				set.add(this.searchInfo)
				this.historyList=Array.from(set)
				// 保存到本地
				uni.setStorageSync('historySearch',JSON.stringify(this.historyList))
			},
			clean(){
				this.historyList=[]
				uni.clearStorageSync()
			},
			gotoGoodsList(keyword){
				uni.navigateTo({
					url: '/subpackages/goods_list/goods_list?query='+keyword
				})
			}
		},
		computed:{
			histories(){
				return [...this.historyList].reverse()
			}
		},
		onLoad(){
			this.wh=uni.getSystemInfoSync().windowHeight
			// 拿取历史搜索数据
			this.historyList=JSON.parse(uni.getStorageSync('historySearch') || '[]')
		}
	}
</script>

<style lang="scss">
	.noScrolling  {
	  overflow: hidden;
	  height: 100vh;
		background-color: #fff;
	}

	.search-box{
		position: sticky;
		top: 0;
		height: 80rpx;
		width: 100%;
		background-color: #FFD524;
		input {
			width: 80%;
			height: 66rpx;
			border-radius: 33rpx;
			background-color: #fff;
			margin: auto;
			padding-left: 80rpx;
		}
		&::before{
			content: '';
			display: block;
			position: absolute;
			bottom: -50%;
			left: 0;
			background-color: #FFD524;
			width: 40rpx;
			height: 40rpx;
		}
		&::after{
			content: '';
			display: block;
			position: absolute;
			bottom: -50%;
			right: 0;
			background-color: #FFD524;
			width: 40rpx;
			height: 40rpx;
		}
	}
	
	.list-container{
		border-radius: 35rpx 35rpx 0 0;
		overflow: hidden;
	}
	
	.search-list{
		width: 100%;
		background-color: #fff;
	}
	.icon-saerch{
		position: absolute;
		top: 50%;
		left: 8%;
		transform: translateY(-70%);
		width: 34rpx;
		height: 34rpx;
		z-index: 999;
	}
	
	.search-list-item{
		position: relative;
		width: 95%;
		height: 90rpx;
		border-bottom: 1px solid #ccc;
		margin: 0 auto;
		image{
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			width: 34rpx;
			height: 34rpx;
		}
		text{
			margin-left: 50rpx;
			line-height: 90rpx;
			display: inline-block;
			white-space: nowrap; 
			width: 90%; 
			overflow: hidden;
			text-overflow:ellipsis;
		}
	}
	
	.history-list{
		box-sizing: border-box;
		padding: 30rpx;
		height: 100%;
		background-color: #fff;
		border-radius: 35rpx 35rpx 0 0;
		.history-title{
			display: flex;
			padding-bottom:15rpx;
			justify-content: space-between;
			border-bottom: 1px solid #ccc;
			width: 100%;
			image{
				width: 38rpx;
				height: 38rpx;
			}
		}
		.history-list-item{
			margin-top: 20rpx;
			display: flex;
			flex-wrap: wrap;
			text{
				height: 40rpx;
				padding: 6rpx 10rpx;
				background-color: #efefef;
				border-radius: 23rpx;
				text-align: center;
				line-height: 40rpx;
				margin: 0 20rpx 20rpx 0;
				font-size: 26rpx;
			}
		}
	}
</style>
