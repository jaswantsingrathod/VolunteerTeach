import mongoose from "mongoose";

async function configureDb() {
    try{
        await mongoose.connect(process.env.DB_URL)
        console.log("connected to db")
    }catch(err){
        console.log(err.message)
    }
}

export default configureDb;