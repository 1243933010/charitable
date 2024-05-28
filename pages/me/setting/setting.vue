<template>
	<view class="setting">
		<hx-navbar :config="config" />
		<view class="setting_centent">
			<view class="setting_one">
				<view class="setting_title">
					{{$t('app.user.settingbang')}}
				</view>
				<view class="setting_ones" @click="goPath('/pages/me/setting/bindAccout')">
					<view class="setting_ones_left">
						<image class="setting_onesimage" src="../../../static/userStatic/setting_one.png" mode="heightFix"></image>
						{{$t('app.user.bangzhanghao')}}
					</view>
					<view class="setting_ones_right">
						<image src="../../../static/userStatic/user_right.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="setting_ones" @click="goPath('/pages/me/setting/bindAddress')">
					<view class="setting_ones_left">
						<image class="setting_twoimage" src="../../../static/userStatic/setting_two.png" mode="heightFix"></image>
						{{$t('app.user.bangshouhuo')}}
					</view>
					<view class="setting_ones_right">
						<image src="../../../static/userStatic/user_right.png" mode="aspectFill"></image>
					</view>
				</view>
			</view>
			<view class="setting_one">
				<view class="setting_title">
					{{$t('app.user.anquan')}}
				</view>
				<view class="setting_ones" @click="goPath('/pages/me/setting/changePaypass')">
					<view class="setting_ones_left">
						<image class="setting_threeimage" src="../../../static/userStatic/setting_three.png" mode="heightFix"></image>
						{{$t('app.user.paypass')}}
					</view>
					<view class="setting_ones_right">
						<image src="../../../static/userStatic/user_right.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="setting_ones" @click="goPath('/pages/me/setting/changeLoginpass')">
					<view class="setting_ones_left">
						<image class="setting_fourimage" src="../../../static/userStatic/setting_four.png" mode="heightFix"></image>
						{{$t('app.user.loginpass')}}
					</view>
					<view class="setting_ones_right">
						<image src="../../../static/userStatic/user_right.png" mode="aspectFill"></image>
					</view>
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
					title:this.$t('app.user.setting'),
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
	.setting{
		width: 100%;
		.setting_centent{
			width: 100%;
			box-sizing: border-box;
			padding: 11rpx 30rpx;
			.setting_one{
				width: 100%;
				box-sizing: border-box;
				padding:16rpx 0;
				border-bottom: 1rpx solid #F4F4F4;
				.setting_title{
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 30rpx;
					color: #717278;
					margin-bottom: 40rpx;
				}
				.setting_ones{
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-bottom: 40rpx;
					.setting_ones_left{
						display: flex;
						align-items: center;
						.setting_onesimage{
							width: 46.65rpx;
							height: 46.65rpx;
							margin-right: 15rpx;
						}
						.setting_twoimage{
							height: 36.12rpx;
							margin-right: 15rpx;
						}
						.setting_threeimage{
							height: 40rpx;
							margin-right: 15rpx;
						}
						.setting_fourimage{
							height: 44rpx;
							margin-right: 25rpx;
						}
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 30rpx;
						color: #3A2633;
					}
					.setting_ones_right{
						image{
							width: 12rpx;
							height: 21.6rpx;
						}
					}
				}
			}
		}
		
	}
</style>