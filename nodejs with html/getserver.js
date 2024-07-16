const http = require('http');
const url = require('url');
const querystring = require('querystring');

function calculateArea(base, height) 
{
    if (isNaN(base) || isNaN(height) || base <= 0 || height <= 0) 
    {
        return null;
    }
    return 0.5 * base * height;
}

function handleRequest(req, res) 
{
    var path = url.parse(req.url).pathname;
    console.log('Request for ' + path + ' received.');

    if (path === '/calculate') 
    {
        var query = url.parse(req.url).query;
        var base = parseFloat(querystring.parse(query).base);
        var height = parseFloat(querystring.parse(query).height);
        var area = calculateArea(base, height);

        if (area !== null) 
        {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write('The area of the triangle is ' + area);
        } 
        else 
        {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.write('Please provide valid base and height values.');
        }
        res.end();
    } 
    else 
    {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('Not Found');
        res.end();
    }
}

http.createServer(handleRequest).listen(5000);
console.log('Server has started on port 5000');
