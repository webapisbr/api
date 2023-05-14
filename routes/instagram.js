const express = require('express');
const router = express.Router();
var edgeChromium = require("chrome-aws-lambda");
var puppeteer = require("puppeteer-core");

router.get('', async function(req, res, next) {
    const items = await run(id);
    res.statusCode = 200;
    res.json({results: items});
});

async function run(){
    const LOCAL_CHROME_EXECUTABLE = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
    const executablePath = await edgeChromium.executablePath || LOCAL_CHROME_EXECUTABLE;
    const browser = await puppeteer.launch({
    executablePath,
    args: edgeChromium.args,
    headless: false,
  });
    const page = await browser.newPage();
    await page.goto('https://google.com');
    let items = await page.title();
  await browser.close();
    return items;
}

module.exports = router;
