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
router.post('/', async (req, res) => {
    let nick = req.body.nickname
    let psswd = req.body.password
    let conf_psw = req.body.conf_password

    if (psswd != conf_psw) {
        res.send('Passwords dont match')
    }
    else {

        let user = new User({
            nickname: nick,
            password: cryptr.encrypt(psswd),
            wins: 0,
            fails: 0
        })
        try {
            let savedUser = await user.save()
            res.json(savedUser)
        } catch (err) {
            res.json({ message: err })
        }
    }
})
router.get('/', (req, res) => {
    res.render('./register.ejs')
})


//Checking nickname availability
router.post('/check', async(req, res) => {
    let all_users = await User.find();
    //console.log(all_users)
    let nickname = req.body.nickname;
    console.log('nick :' + nickname)
    let isTaken = false;
    all_users.forEach(obj => {
        if(obj.nickname == nickname) {
            isTaken = true
            //console.log("In loop: " + isTaken)
        }
    });
    res.send(isTaken)

})

//Connecting to DB
mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    () => { console.log('connected to DB') })

module.exports = router

// mongodb+srv://andrey:<password>@cluster0-3hawc.mongodb.net/test?retryWrites=true&w=majority