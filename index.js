//Configuracion basica de express
const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors')
require('dotenv').config();
const path = require('path');


//Crear el servidor de express
const app = express();

//Base de datos
dbConnection()

//cors
app.use(cors())

//Directorio publico
app.use(express.static('public'))

//Lectura y parseo del body
app.use(express.json())

//Rutas
//TODO: auth //crear, login, renew
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

//Redirige al index.html
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./public", "index.html"));
  });

//Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`servidor corriendo en puerto ${process.env.PORT}`)
})




