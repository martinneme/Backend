import express from 'express';
import FileManager from './model/productsManager.js'

const app = express();

const productsManager = new FileManager('./db/products.txt')

app.get('/products',async (req,res)=>{
    const limit = parseInt(req.query.limit);
    const products = await productsManager.getsProducts()
    res.send(limit ? products.slice(0,limit) : products)
})

app.get('/products/:pid',async (req,res)=>{
    const pid = parseInt(req.params.pid);
    const product = await productsManager.getProductById(pid)
    res.send(product);
})

app.listen(3000,()=>{
    console.log("Express Server listening on PORT 3000")
})