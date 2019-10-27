const mongoose = require('mongoose');

const PlayersSchema = mongoose.Schema({
    nickname: {
        type: String,
        required: true;
    },
    score: {
        type: Number,
        required: true;
    }
})


module.exports = mongoose = mongoose.model('players', PlayersSchema);