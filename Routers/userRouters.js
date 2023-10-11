const mongoose = require('mongoose')
const {Users} = require('../Models/user')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

require('dotenv/config')
 function authJwt(token){
    
    return jwtVerify.id;
 }


router.get('/', async (req,res)=>{

    const token = req.headers.authorization.split(' ')[1];
    const authenticated = jwt.verify(token,process.env.secret);
    console.log(authenticated)

    const userList = await Users.find().select("-passwordHash");
    if (!userList) {
        return res.status(404).json({success : false , message : 'Users not found'})
    }
    res.send(userList)
})

router.get('/:id',async (req,res)=>{
    const oneUser = await Users.findById(req.params.id).select("-passwordHash")
    if (!oneUser) {
        return res.status(404).json({success : false, message : "User not found"})        
    }
    res.send(oneUser)
})

router.post('/', async (req, res)=>{
    let newUser = new Users(
        {
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password,10),
        street: req.body.street,
        apartment: req.body.apartment,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        isAdmin: req.body.isAdmin
    }
    )

    const addedUSer = await Users.create(newUser)

    if (!addedUSer) {
        return res.status(500).json({success : false , message : 'Users not Created'})
    } else {
        return res.status(200).json({success : true , message : 'Users created', NewUser : addedUSer})
    }
})


//User authentication
router.post('/login', async(req,res)=>{
    const user = await Users.findOne({email: req.body.email})
    const sceret = process.env.secret
    if (!user) {
        return res.status(404).send("Wrong email id")
    } 
     if(user && bcrypt.compareSync(req.body.password,user.passwordHash)){
        const token = jwt.sign(
            {
                userId : user.id,
                isAdmin : user.isAdmin
            },
            sceret,
            {expiresIn : '1h'}
        )
        return res.status(200).json({auth :"user authenticated",email : user.email, token: token})
    }else{
    res.status(404).send("Wrong password")
    }
})


module.exports = router;