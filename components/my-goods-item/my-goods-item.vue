<template>
	<view class="goods-item">
		<view class="goods-pic">
			<radio :checked="goods.goods_state" v-if="showRadio" @click="stateChange" class="check" style="zoom: 80%;" color="#ff9f43"></radio>
			<image :src="goods.goods_small_logo || 'http://rmf8g6uw4.bkt.clouddn.com/default.png'"></image>
		</view>
		<view class="goods-item-info">
			<view class="goods-name">{{ goods.goods_name }}</view>
			<view class="goods-price">
				<text class="number">￥{{ goods.goods_price | tofixed }}</text>
				<cl-input-number v-if="showRadio&&!edit" v-model="goods.goods_count" @change="numChange" :min="1" :max="99" input :width="80"></cl-input-number>
			</view>
			<view class="edit" @click="removeCartGoods(goods.goods_id)" v-if="edit&&showRadio">
				<cl-icon name="cl-icon-minus-border" :size="30" color="#fff"></cl-icon>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapMutations } from 'vuex'
	export default {
		props:{
			goods:{
				type: Object,
				default: {}
			},
			// 是否展示勾选
			showRadio:{
				type: Boolean,
				default: false
			},
			edit:{
				type:Boolean,
				default:false
			}
		},
		filters:{
			tofixed(num){
				return Number(num).toFixed(2)
			}
		},
		data() {
			return {
				
			}
		},
		methods:{
			...mapMutations('m_cart',['removeGoodsById']),
			stateChange(){
				this.$emit('stateChange',{
					goods_id:this.goods.goods_id,
					goods_state:!this.goods.goods_state
				})
			},
			numChange(){
				if(!parseInt(this.goods.goods_count)) this.goods.goods_count = 1
				this.$emit('numChange',{
					goods_id:this.goods.goods_id,
					goods_count:this.goods.goods_count
				})
			},
			removeCartGoods(id){
				this.removeGoodsById(id)
			}
		}
	}
</script>

<style lang="scss">
	.goods-item{
		  position: relative;
			display: flex;
			background-color: #fff;
			border-radius: 20rpx;
			overflow: hidden;
			justify-content: space-around;
			margin-bottom: 20rpx;
			.goods-pic{
				display: flex;
				align-items: center;
				padding-left: 10rpx;
				image{
					width: 180rpx;
					height: 180rpx;
					border-radius: 20rpx;
				}
			}
			.goods-item-info{
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				margin-left: 30rpx;
				flex:1;
				font-size: 28rpx;
				.goods-price {
					width: 100%;
					display: flex;
					justify-content: space-between;
					.number{
						color: #FF0000;
						font-size: 36rpx;
					}
				}
			}
			cl-input-number{
				margin-right: 20rpx;
			}
			.edit{
				position: absolute;
				display: flex;
				justify-content: center;
				align-items: center;
				top: 0;
				right: 0;
				height: 100%;
				width: 100rpx;
				background-image: linear-gradient(to right,rgba(255,255,255,.9),#fff);
				cl-icon{
					border-radius: 50%;
					background-color: red;
					text{
						display: block;
						height: 100%;
						width: 100%;
					}
				}
			}
		}
</style>
