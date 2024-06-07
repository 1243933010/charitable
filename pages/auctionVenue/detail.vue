<template>
	<view>
		<hx-navbar :config="config" />

		<view class="index-page1  has-tabbar">
			<view class="banner">
				<swiper class="swiper" :autoPlay="false" circular autoplay style="height: 400rpx;"
					@change="swiperChange">
					<swiper-item :current="current" v-for="(item, index) in detailInfo.images" :key="index">
						<view class="swiper-item">
							<view class="pic">
								<image @click=" linkImg(item)" :src="imageUrl+item" class="img" mode="aspectFill"></image>

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

			<view class="box-contain">
				<view class="status-box" v-if="detailInfo.status==0">
					<view class="text">
						<text>{{$t("app.newAdd44")}}：{{detailInfo.status_desc}}</text>
					</view>
					<view class="time">
						<text> {{detailInfo.auction_start_time}} {{$t("app.newAdd46")}}</text>
					</view>
				</view>
				<view class="status-box" v-if="[1,2].includes(detailInfo.status)"
					:style="{'background':detailInfo.status==1?' #F96932':'#6A5F4D'}">
					<view class="text" style="color: white;">
						<text>{{$t("app.newAdd44")}}：{{detailInfo.status_desc}}</text>
					</view>
					<view class="time">
						<image style="width: 28rpx;margin-right: 10rpx;" src="../../static/img/icon/tile_icon.png"
							mode="widthFix"></image>
						<text> {{detailInfo.auction_end_time}} {{$t("app.newAdd55")}}</text>
					</view>
				</view>

				<view class="status-box1" v-if="[3,4].includes(detailInfo.status)">
					<view class="header">
						<view class="text" style="color: #55452B;">
							<text>{{$t("app.newAdd44")}}：：{{detailInfo.status_desc}}</text>
						</view>
						<view class="time" style="color: #55452B;">
							<!-- <image style="width: 28rpx;margin-right: 10rpx;" src="../../static/img/icon/tile_icon.png" mode="widthFix"></image> -->
							<text v-if="[3].includes(detailInfo.status)">{{detailInfo.termination_time}} {{$t("app.newAdd57")}}</text>
							<text v-if="[4].includes(detailInfo.status)"> {{detailInfo.withdrawal_time}} {{$t("app.newAdd58")}}</text>
						</view>
					</view>
					<view class="label">
						<text>{{detailInfo.withdrawal_reason}}</text>
					</view>
				</view>
				<view class="goods">
					<view class="goods-title">
						<text>{{detailInfo.title}}</text>
					</view>
					<view class="goods-label">
						<view class="item">
							<text>{{$t("app.newAdd45")}} <text class="num">{{detailInfo.price||0}}</text></text>
						</view>
						<view class="item right">
							<text>{{$t("app.newAdd50")}}：{{detailInfo.auction_start_time}}</text>
						</view>
						<view class="item">
							<text>{{$t("app.newAdd51")}}：{{detailInfo.bid_increment||0}}</text>
						</view>
						<view class="item right">
							<text>{{detailInfo.auction_end_time}} </text>
						</view>
					</view>
					<view class="product-container" v-if="[1,2].includes(detailInfo.status)">
						<view class="header">
							<view class="tit">
								<view class="radio"></view>
								{{ $t("app.newAdd56") }}({{historyList.length}})

							</view>
							<!-- <view class="desc">{{ $t("app.newAdd17") }}></view> -->
						</view>

						<view class="product-list">
							<view class="product-item" v-for="(item,index) in historyList" :key="index">
								<view class="product-img pic">
									<image src="../../static/img/icon/p_icon1.png" mode="aspectFit" class="img"
										@click="goProductDetail(item)">
									</image>
								</view>
								<view class="product-info">
									<view class="product-title">{{item.nickname}}</view>
									<view class="product-title1">{{item.pay_time}}</view>
									<view class="product-title2">${{item.order_money}}</view>
									<!-- <view class="product-tit">{{item.label}}</view> -->
									<!-- <view class="product-price-info">
										<view class="rebate">
											<text style="margin-right:27rpx;">{{item.statusText}}</text>
											<text style="">{{item.statusText}}</text>
										</view>
									
									</view> -->
								</view>
							</view>

						</view>
					</view>

					<view class="goods-tip">
						<view class="goods-tip-title">
							<text>{{$t("app.newAdd52")}}：</text>
						</view>
						<view class="goods-tip-label">
							<text>{{detailInfo.bid_requirements}}</text>
						</view>
					</view>
					<view class="goods-detail">
						<view class="goods-detail-title">
							<text>{{$t("productDetail.pageTit")}}</text>
						</view>
						<view class="goods-detail-rich" v-if="detailInfo.detail">
							<rich-text style="width: 750rpx;" :nodes="detailInfo.detail"></rich-text>
						</view>
					</view>
					<view class="goods-price" v-if="detailInfo.status==0">
						<text style="margin-right: 10rpx;">{{$t("app.newAdd53")}}:{{detailInfo.price}} </text>
						<text> {{detailInfo.auction_start_time}}{{$t("app.newAdd46")}}</text>
					</view>
					<view class="goods-price" v-if="[1,2,3,4].includes(detailInfo.status)" style="color:#F96932 ;">
						<text style="margin-right: 10rpx;">{{$t("app.newAdd53")}}:{{detailInfo.price}}</text>
						<text> {{detailInfo.auction_start_time}}{{$t("app.newAdd46")}}</text>
					</view>
					<view class="goods-btn goods-btn2" v-if="[0,2,3,4].includes(detailInfo.status)">
						<text>{{$t("app.newAdd54")}}</text>
					</view>
					<view class="goods-btn goods-btn1" v-if="detailInfo.status==1" @click="openDialog">
						<text>{{$t("app.newAdd54")}}</text>
					</view>
				</view>
			</view>
		</view>

		<uni-popup ref="popup" type="bottom" style="width: 100%;">
			<view class="popup-container">
				<view class="header">
					<view class="title"></view>
					<view class="close">
						<image @click="$refs.popup.close()" src="../../static/img/close_small_icon.png" mode="widthFix">
						</image>
					</view>
				</view>
				<view class="form">
					<view class="price">
						<view class="title">
							<text>{{$t("app.newAdd53")}}</text>
						</view>
						<view class="tip">
							<text>$ {{detailInfo.current_price}}</text>
						</view>

						<view class="input">
							<input v-model="price" :placeholder="$t('app.newAdd39')" type="text" />
						</view>
						<view class="label">

							<text>{{$t("app.newAdd59")}}</text>
						</view>
					</view>

				</view>
				<view class="btn-div">
					<view class="btn" @click="userParticipateAuction">
						<text>{{$t("app.newAdd54")}}（{{$t("app.newAdd60")}} : <text><uni-countdown :hisBk="false" :show-day="false" :hour="12" :minute="12" :second="12"></uni-countdown></text> ）</text>
					</view>
				</view>
			</view>
		</uni-popup>
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
					title: this.$t("index.detail"),
					color: "#403039",
					backgroundColor: [1, ['#FCEEB7', '#FEE1AB']],
					// back: false
				};
			},
			imageUrl() {
				return filesUrl;
			},
		},
		data() {
			return {
				detailInfo:{},
				historyList:[],
				// 0-即将开始 1-竞拍中 2-已结束 3-已终止 4-已撤回
				swiperList: [],
				currentIndex: 0,
				index: 0,
				price:'',
				onLoadParams:{}
			}
		},
		onLoad(e) {
			// e = {id:2}
			this.onLoadParams = e;
			this.getDetail(e.id);
		},
		onReachBottom(){
			
		},
		methods: {
			async userParticipateAuction(id) {
				let res = await $request("userParticipateAuction", {id:this.onLoadParams.id,price:this.price});
				// console.log(res)
				uni.showToast({
					icon: "none",
					title: res.data.message,
				});
				if (res.data.code == 200) {
					this.$refs.popup.close();
					this.getDetail(this.onLoadParams.id);
					return false;
				}
				
			},
			openDialog() {
				this.$refs.popup.open("bottom");
			},
			goUrl(item) {

			},
			swiperChange(e) {
				// e.detail.current 是当前的索引
				this.currentIndex = e.detail.current;
			},
			async getDetail(id) {
				let res = await $request("auctionsDetail", {id});
				// console.log(res)
				if (res.data.code == 200) {
					// 0-即将开始 1-竞拍中 2-已结束 3-已终止 4-已撤回 
					// res.data.data.status=1;
					console.log(res.data.data)
					this.detailInfo = res.data.data;
					this.getHistory(id)
					return false;
				}
				uni.showToast({
					icon: "none",
					title: res.data.message,
				});
			},
			async getHistory(id) {
				let res = await $request("auctionsRecords", {id});
				// console.log(res)
				if (res.data.code == 200) {
					this.historyList = res.data.data.data;
					
					return false;
				}
				uni.showToast({
					icon: "none",
					title: res.data.message,
				});
			},
		}
	}
