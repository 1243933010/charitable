<template>
	<view>
		<hx-navbar :config="config" />

		<view class="index-page1  has-tabbar">
			<view class="banner">
				<swiper class="swiper" :autoPlay="false" circular autoplay style="height: 400rpx;"
					@change="swiperChange">
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

			<view class="box-contain">
				<view class="search">
					<view class="title">
						<text>{{$t("app.newAdd42")}}</text>
					</view>
					<picker @change="bindPickerChange" :value="index" :range="statusList">
						<view class="status">
							<view class="uni-input">{{statusList[index]}}</view>
							<image src="../../static/img/icon/arrow.png" mode="widthFix"></image>

						</view>
					</picker>
					<picker @change="bindPickerChange1" :value="betweenIndex" :range="betweenList">
						<view class="between">
							<view class="uni-input">{{$t("app.newAdd43")}}:{{betweenList[betweenIndex]}}</view>
							<image src="../../static/img/icon/arrow.png" mode="widthFix"></image>

						</view>
					</picker>
				</view>
				<view class="list">
					<view class="item" v-for="(item,index) in nftList" :key="index" @click="goUrl(item)">
						<view class="status">
							<text>{{$t("app.newAdd44")}}:即将开始</text>
						</view>
						<view class="content">
							<view class="img">
								<image :src="item.url" mode="widthFix"></image>
							</view>
							<view class="right">
								<view class="name">
									<text>{{item.title}}</text>
								</view>
								<view class="bottom">
									<view class="price">
										<text>{{$t("app.newAdd45")}}：200</text>
									</view>
									<view class="time">
										<text>05-20 10:00{{$t("app.newAdd46")}}</text>
									</view>
								</view>
							<!-- 	<view class="time1">
									<text style="margin-right: 15rpx;">{{$t("app.newAdd47")}}</text>
									<uni-countdown :show-day="false" :hour="12" :minute="12" :second="12"></uni-countdown>
								</view> -->
								<view class="time2">
									<text style="margin-right: 15rpx;">{{$t("app.newAdd47")}}:2024-05-20 10:00 </text>
									
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
					title: this.$t("app.tabbar2"),
					color: "#403039",
					backgroundColor: [1, ['#FCEEB7', '#FEE1AB']],
					back: false
				};
			},
		},
		data() {
			return {
				swiperList: [],
				currentIndex: 0,
				formData: {
					// status:'竞拍阶段'
				},
				statusList: ['竞拍阶段', 'xx阶段', 'xxx阶段'],
				index: 0,
				betweenList: ['10-20', '20-100', '100-500'],
				betweenIndex: 0,
				nftList: [{
						url: '../../static/img/logo.png',
						label: '500USDT',
						statusText: '**用户已完成交易',
						title: '白色的空开放式学校背包'
					},
					{
						url: '../../static/img/logo.png',
						label: '500USDT',
						statusText: '**用户已完成交易',
						title: '白色的空开放式学校背包'
					},
					{
						url: '../../static/img/logo.png',
						label: '500USDT',
						statusText: '**用户已完成交易',
						title: '白色的空开放式学校背包'
					},
					{
						url: '../../static/img/logo.png',
						label: '500USDT',
						statusText: '**用户已完成交易',
						title: '白色的空开放式学校背包'
					},
				],
			}
		},
		mounted() {
			this.adverts();
		},
		methods: {
			goUrl(item){
				uni.navigateTo({
					url:'./detail'
				})
			},
			bindPickerChange: (e) => {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.index = e.detail.value
			},
			bindPickerChange1: (e) => {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.betweenIndex = e.detail.value
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
	@import "../../static/less/variable.less";

	page {
		background-color: #F5F5F5;
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
		padding-bottom: 120rpx;
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
						position: relative;
						// background-color: white;

						image {
							// border-radius: 20rpx;
						}

						.img {
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

		.box-contain {
			width: 100%;
			box-sizing: border-box;
			padding-top: 26rpx;
			padding-left: 30rpx;
			padding-right: 30rpx;

			.search {
				display: flex;
				flex-direction: row;
				align-items: center;
				margin-bottom: 31rpx;
				.title {
					color: #3A2633;
					font-size: 26rpx;
					margin-right: 69rpx;
					font-weight: 600;
				}

				.status,.between {
					display: flex;
					flex-direction: row;
					align-items: center;
					margin-right: 69rpx;
					.uni-input{
						color: #3A2633;
						font-size: 26rpx;
						font-weight: 600;
						margin-right: 10rpx;
					}
					image {
						width: 18rpx;
					}
				}
				.between{
					.uni-input{
						color: #F96932;
					}
					
				}
			}
			.list{
				width: 100%;
				.item{
					margin-bottom: 15rpx;
					box-sizing: border-box;
					padding: 14rpx 16rpx;
					background-color: white;
					border-radius: 20rpx;
					.status{
						color: #F45C23;
						font-size: 24rpx;
						font-weight: 600;
						margin-bottom: 16rpx;
					}
					.content{
						display: flex;
						flex-direction: row;
						// align-items: center;
						.img{
							width: 160rpx;
							height: 160rpx;
							// background: red;
							margin-right: 23rpx;
							image{
								width: 100%;
							}
						}
						.right{
							width: calc(100% - 160rpx);
							display: flex;
							flex-direction: column;
							// justify-content: space-between;
							// padding: 15rpx 0;
							.name{
								color: #3A2633;
								font-size: 24rpx;
								font-weight: 600;
								margin-bottom: 22rpx;
							}
							.bottom{
								width: 100%;
								display: flex;
								justify-content: space-between;
								align-items: center;
								font-size: 24rpx;
								padding-right: 50rpx;
								.price{
									color: #F45C23;
									
									// font-weight: 600;
								}
								.time{
									color: #9EA19D;
									margin-bottom: 10rpx;
								}
								
							}
							.time1{
								width: 100%;
								color: #3A2633;
								display: flex;
								flex-direction: row;
								align-items: center;
								font-size: 24rpx;
							}
							.time2{
								background-color: #EEEEEE;
								color: #3A2633;
								font-size: 24rpx;
								line-height: 1.5;
								box-sizing: border-box;
								padding: 8rpx 10rpx;
								border-radius: 10rpx;
							}
						}
					}
				}
			}
		}
	}
</style>