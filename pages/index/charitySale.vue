<template>
	<view>
		<hx-navbar :config="config" />

		<view class="index-scroll  has-tabbar">
			<view class="banner">
				<swiper class="swiper" circular autoplay style="height: 400rpx;" @change="swiperChange">
					<swiper-item :current="current" v-for="(item, index) in swiperList" :key="index">
						<view class="swiper-item">
							<view class="pic">
								<image @click="linkImg(item)" :src="item.image" class="img" mode="widthFix"></image>
								<view class="text-box">
									<view class="title">
										<text>星星点灯，照亮梦乡</text>
									</view>
									<view class="label">
										<text>希望计划让留守山区的孩子找寻回家的希望，照亮梦乡让留守山区</text>
									</view>
								</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
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
					title: this.$t("app.newAdd10"),
					color: "#403039",
					backgroundColor: [1, ['#FCEEB7', '#FEE1AB']],
				};
			},
		},
		data() {
			return {
				swiperList:[]
			};
		},
		mounted() {
			this.adverts();
		},
		methods: {
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

	.swiper-active {
		background-color: #FAE0AD;
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

	.index-page {
		background-color: #F4F4F4;

		// background-color: red;
		.index-scroll {
			.banner {
				width: 100%;
				margin: 0 auto;
				// background: url("../../static/img/bg/index_bg.png") no-repeat center center / 100% 100%;
				background-color: #FAE0AD;
				padding-left: 5%;
				// display: flex;
				// justify-content: center;
				// align-items: center;
				// margin-left: 5%;
				// margin-right: -30rpx;

				.swiper {
					width: 90%;
					height: 140px;

					.swiper-item {
						.pic {
							position: relative;

							.text-box {
								width: 100%;
								position: absolute;
								bottom: 0;
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
	}
</style>