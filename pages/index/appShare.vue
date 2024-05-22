<template>
	<view class="index-page1 ">
		<hx-navbar :config="config" />
		
		<view class="content">
			<view class="qr-code">
				<image src="../../static/img/bg/index_bg.png" mode="widthFix"></image>
			</view>
			<view class="link">
				<view class="text">
					<text>pe=16047&query=&keyfrom=baidu&smsdsdsd</text>
					<!-- pe=16047&query=&keyfrom=baidu&smsdsdsdsdsdsdsdsdsd -->
				</view>
				<view class="copy">
					<text>{{$t("join.copy")}}</text>
				</view>
			</view>
			<view class="footer">
				<view class="title">
					<text>{{$t("app.newAdd41")}}</text>
				</view>
				<view class="icon">
					<view class="img">
						<image src="../../static/img/icon/index/telegram1.png" mode="widthFix"></image>
						<text>Telegram</text>
					</view>
					<view class="img">
						<image src="../../static/img/icon/index/wechats1.png" mode="widthFix"></image>
						<text>WhatsAPP</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import hxNavbar from "@/components/hx-navbar.vue";
	import {
		$request
	} from "@/utils/request.js";
	export default {
		components: {
			hxNavbar,
		},
		computed: {
			config() {
				return {
					title: this.$t("app.newAdd40"),
					color: "#403039",
					backgroundColor: [1, ['#FCEEB7', '#FEE1AB']],
				};
			},
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="less">
	@import "../../static/less/variable.less";
	.index-page1 {
		width: 100%;
		height: 100%;
		// background-color: #F4F4F4;
		background: url("../../static/img/bg/app_bk.png") no-repeat top center / 100% 100%;
		.content{
			width: 100%;
			padding-top: 460rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			.qr-code{
				width: 286rpx;
				margin-bottom: 33rpx;
				image{
					width: 100%;
				}
			}
			.link{
				width: calc(100% - 30rpx);
				margin: 0 auto;
				border-radius: 50rpx;
				background-color: #FBB77C;
				color: #533612;
				font-size: 26rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				box-sizing: border-box;
				padding: 16rpx 33rpx;
				.text{
					width: 80%;
					overflow: hidden;
					text-overflow: ellipsis;
					
					text{
						white-space: nowrap;
					}
				}
				.copy{
					width: 120rpx;
					height: 52rpx;
					background: #F0931B;
					border-radius: 50rpx 50rpx 50rpx 50rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					color: #FFFFFF;
					font-size: 26rpx;
					font-weight: 600;
				}
			}
			.footer{
				width: 100%;
				padding-top: 33rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				.title{
					color: #533612;
					font-size: 30rpx;
					font-weight: 600;
					margin-bottom: 64rpx;
				}
				.icon{
					width: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					.img{
						display: flex;
						flex-direction: column;
						align-items: center;
						margin: 0 70rpx;
						image{
							width: 90rpx;
							margin-bottom: 20rpx;
						}
						text{
							color: 533612;
							font-size: 24rpx;
							font-weight: 600;
						}
					}
				}
			}
		}
	}
</style>
