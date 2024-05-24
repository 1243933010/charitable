<template>
	<view class="withdrawal">
		<!-- 封装头部 -->
		<view class="month_nav" :class="isBgcolor?'navbackground':''">
			<view class="nav_height">
				<!-- 状态栏 -->
				<view class="nav_status">

				</view>
				<view class="nav_header">
					<view class="nav_left" @click="goBack">
						<image src="../../../static/userStatic/left.png" mode="widthFix"></image>
					</view>
					<view class="nav_centent">
						充值详情
					</view>
				</view>
			</view>
		</view>
		<view class="withdrawal_bg" :style="bg_image">
		</view>
		<view class="withdrawal_count">
			<view class="count_one">
				<view class="count_one_title">
					充值详情
				</view>
				<view class="count_one_price">
					<view class="count_one_priceleft">
						充值金额
					</view>
					<view class="count_one_pricenumber">
						USDT194.00
					</view>
				</view>
				<view class="count_one_price">
					<view class="count_one_priceleft">
						订单号
					</view>
					<view class="count_one_pricenumber">
						566545645414877989 <span>复制</span>
					</view>
				</view>
				<view class="count_one_time">
					19/01/2022 19:14:33
				</view>
				<view class="count_one_time" style="color: #3A2633;">
					姓名
				</view>
				<view class="count_two_title">
					请选择以下方法转账，以避免在财务支票中出现延迟转
					账后，请上传转账截图作为验证证明。
				</view>
				<view class="count_two_image">
					<image src="../../../static/img/cn.png" mode="aspectFill"></image>
				</view>
				<view class="count_three_title">
					pe=16047&query=&keyfrom=baidu&sm
					<span>复制</span>
				</view>
				<view class="count_button">
					保存二维码
				</view>
				<view class="count_five_title">
					注:每次转账请提交一次付款
				</view>
			</view>
		</view>
		<view class="withdrawal_count_two">
			<view class="two_centented">
				<view class="count_two_named">
					上传充值信息
				</view>
				<view class="two_centented_title">
					<view class="two_centented_titlename">
						订单号码
					</view>
					<view class="two_centented_titleinput">
						<input type="text" placeholder="请输入订单号">
					</view>
				</view>
				<view class="two_centented_title">
					<view class="two_centented_titlename">
						付款时间
					</view>
					<view class="two_centented_titleinput">
						<input type="text" placeholder="请输入订单号">
						<image src="../../../static/userStatic/xiala_hui.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="two_centented_titled">
					充值订单截图：
				</view>
				<view class="two_centented_imagekong" v-if="false">
					<image src="../../../static/userStatic/tupian.png" mode="widthFix"></image>
					<view class="kong_title">
						点击上传充值订单截图
					</view>
				</view>
				<view class="imageed">
					<image src="../../../static/img/cn.png" mode="aspectFill"></image>
				</view>
				<view class="image_confim">
					提交
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isBgcolor: false,
				bg_image: {
					backgroundImage: `url(../../static/userStatic/user_bg.png)`,
					backgroundSize: `100% 100%`
				},
				tongdaoArray: [{
						name: "USDC(BEP20/BSC)(0-1000000000)",
						icon: "../../../static/userStatic/redio_w.png",
						iconSelect: "../../../static/userStatic/redio_y.png"
					},
					{
						name: "USDT(TRC20)(0-500000000)",
						icon: "../../../static/userStatic/redio_w.png",
						iconSelect: "../../../static/userStatic/redio_y.png"
					}
				],
				tongdaoIndex: 0,
			}
		},
		onPageScroll(e) {
			this.isBgcolor = ~~e.scrollTop > 30 ? true : false
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
		}
	}
</script>

