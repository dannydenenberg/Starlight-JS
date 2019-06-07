import express from 'express';
const app = express();
const port = 3000;
import parser from 'body-parser'

import Utterances from './utterances.js'


const utterances = new Utterances();

// response from server (node js) that means Starlite doesn't know how to respond
// this variable also appears in the speech.js file
const notACommand = "?notacommand?";

app.use(parser.json())
app.use(express.static(__dirname + '/../public'))
console.log(`DIRNAME: ${__dirname}`)

app.get('/', (req, res) => res.send('This is root. You should probably not get this b/c I set up a public dir.'))

app.get('/cool', (req , res) => {
  res.send('Cool!')
})

app.post('/submitCommand', (req, res) => {
  const request = req.body
  console.log(request)
  console.log(request.text)

  let text = request.text;


  res.send({
    response: "Your response is this",
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
/***
IDEA:

the backend selects which function to use from the actions.js stuff and then sends the function back to the client for
execution.


**/

//
// function getAction(text: string) {
//   return actions["hey"]
// }
