/*const express = require('express');
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

exports.handler = app;*/

// api/run.js
import edgeChromium from 'chrome-aws-lambda'

// Importing Puppeteer core as default otherwise
// it won't function correctly with "launch()"
import puppeteer from 'puppeteer-core'

// You may want to change this if you're developing
// on a platform different from macOS.
// See https://github.com/vercel/og-image for a more resilient
// system-agnostic options for Puppeteeer.
const LOCAL_CHROME_EXECUTABLE = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

export default async function (req, res) {
  // Edge executable will return an empty string locally.
  const executablePath = await edgeChromium.executablePath || LOCAL_CHROME_EXECUTABLE
  
  const browser = await puppeteer.launch({
    executablePath,
    args: edgeChromium.args,
    headless: false,
  })
  
  const page = await browser.newPage()
  await page.goto('https://google.com')
  
  //res.send('hello')


  let items = await page.title();
  await browser.close();

res.send(items)
}