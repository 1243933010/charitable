<template>
	<view class="share">
		<hx-navbar :config="config" />
		<view class="share_centetn">
			<image src="../../../static/userStatic/share_bg.png" mode="aspectFill"></image>
			<view class="share_title">
				<image src="../../../static/userStatic/share_title.png" mode="aspectFill"></image>
			</view>
			<view class="share_count">
				<view class="count_code">
					<!-- <image src="../../../static/img/cn.png" mode="aspectFill"></image> -->
					<uqrcode  ref="uqrcode" canvas-id="qrcode" :value="shareUrl" :options="{ margin: 10 }" :size="140" :loading="false">
					</uqrcode>
				</view>
				<view class="count_link">
					<view class="link_name">
						{{shareUrl}}
					</view>
					<view class="link_copy" @click="copyinfo">
						{{$t('join.copy')}}
					</view>
				</view>
				<view class="count_link_title">
					{{$t('app.newAdd41')}}
				</view>
				<view class="count_share_button">
					<view class="button_one">
						<image src="../../../static/userStatic/share_one.png" mode="aspectFill"></image>
						<view class="button_one_title">
							Telegram
						</view>
					</view>
					<view class="button_one">
						<image src="../../../static/userStatic/share_two.png" mode="aspectFill"></image>
						<view class="button_one_title">
							WhatsAPP
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
		filesUrl,
	} from "@/utils/request";
	export default {
		components: {
			hxNavbar,
		},
		computed: {
			config() {
				return {
					title: this.$t('app.newAdd40'),
					color: "#403039",
					backgroundColor: [1, ['#FCEEB7', '#FEE1AB']],
				};
			},
		},
		onLoad() {
			this.getUserinfo() //获取用户详情
		},
		data() {
			return {
				userInfo: "", //用户详情
				shareUrl: "",
			}
		},
		methods: {
			async getUserinfo() {
				let res = await $request('getInfo', {});
				if (res.data.code == 200) {
					this.userInfo = res.data.data;
					this.getShare()
					console.log(this.userInfo)
				}
				// console.log(res,'用户详情')
			},
			async getShare() {
				let res = await $request('getSharecode', {
					invitation_code: this.userInfo.invitation_code
				});
				if (res.data.code == 200) {
					console.log(res.data.data)
					this.shareUrl = res.data.data.url
					this.getQRcode()
				}
			},
			getQRcode() {
				var qr = new UQRCode();
				// 设置uQRCode属性
				qr.data = this.shareUrl; // 指定二维码对应内容
				qr.size = 220; // 指定要生成的二维码大小
				qr.margin = 10; // 指定二维码的边距
			},
			copyinfo() {
				uni.setClipboardData({
					data: this.shareUrl,
					success: (res) => {
						uni.showToast({
							icon: "none",
							title: this.$t('app.copy.success')
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.share {
		width: 100%;

		.share_centetn {
			width: 100%;
			position: relative;

			image {
				width: 100%;
				height: 1400rpx;
			}

			.share_title {
				width: 100%;
				text-align: center;
				position: absolute;
				top: 80rpx;
				left: 0;

				image {
					width: 451rpx;
					height: 139rpx;
				}
			}

			.share_count {
				width: 100%;
				min-height: 200rpx;
				box-sizing: border-box;
				padding: 0 25rpx;
				position: absolute;
				left: 0;
				top: 45%;

				.count_code {
					width: 286rpx;
					height: 286rpx;
					background: #FFFFFF;
					border-radius: 20rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					margin: 0 auto;

					image {
						width: 232rpx;
						height: 232rpx;
					}
				}

				.count_link {
					width: 100%;
					height: 84rpx;
					background: #FBB77C;
					border-radius: 50rpx;
					margin-top: 40rpx;
					box-sizing: border-box;
					padding: 0 30rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.link_name {
						width: 450rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 26rpx;
						color: #533612;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}

					.link_copy {
						width: 120rpx;
						height: 52rpx;
						line-height: 52rpx;
						text-align: center;
						background: #F0931B;
						border-radius: 50rpx;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						font-family: PingFang SC, PingFang SC;
						font-weight: 800;
						font-size: 26rpx;
						color: #FFFFFF;
					}
				}

				.count_link_title {
					width: 100%;
					box-sizing: border-box;
					padding: 35rpx 30rpx;
					text-align: center;
					font-family: PingFang SC, PingFang SC;
					font-weight: 800;
					font-size: 30rpx;
					color: #533612;
				}

				.count_share_button {
					width: 60%;
					display: flex;
					align-items: center;
					justify-content: space-around;
					margin: 30rpx auto 0;

					.button_one {
						text-align: center;

						image {
							width: 90rpx;
							height: 90rpx;
						}

						.button_one_title {
							font-family: PingFang SC, PingFang SC;
							font-weight: 800;
							font-size: 24rpx;
							color: #533612;
							margin-top: 20rpx;
						}
					}
				}
			}
		}
	}
</style>