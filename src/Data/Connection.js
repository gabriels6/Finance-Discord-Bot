const mongoose = require('mongoose');
require('dotenv').config({path:__dirname + '/../.env'});

const config = {
    url:'mongodb+srv://'+process.env.user+':'+process.env.pass+'@cluster-test.q4jsk.gcp.mongodb.net/'+process.env.database+'?retryWrites=true&w=majority'
}

module.exports = {

    connectDatabase(){

        mongoose.connect(config.url, {
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
    
    }

}