const passport = require("passport");
const mongoose = require("mongoose");
const Tag = require('../models/tag');
const Homework = require('../models/homework');

const tagCtrl = {};

tagCtrl.getAll = (req, res) => {

    res.json({
        message: req.payload
    });
};

module.exports = tagCtrl;