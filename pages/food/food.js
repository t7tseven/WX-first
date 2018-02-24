// pages/food/food.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodList:[],
    pageSize:20,
    pageNumber:0,
    Id:1,
    hasMore: true
  },
  /* 自己定义的加载更多函数*/ 
  loadMore:function(){
    if (!this.data.hasMore) return;
    wx.request({
      url: 'https://locally.uieee.com/categories/' + this.data.Id + '/shops',
      data: {
        _limit: this.data.pageSize,
        _page: ++this.data.pageNumber
      },
      success: res => {
        var newList = this.data.foodList.concat(res.data);
        var count = parseInt(res.header['X-Total-Count']);
        var flag = this.data.pageSize * this.data.pageNumber < count;
        this.setData({
          foodList: newList,
          hasMore: flag
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.title,
    }),
    this.setData({
      Id:options.id
    })
    this.loadMore();
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
    this.setData({
      foodList:[],
      pageNumber:0,
      hasMore:true
    });
    this.loadMore();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})