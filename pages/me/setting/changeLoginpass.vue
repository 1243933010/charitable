<template>
	<view class="bindAddress">
		<hx-navbar :config="config" />
		<view class="bindAddress_centent">
			<view class="bindAddress_one">
				<view class="bindAddress_one_tile">
					{{$t('app.user.jiupass')}}
				</view>
				<view class="bindAddress_one_input">
					<input type="text" v-model="params.old_password"  :placeholder="$t('app.password1')">
				</view>
			</view>
			<view class="bindAddress_one">
				<view class="bindAddress_one_tile">
					{{$t('app.user.newpass')}}
				</view>
				<view class="bindAddress_one_input">
					<input type="text" v-model="params.password" :placeholder="$t('app.password2')">
				</view>
			</view>
			<view class="bindAddress_one">
				<view class="bindAddress_one_tile">
					{{$t('app.user.quePass')}}
				</view>
				<view class="bindAddress_one_input">
					<input type="text" v-model="params.password_confirmation" :placeholder="$t('app.user.quePassinput')">
				</view>
			</view>
			<view class="bindAddress_button" @click="confirm">
				{{$t('modifyNickname.btnText')}}
			</view>
		</view>
	</view>
</template>

<script>
	import hxNavbar from "@/components/hx-navbar.vue";
	import {
		$request
	} from "@/utils/request";
	export default {
		components: {
			hxNavbar,
		},
		computed: {
			config() {
				return {
					title: this.$t('app.user.loginpass'),
					color: "#403039",
					backgroundColor: [1, ['#FCEEB7', '#FEE1AB']],
				};
			},
		},
		data(){
			return {
				params:{
					old_password:"",
					password:"",
					password_confirmation:"",
				}
			}
		},
		methods:{
			confirm(){
				$request("getChangepassword", this.params).then(res=>{
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
					uni.clearStorageSync()
					uni.reLaunch({
						url:"/pages/login/index"
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bindAddress{
		width: 100%;
		.bindAddress_centent{
			width: 100%;
			box-sizing: border-box;
			padding: 70rpx 30rpx;
			.bindAddress_one{
				width: 100%;
				margin-bottom: 30rpx;
				.bindAddress_one_tile{
					font-family: PingFang SC, PingFang SC;
					font-weight: 800;
					font-size: 30rpx;
					color: #3A2633;
					margin-left: 20rpx;
					margin-bottom: 15rpx;
				}
				.bindAddress_one_input{
					width: 100%;
					height: 98rpx;
					background: #F4F4F4;
					border-radius: 10rpx;
					box-sizing: border-box;
					padding: 0 32rpx;
					input{
						width: 100%;
						height: 98rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 26rpx;
					}
				}
			}
			.bindAddress_button{
				width: 600rpx;
				height: 98rpx;
				line-height: 98rpx;
				text-align: center;
				background: linear-gradient( 180deg, #EF8E1F 0%, #F0AC05 100%);
				border-radius: 20rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 800;
				font-size: 30rpx;
				color: #FFFFFF;
				margin: 60rpx auto 0;
			}
		}
	}
</style>