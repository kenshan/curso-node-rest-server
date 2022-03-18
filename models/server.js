const express = require('express');
const cors= require('cors');
const dbConnection = require('../database/config');




class Server {

    constructor(){
        this.app = express();
        this.port=process.env.PORT;
        

        //conectar a la base de datos
        this.conectarDb();

        //middlewares
        this.middleware();


        //rutas de la app
        this.routes();
        

    }

    async conectarDb(){
        await dbConnection();
    }
    
    //middleware
    middleware(){
    //directorio publico
        this.app.use( express.static( 'public' ) );

        //paseo y lectura

        this.app.use(express.json());

        this.app.use( cors() );
    }
    

    //rutas de mi app
    routes(){
        this.app.use('/api/users', require('../routes/user'));
    
    
    };

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`)
        });
    }

}

module.exports = Server;