<template>
	<view class="userInfo">
		<hx-navbar :config="config" />
		<view class="userInfo_centent">
			<view class="userInfo_one">
				<view class="userInfo_one_image" @click="upImaged">
					<image :src="sortImage(userInfo.avatar)" mode="aspectFill"></image>
					<view class="userinfo_xiangji">
						<image src="../../../static/userStatic/xiangji.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="userInfo_one_title">
					<!-- 点击更换此头像 -->
					<input type="file" name="" id="">
				</view>
			</view>
			<view class="userInfo_nicheng">
				<view class="nicheng_left">
					昵称
				</view>
				<view class="nicheng_input">
					<input type="text" v-model="userInfo.nickname" placeholder="请输入昵称" @blur="chanBlur">
					<u-icon name="arrow-right" color="#333333" size="20"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import hxNavbar from "@/components/hx-navbar.vue";
	import {
		$request,
		filesUrl,
		url
	} from "@/utils/request";
	export default {
		components: {
			hxNavbar,
		},
		computed: {
			config() {
				return {
					title: '个人资料',
					color: "#403039",
					backgroundColor: [1, ['#FCEEB7', '#FEE1AB']],
				};
			},
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
		data(){
			return {
				userInfo:"",
			}
		},
		onLoad() {
			this.getUserinfo()
			this.blobtoFile()
		},
		methods:{
			async getUserinfo(){
				let res = await $request('getInfo', {});
				if (res.data.code == 200) {
					this.userInfo = res.data.data;
					console.log(this.userInfo)
				}
			},
			upImaged(){
				// 修改头像
				uni.chooseImage({
					count:1,
					success: (res) => {
						console.log(res,'111222')
						this.blobtoFile(res.tempFiles[0])
					}
				})
			},
			blobtoFile(blobs){
				console.log(blobs,'--')
				// 假设你已经有了一个Blob对象  
				let blob = new Blob([blobs], {type: "text/plain;charset=utf-8"});  
				// 现在你可以使用File对象了，比如上传到服务器  
				// 注意：虽然我们在这里将["blob content"]作为File构造函数的第一个参数，但这实际上是不必要的，  
				// 因为我们已经有了一个Blob对象，并且File是基于Blob的。  
				// 在实际使用中，你通常会直接使用你的Blob对象，而不是再次创建一个新的数组。  
				// 所以更简洁的代码应该是：  
				const file = new File([blobs], "avata.png", { type: blob.type });
				console.log(file,'899999999999')
				uni.uploadFile({
					url: `${url}/api/upload`,
					image:blobs,
					//后台获取我们图片的key
					// name: 'image',
					//额外的参数formData
					header: {
						Authorization: uni.getStorageSync('token')
					},
					formData:{
						// image:res.tempFilePaths[0]
						image:blobs
					},
					success: (res)=> {
						//上传成功
						// console.log(res, 'success');
						var data = JSON.parse(res.data)
						console.log(data,'99999')
					},
					fail: function(res) {
						console.log(res, 'fail');
					},
				})
			},
			chanBlur(){
				$request("getchangeUserInfo", {nickname:this.userInfo.nickname}).then(res=>{
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
</script>

<style lang="scss" scoped>
	.userInfo{
		width: 100%;
		min-height: 100vh;
		background-color: #f7f7f7;
		.userInfo_centent{
			box-sizing: border-box;
			padding: 40rpx 24rpx;
			.userInfo_one{
				width: 100%;
				height: 270rpx;
				background: #FFFFFF;
				border-radius: 20rpx;
				text-align: center;
				box-sizing: border-box;
				padding-top: 35rpx;
				.userInfo_one_image{
					width: 132rpx;
					position: relative;
					margin: 0 auto;
					image{
						width: 132rpx;
						height: 132rpx;
						background-color: #f7f7f7;
						border-radius: 50%;
					}
					.userinfo_xiangji{
						position: absolute;
						bottom: 0;
						right: 0;
						image{
							width: 31rpx;
							height: 31rpx;
						}
					}
				}
				.userInfo_one_title{
					font-family: PingFang SC;
					font-weight: 500;
					font-size: 26rpx;
					color: #999999;
					margin-top: 25rpx;
				}
			}
			.userInfo_nicheng{
				width: 100%;
				height: 100rpx;
				background: #FFFFFF;
				border-radius: 20rpx;
				margin-top: 15rpx;
				box-sizing: border-box;
				padding: 0 30rpx;
				display: flex;
				align-items: center;
				.nicheng_left{
					font-family: PingFang SC;
					font-weight: bold;
					font-size: 30rpx;
					color: #545454;
				}
				.nicheng_input{
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					margin-left: 20rpx;
					font-family: PingFang SC;
					font-weight: 500;
					font-size: 30rpx;
					color: #333333;
					input{
						flex: 1;
						height: 100rpx;
						text-align: right;
					}
				}
			}
			.userInfo_cear{
				width: 100%;
				height: 320rpx;
				background: #FFFFFF;
				border-radius: 20rpx;
				box-sizing: border-box;
				padding: 36rpx 31rpx;
				margin-top: 20rpx;
				.cear_title{
					font-family: PingFang SC;
					font-weight: bold;
					font-size: 30rpx;
					color: #545454;
				}
				.cear_image{
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-top: 25rpx;
					.image_one{
						image{
							width: 300rpx;
							height: 180rpx;
							border-radius: 5rpx;
						}
					}
				}
			}
		}
	}
</style>