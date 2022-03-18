const { Schema,model } = require('mongoose');

const roleSchema = new Schema({
    role:{
        type:String,
        required:[true,"el role es necesario"]
    }
});



module.exports = model('Role',roleSchema);