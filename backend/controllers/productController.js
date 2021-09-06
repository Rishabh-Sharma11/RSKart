import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

//Access in the below description means - for some routes, we'll need a token, for instance, when
//you purchase a product, you need to be logged in. So you need to send a token to specific routes 
//and those will be private routes.

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public (This is a public route, meaning anyone can hit it)
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find();

    res.json(products)
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404)  //not found
        throw new Error('Product not found')
    }
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await product.remove()
        res.json({ message: 'Product removed' })
    } else {
        res.status(404)  //not found
        throw new Error('Product not found')
    }
})

export { getProducts, getProductById, deleteProduct }