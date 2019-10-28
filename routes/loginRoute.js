let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let User = require('./schemas/userSchema')
let bodyParser = require('body-parser')
const Cryptr = require('cryptr');
const cryptr = new Cryptr('seaBattleCrypte');
require('dotenv/config');

router.use("/", bodyParser.json())


//Setting routes
router.get('/', (req, res) => {
    res.render('./login.ejs', { err: false })
})

router.post('/', async (req, res) => {
    let nick = req.body.nickname
    let psswd = req.body.password
    let all_users = await User.find()
    let matching = false
    console.log(psswd)
    console.log("post zapros")
    all_users.forEach(obj => {
        if (nick == obj.nickname && psswd == cryptr.decrypt(obj.password)) {
            matching = true
        }

    });
    matching ? res.redirect('http://localhost:3000/') : res.redirect('http://localhost:3000/login?err=err')
    
})



//Connecting to DB
mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    () => { console.log('connected to DB') })

module.exports = router
