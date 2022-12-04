<template>
  <view>
    <view class="scroll-view-container">
		<!-- 左侧一级菜单 -->
    	<scroll-view class="scroll-left-box" scroll-y :style="{height: wh + 'px'}">
    		<view v-for="(item,index) in cateList" :key="item.cat_id"
			 :class="['scroll-left-item',index === active ? 'active' : '']" @click="changeActive(index)">{{ item.cat_name }}</view>
    	</scroll-view>
		<!-- 右侧二三级菜单 -->
		<scroll-view class="scroll-right-box" scroll-y :style="{height: wh + 'px'}" :scroll-top="scrollTop">
			<view v-for="item in cateLevel2" :key="item.cat_id" class="cate-level2">
				<!-- 二级菜单 -->
				<view class="cate-level2-title">/ {{ item.cat_name }} /</view>
				<!-- 当前二级分类的三级菜单 -->
					<view class="cate-level3">
						<view v-for="item3 in item.children" :key="item3.cat_id"  class="cate-level3-item" @click="gotoGoodList(item3.cat_id)">
							<image :src="item3.cat_icon" mode="widthFix"></image>
							<text>{{ item3.cat_name }}</text>
						</view>
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
        // 手机的可用高度
				wh:0,
				// 左侧一级菜单数据
				cateList:[],
				// 激活项
				active:0,
				// 右侧二级菜单
				cateLevel2:[],
				// 修复右侧菜单切换 滚动条不变的bug
				scrollTop:0
      };
    },
	methods:{
		async getCateList(){
			const {data:res}=await uni.$http.get('/api/public/v1/categories')
			if(res.meta.status!==200) return uni.$showToast()
			this.cateList=res.message
			// 首次获取时为二级菜单赋值为第一个一级菜单的children节点
			this.cateLevel2=res.message[0].children
		},
		changeActive(index){
			this.active=index
			// 在切换一级菜单时 调整二级菜单的内容
			this.cateLevel2=this.cateList[index].children
			// 每次切换左侧菜单 重置scrollTop
			this.scrollTop=this.scrollTop===0?1:0
		},
		gotoGoodList(id){
			uni.navigateTo({
				url: '../../subpackages/goods_list/goods_list?cat_id='+id
			})
		}
	},
	onLoad(){
		const info=uni.getSystemInfoSync()
		this.wh=info.windowHeight
		this.getCateList()
		}
  }
</script>

<style lang="scss">
	.scroll-view-container{
		display: flex;
		.scroll-left-box{
			width: 120px;
			.scroll-left-item{
				background-color: #F7F7F7;
				text-align: center;
				line-height: 120rpx;
				font-siz: 24rpx;
				&.active{
					background-color: #fff;
					position: relative;
					&::before{
						content: '';
						display: block;
						width: 6rpx;
						height: 60rpx;
						background-color: #C00000;
						position: absolute;
						top: 50%;
						transform: translateY(-50%);
					}
				}
			}
		}
		.scroll-right-box{
			background-color: #fff;
		}
		.cate-level2-title{
			width: 100%;
			height: 120rpx;
			text-align: center;
			line-height: 120rpx;
			font-weight: 700;
		}
		.cate-level3{
			display: flex;
			flex-wrap: wrap;
			.cate-level3-item {
				display: flex;
				width: 33.33%;				flex-direction: column;
				justify-content: center;
				align-items: center;
				margin-bottom: 30rpx;
				image{
					width: 150rpx;
				}
			}
			
		}
	}
</style>
