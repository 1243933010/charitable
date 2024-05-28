<template>
	<view class="index-page1">
		<hx-navbar :config="config" />

		<view class="">
			<view class="product-container">
				<!-- <view class="header">
					<view class="tit">
						<view class="radio"></view>
						{{ $t("app.newAdd12") }}

					</view>
					<view class="desc">{{ $t("app.newAdd17") }}></view>
				</view> -->

				<view class="product-list">
					<view class="product-item" v-for="(item,index) in list" :key="index" >
						<view class="product-img pic">
							<image :src="item.images" mode="aspectFit" class="img" @click="goProductDetail(item)">
							</image>
						</view>
						<view class="product-info">
							<view class="product-title">{{item.title}}</view>
							<!-- <view class="product-tit">{{item.label}}</view> -->
							<view class="product-price-info">
								<view class="rebate">
									<text style="margin-right:27rpx;">{{item.statusText}}</text>
									<text style="">{{item.statusText}}</text>
								</view>

							</view>
						</view>
					</view>

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import hxNavbar from "@/components/hx-navbar.vue";
	import {
		$request,
		filesUrl
	} from "@/utils/request.js";
	export default {
		components: {
			hxNavbar,
		},
		data() {
			return {
				requestData: {
					page: 1,
					limit: 20,
					identifier: 'charity',
					category_id: ''
				},
				list:[]
			}
		},
		computed: {
			config() {
				return {
					title: this.$t("app.newAdd12"),
					color: "#403039",
					backgroundColor: [1, ['#FCEEB7', '#FEE1AB']],
				};
			},
			imageUrl() {
				return filesUrl;
			}
		},
		onReachBottom() {
			this.requestData.page++;
			this.getList();
		},
		mounted(){
			this.getList();
		},
		methods: {
			async getList() {
				let res = await $request('articles', this.requestData);
				console.log(res)
				this.loading = false;
				if (res.data.code === 200) {
					this.list.push(...res.data.data.data);
					console.log(this.nftList)
				}
			},
			goProductDetail(item) {
				uni.navigateTo({
					url: `/pages/index/productDetail?id=${item.id}`,
				});
			},
		}
	}
</script>

<style lang="less">
	@import "../../../static/less/variable.less";

	page {
		background-color: #F4F4F4;
	}

	.product-container,
	.product-container3 {
		padding-bottom: 26rpx;
		box-sizing: border-box;
		padding-left: 20rpx;
		padding-right: 20rpx;

		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.tit {
			margin-bottom: 8rpx;
			color: @bodyColor;
			font-size: @bodySize;
			font-weight: 600;
			display: flex;
			flex-direction: row;
			align-items: center;
		}

		.desc {
			margin-bottom: 28rpx;
			color: #777680;
			font-size: @descSize;
		}

		.product-list {
			// .df(stretch, flex-start);
			width: 100%;

			.product-item {
				margin-top: 10rpx;
				margin-right: 10rpx;
				border-radius: 20rpx;
				background-color: #fff;
				width: 100%;
				// overflow: hidden;
				display: flex;
				flex-direction: row;
				align-items: center;
				box-sizing: border-box;
				padding-top: 9rpx;
				padding-bottom: 9rpx;

				.product-img {
					width: 144rpx;
					height: 144rpx;
					background-color: white;
					margin-right: 27rpx;

					image {
						width: 100%;
						height: 100%;
						// height: 100rpx;
					}
				}

				.product-info {
					padding: 20rpx 28rpx;
					box-sizing: border-box;
					width: calc(100% - 144rpx);
					height: 144rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.product-title {
						.vertical(2);
						color: #3A2633;
						font-size: 24rpx;
						font-weight: 600;
						line-height: 1.5;
						margin-bottom: 9rpx;
					}

					.product-tit {
						.vertical(2);
						color: #F3581D;
						font-size: 26rpx;
						font-weight: 600;
						line-height: 1.5;
						margin-bottom: 9rpx;

					}

					.product-price-info {
						.df(center, space-between);

						.rebate {
							color: #9EA19D;
							font-size: 24rpx;
							// font-weight: bold;
						}

						.brfore-rebate {
							color: #777680;
							font-size: 30rpx;
							text-decoration: line-through;
						}
					}
				}

				&:nth-child(2n) {
					margin-right: 0;
				}
			}
		}
	}
</style>