const Tasca = require('../models/tasca');
const moment = require('moment'); 

const tascaCtrl = {};

/** Retornar totes les tasques */
tascaCtrl.getAll = (req, res) => {

    Tasca.find({usuari: req.user.sub, acabada: false}).populate('etiquetes').exec((err, tasques) => {
        if(err) return res.status(404).send({message: `No s'ha trobat l'ususari: ${err}`})

        res.status(200).send(tasques);
    });
};

/** Retornar una sola tasca */
tascaCtrl.unaTasca = (req, res) => {
    const idTasca = req.params.idTasca;

    Tasca.findOne({usuari: req.user.sub, acabada: false, _id: idTasca}).populate('etiquetes').exec((err, tasca) => {
        if(err) return res.status(500).send({message: `Hi ha hagut un problema al fer la petició: ${err}`}) 
        else if(!tasca) return req.status(404).send({message: `La Tasca no existeix`}) 

        res.status(200).send(tasca) 
    });

};

/** Crear una sola tasca */
tascaCtrl.novaTasca = (req, res) => {
    const tasca = new Tasca({
        nom: req.body.nom,
        contingut: req.body.contingut,
        usuari: req.user.sub
    })
    if(req.body.alarma != undefined) tasca.alarma = req.body.alarma
    if(req.body.etiquetes != undefined || req.body.etiquetes != []) tasca.etiquetes = req.body.etiquetes

    tasca.save((err) => {
        if(err) return res.status(500).send({message: `s'ha produït un error al guardar la tasca: ${err}`});
    
        res.status(200).send(tasca);
    });
}

/** Actualitza la tasca */
tascaCtrl.actualitzarTasca = (req, res) => {
    const idTasca = req.params.idTasca
    const novaTasca = req.body

    Tasca.findByIdAndUpdate(idTasca, novaTasca, (err, tascaActualitzada) => {
        if(err) return res.status(500).send({message: `Error al actualitzar la tasca: ${err}`})

        res.status(200).send(tascaActualitzada)
    })
}

/** Esborrar una sola tasca */
tascaCtrl.esborrarTasca = async (req, res) => {
    const idTasca = req.params.idTasca;
    Tasca.findByIdAndRemove(idTasca, (err) => {
        if(err) return res.status(500).send({message: `Error al trobar i borrar la tasca: ${err}`});
        
        res.status(200).send({message: "S'ha eliminat correctament"});
    })

}

/** Retornar les tasques abans d'una data */
tascaCtrl.tasquesAbansData = (req, res) => {
    const data = new Date();
    switch(req.body.data){
        case 'avui'   : data=moment().unix() ;break;
        case 'setmana': data=moment().add(7, 'days').unix() ;break;
        default: data=req.body.data ;break; 
    }

    if(!data) return res.status(400).send({message: 'Valor enviat incorrecte'})

    Tasca.find({usuari: req.user.sub, acabada: false}).where('alarma').lt(data).populate('etiquetes').exec((err, tasques) => {
        if(err) return res.status(404).send({message: `No s'ha trobat l'ususari: ${err}`})

        res.status(200).send(tasques);
    });
}

module.exports = tascaCtrl;