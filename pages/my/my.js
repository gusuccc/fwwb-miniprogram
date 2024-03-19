const app = getApp()
Page({
    data: {
        userInfo: null,
        hasUserInfo: false,
        noplay:0,
        notransfer:0,
        noconfirm:0,
        noreputation:0,
    },
    goAuth: function(e) {
        wx.navigateTo({
            url: '/pages/auth/auth',
        });
    },
    onLoad: function(options) {
        this.setData({
            userInfo:app.globalData.userInfo,
            hasUserInfo:app.globalData.hasUserInfo
        })
    },
    onShow: function() {
       // console.log("api.hasUserInfo"+api.globalData.hasUserInfo);
       // console.log("userInfo"+app.globalData.userInfo);
        console.log("页面显示！");
        this.setData({
            userInfo:app.globalData.userInfo,
            hasUserInfo:app.globalData.hasUserInfo
        })
    },
    contact: function () {
        wx.navigateTo({
             url: '../../pages/contact/index'
        })
      },
})