// miniprogram/pages/publish/index.js
var timeUtil = require('../../upload-config');
//const db = wx.cloud.database();
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: null,
    imgList: [],
    textInput: '',
    telInput: '',
    rmbInput: '',
    textareaInput: '',
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  ChooseImage() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '提示',
      content: '确定要删除这张图片吗？',
      cancelText: '再看看',
      confirmText: '删除',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  textInput(e) {
    this.setData({
      textInput: e.detail.value
    })
  },
  telInput(e) {
    this.setData({
      telInput: e.detail.value
    })
  },
  textareaInput(e) {
    this.setData({
      textareaInput: e.detail.value
    })
  },
  rmbInput(e) {
    this.setData({
      rmbInput: e.detail.value
    })
  },
  publishBt: function() {
    const mytitle = this.data.textInput
    const mycontent = this.data.textareaInput
    const mydatetime = timeUtil.formTime(new Date());
    const myrmb = this.data.rmbInput
    console.log(mydatetime);
    const mytel = this.data.telInput
    if (mytitle == '') {
      wx.showToast({
        icon: 'none',
        title: '请输入标题',
      })
      return
    }
    if (mytel == '') {
      wx.showToast({
        icon: 'none',
        title: '请输入电话号码',
      })
      return
    }
    if (myrmb == '') {
      wx.showToast({
        icon: 'none',
        title: '请输入价格',
      })
      return
    }
    if (mycontent == '') {
      wx.showToast({
        icon: 'none',
        title: '请输入内容',
      })
      return
    }
    if (this.data.imgList.length == 0) {
      wx.showToast({
        icon: 'none',
        title: '请选择图片',
      })
      return
    }
    wx.showLoading({
      title: '发布中',
    })
    // 上传图片
    const filePath = this.data.imgList[0]
    console.log(filePath)
    const setid = timeUtil.ms(new Date()) + app.globalData.userInfo.nickName
    const cloudPath = "picture/" +  setid + ""  + filePath.match(/\.[^.]+?$/)[0]
    console.log(cloudPath)
    db.collection('goods').get().then(res=>{
      const num = res.data.length;
      wx.cloud.uploadFile({
        cloudPath,
        filePath,
        success: res => {
          console.log('[上传图片] 成功：', res)
          console.log("ok")
          const mypicture = res.fileID
          console.log(mypicture)
          
          db.collection("goods").add({
            data:{
              date: mydatetime,
              detail_content: mycontent,
              author: app.globalData.userInfo.nickName,
              detail_img: mypicture,
              title: mytitle,
              attention_count:0,
              love_count:0,
              avatar: app.globalData.userInfo.avatarUrl,
              rmb:myrmb,
              postId:num,
              tel:mytel
            },
            success:function(res){
              console.log(res);
              wx.showToast({
                title: '发布成功',
                icon: 'success',
                success: function() {
                  setTimeout(function() {
                    wx.navigateBack({
                      url: '../myGoods/index'
                    })
                  }, 2000);
                }
              })
            },
            fail: function(res) {
              console.log(res)
              wx.showToast({
                icon: 'none',
                title: '发布失败',
              })
            }
          })
        },
        fail: e => {
          console.error('[上传文件] 失败：', e)
          wx.showToast({
            icon: 'none',
            title: '发布失败',
          })
        },
        complete: () => {
          wx.hideLoading()
        }
      })
    })
  }
})