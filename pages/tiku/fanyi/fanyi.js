// pages/tiku/fanyi/fanyi.js
const db=wx.cloud.database().collection('fanyi')
const dbu=wx.cloud.database().collection('fanyi_user')
var choosed=false
Page({

  /**
   * 页面的初始数据
   */
  data: {
    choosed:false,
    list:[],
    wode: '',
    imgData:[]
  },
  cankaodaan:function(){
    this.setData({
      choosed: true
    })
  },
  touchmove:function(){
    this.setData({
      choosed: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.cloud.callFunction({
      name:'getOpenid'
    }).then(res=>{
      that.setData({
        openid:res.result.openid
      })
    })
    var openid = that.data.openid
    that.setData({
      type: options.type
    })
    var cet=options.type
    db.where({
        CET:cet
      }).get({ 
      success: function (res) { 
        that.setData({ 
          list: res.data 
        })
      } 
    })
    dbu.where({
      CET:cet,
      _openid:openid,
      date:'2019-12-卷一'
    }).get({
      success:function(res){
        that.setData({
          imgData: res.data
        })
      }
    })
  },
  daanchange:function(){
    var that=this
    if(that.data.choosed){
      that.setData({
        choosed:false
      })
    }else{
      that.setData({
        choosed:true
      })
    }
  },

  uploadPhoto(e) { // 拍摄或从相册选取上传
    let that = this;
    wx.chooseImage({
     count: 9 - that.data.imgData.length, // 默认最多上传9张
     sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
     success(res) {
      let tempFilePaths = res.tempFilePaths; // 返回选定照片的本地路径列表 
      that.upload(that, tempFilePaths);
     }
    })
   },
   upload(page, path) { // 上传图片
    let that = this;
    wx.showToast({ icon: "loading", title: "正在上传……" });
    for (var i=0; i<path.length; i++) {
     wx.cloud.uploadFile({
      url: '上传图片接口url', //后端接口
      cloudPath:'用户上传/翻译/'+new Date().getTime()+'.png',
      filePath: path[i],
      // header: app.globalData.header,
      success(res) {
       if (res.statusCode != 200) {
        wx.showModal({
         title: '提示', 
         content: '第' + i +'张图片上传失败',
         showCancel: false
        });
        return;
       } else {
        console.log('上传成功！')
        dbu.add({
          data:{
            CET:"CET4",
            date:"",
            fileCloudPath:res.fileID
          }
        }).then(rs=>{
          console.log(rs)
        })
       }
      },
      fail(e) {
       wx.showModal({
       title: '提示', 
       content: '第' + i +'张图片上传失败', 
       showCancel: false
       });
      },
      complete() {
       wx.hideToast(); //隐藏Toast
      }
     })
    }
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