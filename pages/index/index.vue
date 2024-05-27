<template>
	<view class="profix-page-container index-page">
		<!-- :headerText="$t('app.name')" -->
		<customHeader style="z-index: 0" :above="false" />
		<customHeader :headerText="$t('app.name')" style="position: fixed; top: 0; z-index: 1" :above="true" />
		<view class="index-scroll  has-tabbar">
			<view class="banner">
				<swiper class="swiper" circular autoplay style="height: 400rpx;" @change="swiperChange">
					<swiper-item  v-for="(item, index) in swiperList" :key="index">
						<view class="swiper-item">
							<view class="pic">
								<image @click="linkImg(item)" :src="imageUrl+item.image" class="img" mode="widthFix"></image>
								<view class="text-box">
									<view class="title">
										<text>{{item.title}}</text>
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
			<view class="menu-container">
				
				<view class="" style="background-color: #FDDDA3;padding-top: 25rpx;">
					<view class="menu-list" v-for="(item, index) in menuList" :key="index">
						<view @click="goPage(e.link)" class="menu-item" v-for="(e, i) in item" :key="i">
							<view class="pic">
								<image :src="e.iconUrl" mode="widthFix" class="img"></image>
							</view>
							<view class="menu-tit">{{e.tit}}</view>
						</view>
					</view>
				</view>
				<view class="news-list">
					<!-- {{ $t("index.news") }} -->
					<view class="left-tit">
						<image src="../../static/img/icon/new_icon.png" mode="widthFix"></image>
					</view>
					<view class="news-swiper">
						<swiper class="swiper" vertical circular autoplay>
							<swiper-item v-for="(item, index) in newsList" :key="index" @click="newLink(item)">
								<view class="swiper-item">{{ item.name }}</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
				<view class="tab">
					<view class="tab-item"  @click="goPage('/pages/index/passingLove')">
						<image src="../../static/img/icon/index/tab1.png" mode="widthFix"></image>
						<!-- <text>{{$t("app.newAdd15")}}</text> -->
					</view>
					<view class="tab-item" @click="goPage('/pages/index/passingLove')">
						<image src="../../static/img/icon/index/tab2.png" mode="widthFix"></image>
						<!-- <text>{{$t("app.newAdd14")}}</text> -->
					</view>
					
				</view>
				<!-- <view class="auction">
					<view class="auction-header">
						<view class="auction-title">
							<view class="radio"></view>
							<text>{{$t("app.newAdd16")}}</text>
						</view>
						<view class="more">
							<text>{{$t("app.newAdd17")}}></text>
						</view>
					</view>
					<view class="content">
						<scroll-view :enable-flex="true" :scroll-x="true" style="white-space: nowrap;width:100%;">
							<view class="item" v-for="(item,index) in auctionList" :key="index">
								<view class="img">
									<image :src="item.url" mode="widthFix"></image>
								</view>
								<view class="label">
									<text>{{item.label}}</text>
								</view>
							</view>
						</scroll-view>

					</view>
				</view> -->
			</view> 
			

			<!-- <view class="paper-card-list">
				<view class="paper-card " @click="goPage(linkInfo.Join_community_url.val)">
					

					<view class="left">
						<view class="title">{{$t('app.img1')}}</view>
						<view class="label">{{$t('app.img2')}}</view>
					</view>
					<view class="right1">
						<image src="../../static/img/shequ.c92aac23.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="paper-card " @click="goPage(linkInfo.telegram_url.val)">
					
					<view class="left">
						<view class="title">{{$t('app.img3')}}</view>
						<view class="label">{{$t('app.img4')}}</view>
					</view>
					<view class="right">
						<image src="../../static/img/feiji.d3ae16e3.png" mode="widthFix"></image>
					</view>
				</view>
			</view> -->
			
			<view class="product-container">
				<view class="header">
					<view class="tit">
						<view class="radio"></view>
					{{ $t("app.newAdd12") }}
					
					</view>
					<view class="desc">{{ $t("app.newAdd17") }}></view>
				</view>
			
				<view class="product-list">
					<view class="product-item" v-for="(item,index) in nftList" :key="index">
						<view class="product-img pic">
							<image :src="item.url" mode="aspectFit" class="img" @click="goProductDetail(item)">
							</image>
						</view>
						<view class="product-info">
							<view class="product-title">{{item.title}}</view>
							<!-- <view class="product-tit">{{item.label}}</view> -->
							<view class="product-price-info">
								<view class="rebate">
									<text style="margin-right:27rpx;">{{item.statusText}}</text>
									<text style="">{{item.statusText}}</text>
								</view>
							
							</view>
						</view>
					</view>
			
				</view>
			</view>
			
			<view class="product-container1">
				<view class="header">
					<view class="tit">
					<view class="radio"></view>
					{{ $t("app.newAdd10") }}</view>
					<view class="desc">{{ $t("app.newAdd17") }}></view>
				</view>
			
				<view class="product-list">
					<view class="product-item" v-for="(item,index) in nftList" :key="index">
						<view class="product-img pic">
							<image :src="item.url" mode="aspectFit" class="img" @click="goProductDetail(item)">
							</image>
						</view>
						<view class="product-info">
							<view class="product-title"><text>{{item.title}}</text> </view>
							<view class="product-tit">
								<text>{{item.label}}</text>
								<text style="color: #8E8E8E;font-size: 24rpx;">{{ $t("app.newAdd20") }}11</text>
							</view>
							<!-- <view class="product-price-info">
								<view class="rebate">$ {{item.statusText}}</view>
							
							</view> -->
						</view>
					</view>
			
				</view>
			</view>
		<!-- 	<view class="product-container3">
				<view class="header">
					<view class="tit">
						<view class="radio"></view>
					{{ $t("app.newAdd11") }}
					
					</view>
					<view class="desc">{{ $t("app.newAdd17") }}></view>
				</view>
			
				<view class="product-list">
					<view class="product-item" v-for="(item,index) in nftList" :key="index">
						<view class="product-img pic">
							<image :src="item.url" mode="aspectFit" class="img" @click="goProductDetail(item)">
							</image>
						</view>
						<view class="product-info">
							<view class="product-title">{{item.title}}</view>
							<view class="product-tit">{{item.label}}</view>
							<view class="product-price-info">
								<view class="rebate">$ {{item.statusText}}</view>
							
							</view>
						</view>
					</view>
			
				</view>
			</view> -->
			<view class="product-container3">
				<view class="header">
					<view class="tit">
						<view class="radio"></view>
					{{ $t("app.newAdd11") }}
					
					</view>
					<view class="desc">{{ $t("app.newAdd17") }}></view>
				</view>
			
				<view class="product-list">
					<view class="product-item" v-for="(item,index) in nftList" :key="index">
						<view class="product-img pic">
							<image :src="item.url" mode="aspectFit" class="img" @click="goProductDetail(item)">
							</image>
						</view>
						<view class="product-info">
							<view class="product-title">{{item.title}}</view>
							<!-- <view class="product-tit">{{item.label}}</view> -->
							<view class="product-price-info">
								<view class="rebate">
									<text style="margin-right:7rpx;">{{item.statusText}}</text>
									<text style="color: #F96932;">{{item.statusText}}</text>
								</view>
							
							</view>
						</view>
					</view>
			
				</view>
			</view>
			<view class="product-container3">
				<view class="header">
					<view class="tit">
						<view class="radio"></view>
					{{ $t("app.newAdd9") }}
					
					</view>
					<view class="desc">{{ $t("app.newAdd17") }}></view>
				</view>
			
				<view class="product-list">
					<view class="product-item" v-for="(item,index) in nftList" :key="index">
						<view class="product-img pic">
							<image :src="item.url" mode="aspectFit" class="img" @click="goProductDetail(item)">
							</image>
						</view>
						<view class="product-info">
							<view class="product-title">{{item.title}}</view>
							<!-- <view class="product-tit">{{item.label}}</view> -->
							<view class="product-price-info">
								<view class="rebate" style="display: flex;justify-content: space-between;width: 100%;">
									<text style="margin-right:7rpx;color: #EF8F1E;">{{item.statusText}}</text>
									<text style="color: #9EA19D;">{{item.statusText}}</text>
								</view>
							
							</view>
						</view>
					</view>
			
				</view>
			</view>
			<view class="product-container1" style="padding-bottom: 140rpx;">
				<view class="header">
					<view class="tit">
					<view class="radio"></view>
					{{ $t("app.newAdd21") }}</view>
					<view class="desc">{{ $t("app.newAdd17") }}></view>
				</view>
			
				<view class="product-list">
					<view class="product-item" v-for="(item,index) in nftList" :key="index">
						<view class="product-img pic">
							<image :src="item.url" mode="aspectFit" class="img" @click="goProductDetail(item)">
							</image>
						</view>
						<view class="product-info">
							<view class="product-title"><text>{{item.title}}</text> </view>
							<view class="product-tit">
								<text>{{item.label}}</text>
								<!-- <text style="color: #8E8E8E;font-size: 24rpx;">{{ $t("app.newAdd20") }}11</text> -->
							</view>
							<!-- <view class="product-price-info">
								<view class="rebate">$ {{item.statusText}}</view>
							
							</view> -->
						</view>
					</view>
			
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="center" background-color="#fff">
			<view class="popup-container">
				<view class="popup-tit">{{newsList[0].name}}</view>
				<view class="popup-content">
					<rich-text :nodes="newsList[0].content"></rich-text>
				</view>
				<view class="popup-close-btn" @click="$refs.popup.close()">{{$t("app.sure")}}</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import customHeader from "@/components/customHeader/customHeader.vue";
	import {
		$request,filesUrl
	} from "@/utils/request.js";
	import {
		setTabbar
	} from "@/utils/utils.js";
	export default {
		components: {
			customHeader
		},
		data() {
			return {
				title: "Hello",
				newsList: [],
				swiperList: [],
				nftList: [
					{url:'../../static/img/logo.png',label:'500USDT',statusText:'**用户已完成交易',title:'白色的空开放式学校背包'},
					{url:'../../static/img/logo.png',label:'500USDT',statusText:'**用户已完成交易',title:'白色的空开放式学校背包'},
					{url:'../../static/img/logo.png',label:'500USDT',statusText:'**用户已完成交易',title:'白色的空开放式学校背包'},
					{url:'../../static/img/logo.png',label:'500USDT',statusText:'**用户已完成交易',title:'白色的空开放式学校背包'},
				],
				linkInfo: {},
				currentIndex:0,
				auctionList:[
					{url:'../../static/img/logo.png',label:'500USDT'},
					{url:'../../static/img/logo.png',label:'500USDT'},
					{url:'../../static/img/logo.png',label:'500USDT'},
					{url:'../../static/img/logo.png',label:'500USDT'},
					{url:'../../static/img/logo.png',label:'500USDT'},
					{url:'../../static/img/logo.png',label:'500USDT'},
				]
			};
		},
		onLoad() {},
		computed: {
			locales() {
				return [{
						text: this.$t("locale.auto"),
						code: "auto",
					},
					{
						text: this.$t("locale.en"),
						code: "en",
					},
					{
						text: this.$t("locale.zh-hans"),
						code: "zh-Hans",
					},
					{
						text: this.$t("locale.zh-hant"),
						code: "zh-Hant",
					},
					{
						text: this.$t("locale.ja"),
						code: "ja",
					},
				];
			},
			menuList() {
				return [
					[
						{
						  iconUrl: "../../static/img/icon/index/11.png",
						  tit: this.$t("app.newAdd9"),
						  link: "/pages/index/auction",
						},
						{
							iconUrl: "../../static/img/icon/index/22.png",
							tit: this.$t("app.newAdd10"),
							link: "/pages/index/charitySale",
						},
						{
							iconUrl: "../../static/img/icon/index/33.png",
							tit: this.$t("app.newAdd11"),
							link: "/pages/index/targetedAssistance",
						},
						

						{
							iconUrl: "../../static/img/icon/index/44.png",
							tit: this.$t("app.newAdd12"),
							link: "/pages/index/charityConsultation",
						},
						{
							iconUrl: "../../static/img/icon/index/55.png",
							tit: this.$t("app.newAdd13"),
							link: "/pages/index/contactUs",
						},
						// {
						//   iconUrl: "../../static/img/icon/index/66.png",
						//   tit: this.$t("index.menuBtn6"),
						//   link: "/pages/index/withdraw",
						// },
					],
					// [

					// ],
					// [
					//   {
					//     iconUrl: "../../static/img/icon/index/77.png",
					//     tit: this.$t("index.menuBtn7"),
					//     link: "/pages/index/invitePage",
					//   },
					//   {
					//     iconUrl: "../../static/img/icon/index/88.png",
					//     tit: this.$t("index.menuBtn8"),
					//     link: "/pages/index/activity",
					//   },
					//   {
					//     iconUrl: "../../static/img/icon/index/88.png",
					//     tit: this.$t("index.menuBtn9"),
					//     link: "/pages/join/join",
					//   },
					// ],
				];
			},
		    imageUrl(){
				return filesUrl;
			}
		},
		mounted() {
			console.log(filesUrl)
			setTabbar(this.$t)
			this.slides();
			this.getNotices();
			this.nftListFnc();
			this.linkObj();
		},
		methods: {
			 swiperChange(e) {
			      // e.detail.current 是当前的索引
			      this.currentIndex = e.detail.current;
			},
			async linkObj() {
				let res = await $request('linkObj', {});
				console.log(res.data)
				if (res.data.code == 0) {
					console.log(this.menuList)
					// this.menuList[2][0].link = res.data.data.app_download_url.val
					this.linkInfo = res.data.data;
					console.log(this.menuList)
				}
			},
			async nftListFnc() {
				this.loading = true;
				let formData = {
					keywords: '',
					page: 1,
					page_size: 20,
					vip_grade: ''
				}
				let res = await $request('nftList', formData);
				console.log(res)
				this.loading = false;
				if (res.data.code === 0) {
					this.nftList = res.data.data.data;
					console.log(this.nftList)
				}
			},
			newLink(item) {

				uni.setStorageSync("notices", item);
				uni.navigateTo({
					url: "./notices",
				});
			},
			linkImg(item) {

				uni.navigateTo({
					url: item.url,
				});
			},
			async getNotices() {
				let res = await $request("notices", {});
				// console.log(res)
				if (res.data.code === 0) {
					this.newsList = res.data.data;
					console.log(this.newsList, '-------')
					if (this.newsList.length > 0) {
						this.$refs.popup.open("center");
					}
					return false;
				}
				uni.showToast({
					icon: "none",
					title: res.data.msg,
				});
			},
			async slides() {
				let res = await $request("slides", {});
				console.log( res.data.data.data)
				if (res.data.code === 200) {
					this.swiperList = res.data.data.data;
					return false;
				}
				uni.showToast({
					icon: "none",
					title: res.data.msg,
				});
			},
			onLocaleChange(e) {
				if (this.isAndroid) {
					uni.showModal({
						content: this.$t("index.language-change-confirm"),
						success: res => {
							if (res.confirm) {
								uni.setLocale(e.code);
							}
						},
					});
				} else {
					uni.setLocale(e.code);
					this.$i18n.locale = e.code;
				}
			},
			goProductDetail(item) {

				uni.navigateTo({
					url: `/pages/index/productDetail?id=${item.id}`,
				});
			},
			goPage(link) {
				if (link == '/pages/index/invitePage') {
					// #ifdef APP
					return false
					// #endif
				}
				// #ifdef H5
				if (link.includes('http') || link.includes('www')) {
					window.open(link, '_blank');
					return
				}
				// #endif
				// #ifdef APP-PLUS
				console.log(link, '===')
				if (link.includes('http') || link.includes('www')) {
					uni.navigateTo({
						url: `/pages/index/webview?url=${link}`,
					});
					return
				}
				// #endif
				if (link.indexOf("join") !== -1) {
					uni.switchTab({
						url: link,
					});
				} else {
					uni.navigateTo({
						url: link,
					});
				}
			},
		},
	};
