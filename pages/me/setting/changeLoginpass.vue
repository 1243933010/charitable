<template>
	<view class="bindAddress">
		<hx-navbar :config="config" />
		<view class="bindAddress_centent">
			<view class="bindAddress_one">
				<view class="bindAddress_one_tile">
					旧密码
				</view>
				<view class="bindAddress_one_input">
					<input type="text" placeholder="请输入旧密码">
				</view>
			</view>
			<view class="bindAddress_one">
				<view class="bindAddress_one_tile">
					新密码
				</view>
				<view class="bindAddress_one_input">
					<input type="text" placeholder="请输入新密码">
				</view>
			</view>
			<view class="bindAddress_one">
				<view class="bindAddress_one_tile">
					确认密码
				</view>
				<view class="bindAddress_one_input">
					<input type="text" placeholder="请重复输入密码">
				</view>
			</view>
			<view class="bindAddress_button">
				保存
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
					title: '修改登录密码',
					color: "#403039",
					backgroundColor: [1, ['#FCEEB7', '#FEE1AB']],
				};
			},
		},
		data(){
			return {
				
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