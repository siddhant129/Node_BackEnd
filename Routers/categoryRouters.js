const express = require('express');
const router = express.Router();
const {Category} = require('../Models/category')
const mongoose = require('mongoose')

router.get('/',async (req,res)=>{
    const allcategory = await Category.find()
    res.send(allcategory)
})
router.get('/:id',async (req,res)=>{
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(404).json({success: false,message : 'Category id not found'})
    }
    const oneCategory = await Category.findById(req.params.id)
    if (!oneCategory) {
        return res.status(400).json({success: false,Error : 'category not found'})
    } else {
        res.send(oneCategory)
    }
})

router.post('/',async (req,res)=>{
    let newCategory = new Category(
        {
            name : req.body.name,
            icon : req.body.icon,
            color : req.body.color
        }
        )
    const category = await Category.create(newCategory).catch(res.send("Category not created"))
    res.send(category)
    console.log(category)
})

router.delete('/:id',async (req,res)=>{
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(404).json({success: false,message : 'Category id not found'})
    }
    Category.findByIdAndRemove(req.params.id).then(category=>{
        if (category) {
            return res.status(200).json({success: true,message : 'Category deleted succesfully'})
        } else {
            return res.status(500).json({success: false,message : 'Category not deleted'})
        }
    }).catch(err=>{
        return res.status(400).json({success: false,Error : err})
    })
})

//put http reequest
router.put('/:id',async (req,res)=>{
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(404).json({success: false,message : 'Category id not found'})
    }
    const updatedCat = await Category.findByIdAndUpdate(req.params.id,
        {
            name : req.body.name,
            icon : req.body.icon,
            color : req.body.color
        },
        {new : true}
        )
        if (!updatedCat) {
            return res.status(400).json({success: false,Error : 'category not found'})
        } else {
            res.send(updatedCat)
        }
})

module.exports = router