let App = getApp()
import api from '../../request/req'
// pages/shopcart/shopcart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shoparr:[],
    goodarr:[],
    isAllSelected: false, // 是否全选所有产品，默认不全选
    selectNum: 0,         // 选择的产品数量
    selectPrice: '0.00',  // 选中的产品价格
    isEdit: true,         // 编辑按钮状态
    goodsData: []
  },

  /**
   * 点击 减 按钮方法
   * 如果产品数量大于1，num--,
   */
  decrementClick(e) {
    const goodsData = this.data.goodsData;              // 产品数据
    let shopIndex = e.currentTarget.dataset.shopIndex;  // 当前店铺下标
    let index = e.currentTarget.dataset.index;          // 当前产品所在店铺中的下标
    let goodsInfo = goodsData[shopIndex].goodsInfo;     // 当前店铺下的所有产品数据

    if (goodsInfo[index].spnum <= 1) {
      return false;
    } else {
      goodsInfo[index].spnum--;
      this.setData({
        goodsData
      });
      let newdata={
        num:  goodsInfo[index].spnum,
        spid: goodsInfo[index].spid
      }
      api.postGoodsData(newdata);
      this.getSelectProductPrice();
    }
    
  },

  /**
   * 点击 加 按钮方法
   * num ++
   */
  incrementClick(e) {
    const goodsData = this.data.goodsData;  
    let shopIndex = e.currentTarget.dataset.shopIndex; 
    let index = e.currentTarget.dataset.index;  
    let goodsInfo = goodsData[shopIndex].goodsInfo; 
    goodsInfo[index].spnum++;
    this.setData({
      goodsData
    });
    let newdata={
      num:  goodsInfo[index].spnum,
      spid: goodsInfo[index].spid
    }
    //console.log(newdata);
    api.postGoodsData(newdata);
    this.getSelectProductPrice();
  },

  /**
   * 点击 编辑 按钮方法
   * 隐藏数量框，显示删除按钮
   */
  editBtnClick(e) {
    this.setData({
      isEdit: (!this.data.isEdit)
    })
  },

  /**
   * 选择店铺方法
   * 该店铺下的所有产品都会被选中
   */
  selectStore(e) {
    const goodsData = this.data.goodsData;         //所有的商品信息
    let shopIndex = e.currentTarget.dataset.shopIndex;    
    let goodsInfo = goodsData[shopIndex].goodsInfo;   //对应店铺的所有商品信息
    let shoparr=this.data.shoparr;
    let goodarr=this.data.goodarr;
    var idxshop=shoparr.indexOf(goodsData[shopIndex].shopname);
    if (goodsData[shopIndex].selected) {
      goodsData[shopIndex].selected = false;
      for (var i = 0; i < goodsInfo.length; i++) {
        goodsData[shopIndex].goodsInfo[i].selected = false;
      }
      shoparr=[];
      goodarr=[];
    } else {
      goodsData[shopIndex].selected = true;
      for (var i = 0; i < goodsInfo.length; i++) {
        goodsData[shopIndex].goodsInfo[i].selected = true;
        goodarr.push(goodsData[shopIndex].goodsInfo[i].spid);
      }
    }
    this.setData({
      goodsData,
      shoparr,
      goodarr
    })
    this.getSelectProductPrice();
    this.getSelectedAllPrice();
  },

  /**
   * 选择产品方法
   * 当一个店铺下的所有产品被选中时，自动触发店铺的全选按钮
   * 如果该店铺下只有一个产品，选中产品时默认触发店铺的全选按钮
   * 如果选中店铺的全选按钮，则自动全选该店铺下的所有产品
   */
  selectGood(e) {
    //console.log(e);
    const goodsData = this.data.goodsData;
    let shopIndex = e.currentTarget.dataset.shopIndex;
    let index = e.currentTarget.dataset.index;  
    let goodsInfo = goodsData[shopIndex].goodsInfo; 
    let shoparr=this.data.shoparr;
    let goodarr=this.data.goodarr;
    var idxshop=shoparr.indexOf(goodsData[shopIndex].shopname);
    var idxgood=goodarr.indexOf(goodsData[shopIndex].goodsInfo[index].spid);
    if (goodsInfo[index].selected) {
      goodsData[shopIndex].goodsInfo[index].selected = false;
      goodsData[shopIndex].selected = false;
      
      shoparr.splice(idxshop,1);
      goodarr.splice(idxgood,1);
    } else {
      goodsData[shopIndex].goodsInfo[index].selected = true;
      goodarr.push(goodsData[shopIndex].goodsInfo[index].spid);
      var selectGoodsLength = 0;
      for (var i = 0; i < goodsInfo.length; i++) {
        if (goodsInfo[i].selected == true) {
          selectGoodsLength++;
        }
      }
      if (selectGoodsLength == goodsInfo.length) {
        goodsData[shopIndex].selected = true
        shoparr.push(goodsData[shopIndex].shopname);
      }
    }
    this.setData({
      goodsData,
      shoparr,
      goodarr
    })
    this.getSelectProductPrice();
    this.getSelectedAllPrice();
    //console.log(shoparr);
    //console.log(goodarr);
  },

  /**
   * 底部 全选 按钮方法
   * 只要有一个产品未被选中，全选按钮就是未选中状态
   * 当所有产品选中时，自动触发全选按钮为选中状态
   * 点击全选按钮，全选所有店铺和店铺下的产品
   */
  allSelectedClick(e) {
    const goodsData = this.data.goodsData;
    let isAllSelected = this.data.isAllSelected;
    let shoparr=this.data.shoparr;
    let goodarr=this.data.goodarr
    if (isAllSelected) {
      isAllSelected = false;
      shoparr=[];
      goodarr=[];
    } else {
      isAllSelected = true;
      for (let i = 0; i < goodsData.length; i++) {
        var goodsInfo = goodsData[i].goodsInfo;
        shoparr=goodsData[i].shopname;
        for (var j = 0; j < goodsInfo.length; j++) {
          goodarr.push(goodsInfo[j].spid);
        }
      }
    }

    for (let i = 0; i < goodsData.length; i++) {
      goodsData[i].selected = isAllSelected;
      var goodsInfo = goodsData[i].goodsInfo;

      for (var j = 0; j < goodsInfo.length; j++) {
        goodsInfo[j].selected = isAllSelected;
      }
    }
    this.setData({
      goodsData,
      isAllSelected,
      shoparr,
      goodarr
    })
    this.getSelectProductPrice();
    //console.log(shoparr);
    //console.log(goodarr);
  },

  /**
   * 计算选中产品的总价格方法
   * 总价格 = 选中产品的价格 * 选中产品的数量
   */
  getSelectProductPrice() {
    const goodsData = this.data.goodsData;
    let selectPrice = 0;
    let selectNum = 0;

    for (let i = 0; i < goodsData.length; i++) {
      var goodsInfo = goodsData[i].goodsInfo;
      for(let j = 0; j < goodsInfo.length; j++) {
        if (goodsInfo[j].selected) {
          selectPrice += Number(goodsInfo[j].price) * parseInt(goodsInfo[j].spnum);
          selectNum += parseInt(goodsInfo[j].spnum);
        }
      }
    }
    this.setData({
      selectNum,
      selectPrice: selectPrice.toFixed(2)
    })
  },

  /**
   * 全选条件方法
   */
  getSelectedAllPrice() {
    const goodsData = this.data.goodsData;
    let shopNum = goodsData.length;
    let isAllSelected = this.data.isAllSelected;
    let allSelectedNum = 0;
    for (let i = 0; i < goodsData.length; i++) {
      if (goodsData[i].selected == true) {
        allSelectedNum++
      }
    }
    if (shopNum == allSelectedNum) {
      isAllSelected = true
    } else {
      isAllSelected = false;
    }
    this.setData({
      isAllSelected
    })
    this.getSelectProductPrice();
  },

  /**
   * 商品产品方法
   * 点击编辑按钮，显示删除按钮
   * 选中产品才可以产出该产品
   */
  payBtn(e){
    
    const goodsData=this.data.goodsData;
    let goodarr=this.data.goodarr;
    console.log(goodarr);
    if (goodarr.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请选择要购买的产品！',
        showCancel: false,
        confirmColor: '#F7323A'
      })
    } else if(goodarr.length>1){
      wx.showModal({
        title: '提示',
        content: '房屋请单独购买！',
        showCancel: false,
        confirmColor: '#F7323A'
      })
    }
    else{
      wx.showModal({
        title: '提示',
        content: '确认要购买产品么？',
        confirmColor: '#F7323A',
        cancelColor: '#333333',
        success:(res)=>{
          if(res.confirm){
            let orderarr=[];
            let ele;
            for(let i=0;i<goodarr.length;++i){
              let targetid=goodarr[i];
              for(let j=0;j<goodsData.length;++j){
                let goodsInfo=goodsData[j].goodsInfo;
                for(let k=0;k<goodsInfo.length;++k){
            //console.log(goodsInfo[k]);
                if(goodsInfo[k].spid==targetid){
                  let good=goodsInfo[k];
                  console.log(good);
                  ele={
                    spid:good.spid,
                    spnum:good.spnum,
                    spname:good.spname,
                    deposit:good.deposit,
                    price:good.price,
                    salername:good.salername,
                    begintime:good.begintime,
                    endtime:good.endtime,
                    picurl:good.spavatar
                  };
                  //console.log(ele);
                  orderarr.push(ele);
            }
          }
        }
            //console.log(goodarr[0]);
            wx.navigateTo({
              url: '../../pages/order-check-house/index?'
              +'&spid='+orderarr[0].spid
              +'&btime='+orderarr[0].begintime
              +'&etime='+orderarr[0].endtime
              +'&unitprice='+orderarr[0].price
              +'&deposit='+orderarr[0].deposit
              +'&salername='+orderarr[0].salername
              +'&spname='+orderarr[0].spname
              +'&picurl='+orderarr[0].picurl
            })
          }
        }
      }
    })
    }
  },
  deleteBtn(e) {
    const goodsData = this.data.goodsData;
    let goodarr=this.data.goodarr;
    if (goodarr.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请选择要删除的产品！',
        showCancel: false,
        confirmColor: '#F7323A'
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '确认要删除产品么？',
        confirmColor: '#F7323A',
        cancelColor: '#333333',
        success: (res) => {
          if (res.confirm) {
              let goodsarr=this.goodarr;
              let data={
                goodarr:goodarr
              }
              api.postDelete(data).then(()=>{
                this.onShow();
              });
              //console.log(goodarr)
          }
        }
      })
    }
    
  },
  initGoodData(){
    let _this=this;
    api.getGoodDatas().then(res=>{
      let info=res.data;
      this.setData({
        goodsData:info
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    let _this=this;
    this.initGoodData();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    //console.log("xman");
    //this.allSelectedClick();
    this.setData({
      goodarr:[],
      shoparr:[],
      selectPrice:0.0,
      isAllSelected:false,
      selectNum:0
    })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})