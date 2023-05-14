const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const testeRouter = require('./routes/teste');
const instagramRouter = require('./routes/instagram');

app.use('/teste', testeRouter);
app.use('/instagram', instagramRouter);

app.use(function(req, res, next) {
    res.statusCode = 404;
    res.json({message: 'Rota inválida'});
});

app.listen(process.env.PORT||3000);

exports.handler = app;
