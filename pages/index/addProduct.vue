<template>
	<view class="profix-page-container">
		<hx-navbar :config="config" style="position: absolute; top: 0; width: 100vw;" />
		<view class="add-products-scroll page-scroll">
			<view class="banner">
				<swiper class="swiper" circular style="height: 430rpx;" @change="swiperChange">
					<swiper-item v-for="(item, index) in swiperList" :key="index">
						<view class="swiper-item">
							<view class="pic">
								<image :src="item.image" class="img" mode="widthFix"></image>
							</view>
						</view>
					</swiper-item>
					<swiper-item>
						<div class="upload-img">
							<div class="pic">
								<image src="@/static/img/icon/upload.png" class="img" mode="widthFix"></image>
							</div>
							<p>点击上传图片</p>
							<p>（建议上传尺寸690*430像素图片）</p>
						</div>
					</swiper-item>
				</swiper>
				<view class="swiper-active">
					<view class="item" v-for="(item,index) in (swiperList.length + 1)" :key="index">
						<view class="div" :class="index == currentIndex ? 'active' : ''"></view>
					</view>
				</view>
				
				<div class="input-box">
					<div class="label">商品名称</div>
					<input type="text" class="inp" placeholder="请输入商品名称..." />
				</div>
			</view>
			
			<div class="add-product">
				<button class="button" @click="submitHandle">{{$t("app.shen7")}}</button>
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
					title: this.$t("app.shen8"),
					color: "#403039",
					backgroundColor: [1, ['#FCEEB7', '#FEE1AB']],
				};
			},
		},
		data() {
			return {
				// 用来装已上传好的图片
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
			this.handleIsShow();
		},
		methods: {
			goPage(url) {
				uni.navigateTo({
					url,
				});
			},
			submitHandle() {
				// 确认上传
			},
			swiperChange(e) {
			      // e.detail.current 是当前的索引
			      this.currentIndex = e.detail.current;
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
	.add-products-scroll {
		padding: 88rpx 0 0;
		
		.banner {
			width: 100%;
			padding: 20rpx 30rpx 28rpx;
			background-color: #fff;
		
			.swiper {
				border-radius: 20rpx;
				width: 100%;
				height: 430px;
				
				.upload-img {
					.df(center, center);
					flex-direction: column;
					
					border-radius: 20rpx;
					background-color: #F4F4F4;
					height: 100%;
					
					.pic {
						width: 64rpx;
					}
					
					p {
						margin-top: 12rpx;
						font-size: 24rpx;
						color: #C8AD8B;
						line-height: 1.375;
					}
				}
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
					transition: width .35s ease-in-out, background-color .35s ease-in-out;
				}
				
				.active{
					width: 48rpx;
					height: 12rpx;
					background: #F96932;
					border-radius: 50rpx;
				}
			}
			
			.input-box {
				margin-top: 32rpx;
				
				.label {
					margin-bottom: 20rpx;
					padding-left: 25rpx;
					color: #3A2633;
					font-size: 30rpx;
					line-height: 1.4;
					font-weight: bold;
				}
				
				.inp {
					border-radius: 10rpx;
					padding: 30rpx 25rpx;
					background-color: #F4F4F4;
					color: #BCA988;
					display: block;
					height: auto;
					line-height: 1;
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