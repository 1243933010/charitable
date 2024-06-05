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
								<image @click="linkImg(item)" :src="imageUrl+item.image" class="img" mode="widthFix">
								</image>
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
					<picker @change="bindPickerChange" range-key="label" :value="index" :range="statusList">
						<view class="status">
							<view class="uni-input">
								{{statusList[pickerIndex]?statusList[pickerIndex].label:$t("app.newAdd64")}}</view>
							<image src="../../static/img/icon/arrow.png" mode="widthFix"></image>

						</view>
					</picker>
					<picker @change="bindPickerChange1" :value="betweenIndex" :range="betweenList">
						<view class="between">
							<view class="uni-input">
								{{$t("app.newAdd43")}}:{{formData.start_price? betweenList[betweenIndex]:$t("app.newAdd64")}}
							</view>
							<image src="../../static/img/icon/arrow.png" mode="widthFix"></image>

						</view>
					</picker>
				</view>
				<view class="list">
					<view class="item" v-for="(item,index) in auctionsList" :key="index" @click="goUrl(item)">
						<view class="status">
							<text>{{$t("app.newAdd44")}}:{{statusList[pickerIndex].label}}</text>
						</view>
						<view class="content">
							<view class="img">
								<image :src="imageUrl+item.main_image" mode="widthFix"></image>
							</view>
							<view class="right">
								<view class="name">
									<text>{{item.title}}</text>
								</view>
								<view class="bottom">
									<view class="price">
										<text>{{$t("app.newAdd45")}}：{{item.price}}</text>
									</view>
									<view class="time">
										<text>{{item.auction_start_time}}{{$t("app.newAdd46")}}</text>
									</view>
								</view>
								<!-- 	<view class="time1">
									<text style="margin-right: 15rpx;">{{$t("app.newAdd47")}}</text>
									<uni-countdown :show-day="false" :hour="12" :minute="12" :second="12"></uni-countdown>
								</view> -->
								<view class="time2">
									<text style="margin-right: 15rpx;">{{$t("app.newAdd47")}}:{{item.auction_end_time}} </text>

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
		$request,
		filesUrl
	} from "@/utils/request.js";
	import {
		setTabbar
	} from "@/utils/utils.js";
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
			imageUrl() {
				return filesUrl;
			},
			statusList() {
				return [
					{
						value: '',
						label: '全部'
					},
					{
						value: 0,
						label: '即将开始'
					},
					{
						value: 1,
						label: '竞拍中'
					},
					{
						value: 2,
						label: '已结束'
					},
					{
						value: 3,
						label: '已终止'
					},
					{
						value: 4,
						label: '已撤回'
					},
				]
			}
		},
		data() {
			return {
				swiperList: [],
				currentIndex: 0,
				formData: {
					page: 1,
					limit: 20,
					status: '',
					start_price: '',
					end_price: ''
				},
				pickerIndex: '',
				index: 0,
				betweenList: ['0-200', '200-1000', '1000-5000', '5000-100000'],
				betweenIndex: 0,
				auctionsList: []
			}
		},
		mounted() {
			setTabbar(this.$t)
			this.auctions();
			this.slides();
		},
		onReachBottom() {
			this.formData.page++;
			this.auctions();
		},
		methods: {
			async slides() {
				let res = await $request("slides", {
					position: '5'
				});
				console.log(res.data.data.data)
				if (res.data.code === 200) {
					this.swiperList = res.data.data.data;
					return false;
				}
				uni.showToast({
					icon: "none",
					title: res.data.msg,
				});
			},
			goUrl(item) {
				uni.navigateTo({
					url: `./detail?id=${item.id}`
				})
			},
			bindPickerChange(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.pickerIndex = e.detail.value
				this.formData.status = this.statusList[e.detail.value].value;
				this.formData.page = 1;
				this.auctionsList = [];
				this.auctions();
			},
			bindPickerChange1(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value, this.betweenList[e.detail.value])
				this.betweenIndex = e.detail.value;
				this.formData.start_price = +this.betweenList[e.detail.value].split('-')[0];
				this.formData.end_price = +this.betweenList[e.detail.value].split('-')[1];
				this.formData.page = 1;
				this.auctionsList = [];
				this.auctions();
			},
			swiperChange(e) {
				// e.detail.current 是当前的索引
				this.currentIndex = e.detail.current;
			},
			async auctions() {

				let res = await $request('auctions', this.formData);
				console.log(res)
				this.loading = false;
				if (res.data.code === 200) {
					this.auctionsList.push(...res.data.data.data);
				}
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
			padding-top: 25rpx;

			.swiper {
				width: 100%;
				height: 400rpx !important;
				margin: 0 auto;
				// background-color: white;

				.swiper-item {
					.pic {
						width: 690rpx;
						margin: 0 auto;
						position: relative;

						// background-color: white;

						image {
							border-radius: 30rpx;
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

				.status,
				.between {
					display: flex;
					flex-direction: row;
					align-items: center;

					// margin-right: 69rpx;
					// padding-left: 69rpx;
					.uni-input {
						color: #3A2633;
						font-size: 26rpx;
						font-weight: 600;
						margin-right: 10rpx;
					}

					image {
						width: 18rpx;
					}
				}

				.between {
					padding-left: 69rpx;

					.uni-input {
						color: #F96932;
					}

				}
			}

			.list {
				width: 100%;

				.item {
					margin-bottom: 15rpx;
					box-sizing: border-box;
					padding: 14rpx 16rpx;
					background-color: white;
					border-radius: 20rpx;

					.status {
						color: #F45C23;
						font-size: 24rpx;
						font-weight: 600;
						margin-bottom: 16rpx;
					}

					.content {
						display: flex;
						flex-direction: row;

						// align-items: center;
						.img {
							width: 160rpx;
							height: 160rpx;
							// background: red;
							margin-right: 23rpx;

							image {
								width: 100%;
							}
						}

						.right {
							width: calc(100% - 160rpx);
							display: flex;
							flex-direction: column;

							// justify-content: space-between;
							// padding: 15rpx 0;
							.name {
								color: #3A2633;
								font-size: 24rpx;
								font-weight: 600;
								margin-bottom: 22rpx;
								.vertical(2)
							}

							.bottom {
								width: 100%;
								display: flex;
								flex-direction: column;
								// justify-content: space-between;
								// align-items: center;
								font-size: 24rpx;
								padding-right: 50rpx;

								.price {
									color: #F45C23;
									margin-bottom: 10rpx;
									// font-weight: 600;
								}

								.time {
									color: #9EA19D;
									margin-bottom: 10rpx;
								}

							}

							.time1 {
								width: 100%;
								color: #3A2633;
								display: flex;
								flex-direction: row;
								align-items: center;
								font-size: 24rpx;
							}

							.time2 {
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