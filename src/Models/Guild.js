const mongoose = require('mongoose');

const GuildSchema = new mongoose.Schema({
    Name:String,
    Budget:String,
    Expenses:[],
});

module.exports = mongoose.model('Guilds',GuildSchema);