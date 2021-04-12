// pages/rank/rank.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    todaylist:[
      { url: '/images/dog.png', name: '名字', todayword: 50 },
      { url: '/images/dog.png', name: '名字', todayword: 50 },
      { url: '/images/dog.png', name: '名字', todayword: 50 }
    ],
    totallist: [
      { url: '/images/dog.png', name: '名字', totalword: 50 },
      { url: '/images/dog.png', name: '名字', totalword: 50 },
      { url: '/images/dog.png', name: '名字', totalword: 50 }
    ]
  },
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
    if (this.data.currentTab == 0) {
      this.getDayilyRank()
    } else {
      this.getTotalRank()
    }
  },
  bindChange(e){
    console.log(e)
      this.setData({
        currentTab:e.detail.current
      })
    if (e.detail.current == 0) {
      this.getDayilyRank()
    } else {
      this.getTotalRank()
    }
  },
  //获取总榜信息
  getTotalRank(){
    let that=this
    wx.cloud.callFunction({
      name:'queryAllUser',
      data:{
        rank: 'total_studied'
      },
      success:res=>{
        console.log(res)
        for (var i = 0; i < res.result.data.length;i++){
          if (res.result.data[i].openid==this.data.openid){
            console.log(i)
            this.setData({
              my: res.result.data[i],
              myIndex:i
            })
          }
        }
        that.setData({
          userList:res.result.data,
          no1: res.result.data[0],
          no2: res.result.data[1],
          no3:res.result.data[2],
          others: res.result.data.slice(3, res.result.data.length+1)
        })
      },
      fail:console.error
    })
  },
  //获取日榜信息
  getDayilyRank() {
    let that = this
    wx.cloud.callFunction({
      name: 'queryAllUser',
      data: {
        rank: 'studyDays'
      },
      success: res => {
        console.log(res)
        for (var i = 0; i < res.result.data.length; i++) {
          if (res.result.data[i].openid == this.data.openid) {
            console.log(i)
            this.setData({
              my: res.result.data[i],
              myIndex: i
            })
          }
        }
        that.setData({
          userList: res.result.data,
          no1: res.result.data[0],
          no2: res.result.data[1],
          no3: res.result.data[2],
          others: res.result.data.slice(3, res.result.data.length + 1)
        })
      },
      fail: console.error
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDayilyRank()
    this.setData({
      openid:app.globalData.openid
    })
  },
})