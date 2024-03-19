let App = getApp()
import api from '../../request/req';
import Dialog from '../../dist/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moneynum:0,
    show: false,
    Rechargenum:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
   onShow: function(){
      this.initDetailData()
   },
   initDetailData() {
    api.getrestmoney().then(res=>{
      let info=res.data;
      this.setData({
        moneynum:info.restmoney
      })
    })
   },
   confirminfo(){
     let re={'Rechargenum':this.data.Rechargenum+""};
     let that=this;
     //console.log(re);
     api.Rechargemoney(re).then(res=>{
     //  console.log("更新成功！")
      Dialog.alert({
        message: '充值成功！',
      }).then(()=>{
        
      })
      that.initDetailData();
     })
    },
   onClose() {
    this.setData({ 
      show: false,
      Rechargenum:0
    });
  },
  changeshowstatus(){
    this.setData({
      show:true
    })
  },
  getNumber(e){
    this.setData({
      Rechargenum:e.detail.value
    })
  }
})