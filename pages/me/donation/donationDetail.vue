<template>
	<view class="donationDetail">
		<hx-navbar :config="config" />
		<view class="donationDetail_centet">
			<image src="../../../static/userStatic/zhengshu_bg.png" mode="aspectFill"></image>
			<view class="donationDetail_count">
				<view class="count_name">
					某某某
				</view>
				<view class="count_desc">
					感谢您向<span>公益基金</span>项目捐助了<span>100USD</span>
				</view>
				<view class="count_desctwo">
					大爱无疆，感谢您让世界更美好！
				</view>
				<view class="count_descthree">
					证书编号 <span>ZFB23022818059221</span>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import hxNavbar from "@/components/hx-navbar.vue";
	export default {
		components: {
			hxNavbar,
		},
		computed: {
			config() {
				return {
					title: '捐赠证书',
					color: "#403039",
					backgroundColor: [1, ['#FCEEB7', '#FEE1AB']],
				};
			},
		},
		data(){
			return {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.donationDetail{
		width: 100%;
		.donationDetail_centet{
			width: 100%;
			position: relative;
			image{
				width: 100%;
				height: 1400rpx;
			}
			.donationDetail_count{
				width: 500rpx;
				min-height: 400rpx;
				// background-color: red;
				position: absolute;
				left: 16.5%;
				top: 34%;
				box-sizing: border-box;
				padding: 0 15rpx;
				.count_name{
					font-family: PingFang SC, PingFang SC;
					font-weight: 800;
					font-size: 30rpx;
					color: #403039;
				}
				.count_desc{
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 26rpx;
					color: #403039;
					margin-top: 25rpx;
					span{
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 26rpx;
						color: #F0631C;
					}
				}
				.count_desctwo{
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 26rpx;
					color: #403039;
					margin-top: 25rpx;
				}
				.count_descthree{
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 26rpx;
					color: #403039;
					margin-top: 25rpx;
				}
			}
		}
	}
</style>