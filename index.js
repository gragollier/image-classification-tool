const express = require('express');
const app = express();
const port = 8080;

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index', {title: "hello, world!"});
})


app.listen(port);