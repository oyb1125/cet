var cet4_word = 2694
var cet6_word = 2083
const app = getApp()
Page({
  data: {
    multiArray: [
      ['四级', '六级'],
      [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200]
    ],
    grade: '四级',
    finish_days: 0,
    today_word: 0
  },
  kuaisufuxi() {
    if (this.data.studied == 0) {
      wx.showModal({
        title: '温馨提示',
        content: '请先进行学习',
      })
    } else {
      wx.navigateTo({
        url: '/pages/review/review?grade=' + this.data.grade + '&studied=' + this.data.studied + '&total=' + this.data.total,
      })
    }
  },
  getrili: function (e) {
    wx.navigateTo({
      url: '/pages/index/rili/rili',
    })
  },
  getrank() {
    wx.navigateTo({
      url: '/pages/rank/rank',
    })
  },
  kaishixuexi: function (e) {
    let that = this
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
    } else if (this.data.today_word == 0) {
      wx.showModal({
        title: '温馨提示',
        content: '请先设置计划',
        showCancel: true,
        confirmText: '确定'
      })
      this.animation.scale(1.5).step()
      this.animation.scale(1).step()
      this.setData({ animation: this.animation.export() })
    } else {
      wx.navigateTo({
        url: '/pages/study/study?today_word=' + that.data.today_word + '&grade=' + that.data.grade + '&studied=' + that.data.studied + '&total=' + that.data.total + '&total_studied=' + that.data.total_studied,
      })
    }

  },
  tingyinbianyi: function () {
    if (this.data.studied == 0) {
      wx.showModal({
        title: '温馨提示',
        content: '请先进行学习',
      })
    } else {
      let that = this
      wx.navigateTo({
        url: "/pages/hearSound/hearSound?grade=" + that.data.grade + '&studied=' + this.data.studied + '&total=' + this.data.total,
      })
    }
  },
  zhongwenxuanci: function () {
    if (this.data.studied == 0) {
      wx.showModal({
        title: '温馨提示',
        content: '请先进行学习',
      })
    } else {
      wx.navigateTo({
        url: "/pages/slectWord/slectWord?grade=" + this.data.grade + '&studied=' + this.data.studied + '&total=' + this.data.total,
      })
    }
  },
  selectDef: function () {
    if (this.data.studied == 0) {
      wx.showModal({
        title: '温馨提示',
        content: '请先进行学习',
      })
    } else {
      wx.navigateTo({
        url: "/pages/selectDef/selectDef?grade=" + this.data.grade + "&studied=" + this.data.studied + "&total=" + this.data.total,
      })
    }
  },
  bindMultiPickerChange: function (e) {
    let arrayIndex = e.detail.value; //获得选项的数组下标
    let array = this.data.multiArray; //获得选项数组
    let value = new Array(); //声明一个空数组，用于存放最后选择的值
    for (let i = 0; i < arrayIndex.length; i++) {
      let k = arrayIndex[i]; //第i个数组的元素下标
      let v = array[i][k]; //获得第i个数组的元素值
      value.push(v); //往数组中追加新元素
    }
    console.log(value)
    if (value[0] == '四级') {
      var day = Math.ceil((cet4_word - this.data.studied) / value[1])
      var total = cet4_word
    } else {
      var day = Math.ceil((cet6_word - this.data.studied) / value[1])
      var total = cet6_word
    }
    this.setData({
      today_word: value[1],
      finish_days: day,
      grade: value[0],
      total: total,
      percentage: Math.ceil(this.data.studied / total)
    })
    this.updateTodayWord()
    this.updateGrade()
    this.getStudiedWord()

  },
  yingwenxuanyi() {
    wx.navigateTo({
      url: '/pages/selectDefin/selectDefin',
    })
  },
  //更新数据库中的今日单词
  updateTodayWord() {
    let that = this
    wx.cloud.callFunction({
      name: 'updateTodayWord',
      data: {
        openid: app.globalData.openid,
        today_word: that.data.today_word
      },
      success: res => {
        console.log(res)
      },
      fail: console.error
    })
  },
  getStudiedWord() {
    var openid = app.globalData.openid
    console.log(openid)
    wx.cloud.callFunction({
      name: 'queryUser',
      // 传给云函数的参数
      data: {
        openid: openid,
      },
      success: res => {
        console.log('getStudied', res)
        var list = res.result.list[0]
        if (list.currentStudy == '四级') {
          var total = cet4_word
          this.setData({
            studied: list.cet4_studied,
            total_studied: list.total_studied
          })
        } else {
          var total = cet6_word
          this.setData({
            studied: list.cet6_studied,
            total_studied: list.total_studied
          })
        }
      },
      fail: console.error
    })
  },
  //获取用户已背单词  //获取用户今日单词和词库
  getStudied() {
    var openid = app.globalData.openid
    console.log(openid)
    wx.cloud.callFunction({
      name: 'queryUser',
      // 传给云函数的参数
      data: {
        openid: openid,
      },
      success: res => {
        console.log('getStudied', res)
        var list = res.result.list[0]
        if (list.currentStudy == '四级') {
          var total = cet4_word
          this.setData({
            studied: list.cet4_studied,
            total_studied: list.total_studied
          })
        } else {
          var total = cet6_word
          this.setData({
            studied: list.cet6_studied,
            total_studied: list.total_studied
          })
        }
        this.setData({
          today_word: list.today_word,
          finish_days: Math.ceil((cet4_word - this.data.studied) / list.today_word),
          grade: list.currentStudy,
          total: total,
          percentage: Math.ceil(this.data.studied / total)
        })
      },
      fail: console.error
    })
  },
  //更新用户背的词库
  updateGrade() {
    var grade = this.data.grade
    wx.cloud.callFunction({
      name: 'updateGrade',
      data: {
        openid: app.globalData.openid,
        currentStudy: grade
      },
      success: res => {
        console.log('updateGrade', res)
      },
      fail: console.error
    })
  },
  onLoad: function (options) {
    wx.stopPullDownRefresh()
    if (app.globalData.checkLogin) {
      this.getStudied()
    } else {
      app.userInfoReadyCallback = res => {

        this.getStudied()
      }
    }
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
      },
    })

  },
  onPullDownRefresh: function () {
    this.onLoad(); //重新加载onLoad()
  },
  onReady: function () {
    this.animation = wx.createAnimation({
      duration: 300
    })
  }
})