// pages/wo/wo.js
const app = getApp()
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    save:true,
    isManage:false
  },
  wodeshoucang(){
    wx.navigateTo({
      url: '/pages/myCollect/myCollect',
    })
  },
  bangzhuyufankui(){
    wx.navigateTo({
      url: '/pages/wo/help/help',
    })
  },
  save(){
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
      this.setData({
        save: false
      })
      this.getId()
    }

    
  },
  getInput(e){
    console.log(e.detail.value)
    this.setData({
      id: e.detail.value
    })
  },
  getId(){
    wx.cloud.callFunction({
      name:'queryUser',
      data:{
        openid:app.globalData.openid
      },
      success:res=>{
        console.log(res)
        this.setData({
          value:res.result.list[0].cardNumber
        })
      },
      fail:console.error
    })
  },
  save_btn(){
    this.setData({
      save:true
    })
    let that=this
    wx.cloud.callFunction({
      name:'addId',
      data:{
        openid:app.globalData.openid,
        cardNumber:that.data.id
      },
      success:res=>{
        console.log(res)
        wx.showToast({
          title: '保存成功',
        })
      },
      fail:console.error
    })
    // db.collection('user').where({
    //     openid:app.globalData.openid
    //   }).update({
    //   data: {
    //     cardNumber: that.data.id
    //   },
    //   success: function (res) {
    //     console.log(res)
    //     wx.showToast({
    //       title: '保存成功',
    //     })
    //   }
    // })

  },
  geiwomenpingfen(){
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
      wx.navigateTo({
        url: '/pages/wo/pingfen/pingfen',
      })
    }

  },
  cuotiben(){
    wx.navigateTo({
      url: '/pages/myWrong/myWrong',
    })
  },
  //事件处理函数
  // bindViewTap: function () {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  onLoad: function () {
    var user=wx.getStorageSync('user');
    if(user&&user.nickName){
      this.setData({
        hasUserInfo:true,
        userInfo:user
      })
      app.globalData.userInfo=user
    }
    if(app.globalData.openid=='ovo8a44TnefmQwM3MMePuOWzY9Fg'){
      this.setData({
        isManage:true
      })
    }
  },
  getUserInfo: function (e) {
    wx.getUserProfile({
      desc:'用于完善用户资料',
      success:(res)=>{
        console.log("获取用户信息成功",res)
        wx.setStorageSync('user', res.userInfo)
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
      },
      fail:res=>{
        console.log("获取用户信息失败",res)
      }
    })
    var openid=app.globalData.openid
    //授权
    wx.requestSubscribeMessage({
      tmplIds: ['PJ9ab3wT1hU3yqbSeXSaLWcp_dOg6Wv75yQhyyOBjv8',
      'Xat1B7EKaYM9H9urI7fWeuYmu7-JUdbVPuz3fE6IXQ0',
      'erybtfU29vbWTQqhOIsaJchns7c6qqetiECyF4PN5Ks'],
      success(res){
        console.log('授权成功',res)
        wx.cloud.callFunction({
          name:'queryOpenid',
          data:{
            openid:openid
          },
          success:res=>{
            console.log("查询openID",res)
            if(res.result.list.length==0){
              wx.cloud.callFunction({
                name:'addAuthorizedUser',
                data:{
                  openid: openid,
                },
                success:res=>{
                  console.log("插入授权用户成功",res)
                },
                fail:console.error
              })
            }
          },
          fail:console.error
        })  
      },
      fail(res){
        console.log('授权失败',res)
      }
    })
    wx.showModal({
      title: '温馨提示',
      content: '初次使用请先调整计划再学习',
      showCancel: false,
      confirmText: '知道了',
      success(res) {
        if (res.confirm) {
          wx.switchTab({
            url: '/pages/wo/wo',
          })
        }
      }
    })
    wx.cloud.callFunction({
      name: 'queryUser',
      // 传给云函数的参数
      data: {
        openid: openid,
      },
      success: res => {
        console.log(res)
        //如果用户第一次登陆，则创建用户表和收藏表
        console.log(res.result.list.length)
        if(res.result.list.length==0){
          wx.cloud.callFunction({
            name:'addUser',
            data:{
              openid:openid,
              nickName:e.detail.userInfo.nickName,
              url:e.detail.userInfo.avatarUrl
            },
            success:res=>{
              console.log('addUser',res)
            },
            fail:console.error
          })
          wx.cloud.callFunction({
            name: 'addUserCollect',
            data: {
              openid: openid
            },
            success: res => {
              console.log('addUserCollect', res)
            },
            fail: console.error
          })
          wx.cloud.callFunction({
            name: 'addUserWrong',
            data: {
              openid: openid
            },
            success: res => {
              console.log('addUserWrong', res)
            },
            fail: console.error
          })
        }
      },
      fail: console.error
    })
  },
  sendMsg(){
    wx.navigateTo({
      url: '/pages/admin/sendMsg/sendMsg',
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