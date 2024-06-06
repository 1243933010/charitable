<template>
	<view class="shenBroker">
		<!-- 封装头部 -->
		<view class="month_nav" :class="isBgcolor?'navActive':''">
			<view class="nav_height">
				<!-- 状态栏 -->
				<view class="nav_status">

				</view>
				<view class="nav_header">
					<view class="nav_left" @click="goBack">
						<image src="../../../static/userStatic/left.png" mode="widthFix"></image>
					</view>
					<view class="nav_centent">
						{{$t('app.shenqing.daili')}}
					</view>
				</view>
			</view>
		</view>
		<view class="shenBroker_bg">
			<image src="../../../static/userStatic/shen_bg.png" mode="widthFix"></image>
			<view class="shenBroker_centent">
				<view class="shenBroker_title">
					·{{$t('app.shenqing.dailied')}}
				</view>
				<view class="shenBroker_desc">
					<rich-text :nodes="configInfo.agent_application_copy"></rich-text>
				</view>
			</view>
		</view>
		<view class="shenBroker_button">
			<view class="button_one" @click="openPay=true">
				{{$t('app.shenqing.pay')}}
			</view>
		</view>
		<!-- 支付弹框 -->
		<view class="shenBorker_pop" v-if="openPay">
			<view class="shenBorker_pop_centent">
				<view class="shenBorker_pop_count">
					<view class="centent_close" @click="openPay=false">
						<image src="../../../static/img/close_small_icon.png" mode="aspectFill"></image>
					</view>
					<view class="centent_title">
						{{$t('app.newAdd53')}}
					</view>
					<view class="centent_price">
						${{configInfo.agent_price}}
					</view>
					<view class="centent_input">
						<input type="text" v-model="password" :placeholder="$t('login.pwdPlaceholder')">
					</view>
					<view class="centent_pay" @click="gopaysuccess">
						{{$t('app.shen36')}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		$request
	} from "@/utils/request";
	export default {
		data() {
			return {
				configInfo: "",
				isBgcolor: false,
				openPay: false,
				password:"",
			}
		},
		onPageScroll(e) {
			this.isBgcolor = ~~e.scrollTop > 30 ? true : false
		},
		onLoad() {
			this.getConfig()
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
			getConfig() {
				$request("getagentConfig").then(res => {
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
					this.configInfo = data
					// console.log(data,'代理配置')
				})
			},
			gopaysuccess(){
				this.openPay=false
				$request("getapplyAgent",{password:this.password}).then(res => {
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
					uni.showToast({
						icon:"none",
						title:this.$t('app.daili.yeji8')
					})
					setTimeout(()=>{
						uni.navigateBack()
					},1500)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.shenBroker {
		width: 100%;
		box-sizing: border-box;
		padding-bottom: 160rpx;

		// 封装头部
		.navActive {
			background: #FFFFFF;
		}

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

		.shenBroker_bg {
			width: 100%;
			position: relative;

			image {
				width: 100%;
			}

			.shenBroker_centent {
				width: 690rpx;
				position: absolute;
				left: 30rpx;
				top: 300rpx;
				box-sizing: border-box;
				padding: 37rpx 30rpx;
				background-color: #ffffff;
				border-radius: 20rpx;

				.shenBroker_title {
					font-family: PingFang SC, PingFang SC;
					font-weight: 800;
					font-size: 40rpx;
					color: #3A2633;
				}

				.shenBroker_desc {
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #3A2633;
					margin-top: 25rpx;
				}
			}
		}

		.shenBroker_button {
			width: 100%;
			height: 160rpx;
			background-color: #ffffff;
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 999;
			display: flex;
			align-items: center;
			justify-content: center;

			.button_one {
				width: 600rpx;
				height: 110rpx;
				line-height: 110rpx;
				text-align: center;
				background: linear-gradient(180deg, #EF8E1F 0%, #F0AC05 100%);
				border-radius: 20rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 800;
				font-size: 30rpx;
				color: #FFFFFF;
			}
		}

		.shenBorker_pop {
			width: 100%;
			height: 100vh;
			background: rgba(0, 0, 0, 0.2);
			position: fixed;
			left: 0;
			top: 0;
			z-index: 1000;

			.shenBorker_pop_centent {
				width: 100%;
				box-sizing: border-box;
				padding: 115rpx 30rpx 60rpx;
				position: absolute;
				left: 0;
				bottom: 0;
				box-sizing: border-box;
				padding: 30rpx 30rpx 60rpx;
				background-color: #FFFFFF;
				border-radius: 30rpx 30rpx 0 0;

				.shenBorker_pop_count {
					position: relative;

					.centent_close {
						width: 80rpx;
						height: 80rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						position: absolute;
						right: 0;
						top: 0;

						image {
							width: 53rpx;
							height: 53rpx;
						}
					}

					.centent_title {
						width: 100%;
						text-align: center;
						font-family: PingFang SC, PingFang SC;
						font-weight: 800;
						font-size: 30rpx;
						color: #3A2633;
						box-sizing: border-box;
						padding-top: 25rpx;
					}

					.centent_price {
						width: 100%;
						text-align: center;
						margin-top: 25rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 800;
						font-size: 45rpx;
						color: #F3581D;
					}

					.centent_input {
						width: 100%;
						height: 110rpx;
						background: #F4F4F4;
						border-radius: 20rpx;
						margin-top: 35rpx;
						box-sizing: border-box;
						padding: 0 30rpx;

						input {
							height: 110rpx;
							font-family: PingFang SC, PingFang SC;
							font-size: 38rpx;
						}
					}

					.centent_pay {
						width: 100%;
						height: 120rpx;
						line-height: 120rpx;
						text-align: center;
						background: linear-gradient(180deg, #EF8E1F 0%, #F0AC05 100%);
						border-radius: 20rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 800;
						font-size: 30rpx;
						color: #FFFFFF;
						margin-top: 80rpx;
					}
				}

			}
		}
	}
</style>