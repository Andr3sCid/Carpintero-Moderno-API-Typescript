import mongoose from "mongoose";
import config from "../config/config";

mongoose.connect(config.DB.MONGO.URI).then(r => console.log("DB connected"),).catch(e => console.log(e));

const connection = mongoose.connection;

connection.once('open', ()=>{
    try{
        console.log("MongoDB connected");
    }catch(e){
        console.log("[ERROR] "+e);
    }
});

connection.on('error',err =>{
    console.log(err);
    process.exit(0);
});