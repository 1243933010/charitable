<template>
	<view class="index-page1 ">
		<hx-navbar :config="config" />

		<view class="index-scroll  has-tabbar">
			<view class="product-container">
				<view class="product-list">
					<view class="product-item" v-for="(item,index) in nftList" :key="index" @click="goUrl">
						<view class="product-img pic">
							<image :src="item.url" mode="aspectFit" class="img" @click="goProductDetail(item)">
							</image>
						</view>
						<view class="product-info">
							<view class="product-title">{{item.title}}</view>
							<!-- <view class="product-tit">{{item.label}}</view> -->
							<view class="product-price-info">
								<view class="rebate">
									<text style="margin-right:27rpx;color: #F45C23;">{{item.statusText}}</text>
									<!-- <text style="">{{item.statusText}}</text> -->
								</view>
			
							</view>
						</view>
					</view>
			
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import hxNavbar from "@/components/hx-navbar.vue";
	import {
		$request
	} from "@/utils/request.js";
	export default {
		components: {
			hxNavbar,
		},
		computed: {
			config() {
				return {
					title: this.$t("app.newAdd36"),
					color: "#403039",
					backgroundColor: [1, ['#FCEEB7', '#FEE1AB']],
				};
			},
		},
		data() {
			return {
				swiperList:[],
				currentIndex:0,
				nftList: [
					{url:'../../../static/img/logo.png',label:'500USDT',statusText:'**用户已完成交易',title:'白色的空开放式学校背包白色的空开放式学校背包白色的空开放式学校背包白色的空开放式学校背包白色的空开放式学校背包'},
					{url:'../../../static/img/logo.png',label:'500USDT',statusText:'**用户已完成交易',title:'白色的空开放式学校背包'},
					{url:'../../../static/img/logo.png',label:'500USDT',statusText:'**用户已完成交易',title:'白色的空开放式学校背包'},
					{url:'../../../static/img/logo.png',label:'500USDT',statusText:'**用户已完成交易',title:'白色的空开放式学校背包'},
				],
			};
		},
		mounted() {
			this.adverts();
		},
		methods: {
			goUrl(){
				uni.navigateTo({
					url:'/pages/index/detail/passingLoveDetailDetail'
				})
			},
			swiperChange(e) {
			      // e.detail.current 是当前的索引
			      this.currentIndex = e.detail.current;
			},
			async adverts() {
				let res = await $request("adverts", {});
				// console.log(res)
				if (res.data.code === 0) {
					this.swiperList = res.data.data;
					return false;
				}
				uni.showToast({
					icon: "none",
					title: res.data.msg,
				});
			},
		}
	}
</script>

<style lang="less" scoped>
	@import "../../../static/less/variable.less";

	page {
		background-color: #F5F5F5;
	}
	


	.index-page1 {
		background-color: #F4F4F4;

		.product-container,
		.product-container3 {
			padding-top: 20rpx;
			padding-bottom: 26rpx;
			box-sizing: border-box;
			padding-left: 20rpx;
			padding-right: 20rpx;
			// background-color: white;
			.header {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		
			.tit {
				margin-bottom: 8rpx;
				color: @bodyColor;
				font-size: @bodySize;
				font-weight: 600;
				display: flex;
				flex-direction: row;
				align-items: center;
			}
		
			.desc {
				margin-bottom: 28rpx;
				color: #777680;
				font-size: @descSize;
			}
		
			.product-list {
				// .df(stretch, flex-start);
				width: 100%;
		
				.product-item {
					margin-top: 10rpx;
					margin-right: 10rpx;
					border-radius: 20rpx;
					background-color: #fff;
					margin-bottom: 16rpx;
					width: 100%;
					// overflow: hidden;
					display: flex;
					flex-direction: row;
					align-items: center;
					box-sizing: border-box;
					padding-top: 9rpx;
					padding-bottom: 9rpx;
		
					.product-img {
						width: 144rpx;
						height: 144rpx;
						background-color: white;
						margin-right: 27rpx;
		
						image {
							width: 100%;
							height: 100%;
							// height: 100rpx;
						}
					}
		
					.product-info {
						padding: 20rpx 28rpx;
						box-sizing: border-box;
						width: calc(100% - 144rpx);
						height: 164rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
		
						.product-title {
							.vertical(2);
							color: #3A2633;
							font-size: 24rpx;
							font-weight: 600;
							line-height: 1.5;
							margin-bottom: 9rpx;
						}
		
						.product-tit {
							.vertical(2);
							color: #F3581D;
							font-size: 26rpx;
							font-weight: 600;
							line-height: 1.5;
							margin-bottom: 9rpx;
		
						}
		
						.product-price-info {
							// .df(center, space-between);
							display: flex;
							flex-direction: row;
							.rebate {
								color: #9EA19D;
								font-size: 24rpx;
								display: flex;
								flex-direction: row;
								align-items: center;
								// font-weight: bold;
							}
		
							.brfore-rebate {
								color: #777680;
								font-size: 30rpx;
								text-decoration: line-through;
							}
						}
					}
		
					&:nth-child(2n) {
						margin-right: 0;
					}
				}
			}
		}
	}
</style>