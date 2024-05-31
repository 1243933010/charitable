<template>
	<view class="bindAddress">
		<hx-navbar :config="config" />
		<view class="bindAddress_centent">
			<!-- 选择绑定的账号 -->
			
			<view class="bindAddress_one">
				<view class="bindAddress_one_tile">
					{{$t('app.user.shouaccount')}}
				</view>
				<view class="bindAddress_one_image">
					<view class="image_one" v-for="(item,index) in accountArrar" :key="index">
						<view class="image_one_redio" @click="accoutIndex=index">
							<image v-if="accoutIndex==index" :src="item.icon_select" mode="aspectFill"></image>
							<image v-else :src="item.icon" mode="aspectFill"></image>
						</view>
						<image :src="item.img" mode="aspectFill"></image>
						{{item.name}}
					</view>
				</view>
			</view>
			<view class="bindAddress_one" v-if="accoutIndex==0">
				<view class="bindAddress_one_tile">
					{{$t('app.user.shouaccount')}}
				</view>
				<view class="bindAddress_one_input">
					<input type="text" v-model="userInfo.usdt" :placeholder="$t('app.user.shouaccountinput')">
				</view>
			</view>
			<view class="bindAddress_one" v-if="accoutIndex==1">
				<view class="bindAddress_one_tile">
					{{$t('app.user.shouaccount')}}
				</view>
				<view class="bindAddress_one_input">
					<input type="text" v-model="userInfo.usdc" :placeholder="$t('app.user.shouaccountinput')">
				</view>
			</view>
			<view class="bindAddress_button" @click="bindBang">
				{{$t('app.user.bangding')}}
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
					title: this.$t('app.user.bangzhanghao'),
					color: "#403039",
					backgroundColor: [1, ['#FCEEB7', '#FEE1AB']],
				};
			},
		},
		data(){
			return {
				accountArrar:[{
					name:"USDT",
					img:"../../../static/userStatic/USDT.png",
					icon:"../../../static/userStatic/redio_w.png",
					icon_select:"../../../static/userStatic/redio_y.png"
				},
				{
					name:"USDC",
					img:"../../../static/userStatic/usdc.png",
					icon:"../../../static/userStatic/redio_w.png",
					icon_select:"../../../static/userStatic/redio_y.png"
				}],
				accoutIndex:0,
				userInfo:"",
			}
		},
		onLoad() {
			this.getUserinfo()
		},
		methods:{
			async getUserinfo(){
				let res = await $request('getInfo', {});
				if (res.data.code == 200) {
					this.userInfo = res.data.data;
					console.log(this.userInfo)
				}
			},
			bindBang(){
				if(this.accoutIndex==0){
					$request("getchangeUserInfo", {usdt:this.userInfo.usdt}).then(res=>{
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
						uni.navigateBack()
					})
				}else{
					$request("getchangeUserInfo", {usdc:this.userInfo.usdc}).then(res=>{
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
						uni.navigateBack()
					})
				}
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
				.bindAddress_one_image{
					display: flex;
					align-items: center;
					box-sizing: border-box;
					padding: 40rpx 30rpx;
					.image_one{
						display: flex;
						align-items: center;
						margin-right: 40rpx;
						.image_one_redio{
							width: 50rpx;
							height: 50rpx;
							display: flex;
							align-items: center;
							justify-content: center;
							image{
								width: 31.33rpx;
								height: 31.33rpx;
							}
						}
						image{
							width: 50.72rpx;
							height: 50.72rpx;
							margin-right: 5rpx;
						}
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 30rpx;
						color: #3A2633;
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
				margin: 260rpx auto 0;
			}
		}
	}
</style>