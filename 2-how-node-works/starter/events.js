const EventEmmiter = require('events');
const http = require('http')

class Sales extends EventEmmiter{
    constructor(){
        super();
    }
}

const myEmmiter = new Sales; 

myEmmiter.on("newSale", () => {
    console.log ('There was a new sale!')
});

myEmmiter.on("newSale", () => {
    console.log ('Customer name : Ankiii')
});

myEmmiter.on("newSale", stock => {
    console.log(`There are ${stock} item chhe.`)
} )

myEmmiter.emit('newSale', 50);

/////////////////////////

const server = http.createServer();

server.on("request", (req, res) => {
    console.log("Request Received");
    console.log(req.url)
    res.end ('Request Received');
});

server.on("request", (req, res) => {
    console.log("Second Request Received");
});

server.on ('close', () => {
    console.log("Server close");
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Waiting for req...');
});