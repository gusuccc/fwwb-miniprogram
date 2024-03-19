var util = require('../../utils/util2');
import Dialog from '../../dist/dialog/dialog';
let App = getApp()
import api from '../../request/req'
//日期函数
Date.prototype.diff = function(date){ 
  return (this.getTime() - date.getTime())/(24 * 60 * 60 * 1000); 
} 
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    date: '',
    show: false,
    begin_date:'',
    end_date:'',
    diff_date:'',
    //上面是日期相关
    house:"",
    imgurl:[],
    flatid:"",
    unitprice:0,
    flatstatus:0,
    flatname:"",
    flatdetail:"",
    flatarea:"",
    flataddr:"",
    flatid:"",
    allrank:"",
    comments:[],
    salename:"",
    salerank:"",
    flatfeature:"",
    flatMainpicurl:"",
    Bookinformation:"",
    flagSalenum:"",
    currentIndex:1,              //表示轮播图角标的
    gooutinfo:"建议选择公共交通,地铁或者公交车,到周围景点都比较方便,打车的话不好停车,开车的停车费也挺贵,临近下班高峰时段堵车也比较严重,容易影响玩耍心情",
    deposit:0,
    navwhere:0
  },
  /**
   * 生命周期函数--监听页面加载
   */

   /**
    * 日期相关
    */
   
   onDisplay() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
    
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  },
  onConfirm(event) {
    const [start, end] = event.detail;
    this.setData({
      show: false,
      date: `${this.formatDate(start)} - ${this.formatDate(end)}`,
      begin_date:`${this.formatDate(start)}`,
      end_date:`${this.formatDate(end)}`,
      diff_date:end.diff(start)
    });
    // console.log(this.data.begin_date);
    // console.log(this.data.end_date);
    // console.log(this.data.salename);
    // console.log(this.data.unitprice);
    let _this=this;
    //console.log(data);
    
    if(this.data.navwhere==0){
      wx.navigateTo({
        url: '../../pages/order-check-house/index?'
        +'btime='+_this.data.begin_date
        +'&spid='+_this.data.flatid
        +'&etime='+_this.data.end_date
        +'&deposit='+_this.data.deposit
        +'&unitprice='+_this.data.unitprice
        +'&salername='+_this.data.salename
        +'&spname='+_this.data.flatname
        +'&picurl='+_this.data.flatMainpicurl
   })
    }
    else{
      let addinfo={
        'spavatar':this.data.flatMainpicurl,
        'spid':this.data.flatid,
        'spname':this.data.flatname,
        'price':this.data.unitprice,
        'salername':this.data.salename,
        'begintime':this.data.begin_date,
        'endtime':this.data.end_date,
        'deposit':this.data.deposit
      }
      api.addwant(addinfo).then(()=>{
        Dialog.alert({
          message: '加入心愿单成功！',
        })
      })
    }
  },
  /**
   * 初始化商品详情数据
   */
   initDetailData(flagid) {
    let _this = this;
    //这里写初始化(发请求)信息，由load调用
    api.getflatinfo(flagid)
    .then(res=>{
      let info=res.data;
      this.setData({
        imgurl:info.imgurl,   //每一个列表包含三个字段：id	1saleId url
        unitprice:info.flat.flatPrice,    
        flatid:info.flat.flatId,
        flatstatus:info.flat.flatCondition, //flatCondition
        flatname:info.flat.flatName,
        flatid:info.flat.flatId,     
        flatdetail:info.flat.flatDesc,    //描述信息
        flataddr:info.flat.flatAddrSheng+info.flat.flatAddrShi+info.flat.flatAddrXian+info.flat.flatAddrDetail,           //
        flatMainpicurl:info.flat.flatMainpicurl,
        flatarea:info.flat.flatArea,
        allrank:info.flat.flatScore,       //总评分     
        comments:info.comments,            
        salename:info.salename,            
        salerank:info.salerank,
        flatfeature:info.flat.flatFeature,
        flagSalenum:info.flat.flagSalenum,
        Bookinformation:info.flat.flatRequest,                  //预定须知
        deposit:info.flat.deposit
      })
    })
  },
  onLoad(options) {
    let _this = this;
    console.log(options);
    // console.log(options.flagid);
     _this.initDetailData(options.flagid);
  },
  swiperchange(){
    this.setData({
      currentIndex:(this.data.currentIndex+1)%(this.data.imgurl.length+1)
    })
    if(this.data.currentIndex==0)
      this.setData({
        currentIndex:this.data.currentIndex+1
      })
  },
  /**
   * 获取商品信息
   */
  getDetail() { 
    let _this = this;
    //在这里发请求

  },

  /**
   * 显示/隐藏 返回顶部按钮
   */


  /**
   * 跳转购物车页面
   */
  flowCart: function () {
    wx.switchTab({
      //url自己写
      url:'../Wishlist/Wishlist'
    });
  },

  /**
   * 加入购物车and立即购买
   */
  submit: function () {
    this.setData({
      navwhere:0
    })
    this.onDisplay();
    
  },
  addwant:function(){
    this.setData({
      navwhere:1
    })
    this.onDisplay();
  }

})