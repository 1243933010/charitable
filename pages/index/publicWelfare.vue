<template>
	<view>
		<hx-navbar :config="config" />

		<view class="product-container1">
		

			<view class="product-list">
				<view class="product-item" v-for="(item,index) in charitySaleGoodsList" :key="index" @click="goProductDetail(item)">
					<view class="product-img pic">
						<image :src="item.main_image" mode="aspectFit" class="img" >
						</image>
					</view>
					<view class="product-info">
						<view class="product-title"><text>{{item.title}}</text> </view>

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
		data() {
			return {
				charitySaleGoodsList: [],
			}
		},
		components: {
			hxNavbar,
		},
		onLoad() {
			this.charitySaleGoods();
		},
		computed: {
			config() {
				return {
					title: this.$t("app.newAdd15"),
					color: "#403039",
					backgroundColor: [1, ['#FCEEB7', '#FEE1AB']],
				};
			},
		},
		methods: {
			async charitySaleGoods() {
				let formData = {
					// keywords: '',
					page: 1,
					limit: 20,
					// identifier: 'charity'
				}
				let res = await $request('charitySaleGoods', formData);
				console.log(res)
				this.loading = false;
				if (res.data.code === 200) {
					this.charitySaleGoodsList = res.data.data.data;
				}
			},
			goProductDetail(item) {
				uni.navigateTo({
					url: `/pages/index/detail/publicWelfareDetail?id=${item.id}`,
				});
			},
		}
	}
</script>

<style lang="less">
	@import "../../static/less/variable.less";

	.product-container1 {
		margin-top: 16rpx;
		padding-bottom: 26rpx;
		padding-top: 37rpx;
		box-sizing: border-box;
		padding-left: 20rpx;
		padding-right: 20rpx;
		background-color: white;

		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: white;
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
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			.product-item {
				// margin-top: 10rpx;
				// margin-right: 10rpx;
				border-radius: 20rpx;
				background-color: #fff;
				width: calc(50% - 5rpx);
				// overflow: hidden;
				display: flex;
				flex-direction: column;
				align-items: center;
				padding-top: 9rpx;
				padding-bottom: 9rpx;

				// background-color: red;
				.product-img {
					width: 324rpx;
					height: 305rpx;
					background-color: white;

					// margin-right: 27rpx;
					image {
						width: 100%;
						height: 100%;
						// height: 100rpx;
					}
				}

				.product-info {
					padding: 20rpx 28rpx;

					.product-title {
						// .vertical(2);
						// width:200rpx;
						// overflow: hidden;
						// text-overflow:ellipsis;
						color: #3A2633;
						font-size: 28rpx;
						font-weight: 600;
						line-height: 1.5;
						margin-bottom: 9rpx;
						width: 300rpx;
						overflow: hidden;
						text-overflow: ellipsis;

						text {
							// width:200rpx;
							// overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
					}

					.product-tit {
						.vertical(2);
						color: #F3581D;
						font-size: 30rpx;
						font-weight: 600;
						line-height: 1.5;
						margin-bottom: 9rpx;
						display: flex;
						justify-content: space-between
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