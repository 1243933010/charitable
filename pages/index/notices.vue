<template>
	<view class="profix-page-container about-us-page">
		<hx-navbar :config="config" />
		<view class="about-us-scroll page-scroll">
			<view class="name">{{ noticesObj.name }}</view>
			<view class="synopsis">{{ noticesObj.synopsis }}</view>
			<rich-text class="content" :nodes="noticesObj.content"></rich-text>
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
	data() {
		return {
			noticesObj: {},
		};
	},
	computed: {
		config() {
			return {
				title: this.$t("notices.pageTit"),
				color: "#403039",
				// backgroundColor: [1, "#24bdab"],
				// 背景图片（array则为滑动切换背景图，string为单一背景图）
				// backgroundImg: ['/static/xj.jpg','/static/logo.jpg'],
				backgroundColor: [1, ['#FCEEB7', '#FEE1AB']],
			};
		},
	},
	mounted() {
		// let noticesObj = uni.getStorageSync("notices");
		// console.log(noticesObj);
		// this.noticesObj = noticesObj;
	},
	onLoad(e) {
		this.noticesDetail(e.id)
	},
	methods:{
		async noticesDetail(id){
			let res = await $request("noticesDetail",{id})
			console.log(res)
			if(res.data.code==200){
				this.noticesObj = res.data.data;
			}
		}
	}
};
</script>

<style lang="less">
.about-us-page {
	.about-us-scroll {
		padding-top: 40rpx;
		.name {
			font-size: 34rpx;
			margin-bottom: 30rpx;
			text-align: center;
			font-weight: bold;
		}
		
		.synopsis {
			margin-bottom: 30rpx;
			font-size: 28rpx;
			line-height: 1.4;
			color: #666666;
		}
		
		.content {
			margin-top: 30rpx;
			font-size: 28rpx;
			line-height: 1.4;
			color: #666666;
		}
	}
}
</style>
