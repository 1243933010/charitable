<template>
	<view class="profix-page-container">
		<view class="tabs" :style="{ paddingTop: iStatusBarHeight || 20 + 'px' }">
			<view class="tabs-con">
				<view class="tabs-item" v-for="tab in tabs" :key="tab.val" :class="{active: tabsVal === tab.val}"
					@click="tabsChange(tab.val)">{{tab.text}}</view>
			</view>
		</view>
		<scroll-view :scroll-y="true" class="classification-scroll page-scroll">
			<view class="tab-pane" :class="{active: tabsVal === 0}">
				<view class="banner">
					<swiper class="swiper" circular autoplay style="height: 430rpx;" @change="swiperChange">
						<swiper-item v-for="(item, index) in swiperList" :key="index">
							<view class="swiper-item">
								<view class="pic">
									<image :src="imageUrl+item.image" class="img" mode="aspectFit"></image>
								</view>
							</view>
						</swiper-item>
					</swiper>
					<view class="swiper-active">
						<view class="item" v-for="(item,index) in swiperList" :key="index">
							<view class="div" :class="index == currentIndex ? 'active' : ''"></view>
						</view>
					</view>
				</view>

				<view class="product-list">
					<view class="product-item" v-for="(item,index) in userAuctionsList" :key="index"
						@click="goPage(item)">
						<view class="product-img pic">
							<image :src="imageUrl+item.main_image" mode="aspectFit" class="img"></image>
							<view class="absolute" v-if="item.status==1&&item.price_list.length>0">
								<view class="icon">
									<image src="../../static/img/icon/raido_check.png" mode="widthFix"></image>
									<text>{{$t("app.newAdd67")}}</text>
								</view>
								<view class="title">
									<text>{{$t("app.newAdd66")}}</text>
								</view>
								<view class="list" v-for="(val,ind) in item.price_list" :key="ind">
									<view class="item" v-if="ind==0">
										<image  src="../../static/img/icon/icon_1.png" mode="widthFix"></image>
										<text>{{$t("app.newAdd68")}}:</text>
										<text>${{val.goods_price}}</text>
									</view>
									<view class="item" v-if="ind==1">
										<image  src="../../static/img/icon/icon_2.png" mode="widthFix"></image>
										<text>{{$t("app.newAdd69")}}:</text>
										<text>${{val.goods_price}}</text>
									</view>
										<view class="item" v-if="ind==2">
											<image  src="../../static/img/icon/icon_3.png" mode="widthFix"></image>
											<text>{{$t("app.newAdd70")}}:</text>
											<text>${{val.goods_price}}</text>
										</view>
										
										
										
								</view>
							</view>
						</view>
						<view class="product-info">
							<view class="product-title">{{item.title}}</view>
							<view class="product-price">{{item.bid_increment}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="tab-pane" :class="{active: tabsVal === 1}">
				<view class="product-list">
					<view class="product-item-h" v-for="(item,index) in myProductList" @click="goPage(item)" :key="index">
						<view class="product-img pic">
							<image :src="imageUrl+item.main_image" mode="aspectFit" class="img"></image>
						</view>
						<view class="product-info">
							<view class="product-title">{{item.title}}</view>
							<view class="time-price-btn">
								<view class="time-price">
									<view class="time">{{$t("app.shen34")}}：{{item.auction_end_time}}</view>
									<view class="price">{{item.bid_increment}} USDT</view>
								</view>
								<!-- v-if="item.status==0" -->
								<view   v-if="item.status==0" class="btn-box" @click.stop="openDialog(item)">{{$t("app.shen6")}}</view>
							   <view v-if="item.status==1" style="background: darkgrey;" class="btn-box" >{{$t("app.shen4")}}</view>
							   <view v-if="item.status==2" style="background: darkgrey;" class="btn-box" >{{$t("app.shen30")}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>

		<uni-popup ref="popupRef" type="bottom">
			<view class="white-box">
				<view class="icons" @click="closeDialog">
					<image src="@/static/img/close_small_icon.png" mode="widthFix" class="img"></image>
				</view>
				<view class="title">{{$t("app.newAdd62")}}</view>
				<view class="pic">
					<image :src="imageUrl+ productInfo.main_image" mode="aspectFit" class="img"></image>
				</view>
				<view class="label-text">
					<view class="label">{{$t("app.shen9")}}：</view>
					<view class="text no-bg">{{productInfo.title}}</view>
				</view>
				<view class="label-text label-text1">
					<view class="label">{{$t("app.newAdd72")}}：</view>
					<view class="text">$ <input type="text" v-model="price" /> </view>
				</view>
				<view class="label-text ">
					<view class="label">{{$t("app.newAdd71")}}：</view>
					<view class="text">${{productInfo.shelves_min_price}} - ${{productInfo.shelves_max_price}}  </view>
				</view>
				<view class="label-text">
					<view class="label">{{$t("app.newAdd73")}}：</view>
					<view class="text time">

						<uni-datetime-picker :fields="fields" @change="onDateTimeChange"></uni-datetime-picker>
					</view>
				</view>
				<view class="btn-box" @click="submitHandle">{{$t("app.shen36")}}</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		$request,
		filesUrl
	} from "@/utils/request.js";
	import productTestImg from "@/static/img/cn.png";
	import {
		setTabbar
	} from "@/utils/utils.js";
	export default {
		computed: {
			imageUrl() {
				return filesUrl;
			},
			tabs() {
				return [{
						text: this.$t("app.tabbar3"),
						val: 0
					},
					{
						text: this.$t("app.tabbar4"),
						val: 1
					}
				]
			}
		},
		data() {
			return {
				swiperList: [],
				currentIndex: 0,
				userAuctionsList: [],

				tabsVal: 0,
				iStatusBarHeight: 0,
				myProductList: [],
				userAuctionsParams: {
					page: 1,
					limit: 20
				},
				userAuctionsGoodsParams: {
					page: 1,
					limit: 20
				},
				fields: 'year,month,day,hour,minute,second',
				// 设置可选择的开始日期和结束日期
				// :start="startDate" :end="endDate"
				startDate: '2010-01-01 00:00:00',
				endDate: '2030-12-31 23:59:59',
				price: '',
				time: '',
				productInfo:{}
			};
		},
		mounted() {
			setTabbar(this.$t)
			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight;
			this.userAuctions();
			this.slides();
		},
		onReachBottom() {
			if (tabsVal == 0) {
				this.userAuctionsParams.page++;
				this.userAuctions();
			} else {
				this.userAuctionsGoodsParams.page++;
				this.userAuctionsGoods();
			}
		},
		methods: {
			reverseFnc(arr){
				return arr.reverse()
			},
			onDateTimeChange(e) {
				console.log(e)
				this.time = e;
			},
			async slides() {
				let res = await $request("slides", {
					position: '4'
				});
				console.log(res.data.data.data)
				if (res.data.code === 200) {
					this.swiperList = res.data.data.data;
					return false;
				}
				uni.showToast({
					icon: "none",
					title: res.data.msg,
				});
			},
			async userAuctionsGoods() {
				let res = await $request('userAuctionsGoods', this.userAuctionsGoodsParams);
				if (res.data.code === 200) {
					this.myProductList.push(...res.data.data.data);
				}
			},
			async userAuctions() {
				let res = await $request('userAuctions', this.userAuctionsParams);
				if (res.data.code === 200) {
					res.data.data.data.forEach((val,ind)=>{
						if(val.price_list&&val.price_list.length>0){
							let arr = []
							for(let i =val.price_list.length-1;i>=0;i--){
								arr.push(val.price_list[i])
							}
							val.price_list = arr;
						}
					})
					this.userAuctionsList.push(...res.data.data.data);
				}
			},
			swiperChange(e) {
				// e.detail.current 是当前的索引
				this.currentIndex = e.detail.current;
			},
			goPage(item) {
				uni.navigateTo({
					url:`/pages/classification/productDetail?id=${item.auction_goods_id}`,
				});
			},
			tabsChange(val) {
				this.tabsVal = val;
				
				if (this.tabsVal == 0) {
					this.userAuctionsParams.page=1;
					this.myProductList = [];
					this.userAuctions();
				} else {
					this.userAuctionsGoodsParams.page=1;
					this.userAuctionsList = [];
					this.userAuctionsGoods();
				}
			},
			openDialog(productInfo) {
				this.productInfo = productInfo;
				this.$refs.popupRef.open('top');
			},
			async submitHandle() {
				// this.closeDialog();
				let res = await $request('userAddAuctionGoods',{price:this.price,end_time:this.time,id:this.productInfo.id});
				console.log(res)
				uni.showToast({
					icon:'none',
					title:res.data.message
				})
				if (res.data.code === 200) {
					this.closeDialog();
					return
				}
			},
			closeDialog() {
				this.$refs.popupRef.close();
			}
		}
	}
</script>

<style lang="less">
	@import "@/static/less/variable.less";

	page {
		background-color: #f4f4f4;
	}

	.profix-page-container {
		.df();
		flex-direction: column;

		&>.tabs {
			padding: 25rpx;
			background-image: linear-gradient(180deg, #FDF1B9 0%, #FADEAC 51%, #FEDC9C 100%);
			.df(center, center);
			flex-shrink: 0;

			.tabs-con {
				.df(center, center);
				border-radius: 20rpx;
				border: 2rpx solid #FFFFFF;
				overflow: hidden;

				.tabs-item {
					padding: 24rpx 58rpx;
					text-align: center;
					font-size: 26rpx;
					color: #403039;

					&.active {
						border-radius: 20rpx;
						background-color: #fff;
						color: #EF9419;
					}
				}
			}
		}

		.classification-scroll {
			padding: 0;
			flex-grow: 1;
			min-height: 10%;

			.tab-pane {
				display: none;

				&.active {
					display: block;
				}
			}

			.banner {
				width: 100%;
				padding: 20rpx 30rpx 28rpx;

				.swiper {
					border-radius: 20rpx;
					width: 100%;
				}

				.swiper-active {
					margin-top: 26rpx;
					width: 100%;
					background-color: #F4F4F4 !important;
					.df(center, center);

					.div {
						width: 25rpx;
						height: 12rpx;
						background: #CCC8C7;
						border-radius: 50rpx;
						margin: 0 6rpx;
					}

					.active {
						width: 48rpx;
						height: 12rpx;
						background: #F96932;
						border-radius: 50rpx;
					}
				}
			}

			.product-list {
				padding: 30rpx 30rpx 0;
				.df(stretch, space-between);
				flex-wrap: wrap;
				width: 100%;

				.product-item {
					margin-bottom: 32rpx;
					border-radius: 20rpx;
					background-color: #fff;
					width: calc(50% - 15rpx);
					.df(center);
					flex-direction: column;

					.product-img {
						width: 100%;
						height: 300rpx;
						position: relative;
						image{
							width: 100%;
							height: 100%;
						}
						.absolute{
							width: 100%;
							height: 100%;
							position: absolute;
							top: 0;
							left: 0;
							background-color: rgba(0, 0, 0, 0.5);
							display: flex;
							flex-direction: column;
							box-sizing: border-box;
							padding: 20rpx;
							.icon{
								display: flex;
								flex-direction: row;
								align-items: center;
								align-self: flex-end;
								background-color: rgba(0, 0, 0, 0.8);
								box-sizing: border-box;
								padding: 10rpx 10rpx;
								border-radius: 15rpx;
								image{
									width: 24rpx;
									margin-right: 8rpx;
								}
								text{
									font-size: 20rpx;
									color: white;
								}
							}
							.title{
								color: white;
								font-size: 24rpx;
								font-weight: 600;
								margin-bottom: 30rpx;
							}
							.list{
								// display: fl;
								.item{
									margin-bottom: 24rpx;
									display: flex;
									align-items: center;
									image{
										width: 32rpx;
										margin-right: 9rpx;
									}
									text{
										font-size: 24rpx;
										font-weight: 600;
										color: white;
									}
								}
							}
						}
					}

					.product-info {
						padding: 20rpx 28rpx;

						.product-title {
							margin-bottom: 12rpx;
							color: #3A2633;
							font-size: 28rpx;
							font-weight: 600;
							line-height: 1.5;
							.vertical(1);
						}

						.product-price {
							color: #F3581D;
							font-size: 30rpx;
							font-weight: 600;
							line-height: 1.5;
						}
					}
				}

				.product-item-h {
					.df(center);

					margin-bottom: 20rpx;
					border-radius: 20rpx;
					padding: 24rpx 22rpx;
					background-color: #fff;
					width: 100%;

					.product-img {
						width: 144rpx;
						height: 144rpx;
						flex-shrink: 0;
						image{
							width: 100%;
							height: 100%;
						}
					}

					.product-info {
						padding-left: 20rpx;
						flex-grow: 1;
						min-width: 10%;

						.product-title {
							margin-bottom: 20rpx;
							color: #3A2633;
							font-size: 24rpx;
							line-height: 1.5;
							font-weight: bold;
							.vertical(2);
						}

						.time-price-btn {
							.df(center, space-between);

							.time-price {
								padding-right: 10rpx;
								flex-grow: 1;
								min-width: 10%;

								.time {
									margin-bottom: 2rpx;
									color: #9EA19D;
									font-size: 24rpx;
									line-height: 1.375;
								}

								.price {
									color: #F3581D;
									font-size: 26rpx;
									line-height: 1.4;
								}
							}

							.btn-box {
								border-radius: 50px;
								padding: 16rpx 46rpx;
								background-color: #F0931B;
								color: #fff;
								line-height: 1.4;
								font-size: 26rpx;
								flex-shrink: 0;
							}
						}
					}
				}
			}
		}

		.white-box {
			border-radius: 20rpx;
			padding: 50rpx 36rpx;
			background-color: #fff;
			position: absolute;
			top: 10vh;
			left: 50%;
			transform: translateX(-50%);
			z-index: 1;
			width: 85vw;
			background-image: linear-gradient(to bottom, #FFF1E3 0%, #FEFFFE 100%);
			.df(center);
			flex-direction: column;
			transition: .35s ease-in-out;

			.icons {
				position: absolute;
				right: 34rpx;
				top: 34rpx;
				width: 50rpx;
				height: 50rpx;

				.img {
					width: 100%;
				}
			}

			.title {
				margin-bottom: 20rpx;
				color: #3A2633;
				font-size: 30rpx;
				font-weight: bold;
				line-height: 1.4;
			}

			.pic {
				margin-bottom: 25rpx;
				border-radius: 20rpx;
				width: 200rpx;
				height: 200rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}

			.label-text {
				margin-top: 24rpx;
				.df(center);
				width: 100%;

				.label {
					font-size: 26rpx;
					color: #3A2633;
					min-width: 200rpx;
					flex-shrink: 0;
				}

				.text {
					border-radius: 50px;
					padding: 20rpx 42rpx;
					flex-grow: 1;
					min-width: 10%;
					background-color: #F4F4F4;
					line-height: 1.5;
					.vertical(1);

					&.no-bg {
						padding: 0;
						background-color: transparent;
					}

					&.time {
						color: #A8A8A8;
					}
				}
			}

			.label-text1 {
				.text {
					display: flex;
					flex-direction: row !important;
					align-items: center;
				}
			}

			.btn-box {
				margin-top: 46rpx;
				border-radius: 50px;
				padding: 24rpx;
				background-image: linear-gradient(180deg, #ED4506 0%, #FE7947 100%);
				color: #fff;
				font-size: 34rpx;
				line-height: 1.4;
				width: 100%;
				max-width: 350rpx;
				text-align: center;
			}
		}
	}
</style>