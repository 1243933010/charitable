<template>
	<view class="friends">
		<view class="broker_header">
			<view class="broker_stauts">
				
			</view>
			<view class="broker_nav">
				<view class="nav_left" @click="goBack">
					<image src="../../../static/userStatic/left.png" mode="widthFix" style="width: 22rpx;"></image>
				</view>
				<view class="nav_count">
					{{$t('app.user.myfriends')}}
				</view>
			</view>
		</view>
		<view class="broker_search">
			<view class="broker_search_left">
				<image src="../../../static/userStatic/search.png" mode="aspectFill"></image>
				<input type="text" :placeholder="$t('app.search')" v-model="params.keyword" >
			</view>
			<view class="broker_search_right" @click="getFriends('init')">
				{{$t('app.xianshi.searched')}}
			</view>
		</view>
		<scroll-view scroll-y="true" class="scroll_h">
			<view class="friends_centent">
				<view class="friends_ones" v-for="(item,index) in friendsArray" :key="index">
					<image src="../../../static/img/cn.png" mode="aspectFill"></image>
					<view class="friends_onescount">
						<view class="friends_ones_name">
							<view class="name_left">
								{{item.nickname}}
							</view>
							<view class="name_right" @click="chanCheck(index)" v-if="!item.checked">
								{{$t('app.xianshi.dengji')}}
							</view>
							<view class="name_right" v-else>
								{{item.level_name||''}}
							</view>
						</view>
						<view class="friends_ones_bottom">
							<view class="ones_bottom_left">
								<view class="friends_ones_phone">
									{{item.mobile}}
								</view>
								<view class="friends_ones_time">
									{{$t('app.xianshi.zhucetime')}}：{{item.created_at_format}}
								</view>
							</view>
							<view class="ones_bottom_right">
								<image src="../../../static/userStatic/add_friends.png" mode="aspectFill"></image>
								{{$t('app.xianshi.addfriends')}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		$request
	} from "@/utils/request";
	export default {
		data(){
			return {
				params:{
					page:1,
					keyword:"",
				},
				last_page:1,
				friendsArray:[],
			}
		},
		onLoad() {
			this.getFriends('init')//获取好友列表
		},
		onReachBottom() {
			if(this.last_page>this.params.page){
				this.params.page++
				this.getFriends()
			}
		},
		onPullDownRefresh() {
			setTimeout(()=>{
				uni.stopPullDownRefresh()
			},1000)
			this.getFriends('init')//获取好友列表
		},
		methods:{
			goBack(){
				uni.navigateBack()
			},
			async getFriends(type){
				if(type=='init'){
					this.params.page=1
					this.friendsArray=[]
				}
				let res = await $request('getFriends',this.params)
				if(res.data.code==200){
					this.last_page=res.data.data.last_page
					if(res.data.data.data.length){
						res.data.data.data.forEach(item=>{
							this.$set(item,'checked',false)
						})
						if(this.params.page==1){
							this.friendsArray=res.data.data.data
						}else{
							this.friendsArray=[...this.friendsArray,...res.data.data.data]
						}
					}
				}
				// console.log(res,'89999999')
			},
			chanCheck(index){
				this.friendsArray.forEach((item,indexs)=>{
					if(index==indexs){
						this.$set(item,'checked',true)
					}else{
						this.$set(item,'checked',false)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.friends{
		width: 100%;
		.broker_header{
			width: 100%;
			background-color: #FFE3B1;
			.broker_stauts{
				width: 100%;
				height: var(--status-bar-height);
			}
			.broker_nav{
				width: 100%;
				height: 100rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				position: relative;
				.nav_left{
					width: 100rpx;
					height: 100rpx;
					position: absolute;
					left: 0;
					top: 0;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.nav_count{
					font-family: PingFang SC, PingFang SC;
					font-weight: 800;
					font-size: 36rpx;
					color: #403039;
				}
			}
		}
		.broker_search{
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 20rpx auto;
			.broker_search_left{
				width: 448rpx;
				height: 92rpx;
				background: #F4F4F4;
				border-radius: 50rpx;
				display: flex;
				align-items: center;
				box-sizing: border-box;
				padding: 0 40rpx;
				image{
					width: 33.5rpx;
					height: 33.7rpx;
					margin-right: 20rpx;
				}
				input{
					flex: 1;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 30rpx;
				}
			}
			.broker_search_right{
				width: 191rpx;
				height: 92rpx;
				line-height: 92rpx;
				text-align: center;
				background: #F0931B;
				border-radius: 50rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 30rpx;
				color: #FFFFFF;
				margin-left: 20rpx;
			}
		}
		.scroll_h{
			width: 100%;
			height: calc(100vh - 260rpx - var(--status-bar-height));
			box-sizing: border-box;
			padding: 0 30rpx;
			.friends_centent{
				width: 100%;
				height: calc(100vh - 260rpx - var(--status-bar-height));
				box-sizing: border-box;
				.friends_ones{
					width: 100%;
					height: 180rpx;
					background: #F4F4F4;
					border-radius: 10rpx;
					display: flex;
					box-sizing: border-box;
					padding: 20rpx 30rpx;
					margin-bottom: 20rpx;
					image{
						width: 97rpx;
						height: 97rpx;
						border-radius: 50%;
					}
					.friends_onescount{
						flex: 1;
						margin-left: 20rpx;
						.friends_ones_name{
							width: 100%;
							display: flex;
							align-items: center;
							justify-content: space-between;
							.name_left{
								font-family: PingFang SC, PingFang SC;
								font-weight: 800;
								font-size: 30rpx;
								color: #3A2633;
							}
							.name_right{
								font-family: PingFang SC, PingFang SC;
								font-weight: 400;
								font-size: 26rpx;
								color: #3A2633;
							}
						}
						.friends_ones_bottom{
							width: 100%;
							display: flex;
							align-items: center;
							justify-content: space-between;
							margin-top: 10rpx;
							.ones_bottom_left{
								.friends_ones_phone{
									font-family: PingFang SC, PingFang SC;
									font-weight: 800;
									font-size: 30rpx;
									color: #3A2633;
									margin-top: 10rpx;
								}
								.friends_ones_time{
									font-family: PingFang SC, PingFang SC;
									font-weight: 400;
									font-size: 26rpx;
									color: #3A2633;
									margin-top: 5rpx;
								}
							}
							.ones_bottom_right{
								width: 191rpx;
								height: 76rpx;
								background: #F0931B;
								border-radius: 50rpx;
								display: flex;
								align-items: center;
								justify-content: center;
								image{
									width: 33rpx;
									height: 33rpx;
									margin-right: 10rpx;
								}
								font-family: PingFang SC, PingFang SC;
								font-weight: 400;
								font-size: 24rpx;
								color: #FFFFFF;
							}
						}
						
					}
				}
			}
		}
	}
</style>