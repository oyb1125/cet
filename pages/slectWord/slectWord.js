// pages/study/study.js
const innerAudioContext = wx.createInnerAudioContext()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studyList: [],
    wordList: [],
    words: [],
    ok: true,
  },
  catchTouchMove: function (res) {
    return false
  },
  showTip() {
    wx.showModal({
      content: '恭喜你完成了今天的学习',
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
  shuffle(def, num) {
    var correctAns = def[num]
    var answers = []
    while (true) {
      var index = Math.floor(Math.random() * def.length)
      if (index == num) {

      } else if (!answers.includes(def[index])) {
        answers.push(def[index])
      }
      if (answers.length == 3) {
        break;
      }
    }
    var insert = Math.floor(Math.random() * 3)
    answers.splice(insert, 0, correctAns)
    return answers
  },
  select(res) {
    console.log(res)
    if (res.target.dataset.item == res.target.dataset.items.word) {
      var id = res.target.dataset.id
      let that = this
      var words = this.data.words
      var wordList = this.shuffle(words, id + 1)
      this.setData({
        ok: false,
        text_color: 'green',
        isRight: '✓',
        wordList: wordList
      })
      setTimeout(function () {
        if (id == that.data.studyList.length - 1) {
          that.showTip()
        } else {
          that.setData({
            ok: true,
            currentIndex: id + 1,

          })
        }
      }, 300)
    } else {
      this.setData({
        ok: false,
        text_color: 'red',
        isRight: '✘'
      })
      wx.vibrateLong()
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
      wx.cloud.callFunction({
        name: 'review',
        // 传给云函数的参数
        data: {
          jihe: that.data.grade,
          unstudied: unstuided,
          study: 10
        },
        success: res => {
          console.log(res.result.list)
          var words1 = []
          for (var i = 0; i < res.result.list.length; i++) {
            words1.push(res.result.list[i].word)
          }
          this.setData({
            studyList: res.result.list,
            words: words1,
            wordList: this.shuffle(words1, 0)
          })
        },
        fail: console.error
      })
    }
  },
  playAudio(res) {
    console.log(res)
    innerAudioContext.autoplay = true
    innerAudioContext.src = res.currentTarget.dataset.item.audio
    innerAudioContext.play()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad')
    if (options.grade == '四级') {
      this.setData({ grade: 'cet4' })
    } else {
      this.setData({ grade: 'cet6' })
    }
    console.log(options)
    console.log(options.grade, options.studied, options.total)
    this.setData({
      studied: options.studied,
      total: options.total
    })
    this.startStudy()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onready')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onshow')
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