/**
This is the entry point of the application. Express happens here.
**/
import express from 'express';
const app = express();
const port = 3000;

// formats the body of the request into what we want (JSON)
import parser from 'body-parser'

import Utterances from './utterances.js'


// this is the list of key/value pairs that comes from the utterances.ts file and the utterances.list file
const utterances = new Utterances().utterances;


// response from server (node js) that means Starlite doesn't know how to respond
// this variable also appears in the speech.js file
const notACommand = "?notacommand?";

app.use(parser.json())
app.use(express.static(__dirname + '/../public')) // because it is run from inside the `build/` directory
console.log(`DIRNAME: ${__dirname}`)

app.get('/', (req, res) => res.send('This is root. You should probably not get this b/c I set up a public dir.'))

app.get('/cool', (req , res) => {
  res.send('Cool!')
})

app.post('/submitCommand', (req, res) => {
  const request = req.body
  console.log(request)
  console.log(request.text)

  let text: string = request.text;

  let response = getResponse(text);

  res.send(response)
})

app.listen(port, () => console.log(`Starlite JS listening on port ${port}!`))
/***
IDEA:

the backend selects which function to use from the actions.js stuff and then sends the function back to the client for
execution.


**/


// magic happens here
function getResponse(text: string) {
  let response: {
    sayText: string,
    action: string
  }


}
