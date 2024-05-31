<template>
	<view class="withdrawal">
		<!-- 封装头部 -->
		<view class="month_nav" :class="isBgcolor?'navbackground':''">
			<view class="nav_height">
				<!-- 状态栏 -->
				<view class="nav_status">

				</view>
				<view class="nav_header">
					<view class="nav_left" @click="goBack">
						<image src="../../../static/userStatic/left.png" mode="widthFix"></image>
					</view>
					<view class="nav_centent">
						{{$t('app.month.chongzhidetail')}}
					</view>
				</view>
			</view>
		</view>
		<view class="withdrawal_bg" :style="bg_image">
		</view>
		<view class="withdrawal_count">
			<view class="count_one">
				<view class="count_one_title">
					{{$t('app.month.chongzhidetail')}}
				</view>
				<view class="count_one_price">
					<view class="count_one_priceleft">
						{{$t('recargar.recTxt3')}}
					</view>
					<view class="count_one_pricenumber">
						{{channel==1?'USDC':'USDT'}}{{money}}
					</view>
				</view>
				<!-- <view class="count_one_price">
					<view class="count_one_priceleft">
						{{$t('productDetail.text3')}}
					</view>
					<view class="count_one_pricenumber">
						566545645414877989 <span>{{$t('join.copy')}}</span>
					</view>
				</view>
				<view class="count_one_time">
					19/01/2022 19:14:33
				</view>
				<view class="count_one_time" style="color: #3A2633;">
					{{$t('schema.name')}}
				</view>
				<view class="count_two_title">
					{{$t('app.month.deyail')}}
				</view> -->
				<view class="count_two_image">
					<image :src="sortImage(recharge_usdt_qr_code)" mode="aspectFill"></image>
				</view>
				<view class="count_three_title">
					{{name}}
					<span @click="copyinfo">{{$t('join.copy')}}</span>
				</view>
				<view class="count_button" @click="downImage">
					{{$t('app.month.code')}}
				</view>
				<view class="count_five_title">
					{{$t('app.month.tishi')}}
				</view>
			</view>
		</view>
		<view class="withdrawal_count_two">
			<view class="two_centented">
				<view class="count_two_named">
					{{$t('app.month.shangchuanxinix')}}
				</view>
				<view class="two_centented_title">
					<view class="two_centented_titlename">
						<!-- {{$t('productDetail.text3')}} -->
						TXID/HASH
					</view>
					<view class="two_centented_titleinput">
						<input type="text" v-model="hash" :placeholder="$t('app.txid_inpt')">
					</view>
				</view>
				<view class="two_centented_title">
					<view class="two_centented_titlename">
						{{$t('app.PaymentTime')}}
					</view>
					<view class="two_centented_titleinput" style="justify-content: space-between;">
						<view class="" style="font-size: 28rpx;width: 100%;">
							<uni-datetime-picker type="datetime" v-model="datetimesingle" @change="changeLog" :clear-icon="false">
								{{datetimesingle||$t('app.month.select')}}
							</uni-datetime-picker>
						</view>
						<image src="../../../static/userStatic/xiala_hui.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="two_centented_titled">
					{{$t('app.month.jietu')}}：
				</view>
				<view class="two_centented_imagekong" v-if="false">
					<image src="../../../static/userStatic/tupian.png" mode="widthFix"></image>
					<view class="kong_title">
						{{$t('app.month.jietutwo')}}
					</view>
				</view>
				<view class="imageed" @click="upImaged" v-if="!upImage">
					<image src="../../../static/userStatic/tupian.png" mode="aspectFill"></image>
					<view class="imageed_title">
						点击上传充值订单截图
					</view>
					<!-- <image src="../../../static/img/cn.png" mode="aspectFill"></image> -->
				</view>
				<view class="imageeds" @click="upImaged" v-if="upImage">
					<image :src="sortImage(upImage)" mode="aspectFill"></image>
				</view>
				<view class="image_confim" @click="confimTijiao">
					{{$t('app.month.confirm')}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		$request,
		filesUrl,
		url
	} from "@/utils/request";
	export default {
		data() {
			return {
				isBgcolor: false,
				bg_image: {
					backgroundImage: `url(../../static/userStatic/user_bg.png)`,
					backgroundSize: `100% 100%`
				},
				money: "",
				channel: "",
				name: "",
				recharge_usdt_qr_code: "",
				datetimesingle:"",
				upImage:"",
				hash:"",
			}
		},
		onPageScroll(e) {
			this.isBgcolor = ~~e.scrollTop > 30 ? true : false
		},
		onLoad(option) {
			this.money = option.money
			this.channel = option.channel
			this.name = option.name
			this.recharge_usdt_qr_code = option.recharge_usdt_qr_code
		},
		computed: {
			sortImage() {
				return value => {
					if (value) {
						return value.indexOf('http') != -1 ? value : filesUrl + value
					} else {
						return value
					}
				}
			}
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
			copyinfo() {
				uni.setClipboardData({
					data: this.name,
					success: (res) => {
						uni.showToast({
							icon: "none",
							title: this.$t('app.copy.success')
						})
					}
				})
			},
			changeLog(e){
				// console.log(e,'选择日期')
				this.datetimesingle=e
			},
			downImage() {
				// console.log(this.sortImage(this.recharge_usdt_qr_code))
				var _this = this
				// #ifdef H5
				// 假设你已经有了图片的路径
				let imagePath = _this.sortImage(_this.recharge_usdt_qr_code);
				// 保存图片到相册
				uni.saveImageToPhotosAlbum({
					filePath: imagePath,
					success: function() {
						// console.log('图片保存成功');
						uni.showToast({
							icon: "none",
							title: _this.$t('app.image.success')
						})
						// 可以在这里提示用户保存成功
					},
					fail: function(err) {
						// console.log('图片保存失败', err);
						uni.showToast({
							icon: "none",
							title: _this.$t('app.image.fail')
						})
						// 可以在这里提示用户保存失败，并处理错误
					}
				});
				// #endif
				// #ifdef APP-PLUS

				// 首先下载图片到本地临时路径
				uni.downloadFile({
					url: _this.sortImage(_this.recharge_usdt_qr_code),
					success: downloadResult => {
						if (downloadResult.statusCode === 200) {
							// 下载成功，保存图片到相册
							uni.saveImageToPhotosAlbum({
								filePath: downloadResult.tempFilePath,
								success: () => {
									uni.showToast({
										title:_this.$t('app.image.success'),
										icon: 'none'
									});
								},
								fail: () => {
									uni.showToast({
										title:_this.$t('app.image.fail'),
										icon: 'none'
									});
								}
							});
						}
					},
					fail: () => {
						uni.showToast({
							title:_this.$t('app.imagedown.fail'),
							icon: 'none'
						});
					}
				});
				// #endif
			},
			upImaged(){
				// 修改头像
				uni.chooseImage({
					count:1,
					success: (res) => {
						console.log(res,'111222')
						this.blobtoFile(res.tempFiles[0])
					}
				})
			},
			blobtoFile(blobs){
				console.log(blobs,'--')
				// 假设你已经有了一个Blob对象  
				let blob = new Blob([blobs], {type: "text/plain;charset=utf-8"});
				const file = new File([blobs], "avata.png", { type: blob.type });
				console.log(file,'899999999999')
				uni.uploadFile({
					url: `${url}/api/upload`,
					image:blobs,
					header: {
						Authorization: uni.getStorageSync('token')
					},
					formData:{
						image:blobs
					},
					success: (res)=> {
						var data = JSON.parse(res.data)
						if(data.code==200){
							this.upImage=data.data.path
						}
						console.log(data,'99999')
					},
					fail: function(res) {
						console.log(res, 'fail');
					},
				})
			},
			confimTijiao(){
				$request("getrechargeApply", {
					money:this.money,
					channel:this.channel,
					hash:this.hash,
					pay_time:this.datetimesingle,
					transfer_voucher:this.upImage
				}).then(res=>{
					let {
						data,
						code,
						message
					} = res.data;
					if (code !== 200) {
						// 登录失败
						uni.showToast({
							title: res.data.message,
							icon: "none",
						});
						return;
					}
					uni.reLaunch({
						url:"/pages/me/me"
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.withdrawal {
		width: 100%;
		min-height: 100vh;
		background-color: #F4F4F4;
		box-sizing: border-box;
		padding-bottom: 40rpx;

		.month_nav {
			width: 100%;
			height: calc(100rpx + var(--status-bar-height));
			position: fixed;
			left: 0;
			top: 0;
			z-index: 999;

			.nav_status {
				width: 100%;
				height: var(--status-bar-height);
			}

			.nav_header {
				width: 100%;
				height: 100rpx;
				position: relative;

				.nav_left {
					width: 100rpx;
					height: 100rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					position: absolute;
					left: 0;
					top: 0;

					image {
						width: 20rpx;
						height: 18rpx;
					}
				}

				.nav_centent {
					width: 100%;
					line-height: 100rpx;
					text-align: center;
					font-family: PingFang SC, PingFang SC;
					font-weight: 800;
					font-size: 30rpx;
					color: #403039;
				}
			}
		}

		.navbackground {
			background-color: #FFE3B1;
		}

		.withdrawal_bg {
			width: 100%;
			height: 750rpx;
			box-sizing: border-box;
			padding: 220rpx 30rpx 0;

			.withdrawal_centent {
				width: 100%;
				height: 345rpx;
				background: #FFFFFF;
				border-radius: 20rpx;
				box-sizing: border-box;
				padding: 39rpx 43rpx;

				.withdrawal_bg_title {
					font-family: PingFang SC, PingFang SC;
					font-weight: 800;
					font-size: 36rpx;
					color: #3A2633;
					margin-bottom: 20rpx;
				}

				.withdrawal_one {
					width: 100%;
					height: 90rpx;
					box-sizing: border-box;
					padding: 0 20rpx;
					display: flex;
					align-items: center;

					image {
						width: 30rpx;
						height: 30rpx;
						margin-right: 10rpx;
					}

					font-family: PingFang SC,
					PingFang SC;
					font-weight: bold;
					font-size: 30rpx;
					color: #8F8F8F;
				}

				.withdrawal_oneActive {
					background: #F9F0EA;
					color: #EB7B31;
					border-radius: 15rpx;
				}
			}
		}

		.withdrawal_count {
			width: 100%;
			box-sizing: border-box;
			padding: 0 30rpx;
			margin-top: -580rpx;

			.count_one {
				width: 100%;
				min-height: 164rpx;
				background: #FFFFFF;
				border-radius: 20rpx;
				box-sizing: border-box;
				padding: 30rpx 20rpx;

				.count_one_title {
					font-family: PingFang SC, PingFang SC;
					font-weight: 800;
					font-size: 36rpx;
					color: #3A2633;
					margin-bottom: 20rpx;
				}

				.count_one_price {
					width: 100%;
					height: 103rpx;
					border-bottom: 1rpx solid #EBEBEB;
					display: flex;
					align-items: center;
					justify-content: space-between;
					box-sizing: border-box;
					padding: 0 15rpx;

					.count_one_priceleft {
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 30rpx;
						color: #3A2633;
					}

					.count_one_pricenumber {
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 30rpx;
						color: #3A2633;

						span {
							font-family: PingFang SC, PingFang SC;
							font-weight: 800;
							font-size: 26rpx;
							color: #FFFFFF;
							box-sizing: border-box;
							padding: 7rpx 34rpx;
							background-color: #F0931B;
							border-radius: 30rpx;
						}
					}
				}

				.count_one_time {
					width: 100%;
					height: 103rpx;
					border-bottom: 1rpx solid #EBEBEB;
					display: flex;
					align-items: center;
					justify-content: space-between;
					box-sizing: border-box;
					padding: 0 15rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 30rpx;
					color: #A8A8A8;
				}

				.count_two_title {
					width: 100%;
					box-sizing: border-box;
					padding-top: 40rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 26rpx;
					color: #3A2633;
				}

				.count_two_image {
					width: 100%;
					box-sizing: border-box;
					padding: 40rpx 0;
					text-align: center;

					image {
						width: 235rpx;
						height: 235rpx;
					}
				}

				.count_three_title {
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 26rpx;
					color: #3A2633;
					display: flex;
					align-items: center;
					justify-content: space-between;

					span {
						font-family: PingFang SC, PingFang SC;
						font-weight: 800;
						font-size: 26rpx;
						color: #FFFFFF;
						box-sizing: border-box;
						padding: 7rpx 34rpx;
						background-color: #F0931B;
						border-radius: 30rpx;
					}
				}

				.count_button {
					width: 600rpx;
					height: 98rpx;
					line-height: 98rpx;
					text-align: center;
					background: linear-gradient(180deg, #EF8E1F 0%, #F0AC05 100%);
					border-radius: 20rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 800;
					font-size: 30rpx;
					color: #FFFFFF;
					margin: 40rpx auto 0;
				}

				.count_five_title {
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #A8A8A8;
					text-align: center;
					margin-top: 20rpx;
				}
			}
		}

		.withdrawal_count_two {
			width: 100%;
			box-sizing: border-box;
			padding: 0rpx 30rpx;
			margin-top: 25rpx;

			.two_centented {
				box-sizing: border-box;
				padding: 29rpx 30rpx;
				background-color: #FFFFFF;
				border-radius: 20rpx;

				.count_two_named {
					font-family: PingFang SC, PingFang SC;
					font-weight: 800;
					font-size: 36rpx;
					color: #3A2633;
				}

				.two_centented_title {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-top: 30rpx;

					.two_centented_titlename {
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 30rpx;
						color: #3A2633;
					}

					.two_centented_titleinput {
						width: 433rpx;
						height: 77rpx;
						background: #F4F4F4;
						border-radius: 50rpx;
						box-sizing: border-box;
						padding: 0 20rpx;
						display: flex;
						align-items: center;

						input {
							width: 100%;
							height: 77rpx;
							font-family: PingFang SC, PingFang SC;
							font-weight: 400;
							font-size: 26rpx;
						}

						image {
							width: 30rpx;
						}
					}
				}

				.two_centented_titled {
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 30rpx;
					color: #3A2633;
					margin-top: 30rpx;
				}

				.two_centented_imagekong {
					width: 560rpx;
					height: 476rpx;
					background: #F8F8F8;
					border-radius: 10rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					margin: 20rpx auto;

					image {
						width: 74.5rpx;
					}

					.kong_title {
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 26rpx;
						color: #A4A4A4;
						margin-top: 33rpx;
					}
				}

				.imageed {
					width: 560rpx;
					height: 476rpx;
					background-color: #F4F4F4;
					border-radius: 10rpx;
					margin: 20rpx auto;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					image{
						width: 75rpx;
						height: 75rpx;
					}
					.imageed_title{
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 26rpx;
						color: #A4A4A4;
						margin-top: 30rpx;
					}
				}
				.imageeds{
					width: 560rpx;
					height: 476rpx;
					background-color: #F4F4F4;
					border-radius: 10rpx;
					margin: 20rpx auto;
					image{
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
					}
				}

				.image_confim {
					width: 600rpx;
					height: 98rpx;
					line-height: 98rpx;
					text-align: center;
					background: linear-gradient(180deg, #EF8E1F 0%, #F0AC05 100%);
					border-radius: 20rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 800;
					font-size: 30rpx;
					color: #FFFFFF;
					margin: 40rpx auto 0;
				}
			}
		}
	}
</style>