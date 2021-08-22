const mongoose = require("mongoose");

//definição do template do documento, vai todas as chaves do json e seu respectivo tipo.
const passengersSchema = new mongoose.Schema({
    id: {type:String},
    name: {type:String},
    email: {type:String},
    documentNumber: {type:String},
    travelId: {type:String}
},
{
    //gera por padrão uma versão para cada atualização do documento
    versionKey: false
});

const passengers = mongoose.model('passengers', passengersSchema);

module.exports = passengers