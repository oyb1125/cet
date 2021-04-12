// pages/admin/sendMsg/scoreQuery/scoreQuery.js\let title=''
let examTime=''
let examType=''
let state=''
let users=[]
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  getExamType(e){
    examType=e.detail.value
  },

  getState(e){
    state=e.detail.value
  },
  getExamTime(e){
    examTime=e.detail.value
  },
    //发送成绩查询提醒
    sendMsg3(){
      wx.cloud.callFunction({
        name:'queryAllOpenid',
        success:res=>{
          console.log("查询所有openID",res)
          users=res.result.data
          users.forEach(item=>{
            wx.cloud.callFunction({
              name:"sendMsg3",
              data:{
                openid:item.openid,
                examType:examType,
                examTime:examTime,
                state:state
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