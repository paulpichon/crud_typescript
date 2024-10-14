// Variable sde entorno
require('dotenv').config();
// import Server
import { Server } from "./src/models/server";

// Puerto(s)
const puertos = Number(process.env.PORT) || 5000;

// Server
const server = new Server({
    port: puertos
});
// llamr la funcion para empezar el server
server.listen();