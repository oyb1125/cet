const db = wx.cloud.database().collection('Writing')
const _ = wx.cloud.database().command
var choosed = false
Page({

  /**
   * 页面的初始数据
   */
  data: {
    choosed: false,
    list: []
  },
  daanchange: function () {
    var that = this
    if (that.data.choosed) {
      that.setData({
        choosed: false
      })
    } else {
      that.setData({
        choosed: true
      })
    }
  },
  touchmove: function () {
    this.setData({
      choosed: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      type: options.type
    })
    db.where({
      CET: that.data.type
    }).get({
      success: function (res) {
        that.setData({
          list: res.data
        })
      }
    })
    console.log(that.data.list)
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