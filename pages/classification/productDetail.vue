<template>
	<view class="profix-page-container">
		<hx-navbar :config="config" style="position: absolute; top: 0; width: 100vw;" />
		<scroll-view :scroll-y="true" class="charity-product-detail-scroll page-scroll">
			<view class="banner">
				<swiper class="swiper" circular autoplay style="height: 430rpx;" @change="swiperChange">
					<swiper-item v-for="(item, index) in detailInfo.images" :key="index">
						<view class="swiper-item">
							<view class="pic">
								<image :src="imageUrl+item" class="img" mode="widthFix"></image>
							</view>
						</view>
					</swiper-item>
				</swiper>
				<view class="swiper-active">
					<view class="item" v-for="(item,index) in detailInfo.images" :key="index">
						<view class="div" :class="index == currentIndex ? 'active' : ''"></view>
					</view>
				</view>
				<h3 class="product-tit">{{detailInfo.title}}</h3>
				<div class="price-inventory">
					<div class="price">${{detailInfo.price}}</div>
					<div class="inventory">{{detailInfo.status_desc}}</div>
				</div>
			</view>
			
			<div class="product-detail">
				<div class="box-tit">{{$t("productDetail.pageTit")}}</div>
				<div class="pic-list">
					<div class="pic" v-for="(val,ind) in detailInfo.detail_images">
						<image :src="imageUrl+item" mode="aspectFit" class="img"></image>
					</div>
				</div>
				<div class="info">
					<rich-text :nodes="detailInfo.detail"></rich-text>
				</div>
			</div>
		</scroll-view>
	</view>
</template>

<script>
	import hxNavbar from "@/components/hx-navbar.vue";
	import { $request,filesUrl } from "@/utils/request.js";
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
			imageUrl() {
				return filesUrl;
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
				currentIndex: 0,
				detailInfo:{}
			};
		},
		onLoad(e){
			// e = {id:'1'}
			this.getDetail(e.id);
			
		},
		methods: {
			async getDetail(id){
				let res = await $request("auctionsDetail",{id})
				console.log(res)
				if(res.data.code==200){
					this.detailInfo = res.data.data;
				}
			},
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
					image{
						max-width: 200rpx;
						max-height: 300rpx;
					}
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
	}
}
</style>