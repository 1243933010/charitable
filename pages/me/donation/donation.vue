<template>
	<view class="donation">
		<hx-navbar :config="config" />
		<view class="donation_centent">
			<view class="donation_one" v-for="(item,index) in donationArray" :key="index"
				@click="goPath(`/pages/me/donation/donationDetail?id=${item.id}`)">
				<view class="donation_oneLeft">
					<image :src="sortImage(item.main_image)" mode="aspectFill"></image>
					<view class="oneLeft_count">
						<view class="oneLeft_name">
							{{item.title}}
						</view>
						<view class="oneLeft_price">
							捐赠 <span>{{item.money}}USD</span>
						</view>
						<view class="oneLeft_time">
							{{item.created_at_format}}
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
	import {
		$request,
		filesUrl
	} from "@/utils/request";
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
			sortImage() {
				return value => {
					if(value){
						return value.indexOf('http') != -1 ? value : filesUrl + value
					}else{
						return value
					}
				}
			}
		},
		data() {
			return {
				pamars: {
					page: 1
				},
				last_page: 1, //最后一页
				donationArray: [],
			}
		},
		onLoad() {
			this.getDonation('init') //获取证书列表
		},
		onReachBottom() {
			if (this.last_page > this.pamars.page) {
				this.pamars.page++
				this.getDonation()
			}
		},
		onPullDownRefresh() {
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 1000)
			this.getDonation('init') //获取好友列表
		},
		methods: {
			async getDonation(type) {
				if (type == 'init') {
					this.pamars.page = 1
					this.donationArray = []
				}
				let res = await $request('getRecords', this.pamars);
				if (res.data.code == 200) {
					this.last_page = res.data.data.last_page
					if (this.pamars.page == 1) {
						this.donationArray = res.data.data.data
					} else {
						this.donationArray = [...this.donationArray, ...res.data.data.data]
					}
					// console.log(res.data.data)
				}
			},
			goPath(link) {
				uni.navigateTo({
					url: link,
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.donation {
		width: 100%;

		.donation_centent {
			width: 100%;
			box-sizing: border-box;
			padding: 28rpx 30rpx;

			.donation_one {
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

				.donation_oneLeft {
					display: flex;
					align-items: center;

					image {
						width: 110rpx;
						height: 110rpx;
						border-radius: 50%;
						margin-right: 20rpx;
					}

					.oneLeft_count {
						width: 280rpx;

						.oneLeft_name {
							width: 280rpx;
							font-family: PingFang SC, PingFang SC;
							font-weight: 800;
							font-size: 30rpx;
							color: #3A2633;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}

						.oneLeft_price {
							font-family: PingFang SC, PingFang SC;
							font-weight: 400;
							font-size: 26rpx;
							color: #BCA988;
							margin-top: 10rpx;

							span {
								font-family: PingFang SC, PingFang SC;
								font-weight: 800;
								font-size: 30rpx;
								color: #EF9518;
								margin-left: 20rpx;
							}
						}

						.oneLeft_time {
							font-family: PingFang SC, PingFang SC;
							font-weight: 400;
							font-size: 26rpx;
							color: #BCA988;
							margin-top: 10rpx;
						}
					}
				}

				.donation_oneRight {
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