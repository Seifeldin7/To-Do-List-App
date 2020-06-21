const express = require('express');
const http = require('http');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

//middleware used to parse incoming request and add it to req as req.body
const bodyParser = require('body-parser');
const todoRouter = require('./routes/todoRouter');
const userRouter = require("./routes/userRouter");

const hostname = 'localhost';
const port = process.env.PORT || 3000;

const app = express();
app.use(cors())
const db = require('./config/keys').mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// any request sent to /dishes will be handled by dishRouter
app.use('/api/todos', todoRouter);
app.use("/api/user", userRouter);

// serve static files (html) from public folder (dirname is root)
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    // normal req and res
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html')
});

const server = http.createServer(app);

server.listen(port, hostname, () =>{
    console.log(`server running at http://${hostname}:${port}`);
})