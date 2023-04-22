import express from 'express';
import productsRouter from './routes/products.js'
import cartRouter from './routes/cart.js';
import handlebars  from 'express-handlebars';
import __dirname from './utils.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`));



app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views` ); 
app.set('view engine',`handlebars` ); 


app.use('/',productsRouter)
app.use('/api/carts',cartRouter)



app.listen(8080,()=>{
    console.log("Express Server listening on PORT 8080")
})