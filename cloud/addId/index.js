// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
exports.main = async (event, context) => {
  try {
    return await db.collection('user').where({
      openid: event.openid
    })
      .update({
        data: {
          cardNumber: event.cardNumber
        },
      })
  } catch (e) {
    console.error(e)
  }
}