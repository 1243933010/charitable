<template>
	<view class="profix-page-container login-page">
		<!-- <customHeader style="z-index: 0" /> -->
		<!-- <customHeader style="position: fixed; top: 0; width: 100%" /> -->
		<view class="login-scroll page-scroll">

			<view class="form-container">
				<view class="login-form">
					<view class="login-text">
						<text class="text1">{{$t('app.newAdd1')}}</text>
						<text class="text2">({{$t('app.newAdd2')}})</text>
					</view>
					<view class="login-other">
						<view class="no-input">
							<text>{{$t('app.newAdd3')}}</text>
						</view>
						<view class="region"  @click="goOther('/pages/login/region')">
							<text>{{$t('region.btn1')}}</text>
						</view>
					</view>
				</view>
				<view class="input-con account">
					<view class="image-icon"></view>
					<view class="prefix-con" @click="openpNumberPicker">
						<!-- 手机号前缀选择器 -->
						<view class="number-prefix" @click="goPhonePrefix">{{ formData.country_code }}</view>
						<view class="arrow"></view>
					</view>
					<view class="inp">
						<input type="number" v-model="formData.mobile" :placeholder="$t('login.phonePlaceholder')" />
					</view>
				</view>

			<view class="input-con password">
				<view class="image-icon"></view>
				<view class="inp">
					<input type="text" v-model="formData.captcha_code"  :placeholder="$t('login.code')" />
				</view>
				<!-- <view class="eye-icon" :class="{ close: pwdType }" @click="handleEye"></view> -->
				<view class="get" v-if="typeof codeText =='number'"  >{{codeText}}</view>
				<view class="get"  v-if="typeof codeText =='string'"  @click="handleTime">{{codeLocale}}</view>
			</view>
				<!-- <label class="remember-me">
					
					<checkbox  class="radio" @change="changeRadio" value="1" checked="true" color="#FD862C" />
					{{ $t("login.radioText") }}
				</label> -->
				
				<view class="other">
					<view class="view1" @click="goOther('/pages/login/forgetPwd')">
						<text>{{$t("login.forget")}}?</text>
					</view>
					<view class="view1" @click="goOther('/pages/login/index')"><text>{{$t("app.newAdd8")}}</text></view>
				</view>
				<view class="btn-list">
					<button class="button login-btn" :disabled="!(formData.mobile && formData.password)"
						@click="loginHandle">{{ $t("login.btn1") }}</button>
					<!-- <button class="button region-btn" @click="goRegion">{{ $t("region.btn1") }}</button> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import CustomHeader from "@/components/customHeader/customHeader.vue";
	import {
		$request
	} from "@/utils/request";
	import {
		setTabbar
	} from "@/utils/utils";
	export default {
		components: {
			CustomHeader,
		},
		data() {
			return {
				iStatusBarHeight: 0,
				pwdType: true,
				isMember: true,
				codeText: '',
				formData: {
					login_type: '0',
					mobile: undefined,
					password: "",
					country_code: "+975", // 手机前缀
				},
			};
		},
		computed:{
			codeLocale(){
				return this.$t("login.get-code");
			},
			config() {
			  return {
			    title: this.$t("app.newAdd5"),
			    color: "#000000",
			    backgroundColor: [1, "#FEE0C6"],
			    // 背景图片（array则为滑动切换背景图，string为单一背景图）
			    // backgroundImg: ['/static/xj.jpg','/static/logo.jpg'],
			    // backgroundImg: "../../static/img/header_tabber.png",
			  };
			},
		},
		mounted() {
			console.log(uni.getLocale(), '---')
			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight;

			// 获取缓存里面的手机号和密码
			this.formData.mobile = uni.getStorageSync("mobile");
			this.formData.password = uni.getStorageSync("password");

			// 在页面加载时监听返回事件
			uni.$on("getPrefix", event => {
				this.formData.country_code = "+" + event.prefix;
			});
		},
		methods: {
			goOther(url) {
				uni.navigateTo({
					url
				})
			},
			changeRadio(e) {
				console.log(e);
			},
			openpNumberPicker() {},
			handleEye() {
				this.pwdType = !this.pwdType;
			},
			goRegion() {
				// 去往注册页面
				uni.navigateTo({
					url: "/pages/login/region",
				});
			},
			goPhonePrefix() {
				// 去往注册页面
				uni.navigateTo({
					url: "/pages/login/phonePrefix",
				});
			},
			handleTime() {
				if (!this.formData.email) {
					uni.showToast({
						icon: 'none',
						title: this.$t("login.code")
					})
					return
				}
				if (typeof this.codeText == "number") {
					return false
				}
				console.log(typeof this.codeText == "number")
				this.codeText = 60;
				this.sendEmail();
				this.timeFnc = setInterval(() => {
					this.codeText--;
					if (this.codeText == 0) {
						this.codeText = this.$t("login.get-code");
						clearInterval(this.timeFnc);
						this.timeFnc = null
					}
				}, 1000)
			},
			loginHandle() {
				$request("login", this.formData).then(res => {
					let {
						data,
						code,
						msg
					} = res.data;
					let {
						token
					} = data;

					if (code !== 0) {
						// 登录失败
						uni.showToast({
							title: res.data.msg,
							icon: "none",
						});

						return;
					}

					// 登录成功
					uni.setStorageSync("token", `Bearer ${token}`); // 存储token

					// 记住密码
					let {
						mobile,
						password
					} = this.formData;
					uni.setStorageSync("mobile", mobile); // 存储手机号
					this.isMember ? uni.setStorageSync("password", password) : ""; // 存储密码
					uni.showToast({
						title: this.$t("login.seccuss"),
						success: () => {
							uni.reLaunch({
								url: "/pages/index/index",
							});
						},
					});
				});
			},
		},
	};
