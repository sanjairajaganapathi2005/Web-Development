const http = require('http');
const url = require('url');

function calarea(base, height)
 {
    if (isNaN(base) || isNaN(height)) 
    {
        return null; 
    }
    if (base <= 0 || height <= 0) 
    {
        return null; 
    }
    return 0.5 * base * height;
}

const server = http.createServer(function(req, res)
{
    const queryObject = url.parse(req.url).query;
    const base = parseFloat(queryObject.base);
    const height = parseFloat(queryObject.height);

    const area = calarea(base, height);

    if (area !== null) 
    {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end("The area of the triangle is "+area);
    } 
    else 
    {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Please provide valid base and height values as query parameters.');
    }
});

server.listen(5000)
console.log("Server is running on port 5000");

//http://localhost:5000/?base=5&height=10

