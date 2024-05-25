<template>
	<view class="accountDetail">
		<hx-navbar :config="config" />
		<view class="accountDetail_centent">
			<view class="accountDetail_title">
				<view class="title_left">
					全部
				</view>
				<view class="title_right">
					<view class="right_name">
						2024-04
					</view>
					<image src="../../../static/userStatic/xila.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="accountDetail_one" v-for="(item,index) in 5" :key="index">
				<view class="accountDetail_one_left">
					<view class="left_named">
						类型：充值
					</view>
					<view class="left_time">
						2024-02-01
					</view>
				</view>
				<view class="accountDetail_one_right">
					100USD
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import hxNavbar from "@/components/hx-navbar.vue";
	export default {
		components: {
			hxNavbar,
		},
		computed: {
			config() {
				return {
					title: '基金明细',
					color: "#403039",
					backgroundColor: [1, ['#FCEEB7', '#FEE1AB']],
				};
			},
		},
		data(){
			return {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.accountDetail{
		width: 100%;
		.accountDetail_centent{
			width: 100%;
			box-sizing: border-box;
			padding: 32rpx 30rpx;
			.accountDetail_title{
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 25rpx;
				.title_left{
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
				.title_right{
					width: 510rpx;
					height: 80rpx;
					background: #F4F4F4;
					border-radius: 20rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					box-sizing: border-box;
					padding: 0 52rpx;
					.right_name{
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 30rpx;
						color: #EF9518;
					}
					image{
						width: 14rpx;
					}
				}
			}
			.accountDetail_one{
				width: 100%;
				height: 140rpx;
				background: #F4F4F4;
				border-radius: 10rpx;
				box-sizing: border-box;
				padding: 26rpx 25rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 15rpx;
				.accountDetail_one_left{
					.left_named{
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
						margin-top: 18rpx;
					}
				}
				.accountDetail_one_right{
					font-family: PingFang SC, PingFang SC;
					font-weight: 800;
					font-size: 36rpx;
					color: #EF9518;
				}
			}
		}
		
	}
</style>