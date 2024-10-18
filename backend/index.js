const connecToMongo = require('./db');
const express = require('express')
var cors = require('cors')


connecToMongo();

const app = express()
const port = 5000

const corsOptions = {
  origin: 'https://inotebook-lyart.vercel.app', // Allow only requests from this origin
  methods: 'GET,POST,PATCH,PUT,DELETE', // Allow only these methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allow only these headers
};

app.use(cors(corsOptions))
app.use(express.json())

app.get("/", (req , res) => {
  res.json("hello");
})

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`iNoteBook backend listening on port http://localhost:${port}`)
})