</script>

<style lang="less" scoped>
	@import "../../static/less/variable.less";

	page {
		background-color: white;
	}
	img{
		max-width:750rpx !important;
	}

	.popup-container {
		width: 750rpx;
		background-color: #FFFFFF;
		// background-color: red;
		box-sizing: border-box;
		padding: 42rpx 0rpx 0rpx 0rpx;
		border-top-right-radius: 40rpx;
		border-top-left-radius: 40rpx;

		.header {

			display: flex;
			justify-content: space-between;
			align-items: center;
			// margin-bottom: 47rpx;
			box-sizing: border-box;
			padding: 0rpx 32rpx 0rpx 32rpx;

			.title {
				display: flex;
				flex-direction: row;
				align-items: center;

				image {
					width: 20rpx;
					margin-right: 14rpx;
				}

				text {
					color: #3A2633;
					font-size: 30rpx;
					font-weight: 600;
				}
			}

			.close {
				width: 52rpx;

				image {
					width: 100%;
				}
			}
		}

		.form {
			// width: 100%;
			width: calc(100% - 52rpx);
			margin: 0 auto;
			display: flex;
			flex-direction: column;
			align-items: center;

			.price {
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;
				background-color: white;
				box-sizing: border-box;
				padding: 0rpx 28rpx;
				border-radius: 20rpx;
				margin-bottom: 141rpx;

				.title {
					color: #3A2633;
					font-size: 30rpx;
					font-weight: 600;
					margin-bottom: 14rpx;
				}

				.tip {
					color: #F3581D;
					font-size: 50rpx;
					font-weight: 600;
					margin-bottom: 50rpx;
				}

				.label {
					width: 100%;
					text-align: left;
					color: #3A2633;
					font-size: 24rpx;
				}

				.input {
					width: 100%;
					background-color: #F4F4F4;
					color: #ACACAC;
					font-size: 30rpx;
					border-radius: 20rpx;
					box-sizing: border-box;
					padding: 31rpx 43rpx;
					margin-bottom: 25rpx;
				}
			}

		}

		.btn-div {
			background: white;
			display: flex;
			justify-content: center;
			align-items: center;
			padding-top: 20rpx;
			padding-bottom: 30rpx;

			.btn {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 600rpx;
				height: 110rpx;
				background: linear-gradient(180deg, #EF8E1F 0%, #F0AC05 100%);
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				color: #FFFFFF;
				font-size: 30rpx;
				font-weight: 600;
			}
		}
	}

	.radio {
		width: 19rpx;
		height: 19rpx;
		background: linear-gradient(180deg, #EC4202 0%, #FE7B4A 100%);
		border-radius: 50%;
		margin-right: 14rpx;
	}

	.swiper-active {
		background-color: #FFFFFF;
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
		.banner {

			width: 100%;
			margin: 0 auto;
			// background: url("../../static/img/bg/index_bg.png") no-repeat center center / 100% 100%;
			box-sizing: border-box;
			background-color: white;

			.swiper {
				width: 100%;
				height: 440rpx !important;
				margin: 0 auto;
				// background-color: white;

				.swiper-item {
					.pic {
						width: 100%;
						height: 440rpx;
						position: relative;
						// background-color: white;

						image {
							width: 100%;
							height: 100%;
							// border-radius: 20rpx;
						}

						.img {
							width: 100%;
							height: 100%;
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

		.box-contain {
			width: 100%;
			box-sizing: border-box;
			padding-top: 26rpx;

			// padding-left: 30rpx;
			// padding-right: 30rpx;
			// background-color: red;
			.status-box {
				width: calc(100% - 30rpx);
				background-color: #2A2A2A;
				display: flex;
				justify-content: space-between;
				align-items: center;
				box-sizing: border-box;
				padding: 20rpx 24rpx;
				border-radius: 20rpx;
				// margin-bottom: 29rpx;
				margin: 0 auto;

				.text {
					color: #F0CD6B;
					font-weight: 600;
					font-size: 30rpx;
				}

				.time {
					font-weight: 600;
					font-size: 30rpx;
					color: #FFFFFF;
					display: flex;
					align-items: center;
					flex-direction: row;
				}
			}

			.status-box1 {
				width: 100%;

				.header {
					width: calc(100% - 30rpx);
					background-color: #FFE8C4;
					display: flex;
					justify-content: space-between;
					align-items: center;
					box-sizing: border-box;
					padding: 20rpx 24rpx;
					// border-radius: 20rpx;
					border-top-left-radius: 20rpx;
					border-top-right-radius: 20rpx;
					// margin-bottom: 29rpx;
					margin: 0 auto;
					border-bottom: 1px solid #D4BE9D;

					.text {
						color: #F0CD6B;
						font-weight: 600;
						font-size: 30rpx;
					}

					.time {
						font-weight: 600;
						font-size: 30rpx;
						color: #FFFFFF;
						display: flex;
						align-items: center;
						flex-direction: row;
					}
				}

				.label {
					width: calc(100% - 30rpx);
					background-color: #FFE8C4;
					border-bottom-left-radius: 20rpx;
					border-bottom-right-radius: 20rpx;
					color: #55452B;
					margin: 0 auto;
					font-size: 24rpx;
					padding: 20rpx 24rpx;
				}
			}

			.goods {
				width: 100%;
				padding-top: 29rpx;
				position: relative;
				padding-bottom: 150rpx;
				.goods-title {
					color: #3A2633;
					font-size: 30rpx;
					font-weight: 600;

					width: calc(100% - 30rpx);
					// margin-bottom: 15rpx;
					margin: 0 auto;
				}

				.goods-label {
					width: calc(100% - 30rpx);
					// display: flex;
					// justify-content: space-between;
					// align-items: center;
					display: flex;
					flex-direction: row;
					align-items: center;
					flex-wrap: wrap;
					margin: 0 auto;
					padding-top: 15rpx;

					// margin-bottom: 20rpx;
					.item {
						width: 50%;
						color: #3A2633;
						font-size: 24rpx;
						margin-bottom: 24rpx;
						line-height: 1.5;
					}

					.right {
						display: flex;
						justify-content: flex-end;
					}

					.num {
						color: #F96932;
						font-size: 36rpx;
						font-weight: 600;
					}
				}

				.product-container,
				.product-container3 {
					padding-bottom: 26rpx;
					box-sizing: border-box;
					padding-left: 20rpx;
					padding-right: 20rpx;

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
							background-color: #F4F4F4;
							width: 100%;
							// overflow: hidden;
							display: flex;
							flex-direction: row;
							align-items: center;
							box-sizing: border-box;
							padding-top: 9rpx;
							padding-bottom: 9rpx;
							padding-left: 30rpx;
							padding-right: 30rpx;

							.product-img {
								width: 91rpx;
								height: 91rpx;
								background-color: white;
								margin-right: 27rpx;

								image {
									width: 100%;
									height: 100%;
									// height: 100rpx;
								}
							}

							.product-info {
								padding: 0rpx 28rpx;
								box-sizing: border-box;
								width: calc(100% - 144rpx);
								// height:144rpx;
								display: flex;
								flex-direction: row;
								justify-content: space-between;

								.product-title {
									// .vertical(2);
									color: #3A2633;
									font-size: 24rpx;
									font-weight: 600;
									// line-height: 3;	
								}

								.product-title1 {
									// .vertical(2);
									color: #3A2633;
									font-size: 24rpx;
									// line-height: 3;
								}

								.product-title2 {
									// .vertical(2);
									color: #F96932;
									font-size: 30rpx;
									// line-height: 3;
									font-weight: 600;
								}
							}

							&:nth-child(2n) {
								margin-right: 0;
							}
						}
					}
				}

				.goods-tip {
					width: calc(100% - 30rpx);
					background-color: #FFF9EC;
					border-radius: 20rpx;
					box-sizing: border-box;
					padding: 22rpx 22rpx;
					// margin-bottom: 22rpx;
					margin: 20rpx auto;

					.goods-tip-title {
						color: #F96932;
						font-size: 26rpx;
						font-weight: 600;
						line-height: 1.5;
						margin-bottom: 18rpx;
					}

					.goods-tip-label {
						color: #F96932;
						font-size: 24rpx;
					}
				}

				.goods-detail {
					width: 100%;
					background-color: #F4F4F4;
					box-sizing: border-box;
					padding: 27rpx 30rpx;
					// margin-bottom: 63rpx;
					margin: 0rpx auto;

					.goods-detail-title {
						color: #3A2633;
						font-size: 32rpx;
						font-weight: 600;
						margin-bottom: 26rpx;
					}
					.goods-detail-rich{
						width: 100%;
						overflow: hidden;
						
						// display: flex;
						// flex-wrap: wrap;
						// overflow: hidden;
					}
				}

				.goods-price {
					width: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					color: #818181;
					font-size: 30rpx;
					font-weight: 600;
					padding-bottom: 50rpx;
					padding-top: 63rpx;
				}

				.goods-btn {
					color: #817D7D;
					font-size: 30rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					font-weight: 600;
					// padding: 49rpx 0;
					height: 140rpx;
					background-color: #F4F4F4;
					// border-radius: 30rpx;
					// margin-bottom: 50rpx;
				}

				.goods-btn1 {
					position: fixed;
					width: 100%;
					bottom: 0;
					left: 0;
					z-index: 10;
					background: linear-gradient(180deg, #EF8E1F 0%, #F0AC06 100%);
					color: white;
				}
				.goods-btn2 {
					position: fixed;
					width: 100%;
					bottom: 0;
					left: 0;
					z-index: 10;
					// background: linear-gradient(180deg, #EF8E1F 0%, #F0AC06 100%);
					// color: white;
				}
			}
		}
	}
</style>