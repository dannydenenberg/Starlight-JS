import express from 'express';
const app = express();
const port = 3000;
import parser from 'body-parser'


app.use(parser.json())
app.use(express.static(__dirname + '/../public'))
console.log(`DIRNAME: ${__dirname}`)

app.get('/', (req, res) => res.send('This is root. You should probably not get this b/c I set up a public dir.'))

app.get('/cool', function(req, res) {
  res.send('Cool!')
})

app.post('/submitCommand', (req, res) => {
  const request = req.body
  console.log(request)
  console.log(request.text)
  res.send({
    response: "Your response is this",
    // action: "asdfa"
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
