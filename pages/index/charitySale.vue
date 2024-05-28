<template>
	<view class="index-page ">
		<hx-navbar :config="config" />

		<view class="index-scroll  has-tabbar">
			<view class="banner">
				<swiper class="swiper" circular autoplay style="height: 400rpx;" @change="swiperChange">
					<swiper-item :current="current" v-for="(item, index) in swiperList" :key="index">
						<view class="swiper-item">
							<view class="pic">
								<image  :src="imageUrl+item.image" class="img" mode="widthFix"></image>
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
			
			<view class="all_price">
				<view class="price">
					<view class="num">
						<text>$12121</text>
					</view>
					<view class="title">
						<text>{{$t("app.newAdd22")}}</text>
					</view>
				</view>
				<view class="msg">
					<view class="title">
						<text>{{$t("app.newAdd23")}}</text>
					</view>
					<view class="label">
						<text>{{$t("app.newAdd24")}}</text>
					</view>
				</view>
			</view>
			<view class="logo">
				<view class="img" @click="goPage(`/pages/index/charityProducts`)">
					<image src="../../static/img/banner/charity_sale_icon1.png" mode="widthFix"></image>
				</view>
				<view class="img">
					<image src="../../static/img/banner/charity_sale_icon2.png" mode="widthFix"></image>
				</view>
			</view>
			
			<view class="product-container1">
				<view class="header">
					<view class="tit">
					<view class="radio"></view>
					{{ $t("app.newAdd10") }}</view>
					<!-- <view class="desc">{{ $t("app.newAdd17") }}></view> -->
				</view>
			
				<view class="product-list">
					<view class="product-item" v-for="(item,index) in list" :key="index">
						<view class="product-img pic" @click="goPage(`/pages/index/charityProductDetail1?id=${item.id}`)">
							<image :src="item.main_image" mode="aspectFit" class="img">
							</image>
						</view>
						<view class="product-info">
							<view class="product-title"><text>{{item.title}}</text> </view>
							<view class="product-tit">
								<text>{{item.price}}</text>
								<text style="color: #8E8E8E;font-size: 24rpx;">{{ $t("app.newAdd20") }}{{item.stock}}</text>
							</view>
							<!-- <view class="product-price-info">
								<view class="rebate">$ {{item.statusText}}</view>
							
							</view> -->
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
		
		data() {
			return {
				swiperList:[],
				currentIndex:0,
				nftList: [],
				requestData: {
					page: 1,
					limit: 20,
				},
				list: [],
			};
		},
		computed:{
			config() {
				return {
					title: this.$t("app.newAdd10"),
					color: "#403039",
					backgroundColor: [1, ['#FCEEB7', '#FEE1AB']],
				};
			},
			imageUrl(){
				return filesUrl;
			}
		},
		mounted() {
			this.slides();
			this.getList();
		},
		onReachBottom() {
			this.requestData.page++;
			this.getList();
		},
		methods: {
			async slides() {
				let res = await $request("slides", {position:'2'});
				console.log( res.data.data.data)
				if (res.data.code === 200) {
					this.swiperList = res.data.data.data;
					return false;
				}
				uni.showToast({
					icon: "none",
					title: res.data.msg,
				});
			},
			async getList() {
				let res = await $request('charitySaleGoods', this.requestData);
				console.log(res)
				this.loading = false;
				if (res.data.code === 200) {
					this.list.push(...res.data.data.data);
				}
			},
			swiperChange(e) {
			      // e.detail.current 是当前的索引
			      this.currentIndex = e.detail.current;
			},
			
			goPage(url) {
				uni.navigateTo({
					url,
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
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 20rpx;
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

	.index-page {
		background-color: #F4F4F4;

		// background-color: red;
		.index-scroll {
			.banner {
				width: 100%;
				margin: 0 auto;
				// background: url("../../static/img/bg/index_bg.png") no-repeat center center / 100% 100%;
				box-sizing: border-box;
				// background-color: #FAE0AD;
				padding-left: 5%;
				padding-top: 20rpx;
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
		.product-container1 {
			margin-top: 16rpx;
			padding-bottom: 26rpx;
			padding-top: 37rpx;
			box-sizing: border-box;
			padding-left: 20rpx;
			padding-right: 20rpx;
			background-color: white;
			.header{
				display: flex;
				justify-content: space-between;
				align-items: center;
				background-color: white;
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
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				.product-item {
					// margin-top: 10rpx;
					// margin-right: 10rpx;
					border-radius: 20rpx;
					background-color: #fff;
					width: calc(50% - 5rpx);
					// overflow: hidden;
					display: flex;
					flex-direction: column;
					align-items: center;
					padding-top: 9rpx;
					padding-bottom: 9rpx;
					// background-color: red;
					.product-img {
						width: 324rpx;
						height: 305rpx;
						background-color: white;
						// margin-right: 27rpx;
						image {
							width: 100%;
							height: 100%;
							// height: 100rpx;
						}
					}
		
					.product-info {
						padding: 20rpx 28rpx;
						.product-title {
							// .vertical(2);
							// width:200rpx;
							// overflow: hidden;
							// text-overflow:ellipsis;
							color: #3A2633;
							font-size: 28rpx;
							font-weight: 600;
							line-height: 1.5;
							margin-bottom: 9rpx;
							width:300rpx;
							overflow: hidden;
							text-overflow:ellipsis;
							text{
								// width:200rpx;
								// overflow: hidden;
								text-overflow:ellipsis;
								white-space: nowrap;
							}
						}
						.product-tit {
							.vertical(2);
							color: #F3581D;
							font-size: 30rpx;
							font-weight: 600;
							line-height: 1.5;
							margin-bottom: 9rpx;
							display: flex;
							justify-content: space-between
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