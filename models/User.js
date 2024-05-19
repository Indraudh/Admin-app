const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    
    username:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true
    },

    phonenumber:{
        type: String,
        required: true
    },

    DOB: {
        type: String,
        required: true
    },

    PAN:{
        type: String,
        required: true
    },

    country:{
        type: String,
        required: true
    },

    state:{
        type: String,
        required: true
    },

    city:{
        type: String,
        required: true
    },

    pincode:{
        type: String,
        required: true
    },

    address:{
        type: String,
        required: true
    },

});

const usermodel=mongoose.model('Clients',userSchema);

module.exports=usermodel;