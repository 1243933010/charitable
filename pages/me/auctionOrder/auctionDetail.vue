<template>
	<view class="auctionDetail">
		<hx-navbar :config="config" />
		<view class="auctionDetail_centent">
			<view class="auctionDetail_top">
				<view class="auctionDetail_top_left">
					<image :src="sortImage(detailInfo.main_image)" mode="aspectFill"></image>
					<view class="left_centent">
						<view class="left_name">
							{{detailInfo.title}}
						</view>
						<view class="left_price">
							{{$t('app.order.currentprice')}}：{{detailInfo.current_price}} USDT
						</view>
						<view class="left_priced">
							{{$t('app.order.jingjiaprice')}}：{{detailInfo.order_money}} USDT
						</view>
					</view>
				</view>
				<view class="auctionDetail_top_right">
					{{detailInfo.status_desc}}
				</view>
			</view>
			<view class="auctionDetail_top_title">
				{{$t('app.orderDetail')}}
			</view>
			<view class="auctionDetail_toptwo">
				<view class="toptwo_title">
					<view class="title_left">
						{{$t('app.shen9')}}：
					</view>
					<view class="title_right">
						{{detailInfo.title}}
					</view>
				</view>
				<view class="toptwo_title">
					<view class="title_left">
						{{$t('app.shen17')}}：
					</view>
					<view class="title_right">
						{{detailInfo.order_no}}
					</view>
				</view>
				<view class="toptwo_title">
					<view class="title_left">
						{{$t('app.shen18')}}：
					</view>
					<view class="title_right">
						{{detailInfo.order_money}}USDT
					</view>
				</view>
				<view class="toptwo_title">
					<view class="title_left">
						{{$t('app.newAdd47')}}：
					</view>
					<view class="title_right">
						{{detailInfo.auction_end_time}}
					</view>
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
					title: this.$t('index.detail'),
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
		data(){
			return {
				id:"",
				detailInfo:"",
			}
		},
		onLoad(option) {
			this.id = option.id
			this.getOrderdetail()
		},
		methods:{
			async getOrderdetail(){
				let res = await $request('userParticipateAuctionRecordDetail', {id:this.id});
				if (res.data.code == 200) {
					this.detailInfo=res.data.data
					// console.log(res,'账户明细')
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.auctionDetail{
		width: 100%;
		min-height: 100vh;
		background-color: #F4F4F4;
		.auctionDetail_centent{
			width: 100%;
			box-sizing: border-box;
			padding: 30rpx 30rpx 24rpx;
			.auctionDetail_top{
				width: 100%;
				box-sizing: border-box;
				padding: 15rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				background-color: #FFFFFF;
				border-radius: 15rpx;
				.auctionDetail_top_left{
					display: flex;
					image{
						width: 144rpx;
						height: 144rpx;
						border-radius: 10rpx;
					}
					.left_centent{
						width: 380rpx;
						margin-left: 15rpx;
						.left_name{
							font-family: PingFang SC, PingFang SC;
							font-weight: bold;
							font-size: 24rpx;
							color: #3A2633;
						}
						.left_price{
							font-family: PingFang SC, PingFang SC;
							font-weight: 800;
							font-size: 26rpx;
							color: #F3581D;
							margin-top: 5rpx;
						}
						.left_priced{
							width: 100%;
							height: 50rpx;
							line-height: 50rpx;
							background: #FFF3DF;
							border-radius: 10rpx;
							display: flex;
							align-items: center;
							font-family: PingFang SC, PingFang SC;
							font-weight: 400;
							font-size: 24rpx;
							color: #976D23;
							margin-top: 15rpx;
						}
					}
				}
				.auctionDetail_top_right{
					font-family: PingFang SC, PingFang SC;
					font-weight: 800;
					font-size: 26rpx;
					color: #F3581D;
				}
			}
			.auctionDetail_top_title{
				width: 100%;
				box-sizing: border-box;
				padding: 30rpx 15rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 32rpx;
				color: #3A2633;
			}
			.auctionDetail_toptwo{
				width: 100%;
				box-sizing: border-box;
				padding: 33rpx 35rpx;
				background-color: #FFFFFF;
				border-radius: 10rpx;
				.toptwo_title{
					width: 100%;
					display: flex;
					align-items: center;
					margin-bottom: 30rpx;
					.title_left{
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 26rpx;
						color: #3A2633;
					}
					.title_right{
						flex: 1;
						margin-left: 20rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 26rpx;
						color: #3A2633;
						text-align: right;
					}
				}
			}
		}
		
	}
</style>