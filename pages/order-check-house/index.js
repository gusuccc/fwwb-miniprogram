
const app = getApp()
import api from '../../request/req';
import Dialog from '../../dist/dialog/dialog';
Page({
    data: {
        deposit:0.00,
        salername:'',
        picurl:'',
        spid:'',
        spname:'',
        unitprice: 0.00,
        date_bg: '',
        date_end: '',
        live_day:0,
        bgend:'bg',
        show: false,
        //上面不删
        checkedGoodsList: [],
        checkedAddress: {},
        goodsTotalPrice: 0.00, //商品总价
        freightPrice: 0.00, //快递费
        orderTotalPrice: 0.00, //订单总价
        actualPrice: 0.00, //实际需要支付的总价
        addressId: 0,
        goodsCount: 0,
        postscript: '',
        outStock: 0,
        orderid:"",
        payMethodItems: [{
                name: 'offline',
                value: '线下支付'
            },
            {
                name: 'online',
                value: '在线支付',
                checked: 'true'
            },
        ],
        payMethod:1,
    },
    //不删
    onDisplay1() {
        this.setData({ show: true });
        this.setData({ bgend: 'bg' });
      },
      onDisplay2() {
        this.setData({ show: true });
        this.setData({ bgend:'end' });
      },
      onClose() {
        this.setData({ show: false });
      },
      formatDate(date) {
        date = new Date(date);
        return `${date.getMonth() + 1}/${date.getDate()}`;
      },
      onConfirm(event) {
        this.setData({show: false});
          if(this.data.bgend=='bg')
         { 
            this.setData({date_bg:this.formatDate(event.detail)});
         }
        else if(this.data.bgend=='end')
        {
            this.setData({date_end:this.formatDate(event.detail)});
        }
      },
      //结束    
    payChange(e){
        let val = e.detail.value;
        if(val == 'offline'){
            this.setData({
                payMethod:0
            })
        }
        else{
            this.setData({
                payMethod:1
            })
        }
    },
    toGoodsList: function (e) {
        wx.navigateTo({
            url: '/pages/ucenter/goods-list/index?id=0',
        });
    },
    //这个不删除
    toSelectAddress: function () {
        wx.navigateTo({
            url:  '/pages/address-detail/index',//id=' + id
        });
    },
     
    toAddAddress: function () {
        wx.navigateTo({
            url: '/pages/address-add/index',
        })
    },
    bindinputMemo(event) {
        let postscript = event.detail.value;
        this.setData({
            postscript: postscript
        });
    },
    onLoad: function (options) {
        //console.log(options);
        //console.log(options.fromwish);
        
        let addType = options.addtype;
        let orderFrom = options.orderFrom;
        let _this=this;
        let date1=new Date(options.btime);
        let date2=new Date(options.etime);
        let days=date2.getTime()-date1.getTime();
        let day=parseInt(days/(1000*60*60*24));
        this.setData({
            date_bg:options.btime,
            date_end:options.etime,
            live_day:day,
            deposit:options.deposit,
            salername:options.salername,
            spname:options.spname,
            unitprice:options.unitprice,
            spid:options.spid,
            picurl:options.picurl
        });
        console.log(_this.data);
        if (addType != undefined) {
            this.setData({
                addType: addType
            })
        }
        if (orderFrom != undefined) {
            this.setData({
                orderFrom: orderFrom
            })
        }
        let total=Number(options.unitprice*day)+Number(options.deposit);
        console.log(total);
        this.setData({
            orderTotalPrice:total,
            actualPrice:total
        })
    },
    onUnload: function () {
        wx.removeStorageSync('addressId');
    },
    onShow: function () {
        // 页面显示

    },
    getCheckoutInfo: function () {

    },
    // TODO 有个bug，用户没选择地址，支付无法继续进行，在切换过token的情况下
    submitOrder: function (e) {
        let orderinfo={
            'spid':this.data.spid,
            'spname':this.data.spname,
            'begindata':this.data.date_bg,
            'enddata':this.data.date_end,
            'deposit':this.data.deposit,
            'unitprice':this.data.unitprice,
            'daynum':this.data.live_day,
            'decmoney':this.data.goodsTotalPrice,
            'spurl':this.data.picurl
        }
        console.log(orderinfo);
        api.addorder(orderinfo).then((res)=>{
            //此时应该弹出让他们支付的界面
            let info=res.data;
                this.setData({
                    orderid:info.openid
            })
            Dialog.confirm({
                title: '确认支付界面',
                message: '点击确认会扣除账户上的余额！',
              }).then((res) => {
                // on confirm
                Dialog.alert({
                    message: '支付成功！',
                  }).then(()=>{
                    let o={'orderid':this.data.orderid};
                      api.updateorder(o);
                    wx.navigateTo({
                        url: '/pages/orderinfo/order_list/order_list',
                      })
                  })
              })
              .catch(() => {
                // on cancel
                Dialog.alert({
                    message: '你可以在待付款列表找到它！',
                  }).then(()=>{
                    wx.navigateTo({
                        url: '/pages/orderinfo/order_list/order_list',
                      })
                  })
              });
        })
        //console.log(orderinfo);
    },
    editaddr: function(){
        wx.navigateTo({
          url: '../address-detail/index',
        })
      }
})