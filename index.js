const fs = require('fs');
const http = require('http');
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
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const pathName = req.url;
    if (pathName === '/') {
        res.end('This is initial page');
    } else if (pathName === '/product') {
        res.end('this is product')
    } else if (pathName === '/api') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(data)
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html'
        })
        res.end('<h1>page not found</h1>')
    }
});

server.listen('8000', '127.0.0.1', () => {
    console.log('listening to port 8000');
})