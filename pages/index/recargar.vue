<template>
	<view class="profix-page-container recargar-page">
		<hx-navbar :config="config" />
		<view class="recargar-scroll page-scroll">
			<view class="rec-box">
				<view class="left">
					<view class="pic">
						<image src="../../static/img/USDT.png" mode="widthFix" class="img"></image>
					</view>
					<view class="text">
						<text>USDT{{ $t("recargar.text1") }}</text>
						<text>USDT-TRC20</text>
					</view>
				</view>
				<view class="right">{{balance}}{{ $t("storageLevel.dollar") }}</view>
			</view>

			<view class="balance-list">
				<view class="balance-item">
					<view class="circle"></view>
					{{ $t("recargar.balanceItem1") }}
				</view>
		<!-- 		<view class="balance-item">
					<view class="circle"></view>
					{{ $t("recargar.balanceItem2") }}
				</view> -->
			</view>

			<view class="input-box">
				<view class="rec-txt3">{{ $t("recargar.recTxt3") }}</view>
				<view class="list-ul">
					<view class="list-item" @click="checkNum(0)" :class="{ active: checkIndex === 0 }">
						<view class="input">
							<input type="number" v-model="recargarNum" />
						</view>
						<view class="text">{{ $t("recargar.inpPlaceholder") }}</view>
					</view>
					<template v-for="(item, index) in recargar" :key="item">
						<view class="list-item" v-if="index !== 0" :class="{ active: checkIndex === index }" @click="checkNum(index)">
							<view class="num">{{ item }}</view>
						</view>
					</template>
				</view>
				<button class="recargar-btn" @click="recargarHandle">{{ $t("recargar.pageTit") }}</button>
			</view>
		</view>

		<uni-popup ref="popup" type="center" class="recargar-success">
			<view class="pic">
				<image src="../../static/img/recargarSuc.png" mode="widthFix" class="img"></image>
			</view>
			<view class="text">{{ $t("recargar.popupTips") }}</view>
		</uni-popup>
	</view>
</template>

<script>
import hxNavbar from "@/components/hx-navbar.vue";
import { $request } from "@/utils/request";

export default {
	components: {
		hxNavbar,
	},
	data() {
		return {
			recargar: [0, 50, 80, 240, 720, 1000, 2000, 5000],
			checkIndex: 0,
			recargarNum: 0,
			balance: 0,
		};
	},
	computed: {
		config() {
			return {
				title: this.$t("recargar.pageTit"),
				color: "#ffffff",
				// backgroundColor: [1, "#24bdab"],
				// 背景图片（array则为滑动切换背景图，string为单一背景图）
				// backgroundImg: ['/static/xj.jpg','/static/logo.jpg'],
				backgroundImg: "../../static/img/header_tabber.png",
			};
		},
	},
	mounted() {
		this.getWalletInfo();
	},
	methods: {
		checkNum(index) {
			console.log(typeof index, index);
			this.checkIndex = index;
			this.recargarNum = index === 0 ? this.recargarNum : this.recargar[index];
		},
		recargarHandle() {
			// 充值成功后的弹窗提示
			if(this.recargarNum === 0) {
				uni.showToast({
					title: this.$t("recargar.toastText")
				});
				
				return;
			}
			uni.navigateTo({
				url: `/pages/me/onlinePayment?recargarNum=${this.recargarNum}`,
			});
			// this.$refs.popup.open("center");

			// let timer = setTimeout(() => {
			// 	this.$refs.popup.close();
			// 	clearTimeout(timer);
			// }, 2000);
		},
		async getWalletInfo() {
			let res = await $request("walletInfo", {});
			let { code, data } = res.data;
			if (code === 0) {
				this.balance = data.balance*1;
			}
		},
	},
};
</script>

<style lang="less" scoped>
@import "../../static/less/variable.less";

page {
	background-color: #f5f4f9;
}

.recargar-page {
	.recargar-scroll {
		padding-top: 20rpx;

		.rec-box {
			margin-bottom: 52rpx;
			border-radius: 20rpx;
			padding: 40rpx 56rpx;
			background-color: #fff;
			.df(center, space-between);

			.left {
				.df(center, flex-start);

				.pic {
					margin-right: 20rpx;
					width: 88rpx;
				}

				.text {
					text {
						margin-bottom: 20rpx;
						line-height: 1;
						color: @bodyColor;
						font-size: @bodySize;
						display: block;

						&:last-child {
							margin-bottom: 0;
							color: #666;
							font-size: @descSize;
						}
					}
				}
			}

			.right {
				color: #fd7e1f;
				font-size: 32rpx;
				font-weight: bold;
			}
		}

		.balance-list {
			margin-bottom: 26rpx;

			.balance-item {
				color: @bodyColor;
				font-size: 24rpx;
				margin-bottom: 26rpx;

				.df(center, flex-start);

				.circle {
					margin-right: 12rpx;
					border-radius: 50%;
					width: 20rpx;
					height: 20rpx;
					background-color: #fd7e1f;
				}
			}
		}

		.input-box {
			.rec-txt3 {
				margin-bottom: 40rpx;
				color: @bodyColor;
				font-size: @bodySize;
				font-weight: bold;
			}

			.list-ul {
				display: flex;
				flex-wrap: wrap;

				.list-item {
					margin-right: 20rpx;
					margin-bottom: 20rpx;
					border-radius: 10rpx;
					font-size: 24rpx;
					height: 150rpx;
					background-color: #fff;
					width: calc(33.333% - 14rpx);

					.df(center, center);
					flex-direction: column;
					text-align: center;

					.input {
						margin-bottom: 32rpx;
					}

					&.active {
						color: #fff;
						background-color: #383838;
						// background: linear-gradient(0deg, #0694B8 0%, #6BBDB4 100%);
					}

					&:nth-child(3n) {
						margin-right: 0rpx;
					}
				}
			}

			.recargar-btn {
				margin: 30rpx auto 0;
				background-color: #383838;
				// background: linear-gradient(60deg, #0694B8 0%, #6BBDB4 100%);
				width: 68vw;
				color: #fff;
			}
		}
	}

	.recargar-success {
		.pic {
			width: 154rpx;
		}

		.text {
			margin-top: 20rpx;
			color: #fff;
			font-size: 30rpx;
			text-align: center;
		}
	}
}
</style>
