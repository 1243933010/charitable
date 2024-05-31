<template>
	<view class="index-page ">
		<hx-navbar :config="config" />

		<view class="index-scroll  has-tabbar">
			<view class="box" v-for="(item,index) in Object.values(customerServicesList).length" :key="index">
				<view class="header">
					<!-- <view class="icon">
						<image src="../../static/img/icon/index/radio.png" mode="widthFix"></image>
					</view> -->
					<!-- <view class="title">
						<text>{{item.title}}</text>
					</view> -->
				</view>
				<view class="content">
					<view class="item item1">
						<view class="icon">
							<image :src="imageUrl+customerServicesList[index+1][0].image_url" mode="widthFix"></image>
						</view>
						<view class="title">
							<text>{{customerServicesList[index+1][0].title}}</text>
						</view>
						<view class="text">
							<text>{{customerServicesList[index+1][0].phone}}</text>
						</view>
					</view>
					<view class="item item2">
						<view class="icon">
							<image :src="imageUrl+customerServicesList[index+1][1].image_url" mode="widthFix"></image>
						</view>
						<view class="title">
							<text>{{customerServicesList[index+1][1].title}}</text>
						</view>
						<view class="text">
							<text>{{customerServicesList[index+1][1].phone}}</text>
						</view>
					</view>
				</view>
				<view class="footer">
					<view class="left">
						<view class="icon">
							<image :src="imageUrl+customerServicesList[index+1][2].image_url" mode="widthFix"></image>
						</view>
						<view class="label">
							<text>{{customerServicesList[index+1][2].title}}</text>
						</view>
					</view>
					<view class="right">
						<text>{{customerServicesList[index+1][2].phone}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import hxNavbar from "@/components/hx-navbar.vue";
	import {
		$request,filesUrl
	} from "@/utils/request.js";
	export default {
		components: {
			hxNavbar,
		},
		computed: {
			config() {
				return {
					title: this.$t("app.newAdd13"),
					color: "#403039",
					backgroundColor: [1, ['#FCEEB7', '#FEE1AB']],
				};
			},
		},
		data() {
			return {
				
				customerServicesList:[
					
				]
			};
		},
		computed:{
			imageUrl(){
				return filesUrl;
			}
		},
		mounted() {
			this.customerServices()
		},
		methods: {
			async customerServices() {
				let formData = {
					// keywords: '',
					page: 1,
					limit: 20,
					// identifier: 'charity'
				}
				let res = await $request('customerServices', formData);
				console.log(res)
				this.loading = false;
				if (res.data.code === 200) {
					this.customerServicesList = res.data.data;
				}
			},
		}
	}
</script>

<style lang="less">
	@import "../../static/less/variable.less";

	page {
		background-color: #F4F4F4;
	}
	.index-scroll{
		padding-top: 25rpx;
		padding-bottom: 25rpx;
		width: calc(100% - 30rpx);
		margin: 0 auto;
		// background-color: red;
		.box{
			
			background-color: white;
			border-radius: 40rpx;
			margin-bottom: 21rpx;
			box-sizing: border-box;
			padding: 30rpx;
			.header{
				display: flex;
				flex-direction: row;
				align-items: center;
				margin-bottom: 20rpx;
				.icon{
					width: 19rpx;
					// height: 19rpx;
					margin-right: 14rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.title{
					color: #3A2633;
					font-size: 30rpx;
					font-weight: 600;
					line-height: 1.5;
				}
			}
			.content{
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 16rpx;
				.item{
					width: 48%;
					// height: 200rpx;
					background-color: #FFF5E5;
					display: flex;
					flex-direction: column;
					border-radius: 20rpx;
					box-sizing: border-box;
					padding-top: 22rpx;
					padding-left: 28rpx;
					padding-bottom: 22rpx;
					.icon{
						width: 88rpx;
						margin-bottom: 11rpx;
						image{
							width: 100%;
						}
					}
					.title{
						color: #3A2633;
						font-size: 30rpx;
						font-weight: 600;
						margin-bottom: 11rpx;
					}
					.text{
						color: #3A2633;
						font-size: 24rpx;
					}
				}
				.item2{
					background-color: #F4FFE5;
				}
			}
			.footer{
				width: 100%;
				border-radius: 20rpx;
				background-color: #FFF5E5;
				display: flex;
				flex-direction: row;
				align-items: center;
				box-sizing: border-box;
				// padding-left: 31rpx;
				padding: 17rpx 0 17rpx 31rpx;
				.left{
					display: flex;
					flex-direction: row;
					align-items: center;
					margin-right: 123rpx;
					.icon{
						width: 52rpx;
						margin-right: 36rpx;
						image{
							width: 100%;
						}
					}
					.label{
						color:#3A2633;
						font-size: 30rpx;
					}
				}
				.right{
					color: #3A2633;
					font-size: 24rpx;
					font-weight: 600;
				}
			}
		}
	}
	
</style>