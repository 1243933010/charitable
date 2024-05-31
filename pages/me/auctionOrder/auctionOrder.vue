<template>
	<view class="friends">
		<view class="broker_header">
			<view class="broker_stauts">
				
			</view>
			<view class="broker_nav">
				<view class="nav_left" @click="goBack">
					<image src="../../../static/userStatic/left.png" mode="widthFix" style="width: 22rpx;"></image>
				</view>
				<view class="nav_count">
					{{$t('app.user.paiorder')}}
				</view>
				<!-- <view class="nav_search">
					<image src="../../../static/userStatic/search_black.png" mode="aspectFill"></image>
				</view> -->
			</view>
		</view>
		<view class="broker_search">
			<view class="search_title">
				{{$t('app.order.shuoming')}}
			</view>
			<view class="actionOrdeNav">
				<view class="actionOrdeNav_one" :class="{'actionOrdeNav_oneActive':navOrderindex==indexs}" v-for="(items,indexs) in navOrderarray" :key="indexs" @click="navOrderindex=indexs,getPaiorder('init')">
					{{this.$t(items.name)}}
				</view>
			</view>
		</view>
		<scroll-view scroll-y="true" class="scroll_h">
			<view class="friends_centent">
				<view class="order_one" v-for="(item,index) in orderList" :key="index" @click="goPath(`/pages/me/auctionOrder/auctionDetail?id=${item.id}`)">
					<view class="order_one_left">
						<image :src="sortImage(item.main_image)" mode="aspectFill"></image>
						<view class="order_one_leftcount">
							<view class="leftcount_name">
								{{item.title}}
							</view>
							<view class="leftcount_price">
								{{$t('app.order.currentprice')}}：{{item.current_price}} USDT
							</view>
							<view class="leftcount_pricetwo">
								{{$t('app.order.jingjiaprice')}}：{{item.order_money}} USDT
							</view>
							<view class="leftcount_time" v-if="item.auction_end_time">
								{{item.auction_end_time}}{{$t('app.newAdd55')}}
							</view>
						</view>
					</view>
					<view class="order_one_right">
						{{item.status_desc}}
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		$request,
		filesUrl
	} from "@/utils/request";
	export default {
		data(){
			return {
				navOrderarray:[
					{
						name:"app.month.all",
						status:""
					},
					{
						name:"app.shen35",
						status:"0"
					},
					{
						name:"app.paixia",
						status:"1"
					},
					{
						name:"app.chuju",
						status:"2"
					}
				],
				navOrderindex:0,
				params:{
					page:1,
					status:""
				},
				last_page:1,
				orderList:[]
			}
		},
		onLoad() {
			this.getPaiorder('init')
		},
		onReachBottom() {
			if(this.last_page>this.params.page){
				this.params.page++
				this.getPaiorder()
			}
		},
		onPullDownRefresh() {
			setTimeout(()=>{
				uni.stopPullDownRefresh()
			},1500)
			this.getPaiorder('init')
		},
		computed:{
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
		methods:{
			async getPaiorder(type){
				if(type=='init'){
					this.params.page=1
					this.orderList=[]
				}
				this.params.status=this.navOrderarray[this.navOrderindex].status
				let res = await $request('userParticipateAuctionRecords', this.params);
				if (res.data.code == 200) {
					this.last_page=res.data.data.last_page
					if(this.params.page==1){
						this.orderList=res.data.data.data
					}else{
						this.orderList=[...this.orderList,...res.data.data.data]
					}
					// console.log(res,'账户明细')
				}
			},
			goBack(){
				uni.navigateBack()
			},
			goPath(link){
				uni.navigateTo({
					url: link,
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.friends{
		width: 100%;
		min-height: 100vh;
		background-color: #F4F4F4;
		.broker_header{
			width: 100%;
			background-color: #FFE3B1;
			.broker_stauts{
				width: 100%;
				height: var(--status-bar-height);
			}
			.broker_nav{
				width: 100%;
				height: 100rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				position: relative;
				.nav_left{
					width: 100rpx;
					height: 100rpx;
					position: absolute;
					left: 0;
					top: 0;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.nav_count{
					font-family: PingFang SC, PingFang SC;
					font-weight: 800;
					font-size: 36rpx;
					color: #403039;
				}
				.nav_search{
					width: 80rpx;
					height: 100rpx;
					position: absolute;
					top: 0;
					right: 0;
					display: flex;
					align-items: center;
					justify-content: center;
					image{
						width: 35rpx;
						height: 35rpx;
					}
				}
			}
		}
		.broker_search{
			.search_title{
				width: 100%;
				height: 68rpx;
				background: #FFF5E5;
				box-sizing: border-box;
				padding: 0 20rpx;
				display: flex;
				align-items: center;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 22rpx;
				color: #827452;
			}
			.actionOrdeNav{
				width: 100%;
				box-sizing: border-box;
				padding: 20rpx 0;
				display: flex;
				justify-content: space-around;
				.actionOrdeNav_one{
					width: 146rpx;
					height: 60rpx;
					line-height: 60rpx;
					text-align: center;
					background: #FFFFFF;
					border-radius: 20rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #3A2633;
				}
				.actionOrdeNav_oneActive{
					background: linear-gradient( 180deg, #EF8E1E 0%, #F0AD04 100%);
					color: #FFFFFF;
				}
			}
		}
		.scroll_h{
			width: 100%;
			height: calc(100vh - 290rpx - var(--status-bar-height));
			box-sizing: border-box;
			padding: 0 30rpx;
			.friends_centent{
				width: 100%;
				height: calc(100vh - 290rpx - var(--status-bar-height));
				box-sizing: border-box;
				.order_one{
					width: 100%;
					background-color: #FFFFFF;
					border-radius: 20rpx;
					box-sizing: border-box;
					padding: 12rpx;
					display: flex;
					justify-content: space-between;
					margin-bottom: 20rpx;
					.order_one_left{
						display: flex;
						image{
							width: 144rpx;
							height: 144rpx;
							border-radius: 15rpx;
						}
						.order_one_leftcount{
							width: 380rpx;
							margin-left: 15rpx;
							.leftcount_name{
								width: 100%;
								font-family: PingFang SC, PingFang SC;
								font-weight: bold;
								font-size: 24rpx;
								color: #3A2633;
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
							}
							.leftcount_price{
								font-family: PingFang SC, PingFang SC;
								font-weight: 800;
								font-size: 26rpx;
								color: #F3581D;
								margin-top: 25rpx;
							}
							.leftcount_pricetwo{
								width: 100%;
								height: 50rpx;
								line-height: 50rpx;
								background: #FFF3DF;
								border-radius: 10rpx;
								font-family: PingFang SC, PingFang SC;
								font-weight: 400;
								font-size: 24rpx;
								color: #976D23;
								margin-top: 15rpx;
								box-sizing: border-box;
								padding: 0 5rpx;
							}
							.leftcount_time{
								font-family: PingFang SC, PingFang SC;
								font-weight: 400;
								font-size: 24rpx;
								color: #3A2633;
								margin-top: 15rpx;
							}
						}
					}
					.order_one_right{
						font-family: PingFang SC, PingFang SC;
						font-weight: 800;
						font-size: 26rpx;
						color: #F3581D;
						margin-top: 35rpx;
					}
				}
			}
		}
	}
</style>