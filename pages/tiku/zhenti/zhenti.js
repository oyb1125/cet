// pages/tiku/zhenti/zhenti.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: 'A', value: 'A) Unlearn their training in drawing.' },
      { name: 'B', value: 'B) Participate in a state graffiti show.' },
      { name: 'C', value: 'Cover the walls of an old house with graffiti.' },
      { name: 'D', value: 'D) Exhibit their artistic creations in an old house.' }
    ],
    choosed:false
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      choosed:true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type:options.type
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