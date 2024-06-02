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
						{{$t('index.menuBtn5')}}
					</view>
				</view>
			</view>
		</view>
		<view class="withdrawal_bg" :style="[bg_image]">
			<view class="withdrawal_centent">
				<view class="withdrawal_bg_title">
					{{$t('app.month.chongzhidao')}}
				</view>
				<view class="withdrawal_one" :class="{'withdrawal_oneActive':tongdaoIndex==index}" v-for="(item,index) in tongdaoArray" :key="index" @click="tongdaoIndex=index">
					<image v-if="tongdaoIndex==index" :src="item.iconSelect" mode="widthFix"></image>
					<image v-else :src="item.icon" mode="widthFix"></image>
					{{item.name}}
				</view>
			</view>
		</view>
		<view class="withdrawal_count">
			<view class="withdrawal_count_title">
				{{$t('app.quantity')}}
			</view>
			<view class="withdrawal_count_one">
				<view class="count_one_left" style="color: #333333;">
					{{$t('app.quantity')}}
				</view>
				<view class="count_one_right">
					<input type="number" v-model="money" :placeholder="$t('app.month.number')">
				</view>
			</view>
			<view class="withdrawal_count_one">
				<view class="count_one_left" style="color: #333333;">
					{{$t('app.month.huilv')}}
				</view>
				<view class="count_one_rightactive" v-if="tongdaoIndex==0">
					1:{{config.recharge_rate_usdc}}
				</view>
				<view class="count_one_rightactive" v-if="tongdaoIndex==1">
					1:{{config.recharge_rate_usdt}}
				</view>
			</view>
			<view class="withdrawal_count_one">
				<view class="count_one_left" style="color: #333333;">
					{{$t('app.month.fukuanjine')}}
				</view>
				<view class="count_one_rightactive">
					{{totalPriceBalance(money)}}
				</view>
			</view>
			<!-- 按钮 -->
			<view class="withdrawal_count_button" @click="goReacher">
				{{$t('index.menuBtn5')}}
			</view>
			<view class="withdrawal_count_wraning">
				<view class="wraning_title">
					{{$t('app.month.warning')}}
				</view>
				<view class="wraning_desc">
					{{config.recharge_notice}}
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
				isBgcolor: false,
				bg_image: {
					backgroundImage: `url(../../static/userStatic/user_bg.png)`,
					backgroundSize: `100% 100%`
				},
				tongdaoArray:[
					{
						name:"USDC(BEP20/BSC)",
						icon:"../../../static/userStatic/redio_w.png",
						iconSelect:"../../../static/userStatic/redio_y.png"
					},
					{
						name:"USDT(TRC20)",
						icon:"../../../static/userStatic/redio_w.png",
						iconSelect:"../../../static/userStatic/redio_y.png"
					}
				],
				tongdaoIndex:0,
				config:"",
				money:"",//提现金额
			}
		},
		onPageScroll(e) {
			this.isBgcolor = ~~e.scrollTop > 30 ? true : false
		},
		onLoad() {
			this.getWithdraw()
		},
		computed:{
			totalPriceBalance(){
				return value=>{
					if(value){
						return  (Number(value) * Number(this.tongdaoIndex == 0 ? this.config.recharge_rate_usdc : this.config.recharge_rate_usdt)).toFixed(2)
					}else{
						return 0
					}
				}
			}
		},
		methods:{
			async getWithdraw(){
				let res = await $request('getRechargeConfig', {});
				if (res.data.code == 200) {
					// console.log(res.data.data,'配置')
					this.config=res.data.data.recharge
					this.tongdaoArray[0].name=this.config.recharge_usdc
					this.tongdaoArray[1].name=this.config.recharge_usdt
				}
			},
			goBack(){
				uni.navigateBack()
			},
			goReacher(){
				if(!this.money) return uni.showToast({
					icon:"none",
					title:this.$t('app.month.number')
				})
				var money = (Number(this.money) * Number(this.tongdaoIndex == 0 ? this.config.recharge_rate_usdc : this.config.recharge_rate_usdt)).toFixed(2)
				uni.navigateTo({
					url:`/pages/me/month/rechargeDetail?money=${money}&channel=${this.tongdaoIndex+1}&name=${this.tongdaoArray[this.tongdaoIndex].name}&recharge_usdt_qr_code=${this.config.recharge_usdt_qr_code}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.withdrawal {
		width: 100%;
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
				.withdrawal_one{
					width: 100%;
					height: 90rpx;
					box-sizing: border-box;
					padding: 0 20rpx;
					display: flex;
					align-items: center;
					image{
						width: 30rpx;
						height: 30rpx;
						margin-right: 10rpx;
					}
					font-family: PingFang SC, PingFang SC;
					font-weight: bold;
					font-size: 30rpx;
					color: #8F8F8F;
				}
				.withdrawal_oneActive{
					background: #F9F0EA;
					color: #EB7B31;
					border-radius: 15rpx;
				}
			}
		}
		.withdrawal_count{
			width: 100%;
			box-sizing: border-box;
			padding: 0 30rpx;
			margin-top: -120rpx;
			.withdrawal_count_title{
				font-family: PingFang SC, PingFang SC;
				font-weight: 800;
				font-size: 34rpx;
				color: #3A2633;
				margin-left: 30rpx;
			}
			.withdrawal_count_one{
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
				.count_one_left{
					font-family: PingFang SC, PingFang SC;
					font-weight: bold;
					font-size: 26rpx;
					color: #8F8F8F;
				}
				.count_one_right{
					image{
						width: 22rpx;
					}
					input{
						flex: 1;
						height: 100%;
						text-align: right;
						font-family: PingFang SC, PingFang SC;
						font-weight: bold;
						font-size: 26rpx;
					}
				}
				.count_one_rightactive{
					font-family: PingFang SC, PingFang SC;
					font-weight: 800;
					font-size: 26rpx;
					color: #3A2633;
				}
			}
			.withdrawal_count_two{
				font-family: PingFang SC, PingFang SC;
				font-weight: 800;
				font-size: 30rpx;
				color: #3A2633;
				margin-top: 40rpx;
				margin-left: 30rpx;
			}
			.withdrawal_count_twoInput{
				width: 100%;
				height: 98rpx;
				background: #F4F4F4;
				border-radius: 10rpx;
				box-sizing: border-box;
				padding: 0 20rpx;
				margin-top: 25rpx;
				input{
					width: 100%;
					height: 98rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 26rpx;
				}
			}
			.withdrawal_count_button{
				width: 100%;
				height: 98rpx;
				line-height: 98rpx;
				text-align: center;
				background: linear-gradient( 180deg, #EF8E1F 0%, #F0AC05 100%);
				border-radius: 20rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 800;
				font-size: 30rpx;
				color: #FFFFFF;
				margin-top: 25rpx;
			}
			.withdrawal_count_wraning{
				width: 100%;
				margin-top: 80rpx;
				.wraning_title{
					font-family: PingFang SC, PingFang SC;
					font-weight: 800;
					font-size: 30rpx;
					color: #3A2633;
				}
				.wraning_desc{
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