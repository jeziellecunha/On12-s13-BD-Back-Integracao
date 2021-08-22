
const travels = require("../models/travels")
const passengers = require("../models/passengers")

const getAllPassengers = (req, res) => {
    res.status(200).send(passengers);
};
//pegar versão correta de createPassenger
const createPassenger = (req, res) => {
    let {
        name,
        email,
        documentNumber
    } = req.body;

    let requiredId = req.params.id;

    let passenger = {
        "id": Math.random().toString(32).substr(2),
        name,
        email,
        documentNumber,
        travelId: requiredId
    }

    const travelRequired = travels.find(t => t.id == requiredId); // achando a viagem solicitada na requisição

    travels.forEach((travel) => {
        let sameId = travel === travelRequired;
        // 
        if (sameId) {
            // 
            travel.passengersInfos.push(passenger); // adicionando um passageiro à viagem solicitada
        };
    });

    passengers.push(passenger) // adicionando passageiro na lista de passageiros do sistema
    fs.writeFile("./src/models/passengers.json", JSON.stringify(passengers), 'utf8', () => { })
    fs.writeFile("./src/models/travels.json", JSON.stringify(travels), 'utf8', function (err) {
        if (err) {
            res.status(500).send({ message: err }); //responder com o erro
        } else {
            console.log("Passageiro adicionado com sucesso!");
            res.status(200).send({
                "message": "Passageiro adicionado com sucesso!",
                travelRequired
            });
        };
    });
};

// atualizar o passageiro
const replacePassenger = (req, res) => {
    const requiredId = req.params.id;
    passengers.findOne({ id: requiredId }, function (err, passengerFound) {
        if (err) {
            res.status(500).send({ message: err.message })
        }
        if (passengerFound) {
            passengers.updateOne({ id: requiredId }, { $set: req.body }, function (err) {
                if (err) {
                    res.status(500).send({ message: err.message })
                }
                res.status(200).send({ message: "Registro alterado com sucesso" })
            })
        } else {
            res.status(404).send({ message: "Não há registro para ser atualizado com esse id" });
        }
    })
};
    // atualizar apenas o nome do passageiro
const updateName = (req, res) => {
    const requiredId = req.params.id;
    let newName = req.body.name;
    passengers.findOne({ id: requiredId }, function (err, passengerFound) {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            if (passengerFound) {
                passengers.updateOne({ id: requiredId }, { $set: { name: newName } }, function (err) {
                    if (err) {
                        res.status(500).send({ message: err.message })
                    }
                    res.status(200).send({ message: "Nome alterado com sucesso" })
                })
            } else {
                res.status(404).send({ message: "Não há registro para ter o nome atualizado com esse id" });
            }
        }
    })
}
//deletar passageiro
const deletePassenger = (req, res) => {
    const requiredId = req.params.id;
    passengers.findOne({ id: requiredId }, function (err, passenger) {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            if (passenger) {
                //deleteMany remove mais de um registro
                //deleteOne remove apenas um registro
                passengers.deleteOne({ id: requiredId }, function (err) {
                    if (err) {
                        res.status(500).send({
                            message: err.message,
                            status: "FAIL"
                        })
                    }
                    res.status(200).send({
                        message: 'Passageiro removido com sucesso',
                        status: "SUCCESS"
                    })
                })
            } else {
                res.status(404).send({ message: 'Não há passageiro para ser removido com esse id' })
            }
        }
    })
};

module.exports = {
    getAllPassengers,
    createPassenger,
    replacePassenger,
    updateName,
    deletePassenger
}