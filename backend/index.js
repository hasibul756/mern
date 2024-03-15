import 'dotenv/config';
import express from 'express';

const app = express()

const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/data', (req, res)=> {
  const data = [
    {
      id:1,
      name:'Hasibul Alam'
    },
    {
      id:2,
      name:'Sahil Alam'
    },
    {
      id:3,
      name:'Iron Man'
    }
  ];
  res.send(data)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})