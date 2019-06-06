const express = require('express');
const app = express();
const port = 3000;
const parser = require('body-parser');

app.use(parser.json());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/cool', function(req, res) {
  res.send('Cool!')
});

app.post('/submitCommand', (req, res) => {
  const request = req.body;
  console.log(request);
  console.log(request.text);
  res.send({
    response: "Your response is this."
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))