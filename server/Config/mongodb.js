const mongoose = require('mongoose');

const connet_DB = async(DB_URL)=>{
    try {
       const {connection}= await mongoose.connect(DB_URL);
       console.log(`Server DataBase is connected on ${connection.host}`)
    } catch (error) {
        console.log(`The Mongodb connection Error is - ${error}`);
    }
}

module.exports = connet_DB;