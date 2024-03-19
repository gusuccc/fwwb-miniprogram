const app = getApp();
import api from '../../../request/req';

Page({
    data: {
        showType: 0,
        status: {},
        hasOrder: 0,    //控制是否显示没有订单信息的变量
        orderList: [{   //因为可以切换标签，所以这个存的是当前标签界面的订单信息
          orderid:1724,
          orderstatus:"待付款",
          add_time:'2021-01-26 14:22:53',
          actual_price:355,                  //价格
          freight_price:10,                  //运费
          spid:12,
          spurl:"https://xqj-1301697474.cos.ap-chengdu.myqcloud.com/saleinfo/clipboard_20210321_040039.png",
          spname:"行家·悦西阁",
        }],
        /*
         handleOption:{         //表示订单状态的
            cancel:false,
            pay:true
          }
          */
    },
    onLoad: function() {},
    initorder:function(){
        api.getorderinfo().then(res=>{
            console.log("发出请求！");
            let info=res.data;
            this.setData({
                orderList:info
            })
        })
    },
    onShow: function() {
        let showType = wx.getStorageSync('showType');
        this.initorder();
    },
    toIndexPage: function(e) {
      wx.switchTab({
          url: '/pages/index/index'
      });
  },
    switchTab: function(event) {
        let showType = event.currentTarget.dataset.index;  //currentTarget 事件属性返回其监听器触发事件的节点，即当前处理该事件的元素、文档或窗口。
        wx.setStorageSync('showType', showType);
        this.setData({
          showType: showType,
        })
    },
    nav:function(){
        wx.navigateTo({
          url: '/pages/wuliu/index',
        })
    }
})