</script>

<style lang="less">
	@import "../../static/less/variable.less";
	page{
		background-color: #F4F4F4;
	}
	.swiper-active{
		background-color: #FAE0AD;
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

	.index-page {
		background-color: #F4F4F4;

		// background-color: red;
		.index-scroll {
			.banner {
				width: 100%;
				margin: 0 auto;
				// background: url("../../static/img/bg/index_bg.png") no-repeat center center / 100% 100%;
				background-color: #FAE0AD;
				box-sizing: border-box;
				display: flex;
				justify-content: center;
				align-items: center;
				// padding-left: 5%;
				// display: flex;
				// justify-content: center;
				// align-items: center;
				// margin-left: 5%;
				// margin-right: -30rpx;

				.swiper {
					width: 90%;
					height: 140px;
					
					.swiper-item {
						
						.pic {
							position: relative;
							image{
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

			.news-list {
				width: 85%;
				margin: 20rpx auto;
				// margin-left: -30rpx;
				// margin-right: -30rpx;
				padding: 10rpx 30rpx;
				background-color: white;
				border-radius: 20rpx;
				.df(center, flex-start);
				flex-direction: row;

				.left-tit {
					margin-right: 38rpx;
					border-radius: 0 50px 50px 0;
					padding: 10rpx 30rpx;
					// background: linear-gradient(0deg, #fd631f 0%, #fd7e1f 100%);
					// background: linear-gradient(90deg, #1098B7 0%, #64BAB4 100%);
					// background: #F96932;
					color: #F96932;
					font-size: 24rpx;
					image{
						width:29rpx;
						margin-right: 10rpx;
					}
				}

				.news-swiper {

					min-width: 10%;
					flex-grow: 1;

					.swiper {
						height: 36rpx;

						.swiper-item {
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;

							color: #F96932;
							font-size: @descSize;
							line-height: 36rpx;
						}
					}
				}
			}

			.menu-container {
				width: 100%;
				// margin-top: 21rpx;
				margin-bottom: 22rpx;
				// padding: 43rpx 0rpx;
				// background-color: white;
				border-radius: 50rpx;

				.tab {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 33rpx;
					box-sizing: border-box;
					padding: 0 37rpx;

					.tab-item {
						// width: 330rpx;
						width: 48%;
						height: 160rpx;
						position: relative;

						image {
							width: 100%;
							height: 100%;
						}

						text {
							position: absolute;
							bottom: 15rpx;
							left: 35rpx;
							color: #FFF7E8;
							font-size: 26rpx;
						}
					}
				}

				.menu-list {
					// margin-bottom: 20rpx;
					background-color: white;
					.df(stretch, space-between);
					flex-direction: row;
					padding: 43rpx 10rpx;
					border-top-left-radius: 50rpx;
					border-top-right-radius: 50rpx;
					&:last-child {
						margin-bottom: 0;
					}

					.menu-item {
						.df(center, center);
						flex-direction: column;
						width: 18%;
						text-align: center;

						.pic {
							width: 104rpx;

							.img {
								width: 100%;
							}
						}

						.menu-tit {
							margin-top: 24rpx;
							font-size: 24rpx;
							font-weight: 600;
						}
					}
				}

				.auction {
					display: flex;
					flex-direction: column;
					padding-top: 9rpx;
					box-sizing: border-box;
					padding-left: 30rpx;
					padding-right: 30rpx;

					// background-color: red;
					.auction-header {
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-bottom: 29rpx;

						.auction-title {
							// background-color: red;
							display: flex;
							flex-direction: row;
							align-items: center;

							.raido {}

							text {
								color: #3A2633;
								font-size: @bodySize;
							}
						}

						.more {
							color: #858585;
							font-size: @descSize;
						}
					}

					.content {
						width: 100%;
						// display: flex;
						// flex-direction: row;
						// align-items: center;
						// white-space: nowrap;
						// overflow-x: scroll;

						.item {
							display: inline-block;
							width: 200rpx;
							text-align: center;
							// height: 100rpx;
							// display: flex;
							// flex-direction: column;
							// align-items: center;
							.img{
								width: 200rpx;
								height: 200rpx;
								image{
									width: 100%;
								}
							}
							.label{
								font-size: @descSize;
								color: #3A2633;
								font-weight: 600;
							}
							// background-color: red;
						}
					}
				}
			}

			.paper-card-list {
				margin-bottom: 36rpx;

				.paper-card {
					margin-bottom: 10rpx;
					width: 100%;
					// height: 280rpx;
					box-sizing: border-box;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					// background: linear-gradient(0deg, rgba(249,246,233,1) 0%,  rgba(251,249,255,1) 100%);
					background: linear-gradient(90deg, #B8DDDE 0%, #DBEBEB 100%);
					// background: red;
					padding: 40rpx 50rpx;

					.left {
						width: 70%;

						.title {
							color: #E68724;
							font-size: 36rpx;
							font-weight: 600;
							margin-bottom: 40rpx;
						}

						.label {
							color: #E68724;
							font-size: 24rpx;
							// font-weight: 600;
							// margin-bottom: 30rpx;
						}
					}

					.right {
						width: 30%;
						display: flex;
						justify-content: center;
						align-items: center;

						image {
							width: 137rpx;
						}
					}

					.right1 {
						width: 30%;
						display: flex;
						justify-content: center;
						align-items: center;

						image {
							width: 174rpx;
						}
					}
				}
			}

			.product-container,.product-container3 {
				padding-bottom: 26rpx;
				box-sizing: border-box;
				padding-left: 20rpx;
				padding-right: 20rpx;
				.header{
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
				.tit {
					margin-bottom: 8rpx;
					color: @bodyColor;
					font-size: @bodySize;
					font-weight: 600;
					display: flex;
					flex-direction: row;
					align-items: center;
				}

				.desc {
					margin-bottom: 28rpx;
					color: #777680;
					font-size: @descSize;
				}

				.product-list {
					// .df(stretch, flex-start);
					width: 100%;
					.product-item {
						margin-top: 10rpx;
						margin-right: 10rpx;
						border-radius: 20rpx;
						background-color: #fff;
						width: 100%;
						// overflow: hidden;
						display: flex;
						flex-direction: row;
						align-items: center;
						box-sizing: border-box;
						padding-top: 9rpx;
						padding-bottom: 9rpx;
						.product-img {
							width: 144rpx;
							height: 144rpx;
							background-color: white;
							margin-right: 27rpx;
							image {
								width: 100%;
								height: 100%;
								// height: 100rpx;
							}
						}

						.product-info {
							padding: 20rpx 28rpx;
							box-sizing: border-box;
							width:calc(100% - 144rpx);
							height:144rpx;
							display: flex;
							flex-direction: column;
							justify-content: space-between;
							.product-title {
								.vertical(2);
								color: #3A2633;
								font-size: 24rpx;
								font-weight: 600;
								line-height: 1.5;
								margin-bottom: 9rpx;
							}
							.product-tit {
								.vertical(2);
								color: #F3581D;
								font-size: 26rpx;
								font-weight: 600;
								line-height: 1.5;
								margin-bottom: 9rpx;
								
							}

							.product-price-info {
								.df(center, space-between);

								.rebate {
									color: #9EA19D;
									font-size: 24rpx;
									// font-weight: bold;
								}

								.brfore-rebate {
									color: #777680;
									font-size: 30rpx;
									text-decoration: line-through;
								}
							}
						}

						&:nth-child(2n) {
							margin-right: 0;
						}
					}
				}
			}
			.product-container3{
				background-color: white;
			}
			.product-container1 {
				margin-top: 16rpx;
				padding-bottom: 26rpx;
				padding-top: 37rpx;
				box-sizing: border-box;
				padding-left: 20rpx;
				padding-right: 20rpx;
				background-color: white;
				.header{
					display: flex;
					justify-content: space-between;
					align-items: center;
					background-color: white;
				}
				.tit {
					margin-bottom: 8rpx;
					color: @bodyColor;
					font-size: @bodySize;
					font-weight: 600;
					display: flex;
					flex-direction: row;
					align-items: center;
				}
			
				.desc {
					margin-bottom: 28rpx;
					color: #777680;
					font-size: @descSize;
				}
			
				.product-list {
					// .df(stretch, flex-start);
					width: 100%;
					display: flex;
					justify-content: space-between;
					flex-wrap: wrap;
					.product-item {
						// margin-top: 10rpx;
						// margin-right: 10rpx;
						border-radius: 20rpx;
						background-color: #fff;
						width: calc(50% - 5rpx);
						// overflow: hidden;
						display: flex;
						flex-direction: column;
						align-items: center;
						padding-top: 9rpx;
						padding-bottom: 9rpx;
						// background-color: red;
						.product-img {
							width: 324rpx;
							height: 305rpx;
							background-color: white;
							// margin-right: 27rpx;
							image {
								width: 100%;
								height: 100%;
								// height: 100rpx;
							}
						}
			
						.product-info {
							padding: 20rpx 28rpx;
							.product-title {
								// .vertical(2);
								// width:200rpx;
								// overflow: hidden;
								// text-overflow:ellipsis;
								color: #3A2633;
								font-size: 28rpx;
								font-weight: 600;
								line-height: 1.5;
								margin-bottom: 9rpx;
								width:300rpx;
								overflow: hidden;
								text-overflow:ellipsis;
								text{
									// width:200rpx;
									// overflow: hidden;
									text-overflow:ellipsis;
									white-space: nowrap;
								}
							}
							.product-tit {
								.vertical(2);
								color: #F3581D;
								font-size: 30rpx;
								font-weight: 600;
								line-height: 1.5;
								margin-bottom: 9rpx;
								display: flex;
								justify-content: space-between
							}
			
							.product-price-info {
								.df(center, space-between);
			
								.rebate {
									color: #9EA19D;
									font-size: 24rpx;
									// font-weight: bold;
								}
			
								.brfore-rebate {
									color: #777680;
									font-size: 30rpx;
									text-decoration: line-through;
								}
							}
						}
			
						&:nth-child(2n) {
							margin-right: 0;
						}
					}
				}
			}
		}
	}

	.popup-container {
		border-radius: 20rpx;
		padding: 30rpx 25rpx 55rpx;
		width: calc(100vw - 184rpx);

		.df(center, flex-start);
		flex-direction: column;

		.popup-tit {
			margin-bottom: 36rpx;
			text-align: center;
			font-size: @bodySize;
			color: @bodyColor;
			font-weight: bold;
		}

		.popup-content {
			color: #666;
			font-size: 24rpx;
			line-height: 1.41;
			// height: 100rpx;
			max-height: 500rpx;
			overflow-y: scroll;
		}

		.popup-close-btn {
			margin-top: 46rpx;
			border-radius: 50rpx;
			padding: 30rpx 80rpx;
			background-color: #fd7e1f;
			// background: linear-gradient(90deg, #B8DDDE 0%, #DBEBEB 100%);
			color: #fff;
			font-size: 26rpx;
		}
	}
</style>