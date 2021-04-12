// pages/search/search.js
const innerAudioContext = wx.createInnerAudioContext()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    value:"",
    hidden: true,
    historyList: [],
    listHide: true
  },
  cancel:function(){
    wx.navigateBack({
      url: '/pages/index/index'
    })
  },
  //事件处理函数
  onLoad: function (option) {

  },
  onShow: function () {
    const that = this
    wx.getStorage({
      key: 'historyList',
      success: function (res) {
        console.log('缓存获取成功')
        that.setData({
          historyList: res.data
        })
      },
      fail: function () {
        console.log('缓存获取失败')
      }
    })

  },
  //获取焦点时展示搜索记录
  historyList: function () {
    this.setData({
      hidden: true,
    })
  },
  //历史列表点击搜索方法
  historySearch: function (e) {
    console.log(e)
    const that = this
    const text = e.currentTarget.dataset.key
    console.log(text)
    that.setData({
      text: text
    }, () => {
      that.toSearch()
    })
  },
  //获取单词释义
  toSearch: function () {
    const word = this.data.text
    const that = this
    var util = require('../../../utils/util.js')
    var uuid=util.wxuuid()
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    console.log("当前时间戳为：" + timestamp);
    var sha256 = require('../../../utils/sha256.js');
    var sha256Sig = sha256.sha256_digest('4045fd974ac64c84'+word+uuid+timestamp+'WeR55TVMw6RdywUB3SdGWyZQyRq1WJL3')
    //直接入栈即可，使用let返回的是长度值报错
    that.data.historyList.unshift(word)
    console.log("word-->" + word)
    //扇贝API获取单词释义
    wx.request({
      url: 'https://openapi.youdao.com/api?q=' + word +'&from=en&to=zh-CHS&appKey=4045fd974ac64c84&salt='+uuid+'&sign='+sha256Sig+'&signType=v3&curtime='+timestamp+'&strict=true',
      data: {},
      method: 'GET',
      success: function (res) {
        console.log(res)
        console.log("单词释义-->" + res.data.basic.explains[0])
        that.setData({
          content: res.data,
          request:'SUCCESS',
          explainArray:res.data.basic.explains,
          hidden: false,
          historyList: that.data.historyList
        })
      },
      fail: function () {
        wx.showModal({
          title: '',
          request: '网络错误',
          showCancel: false,
          success: function (res) {

          }
        })
      }
    })
  },
  //播放音频
  playAudio: function () {
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.src = this.data.content.speakUrl
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
  //获取表单数据
  getText: function (e) {
    this.setData({
      text: e.detail.value,
      hidden: true
    })
  },
  //设置搜索缓存
  searchStorage: function () {
    const that = this
    console.log('退出页面')
    wx.setStorage({
      key: 'historyList',
      data: that.data.historyList,
      success: function () {
        console.log('缓存成功')
      }
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '单词搜索+搜索记录示例',
      path: 'pages/search/search',
      success: function (res) {
        wx.showToast({
          title: '分享成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  onHide: function () {
    this.searchStorage()
  },
  onUnload: function () {
    this.searchStorage()
  }
})