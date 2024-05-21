<template>
	<view class="profix-page-container">
		<hx-navbar :config="config" style="position: absolute; top: 0; width: 100vw;" />
		<view class="charity-products-scroll page-scroll">
			<div class="products-list">
				<div class="item-box" v-for="(product,index) in productsList" :key="product.id" @click="goPage(`/pages/index/charityProductDetail`)">
					<div class="pic product-img">
						<image :src="product.imgUrl" class="img" mode="widthFix"></image>
					</div>
					<div class="product-info">
						<div class="tit">{{product.tit}}</div>
						<div class="price">{{product.price}}</div>
						<div class="inventory-show">
							<div class="inventory">{{$t("app.newAdd20")}}：{{product.inventory}}</div>
							<!--  翻译字段 "app.shen3" -->
							<!--  翻译字段 "app.shen4" -->
							<div class="is-show" v-if="product.showText">{{product.showText}}</div>
						</div>
					</div>
				</div>
			</div>
			
			<div class="add-product">
				<button class="button" @click="goPage(`/pages/index/addProduct`)">{{$t("app.shen5")}}</button>
			</div>
		</view>
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
					title: this.$t("app.shen1"),
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
						inventory: "232", // 库存
						isShow: 0 // 是否上架
					},
					{
						id: 1,
						imgUrl: productTestImg, // 图片路径
						tit: "Salesforce CRM - Sales Analytics Software Salesforce CRM - Sales Analytics", // 产品标题
						price: "500 USDT", // 价格
						inventory: "232", // 库存
						isShow: 1 // 是否上架
					},
					{
						id: 2,
						imgUrl: productTestImg, // 图片路径
						tit: "Salesforce CRM - Sales Analytics Software Salesforce CRM - Sales Analytics", // 产品标题
						price: "500 USDT", // 价格
						inventory: "232", // 库存
						isShow: 2 // 是否上架
					},
					{
						id: 3,
						imgUrl: productTestImg, // 图片路径
						tit: "Salesforce CRM - Sales Analytics Software Salesforce CRM - Sales Analytics", // 产品标题
						price: "500 USDT", // 价格
						inventory: "232", // 库存
						isShow: 0 // 是否上架
					},
				]
			};
		},
		mounted() {
			this.handleIsShow();
		},
		methods: {
			handleIsShow() {
				this.productsList.forEach(item => {
					switch(item.isShow) {
						case 0: // 未上架
							item.showText = this.$t("app.shen2");
							break;
						case 1: // 已上架
							item.showText = this.$t("app.shen3");
							break;
						case 2: // 已下架
							item.showText = this.$t("app.shen4");
							break;
					}
				})
			},
			addProduct() {
				// 添加产品的方法
			},
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
		padding: 88rpx 0 0;
		
		.products-list {
			padding: 20rpx 30rpx 146rpx;
			
			.item-box {
				.df(center);
				
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
			}
		}
		
		.add-product {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			
			padding: 20rpx 75rpx;
			background-color: #fff;
			
			.button {
				padding: 25rpx;
				background-image: linear-gradient( 180deg, #EF8E1F 0%, #F0AC05 100%);
				color: #fff;
				font-size: 30rpx;
			}
		}
	}
}
</style>