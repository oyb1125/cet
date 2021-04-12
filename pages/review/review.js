// pages/study/study.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    remember: false,
    studyList:[]
  },
  forget(){
    this.setData({
      remember:true
    })
  },
  //禁止滑动
  catchTouchMove: function (res) {
    return false
  },
  showTip(){
    wx.showModal({
      content: '恭喜你完成了今天的复习',
      showCancel: false,
      confirmText: '知道了',
      success(res) {
        if (res.confirm) {
          wx.switchTab({
            url: '/pages/index/index'
          })
        }
      }
    })
  },
  remember(res){
    var id = res.currentTarget.dataset.id
    console.log(res)
    if (id == this.data.studyList.length - 1){
      this.showTip()
    }else{
      this.setData({
        remember: false,
        currentIndex: id + 1
      })
    }
  },
  next(res){
    var id = res.currentTarget.dataset.id
    if (id == this.data.studyList.length - 1) {
      this.showTip()
    } else {
      this.setData({
        remember: false,
        currentIndex: id + 1
      })
    }
  },
  startStudy: function () {
    if (app.globalData.userInfo == null) {
      wx.showModal({
        content: '请先登录',
        showCancel: false,
        confirmText: '去登录',
        success(res) {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/wo/wo',
            })
          }
        }
      })
    }else{
      let that = this
      var unstuided = this.data.total - this.data.studied
      var grade = this.data.grade
      console.log('unstuided', unstuided)
      wx.cloud.callFunction({
        name: 'review',
        // 传给云函数的参数
        data: {
          jihe: grade,
          unstudied: unstuided,
          study: 10
        },
        success: function (res) {
          console.log(res.result.list)
          that.setData({
            studyList: res.result.list
          })
        },
        fail: console.error
      })
    }
  },
  playAudio(res){
    console.log(res)
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.src = res.currentTarget.dataset.item.audio
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    //循环播放bug 需播放完后销毁音频
    innerAudioContext.onStop(() => {
      innerAudioContext.destroy()
    })
    //播放错误时输出错误，销毁音频重新播放
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
      innerAudioContext.destroy()
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.grade=='四级'){
      this.setData({grade:'cet4'})
    }else{
      this.setData({grade:'cet6'})
    }
    this.setData({
      studied:options.studied,
      total:options.total
    })
    this.startStudy()
    let that=this
    setTimeout(function(){
      if (that.data.studied < 10) {
        wx.showModal({
          content: '已学单词数大于10才能进行快速复习',
          showCancel: false,
          confirmText: '知道了',
          success(res) {
            if (res.confirm) {
              wx.switchTab({
                url: '/pages/index/index'
              })
            }
          }
        })
      }
    },500)
    
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