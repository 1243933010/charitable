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
						{{$t('withdraw.pageTit')}}
					</view>
				</view>
			</view>
		</view>
		<view class="withdrawal_bg" :style="[bg_image]">
			<view class="withdrawal_centent">
				<view class="withdrawal_bg_title">
					{{$t('app.month.tongdao')}}
				</view>
				<view class="withdrawal_one" :class="{'withdrawal_oneActive':tongdaoIndex==index}"
					v-for="(item,index) in tongdaoArray" :key="index" @click="tongdaoIndex=index">
					<image v-if="tongdaoIndex==index" :src="item.iconSelect" mode="widthFix"></image>
					<image v-else :src="item.icon" mode="widthFix"></image>
					{{item.name}}
				</view>
			</view>
		</view>
		<view class="withdrawal_count">
			<!--<view class="withdrawal_count_title">
				{{$t('app.month.tixainAccount')}}
			</view>
			 <view class="withdrawal_count_one">
				<view class="count_one_left">
					{{$t('app.month.select')}}
				</view>
				<view class="count_one_right">
					<image src="../../../static/userStatic/xila.png" mode="widthFix"></image>
				</view>
			</view> -->
			<view class="withdrawal_count_one">
				<view class="count_one_left" style="color: #333333;">
					{{$t('app.quantity')}}
				</view>
				<view class="count_one_right">
					<input type="text" v-model="params.money" :placeholder="$t('app.month.number')">
				</view>
			</view>
			<view class="withdrawal_count_one">
				<view class="count_one_left" style="color: #333333;">
					{{$t('app.balance')}}
				</view>
				<view class="count_one_rightactive">
					{{userInfo.balance}}
				</view>
			</view>
			<view class="withdrawal_count_one">
				<view class="count_one_left" style="color: #333333;">
					{{$t('app.month.huilv')}}
				</view>
				<view class="count_one_rightactive" v-if="tongdaoIndex==0">
					1:{{config.withdraw_ratio_usdc}}
				</view>
				<view class="count_one_rightactive" v-if="tongdaoIndex==1">
					1:{{config.withdraw_ratio_usdt}}
				</view>
			</view>
			<view class="withdrawal_count_one">
				<view class="count_one_left" style="color: #333333;">
					{{$t('app.month.shouxufei')}}
				</view>
				<view class="count_one_rightactive">
					{{config.withdraw_fee_ratio}}%
					<!-- {{totalPrice(this.params.money)}} -->
				</view>
			</view>
			<view class="withdrawal_count_one">
				<view class="count_one_left" style="color: #333333;">
					{{$t('app.tixian.account')}}
				</view>
				<view class="count_one_rightactive">
					{{totalPriceBalance(params.money)}}
				</view>
			</view>
			<view class="withdrawal_count_two">
				{{$t('app.month.pass')}}
			</view>
			<view class="withdrawal_count_twoInput">
				<input type="text" v-model="params.pay_password" :placeholder="$t('login.pwdPlaceholder')">
			</view>
			<!-- 按钮 -->
			<view class="withdrawal_count_button" @click="goWithdraw">
				{{$t('withdraw.pageTit')}}
			</view>
			<view class="withdrawal_count_wraning">
				<view class="wraning_title">
					{{$t('app.month.warning')}}
				</view>
				<view class="wraning_desc">
					{{config.withdraw_notice}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		$request,
		filesUrl
	} from "@/utils/request";
	export default {
		data() {
			return {
				isBgcolor: false,
				bg_image: {
					backgroundImage: `url(${filesUrl}/uploads/20240604/image/6dd507cb3edbab605dc1e1dd09722aa9.webp)`,
					backgroundSize: `100% 100%`
				},
				tongdaoArray: [{
						name: "USDC(BEP20/BSC)",
						icon: "../../../static/userStatic/redio_w.png",
						iconSelect: "../../../static/userStatic/redio_y.png",
						channel: 1,
					},
					{
						name: "USDT(TRC20)",
						icon: "../../../static/userStatic/redio_w.png",
						iconSelect: "../../../static/userStatic/redio_y.png",
						channel: 2,
					}
				],
				tongdaoIndex: 0,
				config: "", //配置详情
				userInfo: "", //用户详情
				params: {
					channel: 1,
					money: "", //提现金额
					pay_password: "", //支付密码
				},
				isFable: true, //判断连点
			}
		},
		onPageScroll(e) {
			this.isBgcolor = ~~e.scrollTop > 30 ? true : false
		},
		onLoad() {
			this.getUserinfo()
			this.getWithdraw()
		},
		computed: {
			// totalPrice(){
			// 	return value=>{
			// 		if(value){
			// 			return (Number(value)*(+this.config.withdraw_fee_ratio/100)).toFixed(4)
			// 		}else{
			// 			return 0
			// 		}
			// 	}
			// },
			totalPriceBalance() {
				return value => {
					if (value) {
						return ((Number(value) - (Number(value) * Number(this.config.withdraw_fee_ratio) / 100)) * Number(
							this.tongdaoIndex == 0 ? this.config.withdraw_ratio_usdc : this.config
							.withdraw_ratio_usdt)).toFixed(2)
					} else {
						return 0
					}
				}
			}
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
			async getUserinfo() {
				let res = await $request('getInfo', {});
				if (res.data.code == 200) {
					this.userInfo = res.data.data;
					console.log(this.userInfo)
				}
			},
			async getWithdraw() {
				let res = await $request('getRechargeConfig', {});
				if (res.data.code == 200) {
					// console.log(res.data.data,'配置')
					this.config = res.data.data.withdraw
					this.tongdaoArray.forEach((item => {
						item.name = item.name +
							`(${this.config.withdraw_min_amount}-${this.config.withdraw_max_amount})`
					}))
				}
			},
			goWithdraw() {
				this.params.channel = this.tongdaoArray[this.tongdaoIndex].channel
				if (this.isFable) {
					this.isFable = false
					this.getisSwith()
					$request("gewithdrawApply", this.params).then(res => {
						let {
							data,
							code,
							message
						} = res.data;
						if (code !== 200) {
							// 登录失败
							uni.showToast({
								title: res.data.message,
								icon: "none",
							});
							return;
						}
						uni.navigateBack()
					})
				}

			},
			getisSwith() {
				setTimeout(() => {
					this.isFable = true
				}, 3000)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.withdrawal {
		width: 100%;
		min-height: 100vh;
		background-color: #ffffff;
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
			margin-top: -120rpx;

			.withdrawal_count_title {
				font-family: PingFang SC, PingFang SC;
				font-weight: 800;
				font-size: 34rpx;
				color: #3A2633;
				margin-left: 30rpx;
			}

			.withdrawal_count_one {
				width: 100%;
				height: 98rpx;
				background: #F4F4F4;
				border-radius: 10rpx;
				box-sizing: border-box;
				padding: 0 30rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 25rpx;

				.count_one_left {
					font-family: PingFang SC, PingFang SC;
					font-weight: bold;
					font-size: 26rpx;
					color: #8F8F8F;
				}

				.count_one_right {
					image {
						width: 22rpx;
					}

					input {
						flex: 1;
						height: 100%;
						text-align: right;
						font-family: PingFang SC, PingFang SC;
						font-weight: bold;
						font-size: 26rpx;
					}
				}

				.count_one_rightactive {
					font-family: PingFang SC, PingFang SC;
					font-weight: 800;
					font-size: 26rpx;
					color: #3A2633;
				}
			}

			.withdrawal_count_two {
				font-family: PingFang SC, PingFang SC;
				font-weight: 800;
				font-size: 30rpx;
				color: #3A2633;
				margin-top: 40rpx;
				margin-left: 30rpx;
			}

			.withdrawal_count_twoInput {
				width: 100%;
				height: 98rpx;
				background: #F4F4F4;
				border-radius: 10rpx;
				box-sizing: border-box;
				padding: 0 20rpx;
				margin-top: 25rpx;

				input {
					width: 100%;
					height: 98rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 26rpx;
				}
			}

			.withdrawal_count_button {
				width: 100%;
				height: 98rpx;
				line-height: 98rpx;
				text-align: center;
				background: linear-gradient(180deg, #EF8E1F 0%, #F0AC05 100%);
				border-radius: 20rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 800;
				font-size: 30rpx;
				color: #FFFFFF;
				margin-top: 25rpx;
			}

			.withdrawal_count_wraning {
				width: 100%;
				margin-top: 80rpx;

				.wraning_title {
					font-family: PingFang SC, PingFang SC;
					font-weight: 800;
					font-size: 30rpx;
					color: #3A2633;
				}

				.wraning_desc {
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 26rpx;
					color: #3A2633;
					margin-top: 15rpx;
				}
			}
		}
	}
</style>