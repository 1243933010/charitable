<template>
	<view class="profix-page-container ">
		<hx-navbar :config="config" style="position: absolute; top: 0; width: 100vw;" />

		<scroll-view :scroll-y="true" class="charity-order-scroll page-scroll">
			<scroll-view :scroll-x="true" class="tabs">
				<view class="tab-item" :class="{active: checkedTab === 'all'}" @click="tabHandle('all')">全部</view>
				<view class="tab-item" :class="{active: checkedTab === tab.val}" v-for="tab in tabList" :key="tab.val" @click="tabHandle(tab.val)">{{tab.text}}</view>
			</scroll-view>
			
			<view class="products-list">
				<view class="item-box" v-for="(product,index) in showTabList" :key="product.id">
					<view class="pic product-img" @click="goPage(`/pages/me/receiptDetails?status=${product.isShow}`)">
						<image :src="product.imgUrl" class="img" mode="widthFix"></image>
					</view>
					<view class="product-info" @click="goPage(`/pages/me/receiptDetails?status=${product.isShow}`)">
						<view class="tit">{{product.tit}}</view>
						<view class="price">{{product.price}}</view>
						<view class="inventory-show">
							<view class="inventory">{{$t("app.shen34")}}：{{product.time}}</view>
						</view>
					</view>
					<view class="logistics-status" v-if="product.showText">{{product.showText}}</view>
					<view class="shipping-btn" v-if="product.isShow === 1">
						<view class="text">{{$t("app.shen20")}}</view>
						<view class="btn-box" @click="goPage(`/pages/me/delivery?status=${product.isShow}`)">{{$t("app.shen21")}}</view>
					</view>
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
					title: this.$t("app.shen37"),
					color: "#403039",
					backgroundColor: [1, ['#FCEEB7', '#FEE1AB']],
				};
			},
		},
		data() {
			return {
				productsList: [
					{
						id: 0,
						imgUrl: productTestImg, // 图片路径
						tit: "Salesforce CRM - Sales Analytics Software Salesforce CRM - Sales Analytics", // 产品标题
						price: "500 USDT", // 价格
						time: "2024-01-01", // 交易时间
						isShow: 0 // 待付款
					},
					{
						id: 1,
						imgUrl: productTestImg, // 图片路径
						tit: "Salesforce CRM - Sales Analytics Software Salesforce CRM - Sales Analytics", // 产品标题
						price: "500 USDT", // 价格
						time: "2024-01-01", // 交易时间
						isShow: 1 // 待发货
					},
					{
						id: 2,
						imgUrl: productTestImg, // 图片路径
						tit: "Salesforce CRM - Sales Analytics Software Salesforce CRM - Sales Analytics", // 产品标题
						price: "500 USDT", // 价格
						time: "2024-01-01", // 交易时间
						isShow: 2 // 已发货
					},
					{
						id: 3,
						imgUrl: productTestImg, // 图片路径
						tit: "Salesforce CRM - Sales Analytics Software Salesforce CRM - Sales Analytics", // 产品标题
						price: "500 USDT", // 价格
						time: "2024-01-01", // 交易时间
						isShow: 3 // 已完成
					},
					{
						id: 4,
						imgUrl: productTestImg, // 图片路径
						tit: "Salesforce CRM - Sales Analytics Software Salesforce CRM - Sales Analytics", // 产品标题
						price: "500 USDT", // 价格
						time: "2024-01-01", // 交易时间
						isShow: 4 // 已关闭
					},
				],
				checkedTab: 'all',
				tabList: [
					{
						text: this.$t("app.shen27"),
						val: 0
					},
					{
						text: this.$t("app.shen28"),
						val: 1
					},
					{
						text: this.$t("app.shen29"),
						val: 2
					},
					{
						text: this.$t("app.shen30"),
						val: 3
					},
					{
						text: this.$t("app.shen31"),
						val: 4
					}
				],
				showTabList: []
			};
		},
		mounted() {
			this.handleIsShow();
			this.showTabList = this.productsList;
		},
		methods: {
			goPage(url) {
				uni.navigateTo({
					url,
				});
			},
			handleIsShow() {
				this.productsList.forEach(item => {
					switch(item.isShow) {
						case 0: // 待付款
							item.showText = this.$t("app.shen27");
							break;
						case 1: // 待发货
							item.showText = this.$t("app.shen28");
							break;
						case 2: // 已发货
							item.showText = this.$t("app.shen29");
							break;
						case 3: // 已完成
							item.showText = this.$t("app.shen30");
							break;
						case 4: // 已关闭
							item.showText = this.$t("app.shen31");
							break;
					}
				})
			},
			tabHandle(val) {
				this.checkedTab = val;
				switch(this.checkedTab) {
					case "all": // 待付款
						this.showTabList = this.productsList;
						break;
						
					default:
						this.showTabList = this.productsList.filter(item => item.isShow === this.checkedTab);
						break;
				}
			}
		}
	}
</script>

<style lang="less">
@import "../../static/less/variable.less";

.profix-page-container {
	background-color: #F4F4F4;
	
	.charity-order-scroll {
		padding: 80rpx 0 0;
		
		.tabs {
			white-space: nowrap;
			
			.tab-item {
				margin: 30rpx 14rpx;
				border-radius: 20rpx;
				padding: 14rpx 50rpx;
				font-size: 24rpx;
				line-height: 1.375;
				white-space: nowrap;
				color: #3A2633;
				background-color: #fff;
				display: inline-block;
				
				&:first-child {
					margin-left: 30rpx;
				}
				
				&:last-child {
					margin-right: 30rpx;
				}
				
				&.active {
					color: #fff;
					background-image: linear-gradient( 180deg, #EF8E1E 0%, #F0AD04 100%);
				}
			}
		}
		
		.products-list {
			padding: 0 30rpx 30rpx;
			
			.item-box {
				.df(center);
				flex-wrap: wrap;
				
				margin-top: 16rpx;
				border-radius: 20rpx;
				padding: 16rpx;
				background-color: #fff;
				
				.product-img {
					border-radius: 20rpx;
					width: 150rpx;
					height: 150rpx;
					flex-shrink: 0;
					overflow: hidden;
				}
				
				.product-info {
					padding-left: 20rpx;
					font-size: 24rpx;
					color: #3A2633;
					line-height: 1.375;
					width: calc(100% - 270rpx);
					
					.tit {
						.vertical(2);
						margin-bottom: 8rpx;
						font-weight: bold;
					}
					
					.price {
						margin-bottom: 10rpx;
						color: #EF8F1E;
					}
					
					.inventory-show {
						.df(center, space-between);
						
						.inventory {
							color: #9EA19D;
						}
					}
				}
				
				.logistics-status {
					width: 120rpx;
					text-align: right;
					color: #F3581D;
					font-size: 26rpx;
					font-weight: bold;
				}
				
				.shipping-btn {
					margin-top: 20rpx;
					border-top: 1px solid #E8E8E8;
					padding: 14rpx 14rpx 0;
					.df(center, space-between);
					width: 100%;
					
					.text {
						color: #9EA19D;
						font-size: 24rpx;
						line-height: 1.375;
					}
					
					.btn-box {
						border-radius: 50px;
						padding: 16rpx 72rpx;
						background-color: #F0931B;
						font-size: 26rpx;
						line-height: 1.4;
						color: #fff;
					}
				}
			}
		}
	}
}
</style>