

export  const setTabbar = ($t)=>{
	// console.log('111',$t)
	const tabbar = [{
				"text": `${$t('app.home')}`
			
			}, {
				"text": `${$t('app.tabbar2')}`
			},{
				"text": `${$t('app.tabbar3')}`
			},{
				"text": `${$t('app.tabbar4')}`
			},{
				"text":`${$t('app.me')}`
			}]
	let index = 5;
	for(let i = 0;i<5;i++){
		uni.setTabBarItem({
		  index: i,
		  text: tabbar[i].text,
		})
	}
	
}