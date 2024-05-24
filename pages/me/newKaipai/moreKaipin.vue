<template>
	<view class="moreKaipin">
		<hx-navbar :config="config" />
		<view class="moreKaipin_count">
			<view class="moreKaipin_one" v-for="(item,index) in 5" :key="index">
				<image src="../../../static/img/cn.png" mode="aspectFill"></image>
				<view class="moreKaipin_one_title">
					500 USDT
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import hxNavbar from "@/components/hx-navbar.vue";
	export default {
		components: {
			hxNavbar,
		},
		computed: {
			config() {
				return {
					title: '服饰箱包',
					color: "#403039",
					backgroundColor: [1, ['#FCEEB7', '#FEE1AB']],
				};
			},
		},
		data(){
			return {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.moreKaipin{
		width: 100%;
		min-height: 100vh;
		background-color: #F4F4F4;
		.moreKaipin_count{
			width: 100%;
			box-sizing: border-box;
			padding: 34rpx 30rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			.moreKaipin_one{
				width: 324rpx;
				image{
					width: 324rpx;
					height: 305rpx;
					border-radius: 20rpx;
				}
				.moreKaipin_one_title{
					width: 100%;
					height: 70rpx;
					line-height: 70rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 800;
					font-size: 30rpx;
					color: #F3581D;
				}
			}
		}
	}
</style>