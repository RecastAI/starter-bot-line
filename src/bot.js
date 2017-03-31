import recastai from 'recastai'
import config from './../config.js'
import creatMessage from './line.js'

const client = new recastai(config.recastToken)

function handleMessage(event) {
  const senderID = event.replyToken
  const userID = event.source.userId ? event.source.userId : event.source.roomId
  const messageText = event.message.text
  if (messageText) {
    client.request.converseText(messageText, { conversationToken: userID }).then((res) => {
      const reply = res.reply()               /* To get the first reply of your bot. */
      const replies = res.replies             /* An array of all your replies */
      const action = res.action               /* Get the object action. You can use 'action.done' to trigger a specification action when it's at true. */

      if (!reply) {
        creatMessage(senderID, ['i don\'t get it :('])
      } else {
        if (action && action.done === true) {
          console.log('action is done')
          // Use external services: use res.memory('notion') if you got a notion from this action
        }
        creatMessage(senderID, replies)
      }
    }).catch(err => {
      console.log(err)
    })
  }
}

module.exports = handleMessage
