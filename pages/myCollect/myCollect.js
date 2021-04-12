const app = getApp()
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wordList: [],
    collect: true,
  },
  getWord() {
    wx.cloud.callFunction({
      name: 'queryWord',
      // 传给云函数的参数
      data: {
        db:'user_collect',
        openid: app.globalData.openid
      },
      success: res => {
        console.log(res)
        this.setData({
          wordList: res.result.data[0].word,
          id: res.result.data[0]._id
        })
      },
      fail: console.error
    })
  },
  collect(e) {
    let that = this
    console.log('collect',e)
    wx.cloud.callFunction({
      name: 'cancelCollet',
      data: {
        openid: app.globalData.openid,
        word: e.currentTarget.dataset.items
      },
      success: res => {
        console.log(res)
        wx.showToast({
          title: '取消收藏',
        })
        that.onLoad()
      },
      fail: console.error
    })

    // db.collection('user_collect').doc(this.data.id).update({
    //   data: {
    //     word: _.pull([this.data.word])
    //   }
    // })

  },
  search(e) {
    var that = this
    console.log(e)
    var word = e.currentTarget.dataset.word
    this.setData({
      word: word
    })
    var util = require('../../utils/util.js')
    var uuid=util.wxuuid()
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    console.log("当前时间戳为：" + timestamp);
    var sha256 = require('../../utils/sha256.js');
    var sha256Sig = sha256.sha256_digest('4045fd974ac64c84'+word+uuid+timestamp+'WeR55TVMw6RdywUB3SdGWyZQyRq1WJL3')
    wx.request({
      url: 'https://openapi.youdao.com/api?q=' + word +'&from=en&to=zh-CHS&appKey=4045fd974ac64c84&salt='+uuid+'&sign='+sha256Sig+'&signType=v3&curtime='+timestamp+'&strict=true',
      data: {},
      method: 'GET',
      success: function(res) {
        console.log(res)
        that.setData({
          content: res.data,
          audio: res.data.speakUrl,
          pronun: res.data.basic.phonetic,
          explainArray:res.data.basic.explains,
        })
      },
      fail: function() {
        wx.showModal({
          title: '',
          content: '网络错误',
          showCancel: false,
          success: function(res) {}
        })
      }
    })
  },
  //播放音频
  playAudio: function() {
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.src = this.data.audio
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
  onLoad: function(options) {
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
      this.getWord()
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