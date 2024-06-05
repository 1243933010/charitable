let requestObj = {
	region: {
		name: "注册",
		url: '/api/register',
		type: 'POST'
	},
	login: {
		name: "登录",
		url: '/api/login',
		type: 'POST'
	},
	loginByCode: {
		name: "验证码登录",
		url: '/api/loginByCode',
		type: 'POST'
	},
	forgetPassword:{
		name: "忘记密码",
		url: '/api/forgetPassword',
		type: 'POST'
	},
	
	smsPassword:{
		name: "发送验证码",
		url: '/api/sms',
		type: 'POST'
	},
	emailLogin:{
		name: "送邮箱验证码",
		url: '/api/email_login',
		type: 'POST'
	},
	sendEmail:{
		name: "邮箱登录",
		url: '/api/send_email',
		type: 'POST'
	},
	emailRegister:{
		name: "利用邮箱-注册",
		url: '/api/email_register',
		type: 'POST'
	},
	emailChangePassword:{
		name: "利用邮箱-修改密码",
		url: '/api/email_change_password',
		type: 'POST'
	},
	emailForgetPassword:{
		name: "利用邮箱-忘记密码",
		url: '/api/email_forgot_password',
		type: 'POST'
	},
	articles:{
		name: "文章列表（慈善等）",
		url: '/api/articles',
		type: 'POST'
	},
	articlesDetail:{
		name: "文章详情",
		url: '/api/articlesDetail',
		type: 'POST'
	},
	charitySaleGoods:{
		name: "义卖列表",
		url: '/api/charitySaleGoods',
		type: 'POST'
	},
	targetedAids:{
		name: "帮扶列表",
		url: '/api/targetedAids',
		type: 'POST'
	},
	targetedAidsDetail:{
		name: "帮扶详情",
		url: '/api/targetedAidsDetail',
		type: 'POST'
	},
	submitTargetedAid:{
		name: "提交捐赠",
		url: '/api/submitTargetedAid',
		type: 'POST'
	},
	auctions:{
		name: "拍卖列表",
		url: '/api/auctions',
		type: 'POST'
	},
	auctionsDetail:{
		name: "拍卖详情",
		url: '/api/auctionsDetail',
		type: 'POST'
	},
	userParticipateAuction:{
		name: "拍卖",
		url: '/api/userParticipateAuction',
		type: 'POST'
	},
	userAddAuctionGoods:{
		name: "上架拍品",
		url: '/api/userAddAuctionGoods',
		type: 'POST'
	},
	userOffAuctionGoods:{
		name: "下架拍品",
		url: '/api/userOffAuctionGoods',
		type: 'POST'
	},
	userParticipateAuctionRecords:{
		name: "拍卖订单列表（用户)",
		url: '/api/userParticipateAuctionRecords',
		type: 'POST'
	},
	userParticipateAuctionRecordDetail:{
		name: "拍卖订单详情（用户)",
		url: '/api/userParticipateAuctionRecordDetail',
		type: 'POST'
	},
	auctionsRecords:{
		name: "竞拍记录",
		url: '/api/auctionsRecords',
		type: 'POST'
	},
	userAuctions:{
		name: "交易列表",
		url: '/api/userAuctions',
		type: 'POST'
	},
	userAuctionsGoods:{
		name: "用户拍品列表",
		url: '/api/userAuctionsGoods',
		type: 'POST'
	},
	loveTransmissions:{
		name: "爱心传递列表",
		url: '/api/loveTransmissions',
		type: 'POST'
	},
	loveTransmissionsDetail:{
		name: "爱心传递详情",
		url: '/api/loveTransmissionsDetail',
		type: 'POST'
	},
	userLoveTransmissionRecords:{
		name: "用户爱心传递列表",
		url: '/api/userLoveTransmissionRecords',
		type: 'POST'
	},
	userLoveTransmissionInfo:{
		name: "用户爱心传递详情",
		url: '/api/userLoveTransmissionInfo',
		type: 'POST'
	},
	noticesDetail:{
		name: "公告详情",
		url: '/api/noticesDetail',
		type: 'POST'
	},
	customerServices:{
		name: "联系我们",
		url: '/api/customerServices',
		type: 'POST'
	},
	bindEmail:{
		name: "检测用户是否绑定邮箱",
		url: '/api/check_email_bind',
		type: 'POST'
	},
	incentiveIndex:{
		name: "奖励机制奖品线展示",
		url: '/api/incentive/index',
		type: 'POST'
	},
	incentiveDrawing:{
		name: "奖励机制领取接口",
		url: '/api/incentive/drawing',
		type: 'POST'
	},
	drawlist:{
		name: "奖励机制领取列表接口",
		url: '/api/incentive/drawlist',
		type: 'POST'
	},
	emailBind:{
		name: "绑定邮箱",
		url: '/api/email_bind',
		type: 'POST'
	},
	vipList: {
		name: "VIP列表",
		url: "/api/level/list",
		type: "POST"
	},
	walletInfo: {
		name: "获取钱包信息",
		url: "/api/bank_accounts/index",
		type: "POST"
	},
	getRechargeQrCode: {
		name: "充值获取收款信息",
		url: "/api/recharge/get_recharge_qr_code",
		type: "POST"
	},

	bankAccounts: {
		url: '/api/bank_accounts/index',
		type: 'POST'
	},
	slides: {
		url: '/api/slides',
		type: 'POST'
	},
	notices: {
		url: '/api/notices',
		type: 'POST'
	},
	invitation: {
		url: '/api/user/invitation',
		type: 'POST'
	},
	myTeam: {
		url: '/api/user/my_team',
		type: 'POST'
	},
	logout: {
		url: '/api/logout',
		type: 'POST'
	},
	userSave: {
		url: '/api/user/save',
		type: 'POST'
	},
	fileUpload: {
		name: "上传接口",
		url: '/api/file_upload',
		type: 'POST'
	},
	getUserInfo: {
		url: '/api/user_info',
		type: 'POST'
	},
	changePassword: {
		url: '/api/change_password',
		type: 'POST'
	},
	setPayPassword: {
		url: '/api/set_pay_password',
		type: 'POST'
	},
	changePayPassword: {
		url: '/api/change_pay_password',
		type: 'POST'
	},
    certifications: {
		url: '/api/certifications',
		type: 'POST'
	},
	
	rechargeCreate: {
		url: '/api/recharge/create',
		type: 'POST'
	},
	withdrawInfo: {
		url: '/api/user/withdraw_info',
		type: 'POST'
	},
	withdrawCreate: {
		url: '/api/user_withdraw_applies/create',
		type: 'POST'
	},
	rechargeIndex: {
		url: '/api/recharge/index',
		type: 'POST'
	},
	userAccount: {
		url: '/api/user/account',
		type: 'POST'
	},
	nftList: {
		url: '/api/nft/list',
		type: 'POST'
	},
	nftDeail: {
		url: '/api/nft/info',
		type: 'POST'
	},
	ordersRequest: {
		url: '/api/orders',
		type: 'POST'
	},
	userOrders: {
		url: '/api/user/order',
		type: 'POST'
	},
	userOrderDetail: {
		url: '/api/orders/info',
		type: 'POST'
	},
	levelBuy: {
		url: '/api/level/buy',
		type: 'POST'
	},
	bindAccount: {
		url: '/api/bank_accounts/bind_account',
		type: 'POST'
	},
	agreements: {
		url: '/api/agreements',
		type: 'GET'
	},
	sign: {
		url: '/api/user/sign',
		type: 'POST'
	},
	msgCount: {
		url:'/api/msg/count',
		type: 'POST',
	},
	msgList: {
		url:'/api/msg/list',
		type: 'POST',
	},
	bindBank: {
		url:'/api/bank_accounts/bind_bank',
		type: 'POST',
	},
	withdraw_list: {
		url:'/api/user/withdraw_list',
		type: 'POST',
	},
	aboutList: {
		url:'/api/about',
		type: 'POST',
	},
	linkObj: {
		url:'/api/other/jump',
		type: 'POST',
	},
	activity: {
		url:'/api/activity',
		type: 'POST',
	},
	returnedCash: {
		url:'/api/cash/returned_cash',
		type: 'POST',
	},
	returnedList: {
		url:'/api/cash/returned_list',
		type: 'POST',
	},
	captain: {
		url:'/api/user/captain',
		type: 'POST',
	},
	getInfo:{
		name:"用户详情",
		url:"/api/userInfo",
		type:"POST"
	},
	userTargetedAidRecords:{
		name:"证书列表",
		url:"/api/userTargetedAidRecords",
		type:"POST"
	},
	userTargetedAidRecordDetail:{
		name:"证书详情",
		url:"/api/userTargetedAidRecordDetail",
		type:"POST"
	},
	getFriends:{
		name:"好友列表",
		url:"/api/userFriends",
		type:"POST"
	},
	getAccountinfo:{
		name:"账户明细",
		url:"/api/accountInfo",
		type:"POST"
	},
	getChangepassword:{
		name:"修改登录密码",
		url:"/api/changePassword",
		type:"POST"
	},
	getsetPayPassword:{
		name:"设置支付密码",
		url:"/api/setPayPassword",
		type:"POST"
	},
	getchangePayPassword:{
		name:"修改支付密码",
		url:"/api/changePayPassword",
		type:"POST"
	},
	getRechargeConfig:{
		name:"获取充值和提现配置",
		url:"/api/getRechargeConfig",
		type:"POST"
	},
	getchangeUserInfo:{
		name:"修改资料",
		url:"/api/changeUserInfo",
		type:"POST"
	},
	getupImage:{
		name:"上传图片",
		url:"/api/upload",
		type:"POST"
	},
	gewithdrawApply:{
		name:"提现",
		url:"/api/withdrawApply",
		type:"POST"
	},
	getSharecode:{
		name:"分享",
		url:"/api/createShareLink",
		type:"POST"
	},
	getrechargeApply:{
		name:"充值",
		url:"/api/rechargeApply",
		type:"POST"
	},
	getAgentDetail:{
		name:"代理明细",
		url:"/api/agentDetail",
		type:"POST"
	},
	getAgentBill:{
		name:"代理账单",
		url:"/api/agentBill",
		type:"POST"
	},
	getRecords:{
		name:"捐赠记录",
		url:"/api/userTargetedAidRecords",
		type:"POST"
	},
	getRecordsdetail:{
		name:"捐赠证书",
		url:"/api/userTargetedAidRecordDetail",
		type:"POST"
	},
	getagentConfig:{
		name:"代理配置",
		url:"/api/agentConfig",
		type:"POST"
	},
	getapplyAgent:{
		name:"代理购买",
		url:"/api/applyAgent",
		type:"POST"
	},
	getagentAchievement:{
		name:"代理业绩",
		url:"/api/agentAchievement",
		type:"POST"
	},
	getreceiveAgentReward:{
		name:"代理佣金提取",
		url:"/api/receiveAgentReward",
		type:"POST"
	},
}
export default requestObj;