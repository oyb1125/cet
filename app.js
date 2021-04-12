//app.js
App({
  onLaunch: function () {
    wx.cloud.init({
      env: 'cet-cloud-18hwz'
    })
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log('getSetting',res)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              this.globalData.checkLogin=true
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    this.getOpenid()
    
  },
  globalData: {
    userInfo: null,
    openid: '',
    isFirst:true,
    checkLogin:false
  },

  getOpenid(){
    let that=this
    wx.cloud.callFunction({
      name: 'getOpenid',
      success: res => {
        console.log(res.result.openid)
        this.globalData.openid=res.result.openid

        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res)
        }
      },
      fail: console.error
    })
  }
})