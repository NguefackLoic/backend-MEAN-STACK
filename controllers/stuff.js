const Thing = require('../models/thing');
const fs =  require('fs');

exports.createThing = (req, res) => {
    const thingObject = JSON.parse(req.body.thing);
    delete thingObject._id;
    delete thingObject._userId;
    const thing = new Thing({
        ...req.body
    });
    thing.save()
        .then(() => res.status(201).json({message: 'Objet enregistré'}))
        .catch(error => res.status(400).json({ error }));
};

exports.modifyThing =  (req, res) => {
    Thing.updateOne({ _id: req.params.id}, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'objet modifié'}))
        .catch(error => res.status(400).json({ error }))
};

exports.deleteThing = (req, res) => {
    Thing.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'objet supprimé'}))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneThing = (req, res) => {
    Thing.findOne({_id: req.params.id}) //oubien Thing.findById(req.params.id)
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
};

exports.getAllThings = (req, res) => {
    Thing.find()
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(400).json({ error }));
};