<template>
	<view class="month">
		<!-- 封装头部 -->
		<view class="month_nav">
			<view class="nav_height">
				<!-- 状态栏 -->
				<view class="nav_status">
					
				</view>
				<view class="nav_header">
					<view class="nav_left" @click="goBack">
						<image src="../../../static/userStatic/left.png" mode="widthFix"></image>
					</view>
					<view class="nav_centent">
						{{$t('app.user.balance')}}
					</view>
				</view>
			</view>
		</view>
		<view class="month_bg" :style="[bg_image]">
			<view class="month_centent">
				<view class="month_title">
					{{$t('app.user.qianbaoyue')}}（USD）
				</view>
				<view class="month_price">
					{{userInfo.balance||0}}
				</view>
				<view class="month_bg_button">
					<view class="button_one" @click="goWithdraw">
						{{$t('withdraw.pageTit')}}
					</view>
					<view class="button_one button_two" @click="goPath('/pages/me/month/recharge')">
						{{$t('index.menuBtn5')}}
					</view>
				</view>
				<view class="month_bg_name" @click="goPath('/pages/me/month/accountDetail')">
					{{$t('app.user.zhanghumingxi')}} >
				</view>
			</view>
		</view>
		<!-- 内容区域 -->
		<view class="month_counted">
			<view class="month_counted_title">
				{{$t('app.month.more')}}
			</view>
			<!-- 分享奖励 -->
			<view class="month_counted_share">
				<view class="counted_share_left">
					<view class="share_left_title">
						{{$t('app.month.sharejiangli')}} (USD)
					</view>
					<view class="share_left_price">
						{{userInfo.share_bonus||0}}
					</view>
				</view>
				<view class="counted_share_right" @click="goPath('/pages/me/month/jiangliDetail')">
					{{$t('app.month.jianglidetail')}}>
				</view>
			</view>
			<view class="month_counted_share" style="background: #DE8F4F;">
				<view class="counted_share_left">
					<view class="share_left_title" style="color: #ffffff;">
						{{$t('app.month.gongyijijin')}} (USD)
					</view>
					<view class="share_left_price" style="color: #ffffff;">
						{{userInfo.public_welfare_fund||0}}
					</view>
				</view>
				<view class="counted_share_right" style="color: #FFF8F1;" @click="goPath('/pages/me/month/jijinDetail')">
					{{$t('app.month.jijindetail')}}>
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
		data(){
			return {
				bg_image: {
					backgroundImage: `url(${filesUrl}/uploads/20240604/image/6dd507cb3edbab605dc1e1dd09722aa9.webp)`,
					backgroundSize: `100% 100%`
				},
				userInfo:"",
			}
		},
		onShow() {
			this.getUserinfo()//获取用户详情
		},
		methods:{
			goBack(){
				uni.navigateBack()
			},
			goPath(link){
				uni.navigateTo({
					url: link,
				});
			},
			async getUserinfo(){
				let res = await $request('getInfo', {});
				if (res.data.code == 200) {
					this.userInfo = res.data.data;
					console.log(this.userInfo)
				}
				// console.log(res,'用户详情')
			},
			goWithdraw(){
				if(this.userInfo.usdt!=''||this.userInfo.usdc!=''){
					this.goPath('/pages/me/month/withdrawal')
				}else{
					this.goPath('/pages/me/setting/bindAccout')
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.month{
		width: 100%;
		min-height: 100vh;
		background-color: #ffffff;
		// 封装头部
		.month_nav{
			width: 100%;
			height: calc(100rpx + var(--status-bar-height));
			position: fixed;
			left: 0;
			top: 0;
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
		.month_bg{
			width: 100%;
			height: 880rpx;
			background-repeat: no-repeat;
			box-sizing: border-box;
			padding: 240rpx 24rpx 0;
			.month_centent{
				width: 100%;
				min-height: 100rpx;
				background-color: #ffffff;
				border-radius: 20rpx;
				box-sizing: border-box;
				padding: 50rpx 30rpx 0;
				.month_title{
					width: 100%;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 30rpx;
					color: #3A2633;
					text-align: center;
				}
				.month_price{
					font-family: PingFang SC, PingFang SC;
					font-weight: 800;
					font-size: 50rpx;
					color: #3A2633;
					margin-top: 20rpx;
					text-align: center;
				}
				.month_bg_button{
					width: 100%;
					box-sizing: border-box;
					padding: 50rpx 0;
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-bottom: 1rpx solid #E1DAD1;
					.button_one{
						width: 300rpx;
						height: 100rpx;
						line-height: 100rpx;
						text-align: center;
						background: #F5DDC6;
						border-radius: 80rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 800;
						font-size: 30rpx;
						color: #DD995E;
					}
					.button_two{
						background: linear-gradient( 180deg, #EF8E1F 0%, #F0AC05 100%);
						color: #ffffff;
					}
				}
				.month_bg_name{
					width: 100%;
					height: 104rpx;
					line-height: 104rpx;
					text-align: center;
					font-family: PingFang SC, PingFang SC;
					font-weight: bold;
					font-size: 26rpx;
					color: #3A2633;
				}
			}
			
		}
		.month_counted{
			width: 100%;
			box-sizing: border-box;
			padding: 0 30rpx;
			margin-top: -80rpx;
			.month_counted_title{
				font-family: PingFang SC, PingFang SC;
				font-weight: 800;
				font-size: 34rpx;
				color: #3A2633;
			}
			.month_counted_share{
				width: 100%;
				height: 170rpx;
				background: #F9F0EA;
				border-radius: 20rpx;
				box-sizing: border-box;
				padding: 24rpx 50rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 25rpx;
				.counted_share_left{
					.share_left_title{
						font-family: PingFang SC, PingFang SC;
						font-weight: 800;
						font-size: 26rpx;
						color: #924E15;
					}
					.share_left_price{
						font-family: PingFang SC, PingFang SC;
						font-weight: 800;
						font-size: 50rpx;
						margin-top: 10rpx;
						color: #924E15;
					}
				}
				.counted_share_right{
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 26rpx;
					color: #924E15;
				}
			}
		}
	}
</style>