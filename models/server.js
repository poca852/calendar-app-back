const express = require("express");
const cors = require('cors');
const dbconnection = require("../database/config");

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            events: '/api/events',
            usuarios: '/api/usuarios'
        }

        this.dbConnect()

        this.middlewares();

        this.routes();
    }

    async dbConnect(){
        await dbconnection();
    }

    middlewares(){
        // cors
        this.app.use(cors());

        // parseo del body
        this.app.use(express.json());

        // carpeta publica
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.events, require('../routes/events'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('server on port')
        })
    }
}

module.exports = Server;