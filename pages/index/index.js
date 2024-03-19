const app = getApp()
import api from '../../request/req';

Page({
    data: {
        notice:[{
          content:"天文知识启蒙5件套：给孩子一个太空梦！"
        },{
          content:"租房车攻略：带全家自驾，体验不同的自驾游！",
        },
        {
          content:"在家体验影音盛宴：VR、投影、音香陪你畅享！",
        },
        {
          content:"Switch+游戏：动森、健身环全都有！",
        },
        {
          content:"PS4及更多热门游戏~",
        }],
        show_notice:1,

        show_channel:1,
        channel:[{
          icon_url:"https://xqj-1301697474.cos.ap-chengdu.myqcloud.com/miniprogram_basicpic/%E4%B8%8A%E6%96%B0.png",
          name:"上新推荐",
          url:""
        },{
          icon_url:"https://xqj-1301697474.cos.ap-chengdu.myqcloud.com/miniprogram_basicpic/%E7%A7%91%E6%8A%80.png",
          name:"科技娱乐",
          url:"/pages/my/my"
        },{
          icon_url:"https://xqj-1301697474.cos.ap-chengdu.myqcloud.com/miniprogram_basicpic/%E4%BC%98%E6%83%A0%E5%88%B8.png",
          name:"优惠券",
          url:"/pages/coupons/index"
        },{
          icon_url:"https://xqj-1301697474.cos.ap-chengdu.myqcloud.com/miniprogram_basicpic/%E6%88%BF%E5%B1%8B%281%29.png",
          name:"房屋租赁",
          url:""
        },{
          icon_url:"https://xqj-1301697474.cos.ap-chengdu.myqcloud.com/miniprogram_basicpic/%E6%9B%B4%E5%A4%9A-%E6%9B%B4%E5%A4%9A%E6%9D%A1%E4%BB%B6.png",
          name:"更多",
          url:"/pages/search/search"
        }],

        floorGoods: [
            {
                banner:"https://xqj-1301697474.cos.ap-chengdu.myqcloud.com/miniprogram_basicpic/%7DNKONJXIW%24IIZJ%7D%2951_%5B02I.png",
                name:"科技娱乐",
                goodsList:[
                  {
                    id:1,
                    list_pic_url:"https://xqj-1301697474.cos.ap-chengdu.myqcloud.com/saleinfo/clipboard_20210321_040039.png",
                    name:"台灯",
                    min_retail_price1:30,
                    min_retail_price2:130
                  }
                ]
            }
        ],
        openAttr: false,
        showChannel: 1,
        showBannerImg: 0,

        showBanner: 1,
        banner: [
            {
                link_type:0,
                image_url:"https://xqj-1301697474.cos.ap-chengdu.myqcloud.com/goodpic/H16S7_%5BPQYLCV6%293_ZEJ75H.png"
            },
            {
                link_type:0,
                image_url:"https://xqj-1301697474.cos.ap-chengdu.myqcloud.com/goodpic/Y3%5DG5HD%29RTS_LZP_R6U4DA5.png"
            },
            {
              link_type:0,
              image_url:"https://xqj-1301697474.cos.ap-chengdu.myqcloud.com/goodpic/mmexport1617629917828.jpg"
          }
        ],
        userInfo: {},
        imgurl: '',
        loading: 0,
        autoplay:true
    },
    initindex:function(){
        api.getindex().then((res)=>{
          let info=res.data;
          this.setData({
            floorGoods:info
          })
        })
    },
    onLoad: function (options) {
        this.initindex();
    },
    onShow: function () {
        //this.getChannelShowInfo();
       // this.getIndexData();
        var that = this;
        let userInfo = wx.getStorageSync('userInfo');
        if (userInfo != '') {
            that.setData({
                userInfo: userInfo,
            });
        };
        let info = wx.getSystemInfoSync();
        let sysHeight = info.windowHeight - 100;
        this.setData({
            sysHeight: sysHeight,
            autoplay:true
        });
        wx.removeStorageSync('categoryId');
    },
})