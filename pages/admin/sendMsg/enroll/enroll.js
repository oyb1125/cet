// pages/admin/sendMsg/enroll/enroll.js
let title=''
let applyTime=''
let subject=''
let examTime=''
let users=[]
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },

  getTitle(e){
    title=e.detail.value
  },

  getApplyTime(e){
    applyTime=e.detail.value
  },

  getSubject(e){
    subject=e.detail.value
  },

  getExamTime(e){
    examTime=e.detail.value
  },

  //发送报名提醒
  sendMsg(){
    wx.cloud.callFunction({
      name:'queryAllOpenid',
      success:res=>{
        console.log("查询所有openID",res)
        users=res.result.data
        users.forEach(item=>{
          wx.cloud.callFunction({
            name:"sendMsg",
            data:{
              openid:item.openid,
              title:title,
              applyTime:applyTime,
              subject:subject,
              examTime:examTime
            }
          }).then(res=>{
            console.log("推送消息成功",res)
          }).catch(res=>{
            console.log("推送消息失败",res)
          })
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