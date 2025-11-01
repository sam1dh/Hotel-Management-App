const fs = require('fs');
const Tour = require('../Models/toursModel');
exports.getAllTours = async (req, res) => {
    try{
    const tour = await Tour.find();
    res.status(200).json({
        status:"success",
        results:tour.length,
        data:{
            tour
        }
    })
    }catch(err){
        res.status(404).json({
            status:"Failed",
            message: err.message
        })
    }
};

exports.getTour = async (req, res) => {
    try{
    const tour =  await Tour.findById(req.params.id);
    // Tour.findOne({ _id: req.params.id })
    res.status(200).json({
        status:"success",
        data:{
            tour
        }
    })
    }catch(err){
        res.status(404).json({
            status:"Failed",
            message: err.message
        })
    }

};

exports.createTour = async (req, res) => {
    try {
       const newtour = await Tour.create(req.body);
      res.status(200).json({
        status:"success",
        data:{
            tour:newtour
        }
    })
    }
    catch(err){
        res.status(404).json({
            status:"Failed",
            message: err.message
        })
    }
   
};

exports.updateTour = (req, res) => {
    try{  
    const tour =  Tour.findByIdAndUpdate(req.params.id,req.body,{
      new:true,runValidators:true
    });
    res.status(200).json({
        status:"success", 
        data:{
            tour
        }    
    });
    }catch(err){      
        res.status(404).json({  
            status:"Failed",
            message: err.message
        })
    }
};

exports.deleteTour = async (req, res) => {
		try{
    await Tour.deletebyIdAndUpdate(req.params.id)
		
			 res.status(204).json({
        status:"success",
        data:{
            tour:Tour
        }
    })
		}
		catch(err){
		   res.status(404).json({
            status:"Failed",
            message: err.message
        })
		}
};
