//获取应用实例
const app = getApp()

Page({
    data: {
        userInfo:null,
        hasUserInfo:false
    },
    onLoad: function (options) {
        
    },
    onShow: function () {
        
        let userInfo = wx.getStorageSync('userInfo');
        if (userInfo != '') {
         //   wx.navigateBack();
        };
        
    },
    getUserInfo(e) {
        const userInfo = e.detail.userInfo
        console.log("用户信息为："+userInfo);
        if (userInfo) {
          // 1. 小程序通过wx.login()获取code
          wx.checkSession({
            success: (result)=>{
             console.log("已经登录了!");
            },
            fail: ()=>{
              console.log("开始请求登录！");
              wx.login({
                success: function(login_res) {
                  //获取用户信息
                  wx.getUserInfo({
                    success: function(info_res) {
                      // 2. 小程序通过wx.request()发送code到开发者服务器
                      wx.request({
                        url: 'https://y80.xstrive.cn/wxLogin',
                        method: 'POST',
                        header: {
                          'content-type': 'application/x-www-form-urlencoded'   //使用Ajax默认格式来传递数据
                        },
                        data: {
                          code: login_res.code, //临时登录凭证
                          rawData: info_res.rawData, //用户非敏感信息
                          signature: info_res.signature, //签名
                          encrypteData: info_res.encryptedData, //用户敏感信息
                          iv: info_res.iv //解密算法的向量
                        },
                        success: function(res) {
                          if (res.data.status == 200) {
                            // 7.小程序存储skey（自定义登录状态）到本地
                            wx.setStorageSync('userInfo', userInfo);
                            wx.setStorageSync('skey', res.data.data);
                            
                          } else{
                            console.log('服务器异常');
                          }

                        },
                        fail: function(error) {
                          //调用服务端登录接口失败
                          console.log(error);
                        }
                      })
                    }
                  })
                },
                fail(){
                    console.log("请求失败！");
                }
              })
            }
          });
          //检查之后都给全局变量赋值
          app.globalData.userInfo=userInfo;
          app.globalData.hasUserInfo=true;
          this.setData({
            hasUserInfo:true,
            userInfo: userInfo
          })
        }
        wx.navigateBack();
      },
    goBack:function(){
        wx.navigateBack();
    }
})