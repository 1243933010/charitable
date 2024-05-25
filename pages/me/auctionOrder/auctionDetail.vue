<template>
	<view class="auctionDetail">
		<hx-navbar :config="config" />
		<view class="auctionDetail_centent">
			<view class="auctionDetail_top">
				<view class="auctionDetail_top_left">
					<image src="../../../static/img/cn.png" mode="aspectFill"></image>
					<view class="left_centent">
						<view class="left_name">
							白色的空开放式学校背包
						</view>
						<view class="left_price">
							当前价格：500 USDT
						</view>
						<view class="left_priced">
							我的竞价：500 USDT
						</view>
					</view>
				</view>
				<view class="auctionDetail_top_right">
					已出价
				</view>
			</view>
			<view class="auctionDetail_top_title">
				订单详情
			</view>
			<view class="auctionDetail_toptwo">
				<view class="toptwo_title">
					<view class="title_left">
						商品名称：
					</view>
					<view class="title_right">
						白色的空开放式学校背包
					</view>
				</view>
				<view class="toptwo_title">
					<view class="title_left">
						订单编号：
					</view>
					<view class="title_right">
						46516543131
					</view>
				</view>
				<view class="toptwo_title">
					<view class="title_left">
						订单金额：
					</view>
					<view class="title_right">
						500USDT
					</view>
				</view>
				<view class="toptwo_title">
					<view class="title_left">
						结束时间：
					</view>
					<view class="title_right">
						2024-05-20 10:00
					</view>
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
					title: '详情',
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
	.auctionDetail{
		width: 100%;
		min-height: 100vh;
		background-color: #F4F4F4;
		.auctionDetail_centent{
			width: 100%;
			box-sizing: border-box;
			padding: 30rpx 30rpx 24rpx;
			.auctionDetail_top{
				width: 100%;
				box-sizing: border-box;
				padding: 15rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				background-color: #FFFFFF;
				border-radius: 15rpx;
				.auctionDetail_top_left{
					display: flex;
					image{
						width: 144rpx;
						height: 144rpx;
						border-radius: 10rpx;
					}
					.left_centent{
						width: 380rpx;
						margin-left: 15rpx;
						.left_name{
							font-family: PingFang SC, PingFang SC;
							font-weight: bold;
							font-size: 24rpx;
							color: #3A2633;
						}
						.left_price{
							font-family: PingFang SC, PingFang SC;
							font-weight: 800;
							font-size: 26rpx;
							color: #F3581D;
							margin-top: 5rpx;
						}
						.left_priced{
							width: 100%;
							height: 50rpx;
							line-height: 50rpx;
							background: #FFF3DF;
							border-radius: 10rpx;
							display: flex;
							align-items: center;
							font-family: PingFang SC, PingFang SC;
							font-weight: 400;
							font-size: 24rpx;
							color: #976D23;
							margin-top: 15rpx;
						}
					}
				}
				.auctionDetail_top_right{
					font-family: PingFang SC, PingFang SC;
					font-weight: 800;
					font-size: 26rpx;
					color: #F3581D;
				}
			}
			.auctionDetail_top_title{
				width: 100%;
				box-sizing: border-box;
				padding: 30rpx 15rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 32rpx;
				color: #3A2633;
			}
			.auctionDetail_toptwo{
				width: 100%;
				box-sizing: border-box;
				padding: 33rpx 35rpx;
				background-color: #FFFFFF;
				border-radius: 10rpx;
				.toptwo_title{
					width: 100%;
					display: flex;
					align-items: center;
					margin-bottom: 30rpx;
					.title_left{
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 26rpx;
						color: #3A2633;
					}
					.title_right{
						flex: 1;
						margin-left: 20rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 26rpx;
						color: #3A2633;
						text-align: right;
					}
				}
			}
		}
		
	}
</style>