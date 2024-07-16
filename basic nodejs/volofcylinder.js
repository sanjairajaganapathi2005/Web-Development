const http = require('http');
const url = require('url');

function calculateCylinderVolume(radius, height) 
{
    if (isNaN(radius) || isNaN(height)) 
    {
        return null; 
    }
    if (radius <= 0 || height <= 0) 
    {
        return null; 
    }
    const volume = Math.PI * Math.pow(radius, 2) * height;
    return volume;
}

const server = http.createServer(function(req, res) 
{
    const queryObject = url.parse(req.url, true).query;
    const radius = parseFloat(queryObject.radius);
    const height = parseFloat(queryObject.height);

    const volume = calculateCylinderVolume(radius, height);

    if (volume !== null) 
    {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end("The volume of the cylinder is "+volume);
    } 
    else 
    {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Please provide valid radius and height values as query parameters.');
    }
});

server.listen(3000)
console.log("Server is running on port 3000");

//http://localhost:3000/?radius=5&height=10
