// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  return db.collection('user').add({
    data:{
      cet4_studied:0,
      cet6_studied:0,
      currentStudy:"",
      openid:event.openid,
      nickName:event.nickName,
      today_word:0,
      avatarUrl:event.url,
      total_studied:0,
      studyDays:0
    }
  })
}