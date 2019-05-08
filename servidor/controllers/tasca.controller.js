const tagCtrl = {};

tagCtrl.getAll = (req, res) => {

    res.json({
        message: req.payload
    });
};

module.exports = tagCtrl;