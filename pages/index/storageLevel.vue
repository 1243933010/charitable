<template>
	<view class="profix-page-container storage-level-page">
		<hx-navbar :config="config" />
		<view class="storage-level-scroll page-scroll">
			<view class="storage-list">
				<view class="storage-item LV0" v-for="(item,index) in level_list" :key="item.id" @click.stop="goPage(item)">
					 <!-- v-if="item.is_returned==1" -->
					<view class="refund" @click.stop="refund"  v-if="item.is_returned==1">
						<span>{{ $t("app.popup8") }}</span>
					</view>
					<view class="pic bg">
						<image :src="lvImgList[index]" mode="widthFix" class="img"></image>
					</view>
					<view class="level-info">
						<view class="info-row">
							<view class="row-item">
								<text>{{ item.price }} {{ $t("storageLevel.dollar") }}</text>
								<text>{{ $t("storageLevel.row1") }}</text>
							</view>
							<view class="row-item">
								<text>{{ item.queue_num }}</text>
								<text>{{ $t("storageLevel.row2") }}</text>
							</view>
						<!-- 	<view class="row-item">
								<text>{{ item.monthly_income }} {{ $t("storageLevel.dollar") }}</text>
								<text>{{ $t("storageLevel.row3") }}</text>
							</view> -->
						</view>
						<view class="level-income">
							<view class="level">{{ item.title }}</view>
							<view class="income">
								<text>{{ item.price }} {{ $t("storageLevel.dollar") }}</text>
								<text>{{ $t("storageLevel.dailyRevenue") }}{{item.daily_income}}</text>
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
import { $request } from "../../utils/request";

export default {
	components: {
		hxNavbar,
	},
	data() {
		return {
			lvImgList:['../../static/img/storageLevel/-h-1.png','../../static/img/storageLevel/-h-2.png','../../static/img/storageLevel/-h-3.png','../../static/img/storageLevel/-h-4.png','../../static/img/storageLevel/-h-5.png','../../static/img/storageLevel/-h-6.png','../../static/img/storageLevel/-h-7.png','../../static/img/storageLevel/-h-8.png','../../static/img/storageLevel/-h-9.png','../../static/img/storageLevel/-h-10.png','../../static/img/storageLevel/-h-11.png',],
			// lvImgList: {
			// 	LV0: "../../static/img/storageLevel/LV0.png",
			// 	LV: "../../static/img/storageLevel/LV.png",
			// 	LV1: "../../static/img/storageLevel/LV1.png",
			// 	LV2: "../../static/img/storageLevel/LV2.png",
			// 	LV3: "../../static/img/storageLevel/LV3.png",
			// },
			level_list: [],
			user_info: {},
		};
	},
	computed: {
		config() {
			return {
				title: this.$t("storageLevel.pageTit"),
				color: "#ffffff",
				// backgroundColor: [1, "#24bdab"],
				// 背景图片（array则为滑动切换背景图，string为单一背景图）
				// backgroundImg: ['/static/xj.jpg','/static/logo.jpg'],
				backgroundImg: "../../static/img/header_tabber.png",
			};
		},
	},
	async mounted() {
		this.getVip();
	},
	methods: {
		async getVip(){
			const res = await $request("vipList");
			const { data, code, msg } = res.data;
			const { level_list, user_info } = data;
			this.level_list = level_list;
			this.user_info = user_info;
		},
		async goPage(item) {
			console.log(this.user_info)
			if(+this.user_info.balance<(+item.price)){
				uni.showModal({
					title:this.$t('api.message'),
					content:this.$t('app.popup1'),
					confirmText:this.$t('app.sure'),
					cancelText:this.$t('app.cancel'),
					success: (res) => {
						if(res.confirm){
							uni.navigateTo({
								url:'/pages/index/recargar'
							})
						}
					}
					
				})
			}else{
				// uni.switchTab({
				// 	url: "/pages/classification/classification"
				// })
				uni.showModal({
					title:this.$t('api.message'),
					content:this.$t('app.popup2'),
					confirmText:this.$t('app.sure'),
					cancelText:this.$t('app.cancel'),
					success: async(res) => {
						if(res.confirm){
							let resp = await $request('levelBuy',{vip_id:item.id});
							uni.showToast({
								icon:'none',
								title:resp.data.msg
							})
						}
					}
					
				})
				
			}
		},
		async refund(){
			uni.navigateTo({
				url:'./refund'
			})
			// uni.showModal({
			// 	title:this.$t('api.message'),
			// 	content:this.$t('app.popup9'),
			// 	confirmText:this.$t('app.sure'),
			// 	cancelText:this.$t('app.cancel'),
			// 	success: async(res) => {
			// 		if(res.confirm){
			// 			let resp = await $request('returnedCash',{});
			// 			uni.showToast({
			// 				icon:'none',
			// 				title:resp.data.msg
			// 			})
			// 			if(resp.data.code==0){
			// 				this.getVip();
			// 			}
			// 		}
			// 	}
				
			// })
		}
	}
};
</script>

<style lang="less" scoped>
@import "../../static/less/variable.less";
page {
	background-color: #f5f4f9;
}

.storage-level-page {
	.storage-level-scroll {
		padding-top: 28rpx;

		.storage-list {
			margin-right: -10rpx;
			margin-left: -10rpx;
			padding-bottom: 1rpx;

			.storage-item {
				margin-bottom: 20rpx;
				border-radius: 20rpx;
				border: 1px solid #fd7e1f;
				padding: 10rpx;
				background-color: #fff;
				position: relative;

				&.LV1 {
					.level-info {
						color: #3f7fe1;
					}
				}

				&.LV2 {
					.level-info {
						color: #746fd8;
					}
				}

				&.LV3 {
					.level-info {
						color: #d4fdff;
					}
				}

				.bg {
					width: 100%;
				}
				.refund{
					position: absolute;
					right: 50rpx;
					top: 50rpx;
					z-index: 10;
					border-radius: 10rpx;
					padding: 20rpx 30rpx;
					font-size: 24rpx;
					// width: 150rpx;
					color: #383838;
					background: #F0E8E8;
					// background: linear-gradient(0deg, #0694B8 0%, #6BBDB4 100%);
					text-align: center;
				}
				.level-info {
					position: absolute;
					left: 0;
					right: 0;
					bottom: 0;
					top: 0;

					padding: 35rpx 40rpx;
					color: #a77933;

					display: flex;
					flex-direction: column-reverse;

					.level-income {
						font-weight: bold;

						.level {
							margin-bottom: 26rpx;
							font-size: 72rpx;
							line-height: 1;
						}

						.income {
							.df(center, flex-start);

							text {
								margin-left: 45rpx;
								font-size: 30rpx;
								line-height: 1;

								&:first-child {
									margin-left: 0;
								}
							}
						}
					}

					.info-row {
						margin-top: 58rpx;
						.df(center, space-between);

						.row-item {
							text-align: center;
							font-size: 24rpx;
							width: calc(33.33% - 8rpx);

							text {
								margin-bottom: 14rpx;
								display: block;

								&:last-child {
									margin-bottom: 0;
								}
							}
						}
					}
				}
			}
		}
	}
}
</style>
