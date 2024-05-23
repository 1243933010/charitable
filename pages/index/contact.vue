<template>
	<view class="profix-page-container">
		<hx-navbar :config="config" style="position: absolute; top: 0; width: 100vw;" />
		<scroll-view :scroll-y="true" class="charity-products-scroll page-scroll">
			<view class="white-box">
				<view class="box-tit">客服热线01</view>
				<view class="two-in-row">
					<view class="item" style="background-color: #FFF5E5;">
						<view class="pic">
							<image src="@/static/img/icon/telegram.png" mode="widthFix" class="img"></image>
						</view>
						<view class="types-tit">Telegram</view>
						<view class="number-phone">+855-76-802-4477</view>
					</view>
					<view class="item" style="background-color: #F4FFE5;">
						<view class="pic">
							<image src="@/static/img/icon/wechat.png" mode="widthFix" class="img"></image>
						</view>
						<view class="types-tit">Wechats</view>
						<view class="number-phone">+855-76-802-4477</view>
					</view>
				</view>
				<view class="other-row" style="background-color: #FFF5E5;">
					<view class="pic">
						<image src="@/static/img/icon/whatsapp.png" mode="widthFix" class="img"></image>
					</view>
					<view class="types-tit">其他</view>
					<view class="number-phone">+855-76-802-4477</view>
				</view>
			</view>
			<view class="white-box">
				<view class="box-tit">客服热线01</view>
				<view class="two-in-row">
					<view class="item" style="background-color: #FFF5E5;">
						<view class="pic">
							<image src="@/static/img/icon/telegram.png" mode="widthFix" class="img"></image>
						</view>
						<view class="types-tit">Telegram</view>
						<view class="number-phone">+855-76-802-4477</view>
					</view>
					<view class="item" style="background-color: #F4FFE5;">
						<view class="pic">
							<image src="@/static/img/icon/wechat.png" mode="widthFix" class="img"></image>
						</view>
						<view class="types-tit">Wechats</view>
						<view class="number-phone">+855-76-802-4477</view>
					</view>
				</view>
				<view class="other-row" style="background-color: #FFF5E5;">
					<view class="pic">
						<image src="@/static/img/icon/whatsapp.png" mode="widthFix" class="img"></image>
					</view>
					<view class="types-tit">其他</view>
					<view class="number-phone">+855-76-802-4477</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import hxNavbar from "@/components/hx-navbar.vue";
	import { $request } from "@/utils/request.js";
	import productTestImg from "@/static/img/cn.png";
	
	export default {
		components: {
			hxNavbar,
		},
		computed: {
			config() {
				return {
					title: this.$t("app.shen16"),
					color: "#403039",
					backgroundColor: [1, ['#FCEEB7', '#FEE1AB']],
				};
			},
		},
		data() {
			return {
			};
		},
		mounted() {
		},
		methods: {
			goPage(url) {
				uni.navigateTo({
					url,
				});
			},
		}
	}
</script>

<style lang="less">
@import "@/static/less/variable.less";

page {
	background-color: #F4F4F4;
}

.profix-page-container {
	.charity-products-scroll {
		padding-top: 88rpx;
		
		.white-box {
			margin-top: 25rpx;
			border-radius: 40rpx;
			padding: 30rpx;
			background-color: #fff;
			
			.box-tit {
				margin-bottom: 20rpx;
				.df(center);
				color: #3A2633;
				font-size: 30rpx;
				font-weight: bold;
				line-height: 1.4;
				
				&:before {
					content: '';
					margin-right: 14rpx;
					border-radius: 50%;
					width: 20rpx;
					height: 20rpx;
					flex-shrink: 0;
					display: block;
					background-image: linear-gradient(to bottom, #EC4202 0%, #FE7B4A 100%);
				}
			}
			
			.two-in-row {
				margin-bottom: 16rpx;
				.df(stretch, space-between);
				
				.item {
					border-radius: 20rpx;
					padding: 22rpx 28rpx;
					width: calc(50% - 15rpx);
					
					.pic {
						margin-bottom: 12rpx;
						border-radius: 50%;
						width: 58rpx;
						height: 58rpx;
					}
					
					.types-tit {
						margin-bottom: 12rpx;
						color: #3A2633;
						font-weight: bold;
						font-size: 30rpx;
						line-height: 1.4;
					}
					
					.number-phone {
						color: #3A2633;
						font-size: 24rpx;
						line-height: 1.375;
					}
				}
			}
			
			.other-row {
				padding: 18rpx 30rpx;
				.df(center);
				
				.pic {
					margin-right: 36rpx;
					border-radius: 50%;
					width: 58rpx;
					height: 58rpx;
					flex-shrink: 0;
				}
				
				.types-tit {
					margin-right: 36rpx;
					color: #3A2633;
					font-weight: bold;
					font-size: 30rpx;
					line-height: 1.4;
					flex-shrink: 0;
				}
				
				.number-phone {
					flex-grow: 1;
					color: #3A2633;
					font-size: 24rpx;
					line-height: 1.375;
				}
			}
		}
	}
}
</style>