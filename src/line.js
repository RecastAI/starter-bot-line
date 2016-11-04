import request from 'request'
import config from './../config.js'

/*
*  Send the messages
*/

function sendMessage(messageData) {
  request({
    uri: 'https://api.line.me/v2/bot/message/reply',
    headers: { Authorization : `Bearer ${config.LineToken}` },
    method: 'POST',
    json: messageData,
  }, (err, res) => {
    if (!err && res.statusCode === 200) {
      console.log('All good job is done')
    } else {
      console.log(err)
    }
  })
}



/*
*  Format the messages
*/
function creatMessage(senderID, replies) {
  const messageData = {
    replyToken: senderID,
    messages: [],
  }

  replies.forEach(rep => messageData.messages.push({ type: 'text', text: rep }))
  sendMessage(messageData)
}

module.exports = creatMessage
