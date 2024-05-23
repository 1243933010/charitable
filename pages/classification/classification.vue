<template>
	<view class="profix-page-container">
		<scroll-view :scroll-y="true" class="charity-product-detail-scroll page-scroll">
			<view class="banner">
				<swiper class="swiper" circular autoplay style="height: 430rpx;" @change="swiperChange">
					<swiper-item v-for="(item, index) in swiperList" :key="index">
						<view class="swiper-item">
							<view class="pic">
								<image :src="item.image" class="img" mode="widthFix"></image>
							</view>
						</view>
					</swiper-item>
				</swiper>
				<view class="swiper-active">
					<view class="item" v-for="(item,index) in swiperList" :key="index">
						<view class="div" :class="index == currentIndex ? 'active' : ''"></view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import { $request } from "@/utils/request.js";
	import productTestImg from "@/static/img/cn.png";
	
	export default {
		computed: {
		},
		data() {
			return {
				swiperList: [
					{
						image: productTestImg,
					},
					{
						image: productTestImg,
					}
				],
				currentIndex: 0
			};
		},
		mounted() {
		},
		methods: {
			swiperChange(e) {
			  // e.detail.current 是当前的索引
			  this.currentIndex = e.detail.current;
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
	.charity-product-detail-scroll {
		padding: 88rpx 0 0;
		
		.banner {
			width: 100%;
			padding: 20rpx 30rpx 28rpx;
			background-color: #fff;
		
			.swiper {
				border-radius: 20rpx;
				width: 100%;
			}
			
			.swiper-active{
				margin-top: 26rpx;
				width: 100%;
				.df(center, center);
				
				.div{
					width: 25rpx;
					height: 12rpx;
					background: #CCC8C7;
					border-radius: 50rpx;
					margin: 0 6rpx;
				}
				
				.active{
					width: 48rpx;
					height: 12rpx;
					background: #F96932;
					border-radius: 50rpx;
				}
			}
		}
	}
}
</style>