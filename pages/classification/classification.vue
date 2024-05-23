<template>
	<view class="profix-page-container">
		<view class="tabs" :style="{ paddingTop: iStatusBarHeight + 'px' }">
			<view class="tabs-con">
				<view class="tabs-item" v-for="tab in tabs" :key="tab.val" :class="{active: tabsVal === tab.val}" @click="tabsChange(tab.val)">{{tab.text}}</view>
			</view>
		</view>
		<scroll-view :scroll-y="true" class="classification-scroll page-scroll">
			<view class="tab-pane" :class="{active: tabsVal === 0}">
				<view class="banner">
					<swiper class="swiper" circular autoplay style="height: 430rpx;" @change="swiperChange">
						<swiper-item v-for="(item, index) in swiperList" :key="index">
							<view class="swiper-item">
								<view class="pic">
									<image :src="item.image" class="img" mode="widthFix"></image>
								</view>
							</view>
						</swiper-item>
					</swiper>
					<view class="swiper-active">
						<view class="item" v-for="(item,index) in swiperList" :key="index">
							<view class="div" :class="index == currentIndex ? 'active' : ''"></view>
						</view>
					</view>
				</view>
				
				<view class="product-list">
					<view class="product-item" v-for="(item,index) in nftList" :key="index">
						<view class="product-img pic">
							<image :src="item.url" mode="widthFix" class="img"></image>
						</view>
						<view class="product-info">
							<view class="product-title">{{item.title}}</view>
							<view class="product-price">{{item.price}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="tab-pane" :class="{active: tabsVal === 1}">
				<view class="product-list">
					<view class="product-item-h" v-for="(item,index) in myProductList" :key="index">
						<view class="product-img pic">
							<image :src="item.url" mode="widthFix" class="img"></image>
						</view>
						<view class="product-info">
							<view class="product-title">{{item.title}}</view>
							<view class="time-price-btn">
								<view class="time-price">
									<view class="time">{{$t("app.shen34")}}：2024-01-01</view>
									<view class="price">500 USDT</view>
								</view>
								<view class="btn-box">{{$t("app.shen6")}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import { $request } from "@/utils/request.js";
	import productTestImg from "@/static/img/cn.png";
	
	export default {
		computed: {
		},
		data() {
			return {
				swiperList: [
					{
						image: productTestImg,
					},
					{
						image: productTestImg,
					}
				],
				currentIndex: 0,
				tabs: [
					{
						text: "交易会场",
						val: 0
					},
					{
						text: "我的拍品",
						val: 1
					}
				],
				tabsVal: 1,
				iStatusBarHeight: 0,
				
				nftList: [
					{
						url: productTestImg,
						price:'500USDT',
						title:'白色的空开放式学校背包',
					},
					{
						url: productTestImg,
						price:'500USDT',
						title:'白色的空开放式学校背包',
					},
					{
						url: productTestImg,
						price:'500USDT',
						title:'白色的空开放式学校背包',
					},
				],
				myProductList: [
					{
						url: productTestImg,
						price:'500USDT',
						title:'白色的空开放式学校背包白色的空开放式学校背包白色的空开放式学校背包白色的空开放式学校背包白色的空开放式学校背包',
						time: "2024-01-01",
					},
					{
						url: productTestImg,
						price:'500USDT',
						title:'白色的空开放式学校背包',
						time: "2024-01-01",
					},
					{
						url: productTestImg,
						price:'500USDT',
						title:'白色的空开放式学校背包',
						time: "2024-01-01",
					},
					{
						url: productTestImg,
						price:'500USDT',
						title:'白色的空开放式学校背包',
						time: "2024-01-01",
					},
					{
						url: productTestImg,
						price:'500USDT',
						title:'白色的空开放式学校背包',
						time: "2024-01-01",
					},
					{
						url: productTestImg,
						price:'500USDT',
						title:'白色的空开放式学校背包',
						time: "2024-01-01",
					},
					{
						url: productTestImg,
						price:'500USDT',
						title:'白色的空开放式学校背包',
						time: "2024-01-01",
					},
				]
			};
		},
		mounted() {
			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight;
		},
		methods: {
			swiperChange(e) {
			  // e.detail.current 是当前的索引
			  this.currentIndex = e.detail.current;
			},
			goPage(url) {
				uni.navigateTo({
					url,
				});
			},
			tabsChange(val) {
				this.tabsVal = val;
			}
		}
	}
</script>

<style lang="less">
@import "@/static/less/variable.less";

page {
	background-color: #f4f4f4;
}

.profix-page-container {
	.df();
	flex-direction: column;

	.tabs {
		padding: 25rpx;
		background-image: linear-gradient( 180deg, #FDF1B9 0%, #FADEAC 51%, #FEDC9C 100%);
		.df(center, center);
		flex-shrink: 0;
		
		.tabs-con {
			.df(center, center);
			border-radius: 20rpx;
			border: 2rpx solid #FFFFFF;
			overflow: hidden;
		
			.tabs-item {
				padding: 24rpx 58rpx;
				text-align: center;
				font-size: 26rpx;
				color: #403039;
				
				&.active {
					border-radius: 20rpx;
					background-color: #fff;
					color: #EF9419;
				}
			}
		}
	}
	
	.classification-scroll {
		padding: 0;
		flex-grow: 1;
		min-height: 10%;
		
		.tab-pane {
			display: none;
			
			&.active {
				display: block;
			}
		}
		
		.banner {
			width: 100%;
			padding: 20rpx 30rpx 28rpx;
		
			.swiper {
				border-radius: 20rpx;
				width: 100%;
			}
			
			.swiper-active{
				margin-top: 26rpx;
				width: 100%;
				.df(center, center);
				
				.div{
					width: 25rpx;
					height: 12rpx;
					background: #CCC8C7;
					border-radius: 50rpx;
					margin: 0 6rpx;
				}
				
				.active{
					width: 48rpx;
					height: 12rpx;
					background: #F96932;
					border-radius: 50rpx;
				}
			}
		}
		
		.product-list {
			padding: 30rpx 30rpx  0;
			.df(stretch, space-between);
			flex-wrap: wrap;
			width: 100%;
			
			.product-item {
				margin-bottom: 32rpx;
				border-radius: 20rpx;
				background-color: #fff;
				width: calc(50% - 15rpx);
				.df(center);
				flex-direction: column;
				
				.product-img {
					width: 100%;
				}
					
				.product-info {
					padding: 20rpx 28rpx;
					
					.product-title {
						margin-bottom: 12rpx;
						color: #3A2633;
						font-size: 28rpx;
						font-weight: 600;
						line-height: 1.5;
						.vertical(1);
					}
					.product-price {
						color: #F3581D;
						font-size: 30rpx;
						font-weight: 600;
						line-height: 1.5;
					}
				}
			}
			
			.product-item-h {
				.df(center);
				
				margin-bottom: 20rpx;
				border-radius: 20rpx;
				padding: 24rpx 22rpx;
				background-color: #fff;
				width: 100%;
				
				.product-img {
					width: 144rpx;
					height: 144rpx;
					flex-shrink: 0;
				}
				
				.product-info {
					padding-left: 20rpx;
					flex-grow: 1;
					min-width: 10%;
					
					.product-title {
						margin-bottom: 20rpx;
						color: #3A2633;
						font-size: 24rpx;
						line-height: 1.5;
						font-weight: bold;
						.vertical(2);
					}
					
					.time-price-btn {
						.df(center, space-between);
						
						.time-price {
							padding-right: 10rpx;
							flex-grow: 1;
							min-width: 10%;
							
							.time {
								margin-bottom: 2rpx;
								color: #9EA19D;
								font-size: 24rpx;
								line-height: 1.375;
							}
							
							.price {
								color: #F3581D;
								font-size: 26rpx;
								line-height: 1.4;
							}
						}
						
						.btn-box {
							border-radius: 50px;
							padding: 16rpx 46rpx;
							background-color: #F0931B;
							color: #fff;
							line-height: 1.4;
							font-size: 26rpx;
							flex-shrink: 0;
						}
					}
				}
			}
		}
	}
}
</style>