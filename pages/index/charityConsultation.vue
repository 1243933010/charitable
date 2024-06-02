<template>
	<view class="index-page1 ">
		<hx-navbar :config="config" />

		<view class="index-scroll  has-tabbar">
			<view class="banner">
				<swiper class="swiper" circular autoplay style="height: 400rpx;" @change="swiperChange">
					<swiper-item :current="current" v-for="(item, index) in swiperList" :key="index">
						<view class="swiper-item">
							<view class="pic">
								<image @click="linkImg(item)" :src="item.image" class="img" mode="widthFix"></image>
								<!-- <view class="text-box">
									<view class="title">
										<text>星星点灯，照亮梦乡</text>
									</view>
									<view class="label">
										<text>希望计划让留守山区的孩子找寻回家的希望，照亮梦乡让留守山区</text>
									</view>
								</view> -->
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="swiper-active">
				<view class="item" v-for="(item,index) in swiperList.length" :key="index">
					<view class="div" :class="index==currentIndex?'active':''"></view>
				</view>
			</view>
			
		
		
			
			<view class="product-container">
			
			
				<view class="product-list">
					<view class="product-item" v-for="(item,index) in list" @click="goUrl(item)" :key="index">
						<view class="product-img pic">
							<image :src="item.url" mode="aspectFit" class="img" @click="goProductDetail(item)">
							</image>
						</view>
						<view class="product-info">
							<view class="product-title">{{item.title}}</view>
							<!-- <view class="product-tit">{{item.label}}</view> -->
							<view class="product-price-info">
								<view class="rebate">
									<text style="margin-right:27rpx;">{{item.statusText}}</text>
									<text style="">{{item.statusText}}</text>
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
		$request,filesUrl
	} from "@/utils/request.js";
	export default {
		components: {
			hxNavbar,
		},
		computed: {
			config() {
				return {
					title: this.$t("app.newAdd12"),
					color: "#403039",
					backgroundColor: [1, ['#FCEEB7', '#FEE1AB']],
				};
			},
			imageUrl() {
				return filesUrl;
			}
		},
		data() {
			return {
				swiperList:[],
				currentIndex:0,
				requestData: {
					page: 1,
					limit: 20,
					identifier: 'charity',
					category_id: ''
				},
				list: [],
			};
		},
		mounted() {
			// this.adverts();
			this.getList();
		},
		onReachBottom() {
			this.requestData.page++;
			this.getList();
		},
		methods: {
			async getList() {
				let res = await $request('articles', this.requestData);
				console.log(res)
				this.loading = false;
				if (res.data.code === 200) {
					this.list.push(...res.data.data.data);
					console.log(this.nftList)
				}
			},
			swiperChange(e) {
			      // e.detail.current 是当前的索引
			      this.currentIndex = e.detail.current;
			},
			goUrl(item){
				uni.navigateTo({
					url:`/pages/index/detail/charityConsultationDetail?id=${item.id}`
				})
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

<style lang="less">
	@import "../../static/less/variable.less";

	page {
		background-color: #F4F4F4;
	}
	
	.radio {
		width: 19rpx;
		height: 19rpx;
		background: linear-gradient(180deg, #EC4202 0%, #FE7B4A 100%);
		border-radius: 50%;
		margin-right: 14rpx;
	}

	.swiper-active {
		// background-color: #FAE0AD;
		background-color: #F4F4F4;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-bottom: 20rpx;
		.div {
			width: 25rpx;
			height: 12rpx;
			background: #CCC8C7;
			border-radius: 50rpx 50rpx 50rpx 50rpx;
			margin: 0 6.5rpx;
		}

		.active {
			width: 47rpx;
			height: 12rpx;
			background: #F96932;
			border-radius: 50rpx 50rpx 50rpx 50rpx;
		}
	}

	.index-page1 {
		background-color: #F4F4F4;

		// background-color: red;
		.index-scroll {
			.banner {
				width: 100%;
				margin: 0 auto;
				// background: url("../../static/img/bg/index_bg.png") no-repeat center center / 100% 100%;
				box-sizing: border-box;
				background-color: #F4F4F4 !important;
				padding-left: 5%;
				padding-top: 20rpx;
				padding-bottom: 20rpx;
				// display: flex;
				// justify-content: center;
				// align-items: center;
				// margin-left: 5%;
				// margin-right: -30rpx;

				.swiper {
					width: calc(100% - 37rpx);
					height: 380rpx !important;
					margin: 0 auto;
					.swiper-item {
						.pic {
							position: relative;
							max-height: 400rpx;
							image{
								border-radius: 20rpx;
							}
							.text-box {
								width: 100%;
								position: absolute;
								bottom: 10rpx;
								left: 0;
								background-color: rgba(255, 255, 255, 0.2);
								border-top-right-radius: 10rpx;
								border-top-left-radius: 10rpx;
								box-sizing: border-box;
								padding: 12rpx 0 11rpx 21rpx;
								backdrop-filter: blur(5px);

								.title {
									color: #FFFFFF;
									font-size: 32rpx;
									font-weight: 600;
									line-height: 1.5;
									margin-bottom: 5rpx;
								}

								.label {
									color: #FFFFFF;
									font-size: 24rpx;
									line-height: 1.5;
									max-width: 500rpx;
									overflow: hidden;
									text-overflow: ellipsis;

									text {
										white-space: nowrap;
									}
								}
							}
						}
					}
				}
			}
		}
		.all_price{
			width: calc(100% - 37rpx);
			margin: 0 auto;
			box-sizing: border-box;
			padding: 13rpx 0;
			height: 195rpx;
			background-color: #FFF5E5;
			border-radius: 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			.price{
				height: 100%;
				width: 40%;
				border-right: 1px solid #D9C89E;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				box-sizing: border-box;
				padding: 10rpx 0;
				.num{
					color: #F96932;
					font-size: 36rpx;
					font-weight: 600;
					line-height: 1.5;
					margin-bottom: 10rpx;
				}
				.title{
					font-size: 28rpx;
					font-weight: 600;
				}
			}
			.msg{
				height: 100%;
				display: flex;
				flex-direction: column;
				// justify-content: space-around;
				box-sizing: border-box;
				padding: 20rpx 30rpx 0 30rpx;
				.title{
					color: #827452;
					font-size: 24rpx;
					font-weight: 600;
					line-height: 1.5;
					margin-bottom: 6rpx;
					
				}
				.label{
					color: #827452;
					font-size: 22rpx;
				}
			}
		}
	    .logo{
			padding-top: 20rpx;
			width: calc(100% - 37rpx);
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.img{
				width: 330rpx;
				height: 160rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
		.product-container,.product-container3 {
			padding-top: 20rpx;
			padding-bottom: 26rpx;
			box-sizing: border-box;
			padding-left: 20rpx;
			padding-right: 20rpx;
			.header{
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
						width:calc(100% - 144rpx);
						height:144rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						.product-title {
							.vertical(2);
							color: #3A2633;
							font-size: 24rpx;
							font-weight: 600;
							// line-height: 1.5;
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
							.df(center, space-between);
		
							.rebate {
								color: #9EA19D;
								font-size: 24rpx;
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