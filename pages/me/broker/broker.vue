<template>
	<view class="broker">
		<view class="broker_header">
			<view class="broker_stauts">
				
			</view>
			<view class="broker_nav">
				<view class="nav_left" @click="goBack">
					<image src="../../../static/userStatic/left.png" mode="widthFix" style="width: 26rpx;"></image>
				</view>
				<view class="nav_count">
					<view class="count_one" :class="{'countActive':navIndex==index}" v-for="(item,index) in navArray" :key="index" @click="navIndex=index">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
		<view class="broker_sift">
			<view class="sift_all">
				全部
			</view>
			<view class="sift_right">
				<view class="sift_name">
					2024-04
				</view>
				<image src="../../../static/userStatic/xila.png" mode="widthFix"></image>
			</view>
		</view>
		<scroll-view scroll-y="true" class="scroll_h">
			<view class="scroll_centent">
				<view class="scroll_one" v-for="(items,indexs) in 4" :key="indexs">
					<view class="scroll_one_time">
						04月
					</view>
					<view class="scroll_count" v-for="(itemed,indexed) in 6" :key="indexed">
						<view class="count_left">
							<view class="left_name">
								wnsd会员拍卖
							</view>
							<view class="left_time">
								2024-02-01
							</view>
						</view>
						<view class="count_price">
							100USD
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				navArray:[
					{
						name:"代理明细"
					},
					{
						name:"代理账单"
					}
				],
				navIndex:0,
			}
		},
		methods:{
			goBack(){
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.broker{
		width: 100%;
		.broker_header{
			width: 100%;
			background-color: #FFE3B1;
			.broker_stauts{
				width: 100%;
				height: var(--status-bar-height);
			}
			.broker_nav{
				width: 100%;
				height: 120rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				position: relative;
				.nav_left{
					width: 100rpx;
					height: 120rpx;
					position: absolute;
					left: 0;
					top: 0;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.nav_count{
					width: 440rpx;
					height: 83rpx;
					background: #FBE2AF;
					border-radius: 20rpx;
					border: 2rpx solid #FFFFFF;
					display: flex;
					.count_one{
						flex: 1;
						height: 83rpx;
						line-height: 83rpx;
						text-align: center;
						font-family: PingFang SC, PingFang SC;
						font-weight: 800;
						font-size: 26rpx;
						color: #403039;
					}
					.countActive{
						background: #FFFFFF;
						color: #EF9419;
						border-radius: 20rpx;
					}
				}
			}
		}
		.broker_sift{
			width: 100%;
			height: 140rpx;
			box-sizing: border-box;
			padding: 0 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.sift_all{
				width: 146rpx;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				background: linear-gradient( 180deg, #EF8E1E 0%, #F0AD04 100%);
				border-radius: 20rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 24rpx;
				color: #FFFFFF;
			}
			.sift_right{
				width: 510rpx;
				height: 80rpx;
				background: #F4F4F4;
				border-radius: 20rpx;
				box-sizing: border-box;
				padding: 0 30rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.sift_name{
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 30rpx;
					color: #EF9518;
				}
				image{
					width: 24rpx;
				}
			}
		}
		.scroll_h{
			width: 100%;
			height: calc(100vh - 280rpx - var(--status-bar-height));
			box-sizing: border-box;
			padding: 0 30rpx;
			.scroll_centent{
				width: 100%;
				height: calc(100vh - 280rpx - var(--status-bar-height));
				.scroll_one{
					width: 100%;
					.scroll_one_time{
						width: 100%;
						height: 80rpx;
						line-height: 80rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 800;
						font-size: 36rpx;
						color: #3A2633;
					}
					.scroll_count{
						width: 100%;
						height: 140rpx;
						background: #F4F4F4;
						border-radius: 10rpx;
						box-sizing: border-box;
						padding: 0 25rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;
						margin-bottom: 20rpx;
						.count_left{
							.left_name{
								font-family: PingFang SC, PingFang SC;
								font-weight: 800;
								font-size: 30rpx;
								color: #3A2633;
							}
							.left_time{
								font-family: PingFang SC, PingFang SC;
								font-weight: 400;
								font-size: 26rpx;
								color: #BCA988;
								margin-top: 15rpx;
							}
						}
						.count_price{
							font-family: PingFang SC, PingFang SC;
							font-weight: 800;
							font-size: 36rpx;
							color: #EF9518;
						}
					}
					.scroll_count:last-child{
						margin-bottom: 0;
					}
				}
			}
		}
	}
</style>