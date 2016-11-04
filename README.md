# Tutorial integration Line to Recast.AI bot

* This is a small Tutorial to show you how to integrate Line to a Recast.AI bot
* If you have no idea of how to use Recast.AI I advise you to check this SDK first:  [Recast.AI-nodejs-SDK](https://github.com/RecastAI/SDK-NodeJs)

## Requirements
* Create an account on [Recast.AI](https://recast.ai/signup)
* Download Line on your phone
* configure your account on your phone

## Set up your Recast.AI account

##### Create your bot

* Log in to your Recast.AI account
* Create a new bot

##### Get your token

* In your profile, click your bot
* In the tab-menu, click on the the little screw
* Here is the `request access token` you will need to configure your bot!

## Set up your Line account

##### Set the Line-bot

* On your phone you need to set suscribe by email.
* Launch line click on the 3 dot.

[logo]: https://blog.recast.ai/wp-content/uploads/2016/08/HcqvGX.gif "Seeting"

![alt text][logo]

* click on the setting/account/inscription by email
* follow the few step
* follow the step of this 3 video
* [First video](https://www.youtube.com/watch?v=051jdF5_V-A)
* [Second video](https://www.youtube.com/watch?v=ZOvJU-UwI7Q)
* [Third video](https://www.youtube.com/watch?v=rD27Pd13b_Q)
* if you need help [Line doc](https://developers.line.me/messaging-api/getting-started)
## Start your bot in local

```bash
git clone https://github.com/RecastAI/bot-line.git
```

#### Ngrok

* Download the appropriate version of [Ngrok](https://ngrok.com/download).
* Open a new tab in your terminal:
```
./ngrok http 5000
```
* Copy past the ``` https://*******ngrok.io``` you get, you will need it for the next step.
* Leave your Ngrok serveur running.

##### Complete the config.js

* Copy your Recast.AI `Recsat.AI access token`
* Copy your Line token `Token of your BOt`

```vim config.js```
```javascript
const config = {}

config.LineToken = 'LINE_TOKEN'
config.recastToken = 'RECAST_TOKEN'
config.language = 'en'

module.exports = config
```

#### Config webhook

* I advise you to watch this [video](https://www.youtube.com/watch?v=IwgPBJ2FWO8) you don't need to do the IP part.
* url of your webhook: add the ngrok uri/webhook don't forget webhook if not it will not work ```https://fbc76100.ngrok.io/webhook```
[logo]: https://blog.recast.ai/wp-content/uploads/2016/08/HcqvGX.gif "dev"

![alt text][logo]
* the purple part is the QR code you can scan from your app to speak to your BOT after Launching it.
* the blue part your whebook url.
* the red part is your LINE_TOKEN
## Launching your Bot
```
npm install
npm start
```

### Your bot
* All you need for you bot is in the bot.js file. The call to Recast.AI is already done.
* ```client.textConverse(msg.text, { conversationToken: userID })``` To use this method you need to pass the user's input, and  a unique conversation token. This token can be the message.chatid of the line chat. This token will create for each users a specific conversation with your bot.
* ```res.reply()``` To get the first reply of your bot.
* ```res.replies``` To get an array of all your replies.
* ```res.action``` Get the object action. When an action is complete you will have the ```action.done = true ``` and you will be able to trigger a specific behavior.

```javascript
function handleMessage(event) {
  const senderID = event.replyToken
  const userID = event.source.userId ? event.source.userId : event.source.roomId
  const messageText = event.message.text
  if (messageText) {
    client.textConverse(messageText, { conversationToken: userID }).then((res) => {
      const reply = res.reply()               /* To get the first reply of your bot. */
      const replies = res.replies             /* An array of all your replies */
      const action = res.action               /* Get the object action. You can use 'action.done' to trigger a specification action when it's at true. */

      if (!reply) {
        creatMessage(senderID, 'i don\'t get it :(')
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
```

## Author

Henri Floren, henri.floren@recast.ai

You can follow us on Twitter at [@recastai](https://twitter.com/recastai) for updates and releases.

## License

Copyright (c) [2016] [Recast.AI](https://recast.ai)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
