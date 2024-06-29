const Flower = require('../models/flowerModel');

exports.getAllFlowers = async(req,res)=>{
    try{
        const flowers = await Flower.find({});
        res.json(flowers);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

exports.getFlowerById = async(req,res)=>{
    try{
        const flower = await Flower.findById(req.params.id);
        if(flower){
            res.json(flower);
        }
        else{
            res.status(404).json({message: 'Flower not found'});
        }
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}