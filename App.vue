<script>
import { setTabbar } from "@/utils/utils.js";
import {url} from '@/utils/request.js'
export default {
	onLaunch: function () {
		console.log("App Launch");

		let token = uni.getStorageSync("token");
		if (!token) {
			const pages = getCurrentPages();

			// 获取当前页面路由信息
			const currentPage = pages[pages.length - 1];
			const currentRoute = currentPage.route;
			console.log(currentRoute);
			if (currentRoute == "pages/login/region") {
				uni.reLaunch({
					url: "/pages/login/region",
				});
			} else {
				uni.reLaunch({
					url: "/pages/login/index",
				});
			}
		}
	},
	onShow: function () {
		console.log("App Show");
		// #ifdef APP-PLUS
				this.getAppInfo();
		// #endif
	},
	onHide: function () {
		console.log("App Hide");
	},
	methods: {
		appversion(data) {
			let that = this;
			console.log(data);
			//  获取manifest.json里的配置信息
			plus.runtime.getProperty(plus.runtime.appid, function (widgetinfo) {
				console.log(url + data.down);
				let version = widgetinfo.version, //用户当前版本
					appVersion = data.app_version.val, //升级包版本
					appName = widgetinfo.name, //app名称
					appurl =  data.app_download_url.val, //升级包地址
					intro = data.app_upgrade_remark.val; //升级包提示
				if (data && version != appVersion) {
					uni.showModal({
					            title: 'Please update the app ..',
					            content: 'V ' + appVersion,
					            confirmText:  'yes',
					            cancelText: 'exit',
					            success: res => {
					              if (res.confirm) {
					                uni.showLoading({
					                  title:  'downloading',
					                  mask: true,
					                });
					                
					                uni.downloadFile({
					                  url: appurl,
					                  success: download => {
					                    if (download.statusCode == 200) {
					                      plus.runtime.install(
					                        download.tempFilePath,
					                        {
					                          force: false,
					                        },
					                        () => {
					                          uni.hideLoading();
					                          plus.runtime.restart(); //更新成功启动
					                        },
					                        err => {
					                          //若没下载成功还是去下载
					                          uni.hideLoading();
					                          // uni.showToast({
					                          //   title: "更新失败，将跳转下载页面",
					                          //   icon: "none",
					                          //   duration: 2000,
					                          // });
					                        }
					                      );
					                      setTimeout(function () {
					                        plus.runtime.openURL(appurl);
					                      }, 2000);
					                    }
					                  },
					                });
					              } else if (res.cancel) {
					                // console.log("用户点击取消");
					                // uni.showToast({
					                //   title: "版本无法继续使用,请先升级",
					                //   icon: "none",
					                //   duration: 2000,
					                // });
					                //退出app
					                setTimeout(function () {
					                  plus.runtime.quit();
					                }, 2000);
					              }
					            },
					            fail: () => {
					              uni.hideLoading();
					              plus.runtime.quit()
					            },
					          });
				}
			});
		},
		getAppInfo() {
			uni.request({
				url: url + "/api/app_info",
				method:'GET',
				success: res => {
					console.log(res.data.data);
					this.appversion(res.data.data);
				},
			});
		},
	},
};
</script>

<style lang="less">
/*每个页面公共css */
uni-page-body {
	height: 100%;
}
input {
	margin: 0;
	bottom: 0;
	outline: none;
	border: none;
}

body {
	background-color: transparent;
	margin: 0;
	padding: 0;
}

* {
	margin: 0;
	outline: 0;
	border: 0;
	padding: 0;
	list-style: none;
	box-sizing: border-box;
}

.profix-page-container {
	color: #333;
	font-size: 30rpx;
	width: 100vw;
	line-height: 1;
	height: 100%;
	
	.page-scroll {
		padding-left: 30rpx;
		padding-right: 30rpx;
		height: 100%;

		&.has-tabbar {
			// #ifdef H5
			// 用于处理tabbar
			padding-bottom: 100rpx;
			// #endif
		}
	}

	.pic {
		font-size: 0;

		.img {
			width: 100%;
		}
	}

	.button {
		border-radius: 20rpx;
		border: none;
		padding: 0;
		background-color: transparent;
		line-height: normal;

		&::after {
			content: none;
		}
	}
}
</style>
