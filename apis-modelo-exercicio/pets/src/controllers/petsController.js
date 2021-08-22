const pets = require("../models/petsBd.js")


const createPet = (req, res) => {

    let { nomeFantasia, endereco, telefone, atende } = req.body;
   
    let createPets = {
        "id": Math.random().toString(32).substr(2),
        nomeFantasia, 
        endereco, 
        telefone, 
        atende

    }

            let newPets = new pets(createPets)
            newPets.save(function (err){
                if (err){
                    res.status(500).send({ "message": err.message })
                }else{
                    pets.updateOne({$set: {createPets}}),
                    res.status(201).send({"message": 'Pet Shop incluído com sucesso!'})
                }
            })
        
};

const deletePet = (req, res) => {

    const petId = req.params.id
    pets.findOne({id: petId}, function (err, pet){
        if (err) {
            res.status(500).send({"message": err.message})
        }else{
            if (pet){
                pets.deleteOne({id: petId }, function (err){
                    if (err){
                        res.status(500).send({
                            "message": err.message,
                            status: "FAIL"
                        })
                    } else {
                        res.status(200).send({
                            "message": 'Pet Shop removido com sucesso',
                            status: "SUCCESS"
                        })
                    }
                })
            }else {
                res.status(404).send({ "message": 'Não há Pet Shop com esse id para ser removido.' })
            }
        }

    })

};

const updatePet = (req, res) => {
    const petId = req.params.id;
    pets.findOne({ id: petId }, function (err, petFound) {
        if (err) {
            res.status(500).send({ "message": err.message })
        } else {
            if (petFound) {
                pets.updateOne({ id: petId }, { $set: req.body }, function (err) {
                    if (err) {
                        res.status(500).send({ "message": err.message })
                    } else {
                        res.status(200).send({ "message": 'Pet Shop alterado com sucesso' })
                    }
                })
            } else {
                res.status(404).send({ "message": 'Não há registro para ser atualizado com esse id' });
            }
        }
    })
};

const updateName = (req, res) => {
    const petId = req.params.id;
    let newName = req.body.nomeFantasia;
    pets.findOne({ id: petId }, function (err, petFound) {
        if (err) {
            res.status(500).send({ "message": err.message })
        } else {
            if (petFound) {
                pets.updateOne({ id: petId }, { $set: { nomeFantasia: newName } }, function (err) {
                    if (err) {
                        res.status(500).send({ "message": err.message })
                    } else {
                        res.status(200).send({ "message": 'Nome do Pet Shop alterado com sucesso' })
                    }
                })
            } else {
                res.status(404).send({ "message": "Não há registro para ter o nome atualizado com esse id" });
            }
        }
    })

};

const getAllPets = (req, res) => {
    
    pets.find(function (err, petsFound) {
        if (err) {
            res.status(500).send({ "message": err.message })
        } else {
            if (petsFound && petsFound.length > 0) {
                res.status(200).send(petsFound);
            } else {
                res.status(204).send({"message": "Nenhum Pet Shop encontrado."});
            }
        }
    })
};

const getPetById = (req, res) => {
    const resquestId = req.params.id;
   
    pets.findOne({ id: resquestId }, function (err, petsFound) {
        if (err) {
            res.status(500).send({ "message": err.message })
        } else {
            if (petsFound) {
                res.status(200).send(petsFound.toJSON({ virtuals: true }));
            } else {
                res.status(204).send();
            }
        }
    })
};

module.exports = {
    createPet,
    deletePet,
    updatePet,
    updateName,
    getAllPets,
    getPetById
}