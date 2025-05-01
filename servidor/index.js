const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

app.get('/', (req, res) => {
    //Pedo enviar el archivo asi o con process.cwd() + ruta
    //res.sendFile(__dirname + '/index.html');

    res.sendFile(process.cwd() + '/cliente/index.html')
});

server.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000')
})

