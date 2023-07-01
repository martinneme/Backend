import Router from './router.js';
import Products from "../dao/dbManagers/products.js";
import addProductValidator from "../middlewares/addProductValidator.js";
const productsManager = new Products();


export default class ProductsRouter extends Router {
    init() {
        this.get('/', ['USER','ADMIN'], async (req, res) => {
            const {limit, page,sort,title,price,category,status} = req.query;
            const query = {}
            
            if(title){
                query.title = title;
            }
            if(price){
                query.price = parseInt(price);
            }
            if(category){
                query.category = category;
            }
            if(status){
                query.status = status;
            }
            
                
                const products = await productsManager.getAll(limit,page,query,sort) ;
            
                products.user = req.user;
                res.render('home',{products})

        });

        this.get("/product/:id",['USER','ADMIN'], async (req, res) => {
            try{
                const id = req.params.id
        const products = await productsManager.findElementById(id);
            res.sendSuccess({status:'success',payload:products})
            }catch(error){
                res.sendClientError(error)
            }
            
        });   

 this.post("/", addProductValidator, async (req, res) => {
        try {
            const element = req.body;
            const products = await productsManager.save(element);
            if(products){
                res.sendSuccess("Producto Agregado!");
            }
        } catch (error) {
            res.sendClientError(error)
        }
    });

    this.put("/:id",async (req, res) => {
        try {
            const element = req.body;
            const id = req.params.id
            const products = await productsManager.update(id,element);
            res.sendSuccess({status:'success', payload: products});
        } catch (error) {
            res.sendClientError(error)
        }
    });


    this.delete("/:id",async (req, res) => {
        try {
            const id = req.params.id
            const products = await productsManager.delete(id);
            res.sendSuccess({status:'success', payload: products});
        } catch (error) {
            res.sendClientError(error)
        }
    });
    
    this.get("/realtimeproducts", async (req, res) => {
        res.render('realTimeProducts')
    });

    }

   
}