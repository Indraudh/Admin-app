const express=require('express');
const User=require('../models/User');
const router=express.Router();

router.post('/register',async function(req,res){

    try {

        const newuser=new User(req.body);
        await newuser.save();
        res.send('Registered User Successfully!');
        
    } catch (error) {

        res.status(500).json(error);
        
    }

});

router.get('/users',async function(req,res){

    try {
        const user = await User.find();
        res.send(user);
    } catch (error) {
        res.status(600).json(error); 
    }

});

router.post("/delete-users", async function (req, res) {
    try {
      await User.findOneAndDelete({_id : req.body.userId})
      res.send("User deleted Successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  });

module.exports=router;