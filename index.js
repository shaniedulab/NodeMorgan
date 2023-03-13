const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const app = express();
const port=5000

const accessLogStream = fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'});

morgan.token('token',(req,res) => {
    return req.headers['token']
})

// app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :date[web] :token', {stream:accessLogStream}))

app.get('/abc', (req, res) => {
    res.send('hello world');
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});