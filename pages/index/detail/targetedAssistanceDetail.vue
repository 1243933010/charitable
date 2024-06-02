<template>
	<view class="index-page1 ">
		<hx-navbar :config="config" />

		<view class="index-scroll  has-tabbar">
			<view class="banner">
				<swiper class="swiper" circular autoplay style="height: 400rpx;" @change="swiperChange">
					<swiper-item :current="current" v-for="(item, index) in swiperList" :key="index">
						<view class="swiper-item">
							<view class="pic">
								<image @click="linkImg(item)" :src="item.image" class="img" mode="widthFix"></image>
								<!-- <view class="text-box">
									<view class="title">
										<text>星星点灯，照亮梦乡</text>
									</view>
									<view class="label">
										<text>希望计划让留守山区的孩子找寻回家的希望，照亮梦乡让留守山区</text>
									</view>
								</view> -->
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


			<view class="rich">
				<rich-text :nodes="detailInfo.detail"></rich-text>
			</view>

			<view class="history">
				<view class="title">
					<image src="../../../static/img/icon/index/radio.png" mode="widthFix"></image>
					<text>{{$t("app.newAdd34")}}</text>
				</view>
				<view class="list">
					<view class="item" v-for="(item,index) in user_records" :key="index">
						<view class="left">
							<image src="../../../static/img/help_icon.png" mode="widthFix"></image>
							<text>{{$t("app.newAdd61")}}</text>
						</view>
						<view class="right">
							<text>{{item.money}} USDT</text>
						</view>
					</view>
				</view>
			</view>
			<view class="fixed-div">
				<view class="content">

					<view class="right">
						<view class="btn" @click="openDialog">
							<text>{{$t("app.newAdd35")}}</text>
						</view>
					</view>
				</view>
			</view>

		</view>

		<uni-popup ref="popup" type="bottom" style="width: 100%;">
			<view class="popup-container">
				<view class="header">
					<view class="title">
						<image src="../../../static/img/icon/index/radio.png" mode="widthFix"></image>
						<text>{{$t("app.newAdd38")}}</text>
					</view>
					<view class="close">
						<image @click="$refs.popup.close()" src="../../../static/img/close_small_icon.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="form">
					<view class="price">
						<view class="label">
							<image src="../../../static/img/help_icon.png" mode="widthFix"></image>
							<text>{{$t("app.newAdd38")}}</text>
						</view>
						<view class="input">
							<input v-model="money" :placeholder="$t('app.newAdd39')" type="text" />
						</view>
					</view>
				
				</view>
				<view class="btn-div">
					<view class="btn" @click="submit">
						<text>{{$t("app.newAdd35")}}</text>
					</view>
				</view>
			</view>
		</uni-popup>
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
					title: this.$t("index.detail"),
					color: "#403039",
					backgroundColor: [1, ['#FCEEB7', '#FEE1AB']],
				};
			},
		},
		data() {
			return {
				swiperList: [],
				currentIndex: 0,
				detailInfo:{},
				onLoadPrams:{},
				money:"",
				user_records:[]
			};
		},
		mounted() {
			this.userTargetedAidRecords();
		},
		onLoad(e){
			this.onLoadPrams = e;
			this.targetedAidsDetail(e.id)
		},
		methods: {
			async submit(){
				let res = await $request("submitTargetedAid",{id:this.onLoadPrams.id,money:this.money})
				console.log(res)
				uni.showToast({
					icon: "none",
					title: res.data.message,
				});
				if(res.data.code==200){
					// this.detailInfo = res.data.data;
					this.targetedAidsDetail(this.onLoadPrams.id)
				}
			},
			async targetedAidsDetail(id){
				let res = await $request("targetedAidsDetail",{id})
				console.log(res)
				if(res.data.code==200){
					this.detailInfo = res.data.data;
				}
				
			},
			openDialog(){
				this.$refs.popup.open("bottom");
			},
			swiperChange(e) {
				// e.detail.current 是当前的索引
				this.currentIndex = e.detail.current;
			},
			async userTargetedAidRecords() {
				let res = await $request("userTargetedAidRecords", {});
				console.log(res)
				if (res.data.code === 200) {
					this.user_records = res.data.data.data;
					return false;
				}
				uni.showToast({
					icon: "none",
					title: res.data.message,
				});
			},
		}
	}
</script>

