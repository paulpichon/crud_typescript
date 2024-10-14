// Express
const express = require('express');
const app = express();
// Cors
import cors from 'cors';

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

    constructor( options: Options) {
        // desestructuramos de options
        const { port } = options;
        // port
        this.port = port;
        // Path de usuarios
        this.usuariosPath = '/api/usuarios';



        // middlewares
        this.middlewares();
        // Routes
        this.routes();

    }
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