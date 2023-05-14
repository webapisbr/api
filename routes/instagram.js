const express = require('express');
const router = express.Router();
var puppeteer = require("puppeteer");

router.get('/:id', async function(req, res, next) {
    const id = req.params.id;
    if(id){
        const items = await run(id);
        res.statusCode = 200;
        res.json({results: items});
    }else{
        res.statusCode = 400;
        res.json({message: "Atributo inválido ou ausente"});
    }
});

async function run(id){
    const browser = await puppeteer.launch({headless: 'new'});
    const page = await browser.newPage();
    await page.goto(`https://instagram.com/${id}`);
    await page.waitForTimeout(500);
    const items = await page.evaluate(() => {
        const nodeList = document.querySelectorAll('article img');
        const imgArray = [...nodeList];
        const list = imgArray.map(img => ({
            src: img.src
        }));
        return list;
    });
    await browser.close();
    return items;
}

module.exports = router;