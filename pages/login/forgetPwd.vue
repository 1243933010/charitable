<template>
	<view class="profix-page-container region-page">
		<!-- <customHeader style="z-index: 0" /> -->
		<hx-navbar :config="config" />
		<!-- <customHeader style="position: fixed; top: 0; width: 100%" /> -->
		<view class="region-scroll page-scroll">
		<!-- 	<view class="logo pic">
				<image src="../../static/img/logo.jpg" mode="widthFix" class="img"></image>
			</view> -->

			<view class="form-container">
				<!-- <view class="form-tit">PUTH GROUP</view> -->

				<!-- <view class="input-con password email">
					<view class="image-icon"></view>
					<view class="inp">
						<input type="text" v-model="formData.email" 
							:placeholder="$t('login.phonePlaceholder')" />
					</view>

				</view> -->
				<view class="input-con account">
					<view class="image-icon"></view>
					<view class="prefix-con" @click="openpNumberPicker">
						<!-- 手机号前缀选择器 -->
						<view class="number-prefix" @click="goPhonePrefix">+{{ formData.mobile_code }}</view>
						<view class="arrow"></view>
					</view>
					<view class="inp">
						<input type="number" v-model="formData.mobile" :placeholder="$t('login.phonePlaceholder')" />
					</view>
				</view>
				
				<view class="input-con password">
					<view class="image-icon"></view>
					<view class="inp">
						<input type="text" v-model="formData.code"  :placeholder="$t('login.code')" />
					</view>
					<!-- <view class="eye-icon" :class="{ close: pwdType }" @click="handleEye"></view> -->
					<view class="get" v-if="typeof codeText =='number'"  >{{codeText}}</view>
					<view class="get"  v-if="typeof codeText =='string'"  @click="handleTime">{{codeLocale}}</view>
				</view>
				
				<view class="input-con password">
					<view class="image-icon"></view>
					<view class="inp">
						<input type="text" v-model="formData.password" :password="pwdType"
							:placeholder="$t('login.pwdPlaceholder')" />
					</view>
					<!-- <view class="eye-icon" :class="{ close: pwdType }" @click="handleEye"></view> -->
				</view>
				<view class="input-con password">
					<view class="image-icon"></view>
					<view class="inp">
						<input type="text" v-model="formData.password_confirmation" :password="confirmPwdType"
							:placeholder="$t('app.newAdd6')" />
					</view>
					<!-- <view class="eye-icon" :class="{ close: pwdType }" @click="handleEye1"></view> -->
				</view>

				

				<view class="btn-list">
					<button class="button login-btn" @click="region">{{ $t("modifyNickname.btnText") }}</button>
				  <!-- <button class="button login-btn" @click="goRegion">{{ $t("login.region2") }}</button> -->
					<!-- <button class="button region-btn" @click="regionBtn">{{ $t("region.btn2") }}</button> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import CustomHeader from "@/components/customHeader/customHeader.vue";
	import hxNavbar from "@/components/hx-navbar.vue";
	import {
		$request
	} from "@/utils/request.js";
	export default {
		components: {
			CustomHeader,
			hxNavbar
		},
		data() {
			return {
				pwdType: true,
				confirmPwdType:true,
				timeFnc: null,
				codeText: '',
				formData: {
					mobile: "",
					password_confirmation: "",
					code:"",
					// invitation_code: "",
					password: "",
					mobile_code: "975", // 手机前缀
				},
			};
		},
		onLoad(e) {
			// if (e.invitation_code) {
			// 	this.formData.invitation_code = e.invitation_code;
			// }
		},
		computed:{
			codeLocale(){
				return this.$t("login.get-code");
			},
			config() {
			  return {
			    title: this.$t("login.forget"),
			    color: "#000000",
			    backgroundColor: [1, "#FEE0C6"],
			    // 背景图片（array则为滑动切换背景图，string为单一背景图）
			    // backgroundImg: ['/static/xj.jpg','/static/logo.jpg'],
			    // backgroundImg: "../../static/img/header_tabber.png",
			  };
			},
		},
		mounted() {
			this.codeText = this.$t("login.get-code");
		},
		methods: {
			openpNumberPicker() {},
			goPhonePrefix() {
				// 去往注册页面
				uni.navigateTo({
					url: "/pages/login/phonePrefix",
				});
			},
			goRegion(){
				uni.navigateTo({
					url:`./mobileRegion?invitation_code=${this.formData.invitation_code}`
				})
			},
			handleTime() {
				if (!this.formData.mobile) {
					uni.showToast({
						icon: 'none',
						title: this.$t("login.phonePlaceholder")
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
			handleEye() {
				this.pwdType = !this.pwdType;
			},
			handleEye1() {
				this.confirmPwdType = !this.confirmPwdType;
			},
			async sendEmail() {
				let res = await $request("smsPassword", {
					mobile: this.formData.mobile,
					mobile_code:this.formData.mobile_code,
					scene:"update_password",
				})
				console.log(res)
				uni.showToast({
					icon: "none",
					title: res.data.message,
				});
			},
			async region() {
				// this.formData.password_confirmation = this.formData.password;
				let data = await $request("forgetPassword", this.formData);
				uni.showToast({
					icon: "none",
					title: data.data.message,
				});
				if (data.data.code == 200) {
					// uni.setStorageSync("token", `Bearer ${data.data.data.token}`);
					// uni.reLaunch({
					// 	url: "/pages/index/index",
					// });
					uni.navigateBack({delta:1})
				}
			},
			regionBtn() {
				uni.reLaunch({
					url: "./emailLogin",
				});
			},
		},
	};
</script>

<style lang="less">
	@import "../../static/less/variable.less";

	.region-page {
		background: url("../../static/img/bg/gradient.png") no-repeat center center / 100% 100%;
		width: 100vw;

		.region-scroll {
			height: 100%;

			.logo {
				margin: 170rpx auto 62rpx;
				border-radius: 50%;
				width: 140rpx;
			}

			.form-container {
				padding: 65rpx 45rpx;
				border-radius: 20rpx 20rpx 0 0;
				// background-color: #fff;
				min-height: 10%;
				flex-grow: 1;

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
					border-radius: 40rpx;
					background-color: #FFD7BA;
					position: relative;
					.df(center, flex-start);

					.image-icon {
						width: 35rpx;
						height: 38rpx;
						background: no-repeat center center / 100%;
						// border-radius: 30rpx;
					}

					.inp {
						// border-radius: 30rpx;
						margin-left: 25rpx;
						min-width: 10%;
						flex-grow: 1;
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
					&.email {
						.image-icon {
							background-image: url("../../static/img/icon/email.png");
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

					&.invite-code {
						.image-icon {
							background-image: url("../../static/img/icon/invite.png");
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

				.btn-list {
					margin-top: 132rpx;

					.button {
						margin-top: 30rpx;
						padding: 32rpx 20rpx;
						width: 330rpx;
						font-size: @descSize;
						border-radius: 50rpx;
						&.login-btn {
							border-color: #383838;
							color: #fff;
							// background-color: #383838;
							background: #FF5700;
						}

						// border: 1px solid @descColor;
						color: #383838;
					}

					&.region-btn {}
				}
			}
		}
	}
</style>