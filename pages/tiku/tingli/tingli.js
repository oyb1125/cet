// pages/tiku/tingli/tingli.js
const innerAudioContext = wx.createInnerAudioContext();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isplay:false,
    ispause:false,
    duration:0,
    current:0
  },
  //播放
  play: function (e) {
    console.log(e.currentTarget.dataset.id)
    this.setData({
      id: e.currentTarget.dataset.id
    })
    innerAudioContext.src = "cloud://cet-cloud-18hwz.6365-cet-cloud-18hwz-1301709814/听力/"+this.data.type+"/"+this.data.id+".mp3";
    innerAudioContext.play();
    console.log(this.data.type);
    this.setData({ 
      isplay: true,
      duration: innerAudioContext.duration,
      current: innerAudioContext.currentTime,
      per:innerAudioContext.duration*1000/100
    });
  },
  pause:function(){
    if(this.data.ispause){
      innerAudioContext.play();
      this.setData({
        ispause:false
      })
    }else{
      innerAudioContext.pause();
      this.setData({
        ispause: true
      })
    }
  },
  // 停止
  stop: function () {
    innerAudioContext.stop();
    this.setData({ isplay: false });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    that.setData({
      type:options.type
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
    innerAudioContext.stop();
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