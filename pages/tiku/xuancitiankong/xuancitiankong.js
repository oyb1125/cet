// pages/tiku/xuancitiankong/xuancitiankong.js
const db = wx.cloud.database().collection('xuancitiankong')
var myanswer = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myanswer_class: 'myanswer',
    list: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    that.setData({
      type: options.type
    })
    db.where({
      CET: that.data.type
    }).get({
      success: function(res) {
        that.setData({
          list: res.data
        })
      }
    })
  },
  scroll: function(e) {
    var that = this
    let id = that.data.list[e.currentTarget.id]._id
    console.log(wx.getStorageSync(id))
    if (wx.getStorageSync(id)) {
      that.setData({
        myanswer: wx.getStorageSync(id),
        choosed: true
      })
    }else{
      that.setData({
        myanswer: [],
        choosed: false
      })
    }
    if (that.data.myanswer.length >= 10 && that.data.myanswer[0] != null && that.data.myanswer[1] != null && that.data.myanswer[2] != null && that.data.myanswer[3] != null && that.data.myanswer[4] != null && that.data.myanswer[5] != null && that.data.myanswer[6] != null && that.data.myanswer[7] != null && that.data.myanswer[8] != null && that.data.myanswer[9] != null) {
      that.setData({
        choosed: true
      })
    }
  },
  checkboxChange: function(e) {
    this.setData({
      myanswer: e.detail.value
    })
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    // wx.setStorageSync(e.target.dataset.id, e.detail.value)
    if (e.detail.value.length >= 10) {
      var that = this
      that.setData({
        choosed: true,
      })
      wx.showModal({
        title: 'PS',
        showCancel: false,
        content: '答案在底部，请自行参考。'
      })
      wx.setStorage({
        key: String(e.currentTarget.id),
        data: that.data.myanswer,
        success: function() {
          that.setData({
            id: e.currentTarget.id
          })
          console.log('缓存成功')
        },
        fail: console.error
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})