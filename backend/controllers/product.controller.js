import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts=async(req,res)=>{
    try{
        const products=await Product.find({});
        res.status(200).json({success:true,data:products});

    }catch(error)
    {
        console.log("Error in fetching products:",error.message);
        res.status(500).json({success:false, message:'Server Error'});
    }
}


export const createProducts=async(req,res)=>{
    const product=req.body;
    if(!product.name || !product.price || !product.image)
    {
        return res.status(400).json({success:false, message:'Please provide all fields'});
    }
    const newProduct= new Product(product);
    try{
        await newProduct.save();
        res.status(201).json({success:true, data:newProduct});

    }catch(error)
    {
        console.error('Error in create product:', error.message);
        res.status(500).json({success:false, message:'Server Error'});
    }
}

export const deleteProducts=async(req,res)=>{
    const {id} =req.params;
    try{
        const product=await Product.findByIdAndDelete(id);
        if(!product)
        {
            res.status(404).json({
                success: false,
                message: "Product not found or already deleted",
            })
        }
        res.status(200).json({success:true, message:'Product deleted successfully'});
    }catch (error) {
        // Handle any unexpected errors
        console.error('Error in deleting product:', error.message);
        res.status(500).json({
            success: false,
            message: "Server error",
            
        });
    }
}

export const updateProducts=async(req,res) =>{
    const product=req.body;
    const {id}=req.params;

    if(!product)
    {
        res.status(404).json({
            success: false,
            message: "Product not found"
             })};
    try{
        const updatedProduct=await Product.findByIdAndUpdate(id,product,{new:true});
        res.status(200).json({success:true, data:updatedProduct});
    }
    catch(error){
        console.error('Error in Updating Products',error.message);
        res.status(500).json({success:false, message:'Server Error'});
    }
}