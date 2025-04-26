const mongoose = require("mongoose");

async function DbConnection(url) {
    return mongoose.connect(`${url}/URL`)
    .then(()=>console.log("MongoDb Connected"))
    .catch((err)=>console.log("MonoDB Error: "+err));    
}

module.exports = DbConnection;