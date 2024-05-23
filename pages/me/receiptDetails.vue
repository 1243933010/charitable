<template>
	<view class="profix-page-container">
		<hx-navbar :config="config" style="position: absolute; top: 0; width: 100vw;" />
		<scroll-view :scroll-y="true" class="receipt-details-scroll page-scroll">
			<view class="logistics-info" v-if="status !== '0'">
				<view class="pic">
					<!-- TODO: 暂时没有图片, 有了之后直接替换图片路径即可 -->
					<image src="@/static/img/icon/icon_search.png" mode="widthFix" class="img"></image>
				</view>
				<view class="address">张三，18275556365，河南省郑州市文员北区怡丰路699号幸福小区</view>
				<view class="pic arrow">
					<!-- TODO: 暂时没有图片, 有了之后直接替换图片路径即可 -->
					<image src="@/static/img/icon/icon_search.png" mode="widthFix" class="img"></image>
				</view>
			</view>
			<view class="product-info">
				<view class="pic">
					<image src="@/static/img/cn.png" mode="widthFix" class="img"></image>
				</view>
				<view class="info">
					<view class="tit">白色的空开放式学校背包</view>
					<view class="price">500 USDT</view>
				</view>
				<view class="logistics-status">{{logisticsStatus}}</view>
			</view>
			
			<view class="white-box-tit">{{$t("app.orderDetail")}}</view>
			<view class="order-info">
				<view class="label-text">
					<view class="label">{{$t("app.shen9")}}: </view>
					<view class="text">白色的空开放式学校背包</view>
				</view>
				<view class="label-text">
					<view class="label">{{$t("app.shen17")}}: </view>
					<view class="text">46516543131</view>
				</view>
				<view class="label-text">
					<view class="label">{{$t("app.shen18")}}: </view>
					<view class="text price">500USDT</view>
				</view>
				<view class="label-text">
					<view class="label">{{$t("app.shen19")}}: </view>
					<view class="text" v-if="status !== '0'">2024-05-08 15：23</view>
				</view>
			</view>
			
			<view class="footer-bttn" v-if="status === '1'">
				<view class="text">{{$t("app.shen20")}}</view>
				<view class="btn-box" @click="goPage(`/pages/me/delivery`)">{{$t("app.shen21")}}</view>
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
					title: this.$t("index.detail"),
					color: "#403039",
					backgroundColor: [1, ['#FCEEB7', '#FEE1AB']],
				};
			},
			logisticsStatus() {
				let text = this.$t("app.shen27");
				
				switch (this.status) {
					case "0": 
						// 待付款
						text = this.$t("app.shen27");
						break;
					case "1": 
						// 待发货
						text = this.$t("app.shen28");
						break;
					case "2": 
						// 已发货
						text = this.$t("app.shen29");
						break;
					case "3": 
						// 已完成
						text = this.$t("app.shen30");
						break;
					case "4": 
						// 已关闭
						text = this.$t("app.shen31");
						break;
				}
				return text;
			}
		},
		data() {
			return {
				status: "0"
			};
		},
		mounted() {
		},
		onLoad(parmas) {
			console.log(parmas, "=========");
			this.status = parmas.status;
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
	.receipt-details-scroll {
		padding-top: 113rpx;
		
		.logistics-info {
			margin-bottom: 10rpx;
			border-radius: 20rpx;
			padding: 35rpx 24rpx;
			background-color: #fff;
			.df(center);
			
			.pic {
				width: 30rpx;
				flex-shrink: 0;
				
				&.arrow {
					width: 14rpx;
				}
			}
			
			.address {
				padding: 0 30rpx;
				font-size: 26rpx;
				color: #3A2633;
				line-height: 1.375;
				flex-grow: 1;
				min-width: 10%;
			}
		}
		
		.product-info {
			.df(center);
			border-radius: 20rpx;
			padding: 16rpx;
			background-color: #fff;
			
			.pic {
				width: 144rpx;
				height: 144rpx;
				flex-shrink: 0;
			}
			
			.info {
				padding-left: 22rpx;
				padding-right: 22px;
				flex-grow: 1;
				align-self: start;
				
				.tit {
					margin-bottom: 10rpx;
					color: #3A2633;
					font-size: 24rpx;
					line-height: 1.375;
					font-weight: bold;
				}
				
				.price {
					color: #F3581D;
					font-size: 24rpx;
					line-height: 1.375;
				}
			}
			
			.logistics-status {
				color: #F3581D;
				font-size: 26rpx;
				line-height: 1.375;
				flex-shrink: 0;
				font-weight: bold;
			}
		}
		
		.white-box-tit {
			margin-top: 42rpx;
			font-size: 32rpx;
			color: #3A2633;
			line-height: 1.5;
			font-weight: bold;
		}
		
		.order-info {
			margin-top: 28rpx;
			border-radius: 20rpx;
			padding: 35rpx;
			background-color: #fff;
			
			.label-text {
				margin-bottom: 30rpx;
				.df(center, space-between);
				color: #3A2633;
				font-size: 26rpx;
				line-height: 1.375;
				
				&:last-child {
					margin-bottom: 0;
				}
				
				.label {
					flex-shrink: 0;
				}
				
				.text {
					text-align: right;
					flex-grow: 1;
					min-width: 10%;
					
					&.price {
						color: #F3581D;
					}
				}
			}
		}
		
		.footer-bttn {
			padding: 45rpx;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			width: 100vw;
			background-color: #fff;
			.df(center, space-between);
			
			.text {
				color: #9EA19D;
				font-size: 24rpx;
			}
			
			.btn-box {
				border-radius: 50px;
				padding: 16rpx 72rpx;
				background-color: #F0931B;
				color: #fff;
				font-size: 26rpx;
				line-height: 1.375;
			}
		}
	}
}
</style>