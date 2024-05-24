<template>
	<view class="friends">
		<view class="broker_header">
			<view class="broker_stauts">
				
			</view>
			<view class="broker_nav">
				<view class="nav_left" @click="goBack">
					<image src="../../../static/userStatic/left.png" mode="widthFix" style="width: 22rpx;"></image>
				</view>
				<view class="nav_count">
					我的好友
				</view>
			</view>
		</view>
		<view class="broker_search">
			<view class="broker_search_left">
				<image src="../../../static/userStatic/search.png" mode="aspectFill"></image>
				<input type="text" placeholder="请输入">
			</view>
			<view class="broker_search_right">
				搜索
			</view>
		</view>
		<scroll-view scroll-y="true" class="scroll_h">
			<view class="friends_centent">
				<view class="friends_ones" v-for="(item,index) in 10" :key="index">
					<image src="../../../static/img/cn.png" mode="aspectFill"></image>
					<view class="friends_onescount">
						<view class="friends_ones_name">
							<view class="name_left">
								张三
							</view>
							<view class="name_right">
								此处显示层级
							</view>
						</view>
						<view class="friends_ones_bottom">
							<view class="ones_bottom_left">
								<view class="friends_ones_phone">
									18839263345
								</view>
								<view class="friends_ones_time">
									注册时间：2024.5.19 
								</view>
							</view>
							<view class="ones_bottom_right">
								<image src="../../../static/userStatic/add_friends.png" mode="aspectFill"></image>
								添加好友
							</view>
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
	.friends{
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
				height: 100rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				position: relative;
				.nav_left{
					width: 100rpx;
					height: 100rpx;
					position: absolute;
					left: 0;
					top: 0;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.nav_count{
					font-family: PingFang SC, PingFang SC;
					font-weight: 800;
					font-size: 36rpx;
					color: #403039;
				}
			}
		}
		.broker_search{
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 20rpx auto;
			.broker_search_left{
				width: 448rpx;
				height: 92rpx;
				background: #F4F4F4;
				border-radius: 50rpx;
				display: flex;
				align-items: center;
				box-sizing: border-box;
				padding: 0 40rpx;
				image{
					width: 33.5rpx;
					height: 33.7rpx;
					margin-right: 20rpx;
				}
				input{
					flex: 1;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 30rpx;
				}
			}
			.broker_search_right{
				width: 191rpx;
				height: 92rpx;
				line-height: 92rpx;
				text-align: center;
				background: #F0931B;
				border-radius: 50rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 30rpx;
				color: #FFFFFF;
				margin-left: 20rpx;
			}
		}
		.scroll_h{
			width: 100%;
			height: calc(100vh - 260rpx - var(--status-bar-height));
			box-sizing: border-box;
			padding: 0 30rpx;
			.friends_centent{
				width: 100%;
				height: calc(100vh - 260rpx - var(--status-bar-height));
				box-sizing: border-box;
				.friends_ones{
					width: 100%;
					height: 180rpx;
					background: #F4F4F4;
					border-radius: 10rpx;
					display: flex;
					box-sizing: border-box;
					padding: 20rpx 30rpx;
					margin-bottom: 20rpx;
					image{
						width: 97rpx;
						height: 97rpx;
						border-radius: 50%;
					}
					.friends_onescount{
						flex: 1;
						margin-left: 20rpx;
						.friends_ones_name{
							width: 100%;
							display: flex;
							align-items: center;
							justify-content: space-between;
							.name_left{
								font-family: PingFang SC, PingFang SC;
								font-weight: 800;
								font-size: 30rpx;
								color: #3A2633;
							}
							.name_right{
								font-family: PingFang SC, PingFang SC;
								font-weight: 400;
								font-size: 26rpx;
								color: #3A2633;
							}
						}
						.friends_ones_bottom{
							width: 100%;
							display: flex;
							align-items: center;
							justify-content: space-between;
							margin-top: 10rpx;
							.ones_bottom_left{
								.friends_ones_phone{
									font-family: PingFang SC, PingFang SC;
									font-weight: 800;
									font-size: 30rpx;
									color: #3A2633;
									margin-top: 10rpx;
								}
								.friends_ones_time{
									font-family: PingFang SC, PingFang SC;
									font-weight: 400;
									font-size: 26rpx;
									color: #3A2633;
									margin-top: 5rpx;
								}
							}
							.ones_bottom_right{
								width: 191rpx;
								height: 76rpx;
								background: #F0931B;
								border-radius: 50rpx;
								display: flex;
								align-items: center;
								justify-content: center;
								image{
									width: 33rpx;
									height: 33rpx;
									margin-right: 10rpx;
								}
								font-family: PingFang SC, PingFang SC;
								font-weight: 400;
								font-size: 24rpx;
								color: #FFFFFF;
							}
						}
						
					}
				}
			}
		}
	}
</style>