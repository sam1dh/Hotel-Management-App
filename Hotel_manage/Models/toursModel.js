const mongoose = require('mongoose');
// use dotenv to read .env file
require('dotenv').config({ path: './.env' }); 
// console.log(process.env);  
const DB = process.env.DATABASE_URL;
// console.log(DB);
// connect mongoose to DB
mongoose.connect(DB).then(()=>{
    console.log('DB connection successful');
});

const tourschema = new mongoose.Schema({
    name : {
        type : String, 
        required : [true , 'A tour must have a name'],
        unique : true,
        trim : true,   
        maxlength : [40 , 'A tour name must have less or equal then 40 characters'],
        minlength : [10 , 'A tour name must have more or equal then 10 characters']    
    },
    rating : {
        type : Number,
        default : 4.5
    },
    price : {
        type : Number,
        required : [true , 'A tour must have a price']
    }
});
const TOUR = mongoose.model('TOUR',tourschema);
module.exports = TOUR;  