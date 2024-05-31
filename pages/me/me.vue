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
			<view class="user_avatar" @click="goPath(`/pages/me/userinfo/userInfo`)">
				<image :src="sortImage(userInfo.avatar)" mode="aspectFill"></image>
				<view class="avatar_right" v-if="userInfo">
					<view class="right_name">
						{{userInfo.nickname||$t('app.user.nickname')}}
					</view>
					<view class="right_phone">
						+86 {{userInfo.mobile}}
					</view>
					<view class="right_uid">
						UUID：{{userInfo.id}}
					</view>
				</view>
				<view class="avatar_right" v-if="!userInfo" @click="goLogin">
					<view class="right_name">
						{{$t('app.user.login')}}
					</view>
				</view>
			</view>
			<!-- 账户余额 -->
			<view class="user_money">
				<view class="user_money_one" @click="goPath(`/pages/me/month/month`)">
					<view class="user_money_number">
						{{userInfo.balance||0}}
					</view>
					<view class="user_money_title">
						{{$t('app.user.balance')}}
					</view>
				</view>
				<view class="user_money_one">
					<view class="user_money_number">
						{{userInfo.share_bonus||0}}
					</view>
					<view class="user_money_title">
						{{$t('app.user.sharebonus')}}
					</view>
				</view>
				<view class="user_money_one">
					<view class="user_money_number">
						{{userInfo.public_welfare_fund||0}}
					</view>
					<view class="user_money_title">
						{{$t('公益基金')}}
					</view>
				</view>
			</view>
		</view>
		<!-- 内容区域 -->
		<view class="user_centent">
			<view class="user_centent_title">
				<view class="title_left">
					<image src="../../static/userStatic/dian.png" mode="aspectFill"></image>
					{{$t('app.user.order')}}
				</view>
				<view class="title_right">
					{{$t('app.user.allorder')}}
					<image src="../../static/userStatic/user_right.png" mode="aspectFill"></image>
				</view>
			</view>
			<view class="user_centent_order">
				<view class="order_one" v-for="(item,index) in orderArray" :key="index">
					<image :src="item.imageUrl" mode="aspectFill"></image>
					<view class="order_one_title">
						{{$t(item.name)}}
					</view>
				</view>
			</view>
			<view class="user_centent_title title_two">
				<view class="title_left">
					<image src="../../static/userStatic/dian.png" mode="aspectFill"></image>
					{{$t('app.user.more')}}
				</view>
			</view>
			<view class="functional_count">
				<view class="functional_one" v-for="(items,indexs) in functionalArray" :key="indexs" @click="goPath(items.path)">
					<view class="one_image">
						<image :src="items.imageeds" mode="aspectFill"></image>
					</view>
					<view class="one_image_title">
						{{$t(items.name)}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		$request,
		filesUrl,
	} from "@/utils/request";
	import {
		setTabbar
	} from "@/utils/utils.js";
	export default {
		data(){
			return {
				bg_image: {
					backgroundImage: `url(../../static/userStatic/user_bg.png)`,
					backgroundSize: `100% 100%`
				},
				orderArray:[{
					name:"app.user.fukuan",
					imageUrl:'../../static/userStatic/user_daishoukuan.png',
				},{
					name:"app.user.fahuo",
					imageUrl:'../../static/userStatic/user_fahuo.png',
				},{
					name:"app.user.shouhuo",
					imageUrl:'../../static/userStatic/user_daishouhuo.png',
				},{
					name:"app.user.wancheng",
					imageUrl:'../../static/userStatic/user_wancheng.png',
				}],
				functionalArray:[
					{
						name:"app.user.dailimingxi",
						imageeds:'../../static/userStatic/function_one.png',
						path:"/pages/me/broker/broker"
					},
					{
						name:"app.user.juanzengjilu",
						imageeds:'../../static/userStatic/function_two.png',
						path:"/pages/me/donation/donation"
					},
					{
						name:"app.user.xinpinkaipai",
						imageeds:'../../static/userStatic/function_three.png',
						path:"/pages/me/newKaipai/newKaipai"
					},
					{
						name:"app.user.huozongzhongxin",
						imageeds:'../../static/userStatic/function_four.png',
						path:'/pages/me/activity/activity'
					},
					{
						name:"app.user.myfriends",
						imageeds:'../../static/userStatic/function_five.png',
						path:"/pages/me/friends/friends"
					},
					{
						name:"app.user.paiorder",
						imageeds:'../../static/userStatic/function_six.png',
						path:"/pages/me/auctionOrder/auctionOrder"
					},
					{
						name:"app.user.fankui",
						imageeds:'../../static/userStatic/function_feedbao.png'
					},
					{
						name:"app.user.myshare",
						imageeds:'../../static/userStatic/function_share.png',
						path:"/pages/me/share/share"
					}
				],
				userInfo:"",//用户详情
			}
		},
		mounted(){
			setTabbar(this.$t)
		},
		onShow() {
			if(uni.getStorageSync('token')){
				this.getUserinfo()//获取用户详情
			}
		},
		computed: {
			sortImage() {
				return value => {
					if(value){
						return value.indexOf('http') != -1 ? value : filesUrl + value
					}else{
						return value
					}
				}
			}
		},
		methods:{
			async getUserinfo(){
				let res = await $request('getInfo', {});
				if (res.data.code == 200) {
					this.userInfo = res.data.data;
					console.log(this.userInfo)
				}
				// console.log(res,'用户详情')
			},
			goPath(link){
				if(uni.getStorageSync('token')){
					uni.navigateTo({
						url: link,
					});
				}else{
					uni.reLaunch({
						url:"/pages/login/index"
					})
				}
			},
			goLogin(){
				uni.reLaunch({
					url:"/pages/login/index"
				})
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
				align-items: center;
				image{
					width: 160rpx;
					height: 160rpx;
					background-color: #f7f7f7;
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