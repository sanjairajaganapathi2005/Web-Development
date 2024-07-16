const http = require('http');
const url = require('url');
const querystring = require('querystring');

function calculateArea(l, b) 
{
    if (isNaN(b) || isNaN(l) || b <= 0 || l <= 0)
    {
        return null;
    }
    return (2*(l+b));
}

function handleRequest(req, res) 
{
    var path = url.parse(req.url).pathname;
    console.log('Request for ' + path + ' received.');

    if (path === '/calculate' && req.method === 'POST') 
    {
        var body = '';
        req.on('data', function(chunk) 
        {
            body += chunk.toString();
        });
        req.on('end', function() 
        {
            var bodyParams = querystring.parse(body);
            var l = parseFloat(bodyParams.l);
            var b = parseFloat(bodyParams.b);
            var p = calculateArea(l, b);

            if (p !== null) 
                {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.write('The Perimeter of Rectangle is ' + p);
            } 
            else 
            {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.write('Please provide valid length and breadth values.');
            }
            res.end();
        });
    } 
    else 
    {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('Not Found');
        res.end();
    }
}

http.createServer(handleRequest).listen(8000)
console.log('Server has started on port 8000')
