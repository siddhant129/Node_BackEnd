const express = require('express')
const router = express.Router()
const {Products} = require('../Models/product')
const mongoose = require('mongoose')
const {User} = require('../Models/user')

router.get('/',async (req, res)=>{
    //to get products of particular categories we can use queries
    let filter = {}
    if (req.query.category) {
        //we will pass value seperated by comma(',')
        //If we declare filter here we will not be able to use outside the if condition
        filter = {category : req.query.category.split(',')
    }} 
    
    const allProducts = await Products.find(filter).populate('category') 
    res.send(allProducts)
  
})

router.get('/:id',async (req, res)=>{
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(404).json({success: false,message : 'Product id not found'})
    }
    const oneProduct = await Products.findById(req.params.id).populate('category') 
    res.send(oneProduct)
})

router.post('/',async (req,res)=>{
    // newImg = []
    // newImg.push(req.body.images)
    const newProduct = new Products({
        name : req.body.name,
        description : req.body.description,
        richDescription : req.body.richDescription,
        image : req.body.image,
        brand : req.body.brand,
        price : req.body.price,
        category : req.body.category,
        countInStock : req.body.countInStock,
        rating : req.body.rating,
        isFeatured : req.body.isFeatured,
        dateCreated : req.body.dateCreated
    })

    const productCreated = await Products.create(newProduct).catch(err=>{res.status(500).json({success: false, message : 'New product not created',error : err})})
    if (productCreated) {
        res.status(200).json({success: true, message : 'New product created successfully', product : productCreated})
    }
})

router.delete('/:id',async (req,res)=>{
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(404).json({success: false,message : 'Product id not found'})
    }
    Products.findByIdAndRemove(req.params.id).then(res.send('Product deleted successfully'))
})

router.put('/:id',async (req,res)=>{
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(404).json({success: false,message : 'Product id not found'})
    }
    const updatedProd = await Products.findByIdAndUpdate(req.params.id,{
        name : req.body.name,
        description : req.body.description,
        richDescription : req.body.richDescription,
        image : req.body.image,
        images : [req.body.images],
        brand : req.body.brand,
        price : req.body.price,
        category : req.body.category,
        countInStock : req.body.countInStock,
        rating : req.body.rating,
        isFeatured : req.body.isFeatured,
        dateCreated : req.body.dateCreated
    },
    {new :true})
    res.send(updatedProd)
})

//Featured products

router.get('/get/featured/:count',async (req,res)=>{
    const count = req.params.count ? req.params.count : 0
    const featuredProducts = await Products.find({isFeatured : true}).limit(+count)
    if (!featuredProducts) {
        return res.status(404).json({success: false,message : 'Featured products not found'})
    }
    res.send(featuredProducts)
})

module.exports = router