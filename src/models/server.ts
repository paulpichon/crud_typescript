// Express
const express = require('express');
const app = express();
// Cors
import cors from 'cors';
// Conexion a la BD MongoDB
import { conexionBD } from '../database/config';

// options
interface Options {
    port: number;
}

export class Server {
    // App
    private app = express();
    // Port
    private port: number;
    // Usuarios Path
    private usuariosPath: string;
    // Auth Path
    private authPath: string;

    constructor( options: Options) {
        // desestructuramos de options
        const { port } = options;
        // port
        this.port = port;
        // Path de usuarios
        this.usuariosPath = '/api/usuarios';
        // Authentication
        this.authPath = '/api/auth';



        // conexion a la base de datos
        this.databaseConnection();
        // middlewares
        this.middlewares();
        // Routes
        this.routes();

    }
    // conexion a la base de datos
    async databaseConnection() {
        await conexionBD();
    }
    // middlewares
    middlewares() {
        // Cors
        this.app.use( cors() );
        // Leer y parsear el body
        this.app.use( express.json() );
        // Archivo publico
        this.app.use( express.static('src/public'));
    }
    // Metodos
    routes() {
        // Auth
        this.app.use(this.authPath, require('../routes/auth'));
        // Usuarios
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    // listen
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Escuchando el puerto numero: ${this.port}`);
        });
    }

}