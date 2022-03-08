const express = require('express');
const cors= require('cors');




class Server {

    constructor(){
        this.app = express();
        this.port=process.env.PORT;
        

        this.middleware();

        this.routes();
        

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