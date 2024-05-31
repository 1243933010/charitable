<template>
	<view class="accountDetail">
		<hx-navbar :config="config" />
		<view class="accountDetail_centent">
			<view class="accountDetail_title">
				<view class="title_left" @click="goAllaccount">
					{{$t('app.month.all')}}
				</view>
				<picker mode="date" fields="month"  @change="bindData">
					<view class="title_right">
						<view class="right_name">
							{{pamars.time||$t('app.month.select')}}
						</view>
						<image src="../../../static/userStatic/xila.png" mode="widthFix"></image>
					</view>
				</picker>
			</view>
			<view class="accountDetail_one" v-for="(item,index) in accountArray" :key="index">
				<view class="accountDetail_one_left">
					<view class="left_named">
						{{$t('app.type')}}：{{item.change_tag_desc}}
					</view>
					<view class="left_time">
						{{item.created_at}}
					</view>
				</view>
				<view class="accountDetail_one_right">
					{{item.amount}}USD
				</view>
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
					title: this.$t('app.user.zhanghumingxi'),
					color: "#403039",
					backgroundColor: [1, ['#FCEEB7', '#FEE1AB']],
				};
			},
		},
		data(){
			return {
				pamars:{
					page:1,
					type:"public_welfare_fund",
					time:""
				},
				last_page:1,
				accountArray:[],//数组
			}
		},
		onLoad() {
			this.getAccount('init')
		},
		onReachBottom() {
			if(this.last_page>this.pamars.page){
				this.pamars.page++
				this.getAccount()
			}
		},
		methods:{
			async getAccount(type){
				if(type=='init'){
					this.pamars.page=1
					this.accountArray=[]
				}
				let res = await $request('getAccountinfo', this.pamars);
				if (res.data.code == 200) {
					this.last_page=res.data.data.last_page
					if(this.pamars.page==1){
						this.accountArray=res.data.data.data
					}else{
						this.accountArray=[...this.accountArray,...res.data.data.data]
					}
					// console.log(res,'账户明细')
				}
			},
			goAllaccount(){
				// 选择全部
				this.pamars.time=''
				this.getAccount('init')
			},
			bindData(e){
				this.pamars.time=e.detail.value
				this.getAccount('init')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.accountDetail{
		width: 100%;
		.accountDetail_centent{
			width: 100%;
			box-sizing: border-box;
			padding: 32rpx 30rpx;
			.accountDetail_title{
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 25rpx;
				.title_left{
					width: 146rpx;
					height: 80rpx;
					line-height: 80rpx;
					text-align: center;
					background: linear-gradient( 180deg, #EF8E1E 0%, #F0AD04 100%);
					border-radius: 20rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: bold;
					font-size: 24rpx;
					color: #FFFFFF;
				}
				.title_right{
					width: 510rpx;
					height: 80rpx;
					background: #F4F4F4;
					border-radius: 20rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					box-sizing: border-box;
					padding: 0 52rpx;
					.right_name{
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 30rpx;
						color: #EF9518;
					}
					image{
						width: 14rpx;
					}
				}
			}
			.accountDetail_one{
				width: 100%;
				height: 140rpx;
				background: #F4F4F4;
				border-radius: 10rpx;
				box-sizing: border-box;
				padding: 26rpx 25rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 15rpx;
				.accountDetail_one_left{
					.left_named{
						font-family: PingFang SC, PingFang SC;
						font-weight: 800;
						font-size: 30rpx;
						color: #3A2633;
					}
					.left_time{
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 26rpx;
						color: #BCA988;
						margin-top: 18rpx;
					}
				}
				.accountDetail_one_right{
					font-family: PingFang SC, PingFang SC;
					font-weight: 800;
					font-size: 36rpx;
					color: #EF9518;
				}
			}
		}
		
	}
</style>