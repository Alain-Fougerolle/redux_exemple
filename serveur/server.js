const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const app = express();

const port = process.env.PORT || 8080;

let serveur = http.createServer(app);

// Import Sockets //

module.exports.io = socketIO(serveur);
require('./socket.js');

// Lit le port //

serveur.listen(port, (err) => {
    if (err) throw new Error(err);
    console.log("Serveur en écoute sur le port = " + port);
});