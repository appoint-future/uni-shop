<template>
	<view class="my-search-container" :style="{'backgroundColor':backgroundColor}" @click="searchHandler">
		<view class="my-search-box" :style="{'border-radius':borderRadius +'rpx'}">
			<image src="http://rmf8g6uw4.bkt.clouddn.com/search.png" mode=""></image>
			<text>搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		// 实现组件自定制
		props: {
			backgroundColor: {
				type: String,
				default: '#FFD524'
			},
			borderRadius: {
				type: Number,
				default: 33 // rpx
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			searchHandler() {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
	.my-search-container{
		position: fixed;
		// background-color: #FFD524;
		height: 40px;
		width: 100%;
		top: 0;
		.my-search-box{
			position: relative;
			width: 90%;
			height: 66rpx;
			background-color: #fff;
			// border-radius: 33rpx;
			margin: auto;
			text-align: center;
			line-height: 66rpx;
			font-size: 28rpx;
			image{
				position: absolute;
				top: 50%;
				left: 5%;
				transform: translateY(-50%);
				width: 34rpx;
				height: 34rpx;
			}
		}
	}
</style>
