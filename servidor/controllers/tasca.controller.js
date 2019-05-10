const Tasca = require('../models/tasca'); 

const tascaCtrl = {};

tascaCtrl.getAll = async (req, res) => {

    const tasques = await Tasca.find({usuari: req.user.sub, acabada: false});

    res.status(200).send(tasques);
};

tascaCtrl.unaTasca = async (req, res) => {
    const idTasca = req.params.id;

    const tasques = await Tasca.find({usuari: req.user.sub, acabada: false, _id: idTasca});

    res.status(200).send(tasques);
};
tascaCtrl.novaTasca = (req, res) => {
    console.log(req.body);
    const tasca = new Tasca({
        nom: req.body.nom,
        contingut: req.body.contingut,
        usuari: req.user.sub
    })

    tasca.save((err) => {
        if(err) res.status(500).send({message: `s'ha produït un error al guardar la tasca: ${err}`});
    
        res.status(200).send({message: "ok"});
    });
}

tascaCtrl.esborrarTasca = async (req, res) => {
    const idTasca = req.params.id;
    await Tasca.findByIdAndRemove(idTasca, (err) => {
        if(err) res.status(404).send(err);
    })

    res.status(200).send({message: "s'ha esborrat correctament"});
}

module.exports = tascaCtrl;