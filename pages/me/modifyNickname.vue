<template>
	<view class="profix-page-container modify-nickname-page">
		<hx-navbar :config="config" />
		<view class="modify-nickname-scroll page-scroll">
			<view class="nickname-inp">
				<input type="text" v-model="userInfo.nickname" :placeholder="$t('modifyNickname.placeholder')" />
			</view>
			<view class="nickname-inp">
				<view class='btn' @click="choose" >{{ $t("modifyNickname.btn1") }}</view>
				<input type="text" :disabled="true" v-model="userInfo.country_code"  />
			</view>
			<button class="save-btn" @click="saveBtn">{{$t("modifyNickname.btnText")}}</button>
		</view>
	</view>
</template>

<script>
import hxNavbar from "@/components/hx-navbar.vue";
import {$request} from '@/utils/request.js'
export default {
	components: {
		hxNavbar,
	},
	data() {
		return {
			userInfo:{
				nickname:'',
				country_code:''
			}
		};
	},
	computed: {
		config() {
			return {
				title: this.$t("app.popup7"),
				color: "#ffffff",
				// backgroundColor: [1, "#24bdab"],
				// 背景图片（array则为滑动切换背景图，string为单一背景图）
				// backgroundImg: ['/static/xj.jpg','/static/logo.jpg'],
				backgroundImg: "../../static/img/header_tabber.png",
			};
		},
	},
	mounted(){
		this.getUserInfo();
		uni.$on("getPrefix", event => {
			this.userInfo.country_code = "+" + event.prefix;
		});
	},
	methods:{
		async getUserInfo(){
			let res =  await $request('getUserInfo',{})
			console.log(res)
			if(res.data.code===0){
				this.userInfo = res.data.data;
				return
			}
			uni.showToast({
				icon:'none',
				title:res.data.msg
			})
		},
		async saveBtn(){
			let obj = {
				nickname:this.userInfo.nickname,
				country_code:this.userInfo.country_code,
			}
			let resp = await $request('userSave',obj);
			uni.showToast({
				icon: 'none',
				title: resp.data.msg
			})
			if(resp.data.code===0){
				setTimeout(()=>{
					// uni.navigateBack({delta:1})
					uni.reLaunch({
						url:'/pages/me/me'
					})
				},1500)
			}
		},
		choose(){
			uni.navigateTo({
				url: "/pages/login/phonePrefix",
			});
		},
	}
};
</script>

<style lang="less" scoped>
@import "../../static/less/variable.less";
page {
	background-color: #f5f4f9;
}

.modify-nickname-page {
	.modify-nickname-scroll {
		padding-top: 30rpx;
		margin-left: -10rpx;
		margin-right: -10rpx;

		.nickname-inp {
			border-radius: 10rpx;
			padding: 36rpx;
			background-color: #fff;
			display: flex;
			flex-direction: row;
			align-items: center;
		}
		.btn{
			background: linear-gradient(0deg, #0694B8 0%, #6BBDB4 100%);
			box-sizing: border-box;
			padding: 15px 10px;
			color: white;
			border-radius: 20rpx;
			margin-right: 10rpx;
			
		}
		.save-btn {
			margin: 440rpx auto 0;
			border-radius: 10rpx;
			padding: 34rpx;
			// background-color: #383838;
			background: linear-gradient(0deg, #0694B8 0%, #6BBDB4 100%);
			width: calc(100vw - 236rpx);
			color: #fff;
			font-size: 24rpx;
			line-height: 1;
		}
	}
}
</style>
