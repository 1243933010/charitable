<template>
	<view class="profix-page-container">
		<hx-navbar :config="config" style="position: absolute; top: 0; width: 100vw;" />
		<scroll-view :scroll-y="true" class="delivery-scroll page-scroll">
			
			<view class="input-box">
				<view class="label">{{$t("app.shen22")}}</view>
				<input class="input" type="text" :placeholder="$t('app.shen25')" v-model="form.deliveryName"/>
			</view>
			
			<view class="input-box">
				<view class="label">{{$t("app.shen24")}}</view>
				<input class="input" type="text" :placeholder="$t('app.shen26')" v-model="form.deliveryOrder"/>
			</view>
			
			<view class="footer-bttn">
				<view class="btn-box">{{$t("app.shen23")}}</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import hxNavbar from "@/components/hx-navbar.vue";
	import { $request } from "@/utils/request.js";
	import productTestImg from "@/static/img/cn.png";
	
	export default {
		components: {
			hxNavbar,
		},
		computed: {
			config() {
				return {
					title: this.$t("app.shen21"),
					color: "#403039",
					backgroundColor: [1, ['#FCEEB7', '#FEE1AB']],
				};
			},
		},
		data() {
			return {
				form: {
					deliveryName: "",
					deliveryOrder: "",
				},
			};
		},
		mounted() {
		},
		methods: {
			goPage(url) {
				uni.navigateTo({
					url,
				});
			},
		}
	}
</script>

<style lang="less">
@import "@/static/less/variable.less";

page {
	background-color: #fff;
}

.profix-page-container {
	.delivery-scroll {
		padding-top: 113rpx;
		
		.input-box {
			margin-bottom: 34rpx;
			
			.label {
				margin-bottom: 15rpx;
				padding-left: 32rpx;
				color: #3A2633;
				font-size: 30rpx;
				line-height: 1.4;
				font-weight: bold;
			}
			
			.input {
				border-radius: 10rpx;
				padding: 32rpx;
				background-color: #F4F4F4;
				color: #3A2633;
				font-size: 30rpx;
				display: block;
				height: auto;
				line-height: 1.2;
			}
		}
		
		.footer-bttn {
			padding: 45rpx;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			width: 100vw;
			background-color: #fff;
			
			.btn-box {
				border-radius: 50px;
				padding: 28rpx 72rpx;
				background-color: #F0931B;
				color: #fff;
				font-size: 30rpx;
				line-height: 1.375;
				width: 100%;
				text-align: center;
			}
		}
	}
}
</style>