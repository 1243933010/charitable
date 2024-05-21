<template>
  <view class="profix-page-container qualifications-page">
    <hx-navbar :config="config" />
    <view class="qualifications-scroll page-scroll">
      <view class="list">
        <navigator :url="`/pages/index/qualificationsInfo?id=${item.id}`" class="item" v-for="(item,index) in list" :key="index">
          <view class="item-tit">{{ item.title }}</view>
          <view class="arrow-icon"></view>
        </navigator>
      </view>
	  <view v-if="hint">
			<view class="hint_img">
				<image src="../../static/img/qualifications/ku1.png" class="hint_img"></image>
			</view>
		  <view class="hint">{{hint}}</view>
	  </view>
    </view>
  </view>
</template>

<script>
import hxNavbar from "@/components/hx-navbar.vue";
import { $request } from "@/utils/request";
export default {
  components: {
    hxNavbar,
  },
  data() {
    return {
		list:[],
		hint:'',
	};
  },
  computed: {
    config() {
      return {
        title: this.$t("qualifications.item1"),
        color: "#ffffff",
        // backgroundColor: [1, "#24bdab"],
        // 背景图片（array则为滑动切换背景图，string为单一背景图）
        // backgroundImg: ['/static/xj.jpg','/static/logo.jpg'],
        backgroundImg: "../../static/img/header_tabber.png",
      };
    },
  },
  mounted() {
  	this.getCertifications();
  },
  methods:{
	  async getCertifications(){
		 
		  let res = await $request('certifications',{})
		  console.log(res)
		  if(res.data.code===0){
			  this.list = res.data.data;
		  }else{
			  this.hint = res.data.msg
		  }
	  },
	  goUrl(){
		  let url ='https://puthgroup.cc';
		  // #ifdef H5
		  location.href = url
		  // #endif
		  // #ifdef APP-NVUE
		  uni.navigateTo({
		  	url:`./webview?url=${url}`
		  })
		  // #endif
	  }
  }
};
</script>

<style lang="less" scoped>
@import "../../static/less/variable.less";
page {
  background-color: #f5f4f9;
}

.qualifications-page {
  .qualifications-scroll {
    .list {
      margin-left: -30rpx;
      margin-right: -30rpx;

      .item {
        background-color: #fff;
        margin-bottom: 1px;
        padding: 46rpx 52rpx;

        .df(center, space-between);

        .item-tit {
        }

        .arrow-icon {
          width: 14rpx;
          height: 25rpx;
          background: url("../../static/img/right_arrow.png") no-repeat top left / 100% 100%;
        }
      }
    }
	.hint{
		width: 80%;
		height: 200rpx;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
	.hint_img{
		width: 80%;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
  }
}
</style>
