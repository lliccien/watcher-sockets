'use strict';
const fs = require('fs');
const readline = require('readline');
const express = require("express");
const http = require("http");
const path = require('path');
const socketIo = require("socket.io");

const port = process.env.PORT || 4000;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);

const io = socketIo(server);

let interval;

io.on("connection", (socket) => {
    console.log("New client connected");
    if (interval) {
        clearInterval(interval);
    }
    fileRead(socket);
    fs.watch(filename, (eventType, filename) =>{
        fileRead(socket);
    });
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        clearInterval(interval);
    });
});

const filename = './valores.txt';

async function processLineByLine() {
    const fileStream = await fs.createReadStream(filename);

    return readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
}


const fileRead = socket => {
    let arr = [];
    processLineByLine().then(
        async (readFile) => {
            for await (const line of readFile) {
                arr.push(line.split(','));
            }
            // Emitting a new message. Will be consumed by the client
            socket.emit("FromAPI", arr);
        }
    );
}


server.listen(port, () => console.log(`Listening on port ${port}`));
























