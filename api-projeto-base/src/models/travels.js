const mongoose = require("mongoose");

//definição do template do documento, vai todas as chaves do json e seu respectivo tipo.
const travelsSchema = new mongoose.Schema({
    id:{type:String},
    durationPrediction:{type:String},
    stops:{type:String},
    derpature:{type:Object},
    destination:{type:Object},
    busInfos:{type:Object},
    driverInfos:{type:Object},
    passengersInfos: {type:Array},

},
{
    versionKey: false
});

//atributo usado apenas na API não irá alterar o banco de dados
travelsSchema.virtual('ticket').
    get( function() {
        return this.id + '-' + this.destination.local
    }).
    set( function(ticket) {
        // jIan-LdcKJa2hj2zJ1m_-Rio de Janeiro
        this.id = ticket.substr(0, ticket.indexOf('-')); // jIan-LdcKJa2hj2zJ1m_
        this.destination.local = ticket.substr(ticket.indexOf('-') + 1) // Rio de Janeiro
    });

const travels = mongoose.model('travels', travelsSchema);

module.exports = travels;
