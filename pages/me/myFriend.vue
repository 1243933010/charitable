<template>
	<view class="profix-page-container">
		<hx-navbar :config="config" style="position: absolute; top: 0; width: 100vw;" />
		<scroll-view :scroll-y="true" class="delivery-scroll page-scroll">
		</scroll-view>
	</view>
</template>

<script>
	import hxNavbar from "@/components/hx-navbar.vue";
	import { $request } from "@/utils/request.js";
	
	export default {
		components: {
			hxNavbar,
		},
		computed: {
			config() {
				return {
					title: this.$t("app.shen32"),
					color: "#403039",
					backgroundColor: [1, ['#FCEEB7', '#FEE1AB']],
				};
			},
		},
		data() {
			return {
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
	}
}
</style>