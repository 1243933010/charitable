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
						{{$t('app.daili.yeji')}}
					</view>
				</view>
			</view>
		</view>
		<view class="shenBroker_bg">
			<image src="../../../static/userStatic/shen_bg.png" mode="widthFix"></image>
			<view class="shenBroker_centent">
				<view class="shenBroker_one" @click="goPath(`/pages/me/broker/broker`)">
					<image src="../../../static/userStatic/daili_one.png" mode="aspectFill"></image>
					<view class="shenBroker_onecount">
						<view class="shenBroker_onecount_title">
							{{$t('app.daili.yeji1')}}
						</view>
						<view class="shenBroker_onecount_price">
							{{configInfo.s_user_num||0}}人
						</view>
					</view>
				</view>
				<view class="shenBroker_one" @click="goPath(`/pages/me/broker/broker`)">
					<image src="../../../static/userStatic/daili_two.png" mode="aspectFill"></image>
					<view class="shenBroker_onecount">
						<view class="shenBroker_onecount_title" style="color: #ffffff;">
							{{$t('app.daili.yeji2')}}
						</view>
						<view class="shenBroker_onecount_price" style="color: #ffffff;">
							${{configInfo.auction_amount_week||0}}
						</view>
					</view>
				</view>
				<view class="shenBroker_one" @click="goPath(`/pages/me/broker/broker`)">
					<image src="../../../static/userStatic/daili_three.png" mode="aspectFill"></image>
					<view class="shenBroker_onecount">
						<view class="shenBroker_onecount_title" style="color: #ffffff;">
							{{$t('app.daili.yeji3')}}
						</view>
						<view class="shenBroker_onecount_price" style="color: #ffffff;">
							${{configInfo.auction_amount||0}}
						</view>
					</view>
				</view>
				<view class="shenBroker_one" @click="goPath(`/pages/me/broker/broker`)">
					<image src="../../../static/userStatic/daili_four.png" mode="aspectFill"></image>
					<view class="shenBroker_onecount">
						<view class="shenBroker_onecount_title" style="color: #ffffff;">
							{{$t('app.daili.yeji4')}}
						</view>
						<view class="shenBroker_onecount_price" style="color: #ffffff;">
							${{configInfo.income_amount||0}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="shenBroker_button">
			<view class="button_one" @click="openPay = true">
				{{$t('app.daili.yeji5')}}
			</view>
		</view>
		<view class="shenBorker_pop" v-if="openPay">
			<view class="shenBorker_pop_centent">
				<view class="shenBorker_pop_count">
					<view class="centent_close" @click="openPay=false">
						<image src="../../../static/img/close_small_icon.png" mode="aspectFill"></image>
					</view>
					<view class="centent_title">
						{{$t('app.daili.yeji6')}}
					</view>
					<view class="centent_input">
						$ {{userInfo.agent_commission}}
					</view>
					<view class="input_zhu">
						{{$t('app.daili.yeji7')}}
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
	export default{
		data(){
			return {
				content:'dhsfgsdhf gsdf sfsdjkfjksdhfksjh 事件的发生就发送高富帅粉红色还是',
				isBgcolor:false,
				configInfo:"",
				openPay:false,
				userInfo:"",
			}
		},
		onPageScroll(e) {
			this.isBgcolor = ~~e.scrollTop > 30 ? true : false
		},
		onLoad() {
			this.getConfig()
			this.getUserinfo() //获取用户详情
		},
		methods:{
			goBack(){
				uni.navigateBack()
			},
			goPath(link) {
				if (uni.getStorageSync('token')) {
					uni.navigateTo({
						url: link,
					});
				} else {
					uni.reLaunch({
						url: "/pages/login/index"
					})
				}
			},
			getConfig() {
				$request("getagentAchievement").then(res => {
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
			async getUserinfo() {
				let res = await $request('getInfo', {});
				if (res.data.code == 200) {
					this.userInfo = res.data.data;
					// console.log(this.userInfo)
				}
				// console.log(res,'用户详情')
			},
			gopaysuccess(){
				this.openPay=false
				$request("getreceiveAgentReward",{amount:this.userInfo.agent_commission}).then(res => {
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
						title:this.$t('app.daili.yeji9')
					})
					this.getUserinfo() //获取用户详情
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.shenBroker{
		width: 100%;
		box-sizing: border-box;
		padding-bottom: 160rpx;
		// 封装头部
		.navActive{
			background: #FFFFFF;
		}
		.month_nav{
			width: 100%;
			height: calc(100rpx + var(--status-bar-height));
			position: fixed;
			left: 0;
			top: 0;
			z-index: 999;
			.nav_status{
				width: 100%;
				height: var(--status-bar-height);
			}
			.nav_header{
				width: 100%;
				height: 100rpx;
				position: relative;
				.nav_left{
					width: 100rpx;
					height: 100rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					position: absolute;
					left: 0;
					top: 0;
					image{
						width: 20rpx;
						height: 18rpx;
					}
				}
				.nav_centent{
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
		.shenBroker_bg{
			width: 100%;
			position: relative;
			image{
				width: 100%;
			}
			.shenBroker_centent{
				width: 690rpx;
				position: absolute;
				left: 30rpx;
				top: 300rpx;
				.shenBroker_one{
					position: relative;
					margin-bottom: 30rpx;
					image{
						width: 690rpx;
						height: 230rpx;
					}
					.shenBroker_onecount{
						position: absolute;
						left: 0;
						top: 0;
						box-sizing: border-box;
						padding: 50rpx 52rpx;
						.shenBroker_onecount_title{
							font-family: PingFang SC, PingFang SC;
							font-weight: bold;
							font-size: 30rpx;
							color: #644A40;
						}
						.shenBroker_onecount_price{
							font-family: PingFang SC, PingFang SC;
							font-weight: 800;
							font-size: 40rpx;
							color: #EB7B31;
							margin-top: 30rpx;
						}
					}
				}
			}
		}
		.shenBroker_button{
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
			.button_one{
				width: 600rpx;
				height: 110rpx;
				line-height: 110rpx;
				text-align: center;
				background: linear-gradient( 180deg, #EF8E1F 0%, #F0AC05 100%);
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
						// text-align: center;
						font-family: PingFang SC, PingFang SC;
						font-weight: 800;
						font-size: 30rpx;
						color: #3A2633;
						box-sizing: border-box;
						padding-top: 65rpx;
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
						line-height: 110rpx;
						background: #F4F4F4;
						border-radius: 20rpx;
						margin-top: 35rpx;
						box-sizing: border-box;
						padding: 0 30rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 800;
						font-size: 50rpx;
						color: #F3581D;
					}
					.input_zhu{
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 24rpx;
						color: #3A2633;
						box-sizing: border-box;
						padding: 35rpx 20rpx 0;
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