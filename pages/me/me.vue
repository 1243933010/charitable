<template>
	<view class="user">
		<view class="user_bg" :style="bg_image">
			<view class="user_bg_height">
				<!-- 这里是状态栏  -->
			</view>
			<!-- 设置图标 -->
			<view class="user_setting" @click="goPath('/pages/me/setting/setting')">
				<image src="../../static/userStatic/setting.png" mode="aspectFill"></image>
			</view>
			<!-- 头像区域 -->
			<view class="user_avatar">
				<image src="../../static/img/cn.png" mode="aspectFill"></image>
				<view class="avatar_right">
					<view class="right_name">
						赵大枣NO.1
					</view>
					<view class="right_phone">
						+86 13888656692
					</view>
					<view class="right_uid">
						UUID：10000
					</view>
				</view>
			</view>
			<!-- 账户余额 -->
			<view class="user_money">
				<view class="user_money_one" @click="goPath(`/pages/me/month/month`)">
					<view class="user_money_number">
						1090
					</view>
					<view class="user_money_title">
						账户余额
					</view>
				</view>
				<view class="user_money_one">
					<view class="user_money_number">
						10
					</view>
					<view class="user_money_title">
						分享奖金
					</view>
				</view>
				<view class="user_money_one">
					<view class="user_money_number">
						1090
					</view>
					<view class="user_money_title">
						公益基金
					</view>
				</view>
			</view>
		</view>
		<!-- 内容区域 -->
		<view class="user_centent">
			<view class="user_centent_title">
				<view class="title_left">
					<image src="../../static/userStatic/dian.png" mode="aspectFill"></image>
					我的订单
				</view>
				<view class="title_right">
					全部订单
					<image src="../../static/userStatic/user_right.png" mode="aspectFill"></image>
				</view>
			</view>
			<view class="user_centent_order">
				<view class="order_one" v-for="(item,index) in orderArray" :key="index">
					<image :src="item.imageUrl" mode="aspectFill"></image>
					<view class="order_one_title">
						{{item.name}}
					</view>
				</view>
			</view>
			<view class="user_centent_title title_two">
				<view class="title_left">
					<image src="../../static/userStatic/dian.png" mode="aspectFill"></image>
					更多功能
				</view>
			</view>
			<view class="functional_count">
				<view class="functional_one" v-for="(items,indexs) in functionalArray" :key="indexs" @click="goPath(items.path)">
					<view class="one_image">
						<image :src="items.imageeds" mode="aspectFill"></image>
					</view>
					<view class="one_image_title">
						{{items.name}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data(){
			return {
				bg_image: {
					backgroundImage: `url(../../static/userStatic/user_bg.png)`,
					backgroundSize: `100% 100%`
				},
				orderArray:[{
					name:"待付款",
					imageUrl:'../../static/userStatic/user_daishoukuan.png',
				},{
					name:"待发货",
					imageUrl:'../../static/userStatic/user_fahuo.png',
				},{
					name:"待收货",
					imageUrl:'../../static/userStatic/user_daishouhuo.png',
				},{
					name:"已完成",
					imageUrl:'../../static/userStatic/user_wancheng.png',
				}],
				functionalArray:[
					{
						name:"代理明细",
						imageeds:'../../static/userStatic/function_one.png',
						path:"/pages/me/broker/broker"
					},
					{
						name:"捐赠记录",
						imageeds:'../../static/userStatic/function_two.png',
						path:"/pages/me/donation/donation"
					},
					{
						name:"新品开拍",
						imageeds:'../../static/userStatic/function_three.png',
						path:"/pages/me/newKaipai/newKaipai"
					},
					{
						name:"活动中心",
						imageeds:'../../static/userStatic/function_four.png',
						path:'/pages/me/activity/activity'
					},
					{
						name:"我的好友",
						imageeds:'../../static/userStatic/function_five.png',
						path:"/pages/me/friends/friends"
					},
					{
						name:"拍卖订单",
						imageeds:'../../static/userStatic/function_six.png'
					},
					{
						name:"用户反馈",
						imageeds:'../../static/userStatic/function_feedbao.png'
					},
					{
						name:"我要分享",
						imageeds:'../../static/userStatic/function_share.png',
						path:"/pages/me/share/share"
					}
				]
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
	.user{
		width: 100%;
		.user_bg{
			width: 100%;
			height: calc(640rpx - var(--status-bar-height));
			background-repeat: no-repeat;
			.user_bg_height{
				width: 100%;
				height: var(--status-bar-height);
			}
			.user_setting{
				width: 100%;
				height: 100rpx;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				box-sizing: border-box;
				padding: 0 70rpx;
				image{
					width: 46rpx;
					height: 53rpx;
				}
			}
			.user_avatar{
				width: 100%;
				box-sizing: border-box;
				padding: 50rpx 70rpx;
				display: flex;
				// align-items: center;
				image{
					width: 160rpx;
					height: 160rpx;
					border-radius: 50%;
				}
				.avatar_right{
					flex: 1;
					margin-left: 24rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					box-sizing: border-box;
					padding: 10rpx 0;
					.right_name{
						font-family: PingFang SC, PingFang SC;
						font-weight: 800;
						font-size: 36rpx;
						color: #403039;
					}
					.right_phone{
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 30rpx;
						color: #6A3A00;
					}
					.right_uid{
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 26rpx;
						color: #6A3A00;
					}
				}
			}
			// 账户余额
			.user_money{
				width: 100%;
				display: flex;
				.user_money_one{
					flex: 1;
					text-align: center;
					.user_money_number{
						font-family: PingFang SC, PingFang SC;
						font-weight: 800;
						font-size: 36rpx;
						color: #403039;
					}
					.user_money_title{
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 26rpx;
						color: #6A3A00;
						margin-top: 10rpx;
					}
				}
			}
		}
		// 内容区域
		.user_centent{
			width: 100%;
			box-sizing: border-box;
			padding: 0 31rpx;
			margin-top: calc(-140rpx + var(--status-bar-height));
			.user_centent_title{
				display: flex;
				align-items: center;
				justify-content: space-between;
				.title_left{
					image{
						width: 19rpx;
						height: 19rpx;
						margin-right: 15rpx;
					}
					font-family: PingFang SC, PingFang SC;
					font-weight: 800;
					font-size: 32rpx;
					color: #3A2633;
				}
				.title_right{
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #858585;
					display: flex;
					align-items: center;
					image{
						width: 11rpx;
						height: 24rpx;
						margin-left: 15rpx;
					}
				}
			}
			.user_centent_order{
				width: 100%;
				display: flex;
				.order_one{
					flex: 1;
					text-align: center;
					margin-top: 30rpx;
					image{
						width: 77rpx;
						height: 57rpx;
						border-radius: 5rpx;
					}
					.order_one_title{
						font-family: PingFang SC, PingFang SC;
						font-weight: bold;
						font-size: 24rpx;
						color: #3A2633;
						margin-top: 15rpx;
					}
				}
			}
			.title_two{
				margin-top: 25rpx;
			}
			.functional_count{
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				.functional_one{
					flex: 0 25%;
					margin-top: 40rpx;
					text-align: center;
					.one_image{
						image{
							width: 50rpx;
							height: 50rpx;
						}
					}
					.one_image_title{
						font-family: PingFang SC, PingFang SC;
						font-weight: bold;
						font-size: 24rpx;
						color: #3A2633;
						margin-top: 20rpx;
					}
				}
			}
		}
	}
</style>