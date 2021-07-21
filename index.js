const fs = require('fs');
const http = require('http');
const url = require('url');
// const txtIn = fs.readFileSync('./txt/input.txt','utf-8');
// console.log(txtIn);
// const txtOut = `This is what we know about avacado:  ${txtIn}.\Created on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt',txtOut);
// console.log('File Written');

// fs.readFile(`${__dirname}/txt/start.txt`, 'utf-8', (err, data) => {
//     fs.readFile(`${__dirname}/txt/${data}.txt`, 'utf-8', (err, data1) => {
//         console.log(data1);
//     })
// })
const updateEachCard = (tempCard, product) => {
    let output = tempCard.replace(/{%PRODUCT_NAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return output;
};
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8')
const tempCards = fs.readFileSync(`${__dirname}/templates/template-cards.html`, 'utf-8')
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);
    const pathName = req.url;

    //overview page
    if (pathname === '/' || pathname === '/overview') {
        const cardsHTML = dataObj.map(el => updateEachCard(tempCards, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHTML);

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(output);
        //product page
    } else if (pathname === '/product') {
        const product = dataObj[query.id];
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const output = updateEachCard(tempProduct, product);
        res.end(output);

        //API
    } else if (pathname === '/api') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(data)
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html'
        })
        res.end('<h1>page not found & this is added in the sample code branch</h1>')
    }
});

server.listen('8000', '127.0.0.1', () => {
    console.log('listening to port 8000');
})