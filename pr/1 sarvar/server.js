const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    let url = req.url;

    function serveFile(filename) {
        fs.readFile(filename, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Server Error');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    }

    switch (url) {
        case '/':
            serveFile('index.html');
            break;

        case '/Features':
            serveFile('Features.html');
            break;

        case '/contact':
            serveFile('contact.html');
            break;

        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
            break;
    }
});

server.listen(3000, err => {
    if (err) {
        console.log('Error starting server:', err);
    } else {
        console.log('Server is listening on port 3000');
    }
});
