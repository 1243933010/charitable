<template>
	<view class="index-page1 ">
		<hx-navbar :config="config" />

		<view class="index-scroll  has-tabbar">
			<view class="product-container">
				<view class="rich">
					<view class="title">
						<text>{{detailInfo.title}}</text>
					</view>
					<view class="content">
						<rich-text :nodes="detailInfo.detail"></rich-text>
					</view>
				</view>
				<view class="fixed-div">
					<view class="content">
						
						<view class="right">
							<view class="btn" @click="goUrl">
								<text>{{$t("app.newAdd14")}}</text>
							</view>
						</view>
					</view>
				</view>	
			</view>
			
		</view>
	</view>
</template>

<script>
	import hxNavbar from "@/components/hx-navbar.vue";
	import {
		$request
	} from "@/utils/request.js";
	export default {
		components: {
			hxNavbar,
		},
		computed: {
			config() {
				return {
					title: this.$t("index.detail"),
					color: "#403039",
					backgroundColor: [1, ['#FCEEB7', '#FEE1AB']],
					backTabPage:this.onLoadInfo.type?'/pages/index/index':'',
					backPage:this.onLoadInfo.type?'':'/pages/index/charityConsultation'
				};
			},
		},
		data() {
			return {
				detailInfo:{},
				invite_code:'',
				userInfo:{},
				onLoadInfo:{}
			};
		},
		onLoad(e) {
			// e = {id:'1'}
			this.onLoadInfo = e;
			this.getDetail(e.id)
			if(e.invite_code){
				this.invite_code = e.invite_code;
			}
			this.getUserinfo();
		},
		methods: {
			async getUserinfo(){
				let res = await $request('getInfo', {});
				console.log(res)
				if (res.data.code == 200) {
					this.userInfo = res.data.data;
					this.invite_code = res.data.data.invitation_code;
					console.log(this.userInfo,this.invite_code,'--')
				}
				// console.log(res,'用户详情')
			},
			goUrl(){
				// uni.navigateTo({
				// 	url:'/pages/index/appShare'
				// })
				let res = `http://2405-api.2404.goldval.top/h5/index.html#/pages/login/index?invite_code=${this.invite_code}&type=passingLoveDetail&id=${this.detailInfo.id}`
				uni.setClipboardData({
					data:res,
					success: () => {
						uni.showToast({
							icon:'none',
							title:this.$t("app.newAdd65")
						})
					}
				})
			},
			async getDetail(id){
				let res = await $request("loveTransmissionsDetail",{id})
				console.log(res)
				if(res.data.code==200){
					this.detailInfo = res.data.data;
				}
			}
			
		}
	}
</script>

<style lang="less" scoped>
	@import "../../../static/less/variable.less";

	page {
		background-color: #F5F5F5;
	}
	


	.index-page1 {
		background-color: #F4F4F4;

		.product-container,
		.product-container3 {
			padding-top: 20rpx;
			padding-bottom: 26rpx;
			box-sizing: border-box;
			padding-left: 20rpx;
			padding-right: 20rpx;
			// background-color: white;
			.rich{
				font-weight: 600;
				font-size: 26rpx;
				padding-bottom: 150rpx;
				.title{
					margin-bottom: 40rpx;
				}
				.content{
					font-size: 24rpx;
				}
			}
			.header {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			
		
			.tit {
				margin-bottom: 8rpx;
				color: @bodyColor;
				font-size: @bodySize;
				font-weight: 600;
				display: flex;
				flex-direction: row;
				align-items: center;
			}
		
			.desc {
				margin-bottom: 28rpx;
				color: #777680;
				font-size: @descSize;
			}
			
			.fixed-div{
				position: fixed;
				background-color: white;
				bottom: 0rpx;
				left: 0;
				width: 100%;
				padding-bottom: 30rpx;
				padding-top:20rpx ;
				.content{
					width: 100%;
					display: flex;
					flex-direction: row;
					align-items: center;
					box-sizing: border-box;
					padding: 0 30rpx;
				}
				
				
				.right{
					width: 600rpx;
					margin: 0 auto;
					.btn{
						background: linear-gradient( 180deg, #EF8E1F 0%, #F0AC05 100%);
						font-size: 30rpx;
						color: white;
						display: flex;
						justify-content: center;
						align-items: center;
						border-radius: 20rpx;
						font-weight: 600;
						box-sizing: border-box;
						padding: 34rpx 0;
						image{
							width: 35rpx;
							margin-right: 14rpx;
						}
					}
				}
			}
		
		}
	}
</style>