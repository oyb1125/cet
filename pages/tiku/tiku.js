// pages/tiku/tiku.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
  },
  //  tab切换逻辑
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  

  zhenti4:function(){
    wx.navigateTo({
      url: '/pages/tiku/zhenti_opt/zhenti_opt?type=CET4',
    })
    // wx.showModal({
    //   content: '敬请期待~',
    //   showCancel:false
    // })
  },
  zhenti6:function(){
    wx.navigateTo({
      url: '/pages/tiku/zhenti_opt/zhenti_opt?type=CET6',
    })
    // wx.showModal({
    //   content: '敬请期待~',
    //   showCancel: false
    // })
  },

  tingli4:function(){
    wx.navigateTo({
      url: '/pages/tiku/tingli/tingli?type=CET4',
    })
  },
  tingli6: function () {
    wx.navigateTo({
      url: '/pages/tiku/tingli/tingli?type=CET6',
    })
  },

  yuedu4: function () {
    wx.navigateTo({
      url: '/pages/tiku/yuedu_opt/yuedu_opt?type=CET4',
    })
  },
  yuedu6: function () {
    wx.navigateTo({
      url: '/pages/tiku/yuedu_opt/yuedu_opt?type=CET6',
    })
  },

  fanyi4: function () {
    wx.navigateTo({
      url: '/pages/tiku/fanyi/fanyi?type=CET4',
    })
  },
  fanyi6: function () {
    wx.navigateTo({
      url: '/pages/tiku/fanyi/fanyi?type=CET6',
    })
  },

  xiezuo4: function () {
    wx.navigateTo({
      url: '/pages/tiku/xiezuo/xiezuo?type=CET4',
    })
  },
  xiezuo6: function () {
    wx.navigateTo({
      url: '/pages/tiku/xiezuo/xiezuo?type=CET6',
    })
  },

  onLoad: function () {
    // var that = this;
    // /**
    //  * 获取当前设备的宽高
    //  */
    // wx.getSystemInfo({

    //   success: function (res) {
    //     that.setData({
    //       winWidth: res.windowWidth,
    //       winHeight: res.windowHeight
    //     });
    //   }

    // });
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