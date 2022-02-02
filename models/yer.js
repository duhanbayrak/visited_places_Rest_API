const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');

const dbURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kaf2p.mongodb.net/rest_api_project_1?retryWrites=true&w=majority`;

mongoose.connect(dbURL, { useNewUrlParser: true , useUnifiedTopology: true , ssl: true})
    .then((result) => {
        console.log("Bağlantı Kuruldu");
    }).catch((err) => {
        console.log("hata")
        console.log(err);
    });

mongoose.Promise = Promise;

var yerSchema = new mongoose.Schema({
    isim:{
        type:String,
        required: 'Yer isimi boş olamaz',
    },
    ziyaret:{
        type: Boolean,
        default: false
    },
    olusturulmaTarihi: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Yer', yerSchema);