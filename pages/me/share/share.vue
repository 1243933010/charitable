<template>
	<view class="share">
		<hx-navbar :config="config" />
		<view class="share_centetn">
			<image src="../../../static/userStatic/share_bg.png" mode="aspectFill"></image>
			<view class="share_title">
				<image src="../../../static/userStatic/share_title.png" mode="aspectFill"></image>
			</view>
			<view class="share_count">
				<view class="count_code">
					<image src="../../../static/img/cn.png" mode="aspectFill"></image>
				</view>
				<view class="count_link">
					<view class="link_name">
						pe=16047&query=&keyfrom=baidu&sm
					</view>
					<view class="link_copy">
						复制
					</view>
				</view>
				<view class="count_link_title">
					您可以通过以上方式邀请好友
				</view>
				<view class="count_share_button">
					<view class="button_one">
						<image src="../../../static/userStatic/share_one.png" mode="aspectFill"></image>
						<view class="button_one_title">
							Telegram
						</view>
					</view>
					<view class="button_one">
						<image src="../../../static/userStatic/share_two.png" mode="aspectFill"></image>
						<view class="button_one_title">
							WhatsAPP
						</view>
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
					title: '分享',
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
	.share{
		width: 100%;
		.share_centetn{
			width: 100%;
			position: relative;
			image{
				width: 100%;
				height: 1400rpx;
			}
			.share_title{
				width: 100%;
				text-align: center;
				position: absolute;
				top: 80rpx;
				left: 0;
				image{
					width: 451rpx;
					height: 139rpx;
				}
			}
			.share_count{
				width: 100%;
				min-height: 200rpx;
				box-sizing: border-box;
				padding: 0 25rpx;
				position: absolute;
				left: 0;
				top: 45%;
				.count_code{
					width: 286rpx;
					height: 286rpx;
					background: #FFFFFF;
					border-radius: 20rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					margin: 0 auto;
					image{
						width: 232rpx;
						height: 232rpx;
					}
				}
				.count_link{
					width: 100%;
					height: 84rpx;
					background: #FBB77C;
					border-radius: 50rpx;
					margin-top: 40rpx;
					box-sizing: border-box;
					padding: 0 30rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					.link_name{
						width: 450rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 26rpx;
						color: #533612;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
					.link_copy{
						width: 120rpx;
						height: 52rpx;
						line-height: 52rpx;
						text-align: center;
						background: #F0931B;
						border-radius: 50rpx;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						font-family: PingFang SC, PingFang SC;
						font-weight: 800;
						font-size: 26rpx;
						color: #FFFFFF;
					}
				}
				.count_link_title{
					width: 100%;
					box-sizing: border-box;
					padding: 35rpx 30rpx;
					text-align: center;
					font-family: PingFang SC, PingFang SC;
					font-weight: 800;
					font-size: 30rpx;
					color: #533612;
				}
				.count_share_button{
					width: 60%;
					display: flex;
					align-items: center;
					justify-content: space-around;
					margin: 30rpx auto 0;
					.button_one{
						text-align: center;
						image{
							width: 90rpx;
							height: 90rpx;
						}
						.button_one_title{
							font-family: PingFang SC, PingFang SC;
							font-weight: 800;
							font-size: 24rpx;
							color: #533612;
							margin-top: 20rpx;
						}
					}
				}
			}
		}
	}
</style>