import express from 'express';
import mongoose from 'mongoose';
import Product from '../models/product.model.js';
import { createProducts, deleteProducts, getProducts,  updateProducts } from '../controllers/product.controller.js';

const router=express.Router();

router.get('/',getProducts);

router.post ("/",createProducts);


router.delete("/:id",deleteProducts);

router.put('/:id', updateProducts);

export default router;
