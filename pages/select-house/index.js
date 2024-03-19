//index.js
//获取应用实例
var locationUrl = 'http://apis.map.qq.com/ws/geocoder/v1/';
var httpRequest = require('../../common/request.js');
const tencentMapKey = 'ZNDBZ-W3YR6-6KXSB-MLKXV-6HFXK-UMFOT';
var app = getApp();
import api from '../../request/req';
//日期函数
Date.prototype.diff = function(date){ 
  return (this.getTime() - date.getTime())/(24 * 60 * 60 * 1000); 
} 
Page({
  data: {
    date: '',
    show: false,
    begin_date:'',
    show_banner:1,
    banner: [
      {
          link_type:0,
          image_url:"https://xqj-1301697474.cos.ap-chengdu.myqcloud.com/housepic/clipboard_20210320_082136.png"
      },
      {
          link_type:0,
          image_url:"https://xqj-1301697474.cos.ap-chengdu.myqcloud.com/housepic/clipboard_20210320_082136.png"
      }
  ],
    end_date:'',
    diff_date:'',
    //上面不删
    cityinfo: [],
    search: [],
    Special:[],
    appropriate: ['1人', '2人', '3人', '4人', '5人', '5人以上'],
    tip:'选择居住人数', 
    loading: 0,
    autoplay:true,
    //地区变量
    location: '定位中...',
    //以下是循环渲染的数据
    flatinfo:[
      {
        flatid:"f0001",
        imgurl:"http://5b0988e595225.cdn.sohucs.com/images/20181022/efb66d11ed9940448244d1f68f2ec84f.jpg",
        flatname:"猪皮蛋",
        flatprice:120,
        flatscore:4.5,
        pjnum:0
      }
      ]
  },

   onDisplay() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
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
  },
  //结束    
  gominsu: function (e) {
    console.log(this.data.location);
    let location=this.data.location;
    wx.navigateTo({
      url: '/pages/house-list/list?location='+location,
    })
  },
  test: function (e) {

  },
  bindPickerChange:function(e){       //选择居住人数的
     var num = e.detail.value;

     var appropriate = this.data.appropriate;
     this.setData({
       appropriate_num:num *1 +1,
       tip: appropriate[num],
     })
  },
  //轮播
  onLoad: function (options) {
    //地区
    this.getLocalLocation();
    //
    let systemInfo = wx.getStorageSync('systemInfo');
    var scene = decodeURIComponent(options.scene);
    //时间
    var date = new Date();
    var date2= new Date();
    date2.setDate(date2.getDate()+1);
    this.setData({
      begin_date:`${this.formatDate(date)}`,
      end_date:`${this.formatDate(date2)}`,
      diff_date:date2.diff(date)
    });

    api.getflatindexinfo().then(res=>{
      let info=res.data;
      //console.log(info);
      this.setData({
        flatinfo:info
      })
    });
},
onShow: function () {

},
  


 getList:function(){

 },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
    }
    return {
      title: '我发现一款不错的民宿小程序',
      path: res.target,
      success: function (res) {
        wx.showToast({
          title: '分享成功',
        });
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  getLocalLocation: function () {
    this.setData({
         location: '定位中...'
    });
    var that = this;
    wx.getLocation({
         success: function (res) {
              app.func.httpRequest(locationUrl, {
                   key: tencentMapKey,
                   location: res.latitude + ',' + res.longitude
              }, 'GET', {
                        'content-type': 'application/json'
                   }, function (result) {
                        if (result) {
                             that.setData({
                                  location: result.result.address_component.city
                             });
                        } else {
                             that.setData({
                                  location: '定位失败'
                             });
                        }
                   });
         },
         fail: function (res) {
              that.setData({
                   location: '定位失败'
              });
         }
    })
},
selectCity: function () {
  wx.navigateTo({
       url: '../../pages/select_city/select_city'
  })
},
})
