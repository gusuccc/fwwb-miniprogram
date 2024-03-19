// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keywrod: '',   //搜索输入的关键词
    searchStatus:false,
    goodsList: [],
    historyKeyword:["数码相机","小平房"],
    searchStatus:0
  },
  onLoad: function () {
      this.getSearchKeyword();
  },
  getSearchKeyword() {
      let that = this;
      //这里写发请求的代码

  },
  clearKeyword: function () {          //清楚关键词
    this.setData({
        keyword: '',
        searchStatus: false
    });
  },
  inputChange: function (e) {         //改变的时候触发
      this.setData({
          keyword: e.detail.value,
          searchStatus: false
      });
  },
  inputFocus: function () {          //聚焦的时候触发
      this.setData({
          searchStatus: false,
          goodsList: []
      });
  },
  clearHistory: function () {       //清楚历史记录
      this.setData({
          historyKeyword: []
      })
  },
  getGoodsList: function () {
      let that = this;

  },
  onKeywordTap: function (event) {
      this.getSearchResult(event.target.dataset.keyword);
  },
  getSearchResult(keyword) {
      this.setData({
          keyword: keyword,
          page: 1,
          categoryId: 0,
          goodsList: []
      });

      this.getGoodsList();
  },
  openSortFilter: function (event) {
      let currentId = event.currentTarget.id;
      switch (currentId) {
          case 'salesSort':
              let _SortOrder = 'asc';
              if (this.data.salesSortOrder == 'asc') {
                  _SortOrder = 'desc';
              }
              this.setData({
                  'currentSortType': 'sales',
                  'currentSortOrder': 'asc',
                  'salesSortOrder': _SortOrder
              });
              this.getGoodsList();
              break;
          case 'priceSort':
              let tmpSortOrder = 'asc';
              if (this.data.currentSortOrder == 'asc') {
                  tmpSortOrder = 'desc';
              }
              this.setData({
                  'currentSortType': 'price',
                  'currentSortOrder': tmpSortOrder,
                  'salesSortOrder': 'asc'
              });
              this.getGoodsList();
              break;
          default:
              //综合排序
              this.setData({
                  'currentSortType': 'default',
                  'currentSortOrder': 'desc',
                  'salesSortOrder': 'desc'
              });
              this.getGoodsList();
      }
  },
  onKeywordConfirm(event) {
      this.getSearchResult(event.detail.value);
  }
})