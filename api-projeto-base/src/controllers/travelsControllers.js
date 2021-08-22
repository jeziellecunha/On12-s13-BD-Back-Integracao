const travels = require("../models/travels");
const { trace } = require("../routes/travelsRoutes");


const getAllTravels = (req, res) => {
    //Find sempre retorna uma lista
    travels.find( (err, travelsFound) => {
        if (err) {
            res.status(500).send({ message: err.message })
        }
        if (travelsFound && travelsFound.length > 0) {
            res.status(200).send(travelsFound)
        } else {
            res.status(204).send()
        }
    })
};

const getTravelById = (req, res) => {
    const resquestId = req.params.id;
    //FindOne retorna um unico documento
    travels.findOne({ id: resquestId }, function (err, travelFound) {
        if (err) {
            res.status(500).send({ message: err.message })
        }
        if (travelFound) {
            res.status(200).send(travelFound.toJSON({ virtuals: true }));
        } else {
            res.status(204).send();
        }
    })
};

const deleteById = (req, res) => {
    const travelId = req.params.id
    travels.findOne({id: travelId}, function (err, pet){
        if (err) {
            res.status(500).send({"message": err.message})
        }else{
            if (travel){
                travels.deleteOne({id: travalId }, function (err){
                    if (err){
                        res.status(500).send({
                            "message": err.message,
                            status: "FAIL"
                        })
                    } else {
                        res.status(200).send({
                            "message": 'Viagem removida com sucesso',
                            status: "SUCCESS"
                        })
                    }
                })
            }else {
                res.status(404).send({ "message": 'Não há viagem com esse id para ser removido.' })
            }
        }

    })
}

module.exports = {
    getAllTravels,
    getTravelById,
    deleteById
}