const yer = require('../models/yer');

const   express     = require('express'),
        router      = express.Router(),
        Yer         = require('../models/yer');



//DB'de olan büütn yerleri JSON olarak gönder.

router.get('/',(req,res) => {

    Yer.find()
    .then((yerlerDB) => {
        res.json(yerlerDB)
    })
    .catch((err) => {
        console.log(err);
        res.send(err);
    })
});

router.post('/',(req,res) => {
    console.log(req.body);
    Yer.create(req.body)
    .then((yeniYer) => {
        res.status(201).json(yeniYer)
    })
    .catch((err) => {
        console.log(err);
        res.send(err);
    })
})

// SHOW ROUTE ==> Özel olarak seçilmiş datanın detaylı bilgisini gösteren route

router.get('/:yerID',(req,res) => {

    Yer.findById(req.params.yerID)
    .then((bulunanYemek) => {
        res.json(bulunanYemek);
    })
    .catch((err) => {
        console.log(err);
    })
})

//UPDATE ROUTE

router.put('/:yerID', (req,res) => {

    Yer.findByIdAndUpdate({_id: req.params.yerID}, req.body, {new:true})
    .then((yer) => {
        res.json(yer);
    })
    .catch((err) => {
        console.log(err);
    })
    
});

//DELETE ROUTE

router.delete('/:yerID', (req,res) => {

    Yer.remove({_id: req.params.yerID})
    .then(() => {
        res.json('Silindi...');
    })
    .catch((err) => {
        console.log(err);
    })
    
});




module.exports = router;