// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {

  return cloud.database().collection(event.jihe)
    .aggregate()
    .sort({
      _id: -1
    })
    .skip(event.unstudied)
    .sample({
      size: event.study
    })
    .end()  //获取完成
}