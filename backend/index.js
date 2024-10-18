const connecToMongo = require('./db');
const express = require('express')
var cors = require('cors')


connecToMongo();

const app = express()
const port = 5000
app.use(cors(
  {
    origin: [""],
    methods: ["POST", "GET", "DELETE", "PATCH", "PUT"],
    credentials: true
  }
))
app.use(express.json())

app.get("/", (req , res) => {
  res.json("hello");
})

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`iNoteBook backend listening on port http://localhost:${port}`)
})