<style lang="less" scoped>
	@import "../../../static/less/variable.less";
	
	page {
		background-color: #F4F4F4;
	}
	.popup-container{
		width: 750rpx;
		background-color: #F4F4F4;
		// background-color: red;
		box-sizing: border-box;
		padding:42rpx 0rpx 0rpx 0rpx ;
		border-top-right-radius: 40rpx;
		border-top-left-radius: 40rpx;
		.header{
			
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 47rpx;
			box-sizing: border-box;
			padding:0rpx 32rpx 0rpx 32rpx ;
			.title{
				display: flex;
				flex-direction: row;
				align-items: center;
				image{
					width: 20rpx;
					margin-right: 14rpx;
				}
				text{
					color: #3A2633;
					font-size: 30rpx;
					font-weight: 600;
				}
			}
			.close{
				width: 52rpx;
				image{
					width: 100%;
				}
			}
		}
		.form{
			// width: 100%;
			width: calc(100% - 52rpx);
			margin: 0 auto;
			.price{
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				background-color: white;
				box-sizing: border-box;
				padding: 22rpx 28rpx;
				border-radius: 20rpx;
				margin-bottom: 162rpx;
				.label{
					display: flex;
					flex-direction: row;
					align-items: center;
					image{
						width: 60rpx;
						margin-right: 26rpx;
					}
					text{
						color: #3A2633;
						font-size: 26rpx;
					}
					input{
						color: #ACACAC;
						font-size: 30rpx;
					}
				}
			}
			
		}
		.btn-div{
			background: white;
			display: flex;
			justify-content: center;
			align-items: center;
			padding-top: 20rpx;
			padding-bottom: 30rpx;
			.btn{
				display: flex;
				justify-content: center;
				align-items: center;
				width: 600rpx;
				height: 110rpx;
				background: linear-gradient( 180deg, #EF8E1F 0%, #F0AC05 100%);
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				color: #FFFFFF;
				font-size: 30rpx;
				font-weight: 600;
			}
		}
	}
	.radio {
		width: 19rpx;
		height: 19rpx;
		background: linear-gradient(180deg, #EC4202 0%, #FE7B4A 100%);
		border-radius: 50%;
		margin-right: 14rpx;
	}

	.swiper-active {
		background-color: white;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		.div {
			width: 25rpx;
			height: 12rpx;
			background: #CCC8C7;
			border-radius: 50rpx 50rpx 50rpx 50rpx;
			margin: 0 6.5rpx;
		}

		.active {
			width: 47rpx;
			height: 12rpx;
			background: #F96932;
			border-radius: 50rpx 50rpx 50rpx 50rpx;
		}
	}

	.index-page1 {
		background-color: #F4F4F4;

		// background-color: red;
		.index-scroll {
			.banner {
				width: 100%;
				margin: 0 auto;
				background-color: white;
				// background: url("../../static/img/bg/index_bg.png") no-repeat center center / 100% 100%;
				box-sizing: border-box;
				// background-color: #FAE0AD;
				// padding-left: 5%;
				// padding-top: 20rpx;
				// display: flex;
				// justify-content: center;
				// align-items: center;
				// margin-left: 5%;
				// margin-right: -30rpx;

				.swiper {
					width: 100%;
					height: 440rpx !important;
					margin: 0 auto;

					.swiper-item {
						.pic {
							position: relative;

							image {
								// border-radius: 20rpx;
							}

							.img {
								width: 100%;
							}

							.text-box {
								width: 100%;
								position: absolute;
								bottom: 10rpx;
								left: 0;
								background-color: rgba(255, 255, 255, 0.2);
								border-top-right-radius: 10rpx;
								border-top-left-radius: 10rpx;
								box-sizing: border-box;
								padding: 12rpx 0 11rpx 21rpx;
								backdrop-filter: blur(5px);

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
		}

		.all_price {
			width: calc(100% - 37rpx);
			margin: 0 auto;
			box-sizing: border-box;
			padding: 13rpx 0;
			height: 195rpx;
			background-color: #FFF5E5;
			border-radius: 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			.price {
				height: 100%;
				width: 40%;
				border-right: 1px solid #D9C89E;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				box-sizing: border-box;
				padding: 10rpx 0;

				.num {
					color: #F96932;
					font-size: 36rpx;
					font-weight: 600;
					line-height: 1.5;
					margin-bottom: 10rpx;
				}

				.title {
					font-size: 28rpx;
					font-weight: 600;
				}
			}

			.msg {
				height: 100%;
				display: flex;
				flex-direction: column;
				// justify-content: space-around;
				box-sizing: border-box;
				padding: 20rpx 30rpx 0 30rpx;

				.title {
					color: #827452;
					font-size: 24rpx;
					font-weight: 600;
					line-height: 1.5;
					margin-bottom: 6rpx;

				}

				.label {
					color: #827452;
					font-size: 22rpx;
				}
			}
		}

		.logo {
			padding-top: 20rpx;
			width: calc(100% - 37rpx);
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.img {
				width: 330rpx;
				height: 160rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.rich {
			box-sizing: border-box;
			padding: 30rpx;
			background-color: white;
		}

		.history {
			width: 100%;
			box-sizing: border-box;
			padding: 32rpx 32rpx 82rpx 32rpx;

			.title {
				display: flex;
				flex-direction: row;
				align-items: center;
				color: #3A2633;
				font-size: 14rpx;
				font-weight: 600;
				margin-bottom: 21rpx;

				image {
					width: 20rpx;
					margin-right: 14rpx;
				}
			}

			.list {
				width: 100%;
				padding-bottom: 50rpx;

				.item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 20rpx;
					box-sizing: border-box;
					padding: 22rpx 28rpx;
					background-color: white;
					border-radius: 20rpx;

					.left {
						display: flex;
						flex-direction: row;
						align-items: center;
						color: #3A2633;
						font-size: 24rpx;
						font-weight: 600;

						image {
							width: 60rpx;
							margin-right: 26rpx;
						}
					}

					.right {
						color: #EF8F1E;
						font-size: 24rpx;
						font-weight: 600;
					}
				}
			}
		}

		.fixed-div {
			position: fixed;
			// background-color: red;
			bottom: 0rpx;
			left: 0;
			width: 100%;
			padding-bottom: 30rpx;

			.content {
				width: 100%;
				display: flex;
				flex-direction: row;
				align-items: center;
				box-sizing: border-box;
				padding: 0 30rpx;
			}


			.right {
				width: 600rpx;
				margin: 0 auto;

				.btn {
					background: linear-gradient(180deg, #EF8E1F 0%, #F0AC05 100%);
					font-size: 30rpx;
					color: white;
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 20rpx;
					font-weight: 600;
					box-sizing: border-box;
					padding: 34rpx 0;

					image {
						width: 35rpx;
						margin-right: 14rpx;
					}
				}
			}
		}
	}
</style>