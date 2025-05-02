const mongoose= require("mongoose");
const initdatas=require("./data.js");
const Listing  = require("../models/listing.js");


const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

main()
   .then(()=>{
    console.log("connected to DB");
   })
   .catch((err)=>{
    console.log(err);
   });



async function main(){
    await mongoose.connect(MONGO_URL);
}


const initDB = async () => {
    await Listing.deleteMany({});

    const updatedData = initdatas.data.map((obj) => ({
        ...obj,
        owner: '67f81eee27c9cea2df42d016',
    }));

    await Listing.insertMany(updatedData);
    console.log("Data was initialized");
};

initDB();
