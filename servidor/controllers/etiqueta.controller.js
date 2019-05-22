const Etiqueta = require('../models/etiqueta')

const etiquetaCtrl = {}

/** Retornar totes les etiquetes */
etiquetaCtrl.getAll = (req, res) => {
    const idUsuari = req.user.sub

    Etiqueta.find({}).populate('tasques','nom _id').where('usuari').equals(idUsuari)
    .exec((err, etiquetes) => {
        if(err) return req.status(500).send({message: `No s'han trobat etiquetes: ${err}`})

        res.status(200).send(etiquetes)
    });
}

/** Retornar una sola etiqueta */
etiquetaCtrl.unaEtiqueta = (req, res) => {
    const idUsuari = req.user.sub
    const idEtiqueta = req.params.idEtiqueta

    Etiqueta.findById(idEtiqueta).populate('tasques','nom _id').where('usuari').equals(idUsuari)
    .exec((err, etiqueta) => {
        if(err) return req.status(500).send({message: `Hi ha hagut un problema al fer la petició: ${err}`})
        else if(!etiqueta) req.status(404).send({message: `La etiqueta no existeix`})

        res.status(200).send(etiqueta)
    });
}

/** Crear una sola etiqueta */
etiquetaCtrl.novaEtiqueta = (req, res) => {
    const etiqueta = new Etiqueta({nom: req.body.nom})
    if(req.body.tasques) etiqueta.tasques = req.body.tasques

    etiqueta.save((err, novaEtiqueta) => {
        if(err) return res.status(500).send({message: `Hi ha hagut un problema al guardar l'etiqueta: ${err}`})

        res.status(200).send(novaEtiqueta)
    })
}

/** Actualitza la etiqueta */
etiquetaCtrl.actualitzarEtiqueta = async (req, res) => {
    const novaEtiqueta = req.body
    const idEtiqueta = req.params.idEtiqueta
    const idUsuari = req.user.sub

    await Etiqueta.findByIdAndUpdate(idEtiqueta, novaEtiqueta, (err) => {
        if(err) return res.status(500).send({message: `S'ha produït un error al actualitzar la etiqueta: ${err}`})
    })

    Etiqueta.find({}).populate('tasques','nom _id').where('usuari').equals(idUsuari).exec((err, etiquetes) => {
        if(err) return req.status(500).send({message: `No s'han trobat etiquetes: ${err}`})

        res.status(200).send(etiquetes)
    });
}

/** Esborrar una sola etiqueta */
etiquetaCtrl.esborrarEtiqueta = async (req, res) => {
    const idEtiqueta = req.params.idEtiqueta
    const idUsuari = req.user.sub

    console.log("ID ETIQUETA: "+idEtiqueta+"\n")

    await Etiqueta.findByIdAndRemove(idEtiqueta, (err) => {
        if(err) return res.status(500).send(`Hi ha hagut un error al eliminar l'etiqueta: ${err}`)
        console.log("dins")
    })
    console.log("segueix")
    
    Etiqueta.find({}).populate('tasques','nom _id').where('usuari').equals(idUsuari).exec((err, etiquetes) => {
        if(err) return req.status(500).send({message: `No s'han trobat etiquetes: ${err}`})

        res.status(200).send(etiquetes)
    });
}

module.exports = etiquetaCtrl;