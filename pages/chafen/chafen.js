// pages/chafen/chafen.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result:false
  },
  ID(e){
    console.log(e.detail.value)
    this.setData({
      ID:e.detail.value
    })
  },
  name(e){
    console.log(e.detail.value)
    this.setData({
      name: e.detail.value
    })
    this.getYanzhengma()
  },
  CAPT(e){
    console.log(e)
    this.setData({
      CAPT: e.detail.value
    })
  },
  
  submit(e){
    var that=this
    if(that.data.ID==null){
      wx.showToast({
        icon: 'none',
        title: '请输入准考证号！!',
      })
    }else if(that.data.ID.length!=15){
      wx.showToast({
        icon:'none',
        title: '准考证号无效!',
      })
    }else if(that.data.name.length<1){
      wx.showToast({
        icon: 'none',
        title: '名字不能小于一个字符!',
      })
    } else if (that.data.CAPT.length < 1) {
      wx.showToast({
        icon: 'none',
        title: '请输入验证码!',
      })
    }else{
      this.search()
    }
  },
  //360650192207505
  getYanzhengma(){
    let that=this
    wx.request({
      url: 'https://www.yyqblog.com/api/v1/cet/captcha?zkz=' + that.data.ID + '&name=' + that.data.name + '&token=' +'v0WcBSZonUaCuPpI9N1QhDxF',
      data: {},
      method: 'GET',
      success: function (res) {
        console.log(res)
        if(res.data.code==-1){
          wx.showToast({
            icon: 'none',
            title: '请输入正确的准考证号和姓名!',
          })
        }
        that.setData({
          
          url: res.data.captcha_url
        })
      },
      fail: function () {
        wx.showModal({
          title: '',
          content: '网络错误',
          showCancel: false,
          success: function (res) {

          }
        })
      }
    })
  },
  search() {
    let that = this
    wx.request({
      url: 'https://www.yyqblog.com/api/v1/cet/query',
      data: {
        zkz: that.data.ID,
        name: that.data.name,
        captcha: that.data.CAPT,
        token: 'v0WcBSZonUaCuPpI9N1QhDxF'   
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log('search',res)
        if(res.data.code==-1){
          wx.showToast({
            icon: 'none',
            title: '验证码错误!',
          })
        }else{
          that.setData({
            result: true,
            socre: parseInt( res.data.data.score),
            listen:res.data.data.listen,
            read:res.data.data.read,
            write:res.data.data.write
          })
        }
        
      },
      fail: function () {
        wx.showModal({
          title: '',
          content: '网络错误',
          showCancel: false,
          success: function (res) {

          }
        })
      }
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