<template>
	<view class="activity">
		<hx-navbar :config="config" />
		<view class="activity_centent">
			<view class="banner">
				<swiper class="swiper" circular autoplay style="height: 400rpx;" @change="swiperChange">
					<swiper-item  v-for="(item, index) in swiperList" :key="index">
						<view class="swiper-item">
							<view class="pic">
								<image @click="linkImg(item)" :src="item.image" class="img" mode="widthFix"></image>
								<view class="text-box">
									<view class="title">
										<text>星星点灯，照亮梦乡</text>
									</view>
									<view class="label">
										<text>希望计划让留守山区的孩子找寻回家的希望，照亮梦乡让留守山区</text>
									</view>
								</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="swiper-active">
				<view class="item" v-for="(item,index) in swiperList.length" :key="index">
					<view class="div" :class="index==currentIndex?'active':''"></view>
				</view>
			</view>
			<!-- 图片列表 -->
			<view class="activity_image" v-for="(item,index) in 3" :key="index">
				<image src="../../../static/img/cn.png" mode="aspectFill"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import hxNavbar from "@/components/hx-navbar.vue";
	import {
		$request
	} from "@/utils/request.js";
	export default {
		components: {
			hxNavbar,
		},
		computed: {
			config() {
				return {
					title: this.$t('activity.pageTit'),
					color: "#403039",
					backgroundColor: [1, ['#FCEEB7', '#FEE1AB']],
				};
			},
		},
		data(){
			return {
				swiperList: [],
				currentIndex:0,
			}
		},
		onLoad() {
			this.adverts()
		},
		methods:{
			swiperChange(e) {
			      // e.detail.current 是当前的索引
			      this.currentIndex = e.detail.current;
			},
			async adverts() {
				let res = await $request("adverts", {});
				console.log(res)
				if (res.data.code === 0) {
					this.swiperList = res.data.data;
					return false;
				}
				uni.showToast({
					icon: "none",
					title: res.data.msg,
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.activity{
		width: 100%;
		min-height: 100vh;
		background-color: #F4F4F4;
		.activity_centent{
			width: 100%;
			box-sizing: border-box;
			padding: 28rpx 30rpx;
			.banner {
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
			
				.swiper {
					width: 100%;
					height: 140px;
					
					.swiper-item {
						
						.pic {
							position: relative;
							image{
								width: 100%;
								border-radius: 20rpx;
							}
							.text-box {
								width: 100%;
								position: absolute;
								bottom: 0;
								left: 0;
								background-color: rgba(255, 255, 255, 0.2);
								border-top-right-radius: 10rpx;
								border-top-left-radius: 10rpx;
								box-sizing: border-box;
								padding: 12rpx 0 11rpx 21rpx;
								backdrop-filter: blur(5px);
								border-bottom-left-radius: 20rpx;
								border-bottom-right-radius: 20rpx;
								.title {
									color: #FFFFFF;
									font-size: 32rpx;
									font-weight: 600;
									line-height: 1.5;
									margin-bottom: 5rpx;
								}
			
								.label {
									color: #FFFFFF;
									font-size: 24rpx;
									line-height: 1.5;
									max-width: 500rpx;
									overflow: hidden;
									text-overflow: ellipsis;
			
									text {
										white-space: nowrap;
									}
								}
							}
						}
					}
				}
			}
			.swiper-active{
				// background-color: #FAE0AD;
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				.div{
					width: 25rpx;
					height: 12rpx;
					background: #CCC8C7;
					border-radius: 50rpx 50rpx 50rpx 50rpx;
					margin: 0 6.5rpx;
				}
				.active{
					width: 47rpx;
					height: 12rpx;
					background: #F96932;
					border-radius: 50rpx 50rpx 50rpx 50rpx;
				}
			}
			.radio {
				width: 19rpx;
				height: 19rpx;
				background: linear-gradient(180deg, #EC4202 0%, #FE7B4A 100%);
				border-radius: 50%;
				margin-right: 14rpx;
			}
			.activity_image{
				width: 100%;
				margin-top: 45rpx;
				image{
					width: 100%;
					height: 300rpx;
					border-radius: 20rpx;
				}
			}
		}
	}
</style>