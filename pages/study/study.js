// pages/study/study.js
const innerAudioContext = wx.createInnerAudioContext()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studyList: [],
    definList: [],
    definites:[],
    ok: true,
    currentIndex:0,
    collect:false,
    studied:0
  },
  //收藏
  collect(e){
    console.log(e)
    if(this.data.collect){
      wx.cloud.callFunction({
        name: 'delete',
        // 传给云函数的参数
        data: {
          word: e.currentTarget.dataset.items.word,
          openid: app.globalData.openid
        },
        success: res => {
          console.log(res)
          wx.showToast({
            title: '取消收藏',
          })
        },
        fail: console.error
      })
      this.setData({ collect:false })
    }else{
      wx.cloud.callFunction({
        name: 'insert',
        // 传给云函数的参数
        data: {
          db: 'user_collect',
          word:e.currentTarget.dataset.items.word,
          openid:app.globalData.openid
        },
        success: res => {
          console.log(res)
          wx.showToast({
            title: '已收藏',
          })
        },
        fail: console.error
      })
      this.setData({ collect: true })
    }
    
  },
  //错题
  wrong(e) {
    console.log(e)
    wx.cloud.callFunction({
      name: 'insert',
      // 传给云函数的参数
      data: {
        db: 'user_wrong',
        word: e.target.dataset.items.word,
        openid: app.globalData.openid
      },
      success: res => {
        console.log(res)
      },
      fail: console.error
    })
  },
  //禁止滑动
  catchTouchMove:function(res){
    return false
  },
  //学习完成提示
  showTip() {
    wx.showModal({
      content: '恭喜你完成了今天的学习',
      showCancel: false,
      confirmText: '去打卡',
      success:res=> {
        this.updateWord()
        if (res.confirm) {
          wx.redirectTo({
            url: '/pages/index/rili/rili'
          })
        }
      }
    })
  },
  //更新已背单词
  updateWord(){
    var studied= parseInt(this.data.studied)+parseInt(this.data.today_word)
    var total = parseInt(this.data.total_studied) + parseInt(this.data.today_word)
    if(this.data.grade=='cet4'){
      wx.cloud.callFunction({
        name: 'updateWord4',
        data: {
          openid: app.globalData.openid,
          studied: studied,
          total:total
        },
        success: res => {
          console.log(res)
        },
        fail: console.error
      })
    }else{
      wx.cloud.callFunction({
        name: 'updateWord6',
        data: {
          openid: app.globalData.openid,
          studied: studied,
          total: total
        },
        success: res => {
          console.log(res)
          console.log('total',total)
        },
        fail: console.error
      })
    }
   
  },
  //打乱数组
  shuffle(def, num) {
    var correctAns = def[num]
    var answers = []
    while (true) {
      var index = Math.floor(Math.random() * def.length)
      if(index==num){

      } else if (!answers.includes(def[index])){
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
  //答题事件
  select(res) {
    console.log(res)
    if (res.target.dataset.item == res.target.dataset.items.definition) {
      var id = res.target.dataset.id
      let that = this
      var definites = this.data.definites
      var definiList = this.shuffle(definites, id + 1)
      this.setData({
        ok: false,
        text_color: 'green',
        isRight: '✓',
        definList: definiList,
        collect:false
      })
      setTimeout(function () {
        if (id == that.data.studyList.length - 1) {
          that.showTip()
        } else {
          that.setData({
            ok: true,
            currentIndex: id + 1,

          })
          that.autoPlay(id+1)
        }
      }, 300)
    } else {
      this.wrong(res)
      this.setData({
        ok: false,
        text_color: 'red',
        isRight: '✘'
      })
      wx.vibrateLong()
    }
  },
  //开始学习
  startStudy: function () {
    
      let that = this
      var num = parseInt(that.data.today_word)
      var studied = parseInt(that.data.studied)
      wx.cloud.callFunction({
        name: 'query',
        // 传给云函数的参数
        data: {
          jihe: that.data.grade,
          study: num,
          studied: studied
        },
        success: res => {
          console.log(res.result.list)
          var definites1 = []
          for (var i = 0; i < res.result.list.length; i++) {
            definites1.push(res.result.list[i].definition)
          }
          this.setData({
            studyList: res.result.list,
            definites: definites1,
            definList: this.shuffle(definites1, 0)
          })
          that.autoPlay(0)
        },
        fail: console.error
      })
    
      
  },
  //自动播放音频
  autoPlay(n){
    innerAudioContext.autoplay = true
    innerAudioContext.src = this.data.studyList[n].audio
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
  },
  //播放音频
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
    this.setData({
      today_word:options.today_word,
      studied:options.studied,
      total:options.total,
      total_studied:options.total_studied
    })
    console.log(options.studied)
    if(options.grade=='四级'){
      this.setData({ grade: 'cet4' })
    }else{
      this.setData({ grade: 'cet6' })
    }
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