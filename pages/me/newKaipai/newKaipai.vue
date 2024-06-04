<template>
	<view class="newKaipai">
		<hx-navbar :config="config" />
		<view class="newKaipai_centent">
			<view class="newKaipai_one">
				<!-- <view class="newKaipai_title">
					<view class="title_left">
						<image src="../../../static/userStatic/dian.png" mode="aspectFill"></image>
						服饰箱包
					</view>
					<view class="title_right" @click="goPath(`/pages/me/newKaipai/moreKaipin`)">
						{{$t('app.newAdd17')}}
						<image src="../../../static/userStatic/user_right.png" mode="widthFix"></image>
					</view>
				</view> -->
				<view class="newKaipai_goods">
					<view class="goods_one" v-for="(item,index) in friendsArray" @click="goPath(`/pages/auctionVenue/detail?id=${item.id}`)">
						<image :src="sortImage(item.main_image)" mode="aspectFill"></image>
						<view class="goods_one_title">
							{{item.price}}USDT
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
		$request,
		filesUrl
	} from "@/utils/request";
	export default {
		components: {
			hxNavbar,
		},
		computed: {
			config() {
				return {
					title: this.$t('app.user.xinpinkaipai'),
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
				params:{
					page:1,
					is_recommend:1
				},
				last_page:1,
				friendsArray:[],
			}
		},
		onLoad() {
			this.getPaimai('init')//获取好友列表
		},
		onReachBottom() {
			if(this.last_page>this.params.page){
				this.params.page++
				this.getPaimai()
			}
		},
		onPullDownRefresh() {
			setTimeout(()=>{
				uni.stopPullDownRefresh()
			},1000)
			this.getPaimai('init')//获取好友列表
		},
		methods:{
			goPath(link){
				uni.navigateTo({
					url: link,
				});
			},
			async getPaimai(type){
				if(type=='init'){
					this.params.page=1
					this.friendsArray=[]
				}
				let res = await $request('auctions',this.params)
				if(res.data.code==200){
					this.last_page=res.data.data.last_page
					if(res.data.data.data.length){
						if(this.params.page==1){
							this.friendsArray=res.data.data.data
						}else{
							this.friendsArray=[...this.friendsArray,...res.data.data.data]
						}
					}
				}
				// console.log(res,'89999999')
			},
		}
		
	}
</script>

<style lang="scss" scoped>
	.newKaipai{
		width: 100%;
		min-height: 100vh;
		background-color: #f7f7f7;
		.newKaipai_centent{
			width: 100%;
			box-sizing: border-box;
			padding: 10rpx 30rpx;
			.newKaipai_title{
				width: 100%;
				height: 80rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.title_left{
					display: flex;
					align-items: center;
					image{
						width: 19rpx;
						height: 19rpx;
						margin-right: 10rpx;
					}
					font-family: PingFang SC, PingFang SC;
					font-weight: bold;
					font-size: 30rpx;
					color: #3A2633;
				}
				.title_right{
					display: flex;
					align-items: center;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #858585;
					image{
						width: 12rpx;
					}
				}
			}
			.newKaipai_goods{
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				.goods_one{
					width: 214rpx;
					min-height: 200rpx;
					background: #FFFFFF;
					border-radius: 20rpx;
					margin-top: 25rpx;
					margin-right: 20rpx;
					image{
						width: 214rpx;
						height: 186rpx;
						border-radius: 20rpx 20rpx 0 0;
					}
					.goods_one_title{
						width: 100%;
						height: 66rpx;
						line-height: 66rpx;
						text-align: center;
						font-family: PingFang SC, PingFang SC;
						font-weight: bold;
						font-size: 27rpx;
						color: #F6612A;
					}
				}
				.goods_one:nth-child(3n){
					margin-right: 0;
				}
			}
		}
	}
</style>