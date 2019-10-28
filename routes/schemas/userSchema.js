const mongoose = require('mongoose')

const userShema = mongoose.Schema({
    nickname: "",
    password: "",
    wins: 0,
    fails: 0
})

module.exports = mongoose.model("Users" , userShema)