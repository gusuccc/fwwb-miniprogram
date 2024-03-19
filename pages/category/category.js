const app=getApp();
// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧的菜单数据
    leftMenuList: [ 
    {name:"新品",id:"new"},
    // {name:"房屋",id:"home"},
    {name:"虚拟",id:"virtual"},
    {name:"手机",id:"phone"},
    {name:"电视",id:"tv"},
    {name:"电脑",id:"laptop"},
    {name:"家电",id:"appliance"},
    /*{name:"路由",id:"router"},
    {name:"智能",id:"smart"},
    {name:"儿童",id:"kids"},
    {name:"灯具",id:"lignts"}*/

  ],
    //右侧商品的标题
    righttitle: [],
    // 右侧的房子数据
    // houseinfo: [{
    //   title:"整套公寓,单间1卫一床",
    //   showinfo:"【11可月租】 【99元限时秒杀】 春熙路：网红豪华空中花园",
    //   firstprice:327,
    //   nowprice:213,
    //   pingjianum:171,
    //   picurl:"https://xqj-1301697474.cos.ap-chengdu.myqcloud.com/housepic/clipboard_20210320_082136.png"
    // },{
    //   title:"整套公寓,单间1卫一床",
    //   showinfo:"【11可月租】 【99元限时秒杀】 春熙路：网红豪华空中花园",
    //   firstprice:327,
    //   nowprice:213,
    //   pingjianum:171,
    //   picurl:"https://xqj-1301697474.cos.ap-chengdu.myqcloud.com/housepic/clipboard_20210320_082136.png"
    // }
    // ,{
    //   title:"整套公寓,单间1卫一床",
    //   showinfo:"【11可月租】 【99元限时秒杀】 春熙路：网红豪华空中花园",
    //   firstprice:327,
    //   nowprice:213,
    //   pingjianum:171,
    //   picurl:"https://xqj-1301697474.cos.ap-chengdu.myqcloud.com/housepic/clipboard_20210320_082136.png"
    // }],
    //右侧的电子产品数据
    electroinfo:[],
    //右侧的服务器数据
    serverinfo:[],
    // 被点击的左侧的菜单
    curIndex:0,//通过curIndex来指示渲染什么数据
    toView:"new",
    detail:[],
    loading:0,                  //为0显示商品信息，1显示风车
  },
  onLoad: function (options) {
    const detail1=app.globalData.category;
    this.toView="new";

    this.setData({
      detail:detail1
    });
  },
  switchCategory(e){
    // console.log(e.currentTarget.dataset.id);
    const curIndex1=e.currentTarget.dataset.index?e.currentTarget.dataset.index:0;
    this.setData({
      toView:e.currentTarget.dataset.id,
      curIndex:curIndex1
    });
  },
  onScroll(e){
    let scrollTop = e.detail.scrollTop;
    scrollTop+=200;
    if(scrollTop>2381.60009765625)
      this.setData({curIndex:5});
    else if (scrollTop>1908.800048828125)
    this.setData({curIndex:4});
    else if (scrollTop>1436)
    this.setData({curIndex:3});
    else if (scrollTop>962.4000244140625)
    this.setData({curIndex:2});
    else if (scrollTop>489.6000061035156)
    this.setData({curIndex:1});
    else if (scrollTop>16.799999237060547)
    this.setData({curIndex:0});
  }
})