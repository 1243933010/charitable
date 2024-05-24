<template>
	<view class="donation">
		<hx-navbar :config="config" />
		<view class="donation_centent">
			<view class="donation_one" v-for="(item,index) in 8" :key="index" @click="goPath(`/pages/me/donation/donationDetail`)">
				<view class="donation_oneLeft">
					<image src="../../../static/img/cn.png" mode="aspectFill"></image>
					<view class="oneLeft_count">
						<view class="oneLeft_name">
							教育公益
						</view>
						<view class="oneLeft_price">
							捐赠 <span>100USD</span>
						</view>
						<view class="oneLeft_time">
							2024-02-01
						</view>
					</view>
				</view>
				<view class="donation_oneRight">
					查看证书
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
					title: '捐赠记录',
					color: "#403039",
					backgroundColor: [1, ['#FCEEB7', '#FEE1AB']],
				};
			},
		},
		data(){
			return {
				
			}
		},
		methods:{
			goPath(link){
				uni.navigateTo({
					url: link,
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.donation{
		width: 100%;
		.donation_centent{
			width: 100%;
			box-sizing: border-box;
			padding: 28rpx 30rpx;
			.donation_one{
				width: 100%;
				height: 180rpx;
				background: #F4F4F4;
				border-radius: 10rpx;
				box-sizing: border-box;
				padding: 0 28rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 20rpx;
				.donation_oneLeft{
					display: flex;
					align-items: center;
					image{
						width: 110rpx;
						height: 110rpx;
						border-radius: 50%;
						margin-right: 20rpx;
					}
					.oneLeft_count{
						.oneLeft_name{
							font-family: PingFang SC, PingFang SC;
							font-weight: 800;
							font-size: 30rpx;
							color: #3A2633;
						}
						.oneLeft_price{
							font-family: PingFang SC, PingFang SC;
							font-weight: 400;
							font-size: 26rpx;
							color: #BCA988;
							margin-top: 10rpx;
							span{
								font-family: PingFang SC, PingFang SC;
								font-weight: 800;
								font-size: 30rpx;
								color: #EF9518;
								margin-left: 20rpx;
							}
						}
						.oneLeft_time{
							font-family: PingFang SC, PingFang SC;
							font-weight: 400;
							font-size: 26rpx;
							color: #BCA988;
							margin-top: 10rpx;
						}
					}
				}
				.donation_oneRight{
					width: 197rpx;
					height: 70rpx;
					line-height: 70rpx;
					text-align: center;
					background: #F0931B;
					border-radius: 50rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 800;
					font-size: 26rpx;
					color: #FFFFFF;
				}
			}
		}
	}
</style>