<style lang="scss" scoped>
	.withdrawal {
		width: 100%;
		min-height: 100vh;
		background-color: #F4F4F4;
		box-sizing: border-box;
		padding-bottom: 40rpx;

		.month_nav {
			width: 100%;
			height: calc(100rpx + var(--status-bar-height));
			position: fixed;
			left: 0;
			top: 0;
			z-index: 999;

			.nav_status {
				width: 100%;
				height: var(--status-bar-height);
			}

			.nav_header {
				width: 100%;
				height: 100rpx;
				position: relative;

				.nav_left {
					width: 100rpx;
					height: 100rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					position: absolute;
					left: 0;
					top: 0;

					image {
						width: 20rpx;
						height: 18rpx;
					}
				}

				.nav_centent {
					width: 100%;
					line-height: 100rpx;
					text-align: center;
					font-family: PingFang SC, PingFang SC;
					font-weight: 800;
					font-size: 30rpx;
					color: #403039;
				}
			}
		}

		.navbackground {
			background-color: #FFE3B1;
		}

		.withdrawal_bg {
			width: 100%;
			height: 750rpx;
			box-sizing: border-box;
			padding: 220rpx 30rpx 0;

			.withdrawal_centent {
				width: 100%;
				height: 345rpx;
				background: #FFFFFF;
				border-radius: 20rpx;
				box-sizing: border-box;
				padding: 39rpx 43rpx;

				.withdrawal_bg_title {
					font-family: PingFang SC, PingFang SC;
					font-weight: 800;
					font-size: 36rpx;
					color: #3A2633;
					margin-bottom: 20rpx;
				}

				.withdrawal_one {
					width: 100%;
					height: 90rpx;
					box-sizing: border-box;
					padding: 0 20rpx;
					display: flex;
					align-items: center;

					image {
						width: 30rpx;
						height: 30rpx;
						margin-right: 10rpx;
					}

					font-family: PingFang SC,
					PingFang SC;
					font-weight: bold;
					font-size: 30rpx;
					color: #8F8F8F;
				}

				.withdrawal_oneActive {
					background: #F9F0EA;
					color: #EB7B31;
					border-radius: 15rpx;
				}
			}
		}

		.withdrawal_count {
			width: 100%;
			box-sizing: border-box;
			padding: 0 30rpx;
			margin-top: -580rpx;

			.count_one {
				width: 100%;
				min-height: 164rpx;
				background: #FFFFFF;
				border-radius: 20rpx;
				box-sizing: border-box;
				padding: 30rpx 20rpx;

				.count_one_title {
					font-family: PingFang SC, PingFang SC;
					font-weight: 800;
					font-size: 36rpx;
					color: #3A2633;
					margin-bottom: 20rpx;
				}

				.count_one_price {
					width: 100%;
					height: 103rpx;
					border-bottom: 1rpx solid #EBEBEB;
					display: flex;
					align-items: center;
					justify-content: space-between;
					box-sizing: border-box;
					padding: 0 15rpx;

					.count_one_priceleft {
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 30rpx;
						color: #3A2633;
					}

					.count_one_pricenumber {
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 30rpx;
						color: #3A2633;

						span {
							font-family: PingFang SC, PingFang SC;
							font-weight: 800;
							font-size: 26rpx;
							color: #FFFFFF;
							box-sizing: border-box;
							padding: 7rpx 34rpx;
							background-color: #F0931B;
							border-radius: 30rpx;
						}
					}
				}

				.count_one_time {
					width: 100%;
					height: 103rpx;
					border-bottom: 1rpx solid #EBEBEB;
					display: flex;
					align-items: center;
					justify-content: space-between;
					box-sizing: border-box;
					padding: 0 15rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 30rpx;
					color: #A8A8A8;
				}

				.count_two_title {
					width: 100%;
					box-sizing: border-box;
					padding-top: 40rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 26rpx;
					color: #3A2633;
				}

				.count_two_image {
					width: 100%;
					box-sizing: border-box;
					padding: 40rpx 0;
					text-align: center;

					image {
						width: 235rpx;
						height: 235rpx;
					}
				}

				.count_three_title {
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 26rpx;
					color: #3A2633;
					display: flex;
					align-items: center;
					justify-content: space-between;

					span {
						font-family: PingFang SC, PingFang SC;
						font-weight: 800;
						font-size: 26rpx;
						color: #FFFFFF;
						box-sizing: border-box;
						padding: 7rpx 34rpx;
						background-color: #F0931B;
						border-radius: 30rpx;
					}
				}

				.count_button {
					width: 600rpx;
					height: 98rpx;
					line-height: 98rpx;
					text-align: center;
					background: linear-gradient(180deg, #EF8E1F 0%, #F0AC05 100%);
					border-radius: 20rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 800;
					font-size: 30rpx;
					color: #FFFFFF;
					margin: 40rpx auto 0;
				}

				.count_five_title {
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #A8A8A8;
					text-align: center;
					margin-top: 20rpx;
				}
			}
		}

		.withdrawal_count_two {
			width: 100%;
			box-sizing: border-box;
			padding: 0rpx 30rpx;
			margin-top: 25rpx;

			.two_centented {
				box-sizing: border-box;
				padding: 29rpx 30rpx;
				background-color: #FFFFFF;
				border-radius: 20rpx;
				.count_two_named {
					font-family: PingFang SC, PingFang SC;
					font-weight: 800;
					font-size: 36rpx;
					color: #3A2633;
				}
				.two_centented_title{
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-top: 30rpx;
					.two_centented_titlename{
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 30rpx;
						color: #3A2633;
					}
					.two_centented_titleinput{
						width: 433rpx;
						height: 77rpx;
						background: #F4F4F4;
						border-radius: 50rpx;
						box-sizing: border-box;
						padding: 0 20rpx;
						display: flex;
						align-items: center;
						input{
							width: 100%;
							height: 77rpx;
							font-family: PingFang SC, PingFang SC;
							font-weight: 400;
							font-size: 26rpx;
						}
						image{
							width: 30rpx;
						}
					}
				}
				.two_centented_titled{
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 30rpx;
					color: #3A2633;
					margin-top: 30rpx;
				}
				.two_centented_imagekong{
					width: 560rpx;
					height: 476rpx;
					background: #F8F8F8;
					border-radius: 10rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					margin: 20rpx auto;
					image{
						width: 74.5rpx;
					}
					.kong_title{
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 26rpx;
						color: #A4A4A4;
						margin-top: 33rpx;
					}
				}
				.imageed{
					width: 560rpx;
					height: 476rpx;
					margin: 20rpx auto;
					image{
						width: 560rpx;
						height: 476rpx;
						border-radius: 30rpx;
					}
				}
				.image_confim{
					width: 600rpx;
					height: 98rpx;
					line-height: 98rpx;
					text-align: center;
					background: linear-gradient( 180deg, #EF8E1F 0%, #F0AC05 100%);
					border-radius: 20rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 800;
					font-size: 30rpx;
					color: #FFFFFF;
					margin: 40rpx auto 0;
				}
			}
		}
	}
</style>