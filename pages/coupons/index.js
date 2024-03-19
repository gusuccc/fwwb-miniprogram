
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["已领券", "已失效"],
    activeIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  tabClick: function (e) {
    this.setData({
      activeIndex: e.currentTarget.dataset.id
    });
    
    if (this.data.activeIndex == 0) {
      //this.getMyCoupons()
    }
    if (this.data.activeIndex == 1) {
      //this.invalidCoupons()
    }
  },

  

  toIndexPage: function () {
    wx.switchTab({
      url: "/pages/index/index"
    });
  },
})