<template>
	<view class="index-page1 ">
		<hx-navbar :config="config" />

		<view class="index-scroll  has-tabbar">
		<!-- 	<view class="banner">
				<swiper class="swiper" circular autoplay style="height: 400rpx;" @change="swiperChange">
					<swiper-item :current="current" v-for="(item, index) in swiperList" :key="index">
						<view class="swiper-item">
							<view class="pic">
								<image @click="linkImg(item)" :src="item.image" class="img" mode="widthFix"></image>
	
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="swiper-active">
				<view class="item" v-for="(item,index) in swiperList.length" :key="index">
					<view class="div" :class="index==currentIndex?'active':''"></view>
				</view>
			</view> -->
			
		
		<view class="rich">
			<text>这是富文本</text>
		</view>
		
		<view class="history">
			<view class="title">
				<image src="../../../static/img/icon/index/radio.png" mode="widthFix"></image>
				<text>{{$t("app.newAdd37")}}</text>
			</view>
			<view class="list">
				<view class="item" v-for="(item,index) in nftList" :key="index">
					<view class="left">
						<image src="../../../static/img/help_icon.png" mode="widthFix"></image>
						<text>我已捐赠</text>
					</view>
					<view class="right">
						<text>500 USDT</text>
					</view>
				</view>
			</view>
		</view>
		<view class="fixed-div">
			<view class="content">
				
				<view class="right">
					<view class="btn">
						<text>{{$t("app.newAdd14")}}</text>
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
					title: this.$t("index.detail"),
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
					{url:'../../../static/img/logo.png',label:'500USDT',statusText:'**用户已完成交易',title:'白色的空开放式学校背包'},
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
		background-color: white;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

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
				background-color: white;
				// background: url("../../static/img/bg/index_bg.png") no-repeat center center / 100% 100%;
				box-sizing: border-box;
				// background-color: #FAE0AD;
				// padding-left: 5%;
				// padding-top: 20rpx;
				// display: flex;
				// justify-content: center;
				// align-items: center;
				// margin-left: 5%;
				// margin-right: -30rpx;

				.swiper {
					width: 100%;
					height: 440rpx !important;
					margin: 0 auto;
					.swiper-item {
						.pic {
							position: relative;
							image{
								// border-radius: 20rpx;
							}
							.img{
								width: 100%;
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
		.rich{
			box-sizing: border-box;
			padding: 30rpx;
			background-color: white;
		}
		.history{
			width: 100%;
			box-sizing: border-box;
			padding:  32rpx 32rpx 82rpx 32rpx;
			.title{
				display: flex;
				flex-direction: row;
				align-items: center;
				color: #3A2633;
				font-size: 14rpx;
				font-weight: 600;
				margin-bottom: 21rpx;
				image{
					width: 20rpx;
					margin-right: 14rpx;
				}
			}
			.list{
				width: 100%;
				padding-bottom: 50rpx;
				.item{
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 20rpx;
					box-sizing: border-box;
					padding: 22rpx 28rpx;
					background-color: white;
					border-radius: 20rpx;
					.left{
						display: flex;
						flex-direction: row;
						align-items: center;
						color: #3A2633;
						font-size: 24rpx;
						font-weight: 600;
						image{
							width: 60rpx;
							margin-right: 26rpx;
						}
					}
					.right{
						color: #EF8F1E;
						font-size: 24rpx;
						font-weight: 600;
					}
				}
			}
		}
		.fixed-div{
			position: fixed;
			background-color: white;
			bottom: 0rpx;
			left: 0;
			width: 100%;
			padding-bottom: 30rpx;
			padding-top:20rpx ;
			.content{
				width: 100%;
				display: flex;
				flex-direction: row;
				align-items: center;
				box-sizing: border-box;
				padding: 0 30rpx;
			}
			
			
			.right{
				width: 600rpx;
				margin: 0 auto;
				.btn{
					background: linear-gradient( 180deg, #EF8E1F 0%, #F0AC05 100%);
					font-size: 30rpx;
					color: white;
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 20rpx;
					font-weight: 600;
					box-sizing: border-box;
					padding: 34rpx 0;
					image{
						width: 35rpx;
						margin-right: 14rpx;
					}
				}
			}
		}
	}
</style>