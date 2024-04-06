const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')
const JWT_SECRET = 'Sudhanshuisagood$boy'


//ROUTE 1:  create a user
router.post('/createuser',[
    body('name', 'Enter a Valid name').isLength({min: 3}),
    body('email', 'Enter a Valid email').isEmail(),
    body('password', 'Enter a Valid Password').isLength({min: 5}),
    ] , async(req,res)=>{
    let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success, errors: errors.array() });
    }

    try{

    let user =  await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({success, error: "Sorry a user with email already exists"})
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
    })
    
    const data = {
        user:{
            id: user.id
        }
    }
    const authtoken = await jwt.sign(data, JWT_SECRET);
    success= true;
    res.json({success , authtoken})
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error")
        
    }
})

//ROUTE 2:  Authenticate the user
router.post('/login',[
    body('email', 'Enter a Valid email').isEmail(),
    body('password', 'Password can not be blank').exists(),
    ] , async(req,res)=>{
        let success = false;
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array() });
        }

        const {email, password}= req.body;
        try{
            let user = await User.findOne({email});
            if(!user){
                success = false;
                return res.status(400).json({error: "please try to login with a perfect correct credentials"});
            }

            const passwordCompare = await bcrypt.compare(password, user.password);
            if(!passwordCompare){
                success = false;
                return res.status(400).json({ error: "please try to login with a perfect correct credentials"});
            }

            const data = {
                user:{
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            success= true;
            res.json({success, authtoken})


        } catch (error){
            console.log(error.message);
            res.status(500).send("Internal Server Error")
        }

})

//ROUTE 3:  get loggedin user details
router.post('/getuser', fetchuser, async(req,res)=>{
try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user)
} catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error")
}
})
module.exports = router;