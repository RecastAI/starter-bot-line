import express from 'express'
import bodyParser from 'body-parser'
import handleMessage from './bot.js'
/*
* Creaction of the server
*/

const app = express()
app.set('port', process.env.PORT || 8080)
app.use(bodyParser.json())


// /* if you like to test your webhook  use the funciton  */
// app.post('/webhook', (req, res) => {
//   res.status(200).send(req.query['hub.challenge'])
// })

app.post('/webhook', (req, res) => {
  const events = req.body.events
  events.forEach(event => handleMessage(event))
  res.status(200)
})

app.listen(app.get('port'), () => {
  console.log('Our bot is running on port', app.get('port'))
})
