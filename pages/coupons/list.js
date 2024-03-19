//index.js
//获取应用实例

Page({
	data: {
		coupons: '',
		busid: 0,
		isHidden: true,
		token: null,
	},
	afterAuth(e) {
		this.setData({
			token: e.detail
		})
	},

	
	onLoad: function() {
	},
})
