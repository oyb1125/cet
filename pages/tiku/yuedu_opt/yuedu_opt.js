// pages/tiku/yuedu_opt/yuedu_opt.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  xuancitiankong: function () {
    wx.navigateTo({
      url: '/pages/tiku/xuancitiankong/xuancitiankong?type='+this.data.type,
    })
  },
  changpianyuedu: function () {
    wx.navigateTo({
      url: '/pages/tiku/changpianyuedu/changpianyuedu?type='+this.data.type,
    })
  },
  zixiyuedu: function () {
    wx.navigateTo({
      url: '/pages/tiku/zixiyuedu/zixiyuedu?type='+this.data.type,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: options.type
    })
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