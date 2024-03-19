import mock from "./utils/mock";
var httpRequest = require('./common/request');
// app.js
App({
  globalData: {
      hasUserInfo: false,
      userInfo: null
  },
  onLaunch: function() {
   //   this.data.deviceInfo = wx.getSystemInfoSync();
      //console.log(this.data.deviceInfo);
      // 展示本地存储能力
      var logs = wx.getStorageSync('logs') || []
      logs.unshift(Date.now())
      wx.setStorageSync('logs', logs)
      // 获取用户信息
      wx.getSetting({
          success: res => {
              if (res.authSetting['scope.userInfo']) {
                  // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                  wx.getUserInfo({
                      success: res => {
                          // 可以将 res 发送给后台解码出 unionId
                          this.globalData.userInfo = res.userInfo
                          this.globalData.hasUserInfo=true
                          // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                          // 所以此处加入 callback 以防止这种情况
                          if (this.userInfoReadyCallback) {
                              this.userInfoReadyCallback(res)
                          }
                      }
                  })
              }
          }
      })
      let that = this;
      wx.getSystemInfo({ //  获取页面的有关信息
          success: function(res) {
              wx.setStorageSync('systemInfo', res)
              var ww = res.windowWidth;
              var hh = res.windowHeight;
              that.globalData.ww = ww;
              that.globalData.hh = hh;
          }
      });
      Object.assign(this.globalData,mock)
  },
  func: {
    httpRequest: httpRequest.httpRequest,
    // loginWx: this.loginWx,
}
})
