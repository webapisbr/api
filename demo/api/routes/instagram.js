const express = require('express');
const router = express.Router();

const puppeteer = require("puppeteer-core");
const chromium = require("chrome-aws-lambda");

router.get('', async function(req, res, next) {
    //const id = req.params.id;
    //if(id){
        const items = await run();
        res.statusCode = 200;
        res.json({results: items});
    /*}else{
        res.statusCode = 400;
        res.json({message: "Atributo inválido ou ausente"});
    }*/
});

async function run(){
    const browser = await puppeteer.launch({args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: true,
        ignoreHTTPSErrors: true,ignoreDefaultArgs: ['--disable-extensions'],});
    const page = await browser.newPage();
    await page.goto(`https://instagram.com/riofest.com.br`);
    items = await page.title();
    await browser.close();
    return items;
}

module.exports = router;