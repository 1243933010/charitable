<template>
	<view class="profix-page-container">
		<hx-navbar :config="config" style="position: absolute; top: 0; width: 100vw;" />
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
				<h3 class="product-tit">**基金面向**小学爱心助学筹集 1000</h3>
				<div class="price-inventory">
					<div class="price">$500</div>
					<div class="inventory">{{$t("app.newAdd20")}}：232</div>
				</div>
			</view>
			
			<div class="product-detail">
				<div class="box-tit">商品详情</div>
				<div class="pic-list">
					<div class="pic">
						<image src="@/static/img/cn.png" mode="widthFix" class="img"></image>
					</div>
					<div class="pic">
						<image src="@/static/img/cn.png" mode="widthFix" class="img"></image>
					</div>
					<div class="pic">
						<image src="@/static/img/cn.png" mode="widthFix" class="img"></image>
					</div>
					<div class="pic">
						<image src="@/static/img/cn.png" mode="widthFix" class="img"></image>
					</div>
					<div class="pic">
						<image src="@/static/img/cn.png" mode="widthFix" class="img"></image>
					</div>
				</div>
				<div class="info">
					<p>某女士为爱心组学拍卖LV包,品牌:路易威登Louis Vuitton;款式:BEAUBOURG中号手袋:型号:M43953:此款BEAU-BOURG手袋采用柔软的Monogram帆布材质，汇集多处手工精制细节;手柄由色调缤纷的皮革彩带编织而成，手工染色饰边凸显对比感与色彩浓度;彩色LV皮革饰件与姓名吊牌带来趣味与个性;配有一条可脱卸包带，丰富背携方式;尺寸:35CMx24CM x15CM;</p>
					<p>某女士为爱心组学拍卖LV包,品牌:路易威登Louis Vuitton,款式:BEAUBOURG中号手袋;型号:M43953;此款BEAU-BOURG手袋采用柔软的Monogram帆布材质，汇集多处手工精制细节;</p>
				</div>
			</div>
			
			<div class="add-product">
				<button class="button" @click="goPage()">{{$t("app.shen6")}}</button>
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
					title: this.$t("index.detail"),
					color: "#403039",
					backgroundColor: [1, ['#FCEEB7', '#FEE1AB']],
				};
			},
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
			
			.product-tit {
				margin-top: 26rpx;
				color: #3A2633;
				font-size: 30rpx;
				font-weight: bold;
			}
			
			.price-inventory {
				margin-top: 18rpx;
				.df(center);
				
				.price {
					color: #F96932;
					font-size: 36rpx;
				}
				
				.inventory {
					margin-left: 35rpx;
					font-size: 24rpx;
					color: #9EA19D;
				}
			}
		}
		
		.product-detail {
			padding: 28rpx 30rpx 158rpx;
			
			.box-tit {
				margin-bottom: 26rpx;
				font-size: 32rpx;
				color: #3A2633;
				font-weight: bold;
			}
			
			.pic-list {
				margin: -16rpx -10rpx 0;
				.df();
				flex-wrap: wrap;
				
				.pic {
					border-radius: 20rpx;
					padding: 16rpx 10rpx 0;
					width: 33.33%;
				}
			}
			
			.info {
				margin-top: 40rpx;
				
				p {
					color: #746D63;
					font-size: 26rpx;
					line-height: 1.6;
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