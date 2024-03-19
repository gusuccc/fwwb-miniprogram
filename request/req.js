/*
 * @Descripttion: 
 * @version: 
 * @Author: Ricky
 * @Date: 2021-03-29 13:23:57
 * @LastEditors: Ricky
 * @LastEditTime: 2021-03-31 19:40:00
 */
import __config from '../config/config'
const app = getApp();
const request = (url, method, data, showLoading) => {
     let _url = __config.basePath + url
   // let _url = __config.testPath + url
 return new Promise((resolve, reject) => {
    if (showLoading){
      wx.showLoading({
        title: '加载中',
      })
    }
    wx.request({
      url: _url,
      method: method,
      data: data,
      header: {
        'app-id': wx.getAccountInfoSync().miniProgram.appId,
        'third-session': wx.getStorageSync('skey')
      },
      success(res) {             //请求成功！
        if (res.statusCode == 200) {           //返回状态码正常,statusCode是服务器返回的信息
          if (res.data.status == 408) {
            app.globalData.hasUserInfo=false;
            console.log(res.data)
            wx.showModal({
              title: '提示',
              content: '请登录！',
              success() {
                
              },
              complete(){
                wx.switchTab({
                  url: '/pages/my/my',
                })
                /*
                if(res.data.code == 60001){
                  //session过期，则清除过期session，并重新加载当前页
                  getApp().globalData.thirdSession = null
                  wx.reLaunch({
                    url: getApp().getCurrentPageUrlWithArgs()
                  })
                }
                */
              }
            })
            reject(res.data.msg)
          }
          resolve(res.data)            //调用resolve方法，Promise变为操作成功状态（fulfilled）,执行then方法里面onfulfilled里的操作//--------------------------------
        } else if (res.statusCode == 404) {
          wx.showModal({
            title: '提示',
            content: '接口请求出错，请检查手机网络',
            success(res) {

            }
          })
          reject()//调用reject方法后，Promise状态变为rejected，即操作失败状态，此时执行then方法里面onrejected操作
        } else {                       //除了404和正常之外的所有信息
          console.log(res)
          wx.showModal({
            title: '提示',
            content: "服务器错误！",
            success(res) {

            }
          })
          reject()
        }
      },
      fail(error) {
        console.log(error)
        wx.showModal({
          title: '提示',
          content: '接口请求出错!',
          success(res) {

          }
        })
        reject(error)
      },
      complete(res) {
        wx.hideLoading()
      }
    })
  })
}



module.exports = {
    request,
    wxtest:(data)=> {
        return request('/promisetest', 'get', null, true)
    },
    getflatinfo:(data)=>{
      return request('/getflatinfo/'+data,'get',data,false)
    },
    getGoodDatas:(data)=>{
      return request('/getshopcarinfo','get',null,true)
    },
    postGoodsData:(data)=>{
      return request('/updatespnum','post',data,true)
    },
    postDelete:(data)=>{
      return request('/deleteshopinfo','post',data,true)
    },
    updateuserinfo:(data)=>{
      return request('/updateaddrinfo','post',data,false);
    },
    showuserinfo:(data)=>{
      return request('/getaddrinfo','get',data,false);
    },
    getflatindexinfo:(data)=>{
      return request('/getflatindexinfo','get',null,true);
    },
    getrestmoney:(data)=>{
      return request('/getrestmoney','get',data,true);
    },
    Rechargemoney:(data)=>{
      return request('/rechargemoney','post',data,true);
    },
    addwant:(data)=>{
      return request('/addwant','post',data,true);
    },
    getorderinfo:(data)=>{
      return request('/getorderinfo','get',data,true);
    },

    getflatbycity:(data)=>{
      return request('/getflatbycity/'+data,'get',data,false);
    },
    addorder:(data)=>{
      return request('/addorder','post',data,true);
    },
    updateorder:(data)=>{
      return request('/updateorder','post',data,true);
    },
    getindex:(data)=>{
      return request('/getindex','get',data,true);
    }
    
}