</script>

<style lang="less">
	@import "../../static/less/variable.less";
	.profix-page-container{
		height: 100%;
	}
	.login-page {
		background: url("../../static/img/bg/gradient.png") no-repeat center center / 100% 100%;

		.login-scroll {
			.logo {
				margin: 170rpx auto 62rpx;
				// border-radius: 50%;
				width: 140rpx;

				image {
					border-radius: 50%;
				}
			}

			.form-container {
				padding: 65rpx 45rpx;
				border-radius: 20rpx 20rpx 0 0;
				// background-color: #fff;
				min-height: 10%;
				flex-grow: 1;
				.login-form{
					display: flex;
					flex-direction: column;
					padding-top: 146rpx;
					.login-text{
						display: flex;
						flex-direction: row;
						// align-self: flex-end;
						// justify-self: flex-end;
						line-height: 84rpx;
						align-items: flex-end;
						margin-bottom: 18rpx;
						.text1{
							color: #040407;
							font-size: 74rpx;
							font-weight: 600;
							margin-right: 20rpx;
						}
						.text2{
							color: #040407;
							font-size: 32rpx;
							font-weight: 600;
							margin-right: 20rpx;
						}
						
					}
					.login-other{
						display: flex;
						flex-direction: row;
						align-items: center;
						.no-input{
							color: #98755C;
							font-size: 30rpx;
							margin-right: 30rpx;
						}
						.region{
							// width: 150rpx;
							box-sizing: border-box;
							padding: 10rpx 40rpx;
							// height: 57rpx;
							background: #FF5700;
							border-radius: 50rpx 50rpx 50rpx 50rpx;
							display: flex;
							justify-content: center;
							align-items: center;
							font-size: 30rpx;
							color: #FFFFFF;
						}
					}
				}
				.form-tit {
					margin-bottom: 32rpx;
					color: @bodyColor;
					text-align: center;
					font-size: 48rpx;
					font-weight: bold;
				}

				.input-con {
					margin-top: 40rpx;
					padding: 30rpx 28rpx;
					border-radius: 50rpx;
					background-color: #FFD7BA;
					position: relative;
					.df(center, flex-start);

					.image-icon {
						width: 35rpx;
						height: 38rpx;
						background: no-repeat center center / 100%;
					}

					.inp {
						margin-left: 25rpx;
						min-width: 10%;
						flex-grow: 1;
						// background: #FFD7BA;
						color: #98755C;
						input,.uni-input-placeholder {
							color: #98755C;
						}
					}
					.get{
						position: absolute;
						right: 0;
						top: 0;
						// width: 180rpx;
						padding:0rpx 33rpx;
						height: 95%;
						// background: red;
						// background: linear-gradient(90deg, #0694B8 0%, #6BBDB4 100%);
						border: 1px solid #FF6E28;
						border-radius: 30px;
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 26rpx;
						color: #FF5000;
					}

					&.account {
						.image-icon {
							background-image: url("../../static/img/icon/phone.png");
						}

						.prefix-con {
							position: relative;

							.number-prefix {
								margin-left: 22rpx;
								margin-right: 25rpx;
								color: #4E4138;
							}

							.arrow {
								width: 20rpx;
								height: 12rpx;
								background: url("../../static/img/icon/arrow.png") no-repeat center center / 100% 100%;

								position: absolute;
								right: 0;
								top: 50%;
								transform: translateY(-50%);
							}
						}
					}

					&.password {
						.image-icon {
							background-image: url("../../static/img/icon/clock.png");
						}

						.eye-icon {
							width: 29rpx;
							height: 22rpx;
							background: url("../../static/img/icon/eye.png") no-repeat center center / 100%;

							&.close {
								background-image: url("../../static/img/icon/c_eye.png");
							}
						}
					}
				}

				.remember-me {
					margin-top: 28rpx;
					color: @descColor;

					.df(center, flex-start);

					.radio {
						margin-right: 12rpx;
						transform: scale(0.7);
						font-size: @descSize;
					}
				}

				.other {
					padding-top: 48rpx;
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					color: #98755C;
					font-size: 26rpx;
				}

				.btn-list {
					margin-top: 102rpx;

					.button {
						margin-top: 30rpx;
						padding: 32rpx 0rpx;
						width: 330rpx;
						font-size: @descSize;
						border-radius: 50rpx;
						&.login-btn {
							border-color: #383838;
							color: #fff;
							// background-color: #383838;
							background: #383838;

							&[disabled] {
								background-color: #FF5700;
							}
						}

						&.region-btn {
							border: 1px solid @descColor;
							color: #383838;
						}
					}
				}
			}
		}
	}
</style>