<template>
	<view class="goods-list-container">
		<view v-for="goods in goodsList" :key="goods.goods_id" @click="gotoDetail(goods.goods_id)">
			<myGoods :goods="goods"></myGoods>
		</view>
	</view>
</template>

<script>
	import myGoods from '../../components/my-goods-item/my-goods-item.vue'
	export default {
		components:{
			myGoods
		},
		data() {
			return {
				queryInfo:{
					query:'',
					cid:'',
					pagenum:1,
					pagesize:10,
				},
				goodsList:[],
				total:0,
				isLoading:false
			}
		},
		methods: {
			async getGoodsList(flag){
				const {data:res}=await uni.$http.get('/api/public/v1/goods/search',this.queryInfo)
				if(res.meta.status!==200) return uni.$showToast()
				flag ? this.goodsList=[...res.message.goods,...this.goodsList] : this.goodsList=[...this.goodsList,...res.message.goods]
				this.total=res.message.total
				this.isLoading=false
				flag ? uni.stopPullDownRefresh() : ''
			},
			gotoDetail(id){
				uni.navigateTo({
					url: '/subpackages/goods_detail/goods_detail?goods_id=' + id
				})
			}
		},
		onLoad(options) {
			this.queryInfo.query=options.query || ''
			this.queryInfo.cid=options.cat_id || ''
			this.getGoodsList()
		},
		onReachBottom(){
			if(this.queryInfo.pagenum*this.queryInfo.pagesize>=this.total) return uni.$showToast('没有更多商品啦')
			if(this.isLoading) return
			this.isLoading=true
			this.queryInfo.pagenum++
			this.getGoodsList()
		},
		onPullDownRefresh(){
			if(this.queryInfo.pagenum*this.queryInfo.pagesize>=this.total) return uni.$showToast('没有更多商品啦')
			if(this.isLoading) return
			this.isLoading=true
			this.queryInfo.pagenum++
			this.getGoodsList(true)
		}
	}
</script>

<style lang="scss">
	
</style>
