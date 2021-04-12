// pages/wo/pingfen/pingfen.js
const app=getApp()
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listed:[
      '/images/wo/star.png',
      '/images/wo/star.png',
      '/images/wo/star.png',
      '/images/wo/star.png',
      '/images/wo/star.png'
    ]
  },
  pingfen(){
    db.collection('pingfen').where({
      openid:app.globalData.openid
    }).get({
      success:res=>{
        console.log(res)
        if(res.data.length==0){
          db.collection('pingfen').add({
            // data 字段表示需新增的 JSON 数据
            data: {
              openid: app.globalData.openid,
              stars: this.data.socre,
              content: this.data.content
            },
            success: function (res) {
              console.log(res)
              wx.showToast({
                icon:'success',
                title: '评价成功',
              })
            },
            fail: console.error
          })
        }else{
          wx.showModal({
            content: '您已提交过评论，不能重复提交',
            showCancel: false,
            confirmText: '知道了',
            success: res => {
              if (res.confirm) {
                wx.switchTab({
                  url: '/pages/wo/wo'
                })
              }
            }
          })
        }
      }
    })

  },
  getInput(e){
    console.log(e.detail.value)
    this.setData({
      content:e.detail.value
    })
  },
  sle_star(e){
    var that=this
    var listed = [
      '/images/wo/star.png',
      '/images/wo/star.png',
      '/images/wo/star.png',
      '/images/wo/star.png',
      '/images/wo/star.png'
    ]
    console.log(e.target.dataset.id)
    for (var i = 0; i < e.target.dataset.id+1;i++){
      if (listed[i] = '/images/wo/star.png'){
        listed[i] = '/images/wo/stared.png'
      } else if (listed[i] = '/images/wo/stared.png'){
        listed[i] = '/images/wo/star.png'
      }
    }
    that.setData({
      listed:listed,
      socre: e.target.dataset.id+1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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