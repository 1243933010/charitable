<template>
	<view class="profix-page-container">
		<hx-navbar :config="config" style="position: absolute; top: 0; width: 100vw;" />
		<scroll-view :scroll-y="true" class="add-products-scroll page-scroll">
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
					<div class="label">{{$t("app.shen9")}}</div>
					<input type="text" class="inp" :placeholder="$t('app.shen10')" />
				</div>
				
				<div class="input-box">
					<div class="label">{{$t("app.shen11")}}</div>
					<input type="text" class="inp" :placeholder="$t('app.shen12')" />
				</div>
				
				<div class="input-box">
					<div class="label">{{$t("app.shen13")}}</div>
					<input type="text" class="inp" :placeholder="$t('app.shen14')" />
				</div>
			</view>
			
			<view class="gray-bg">
				<div class="input-box">
					<div class="label">{{$t("productDetail.pageTit")}}</div>
					<div class="upload-pic-list">
						<div class="upload-item" v-for="(item,index) in swiperList" :key="index">
							<div class="box">
								<div class="pic">
									<image :src="item.image" class="img" mode="widthFix"></image>
								</div>
								<div class="del-btn" @click="delHandle(item)">
									<div class="pic">
										<image src="@/static/img/icon/del.png" class="img" mode="widthFix"></image>
									</div>
									<p>删除图片</p>
								</div>
							</div>
						</div>
						<div class="upload-item">
							<div class="box">
								<div class="up-btn">
									<div class="pic">
										<image src="@/static/img/icon/upload.png" class="img" mode="widthFix"></image>
									</div>
									<p>删除图片</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="input-box">
					<div class="label">{{$t("productDetail.pageTit")}}</div>
					<textarea class="inp-textarea" :placeholder="$t('app.shen15')"></textarea>
				</div>
			</view>
			
			<div class="add-product">
				<button class="button" @click="submitHandle">{{$t("app.shen7")}}</button>
			</div>
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
			delHandle(uploadItem) {
				
			}
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
		
			.upload-pic-list {
				.df();
				flex-wrap: wrap;
				
				.upload-item {
					padding: 0 9rpx;
					width: 33.33%;
					
					.box {
						border-radius: 20rpx;
						overflow: hidden;
						position: relative;
						height: 100%;
						
						.pic {
							width: 100%;
						}
						
						.del-btn {
							.df(center, center);
							
							position: absolute;
							bottom: 0;
							left: 0;
							right: 0;
							padding: 10rpx;
							background-color: rgba(0, 0, 0, .53);
							
							.pic {
								margin-right: 10px;
								width: 24rpx;
								height: 24rpx;
							}
							
							p {
								font-size: 20rpx;
								color: #fff;
							}
						}
						
						.up-btn {
							.df(center, center);
							flex-direction: column;
							background-color: #fff;
							height: 100%;
							
							.pic {
								width: 44rpx;
								height: 44rpx;
							}
							
							p {
								margin-top: 12rpx;
								font-size: 24rpx;
								color: #BCA988;
								line-height: 1.375;
							}
						}
					}
				}
			}
			
			.inp-textarea {
				border-radius: 10rpx;
				border: 1rpx solid #707070;
				padding: 32rpx 25rpx;
				width: 100%;
				color: #BCA988;
				font-size: 26rpx;
				height: 329rpx;
				background-color: transparent;
			}
		}
		
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
		}
		
		.gray-bg {
			padding: 20rpx 30rpx 200rpx;
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