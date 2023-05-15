export default class ManagerDb {
    constructor(modelManager){
        console.log("working products with database")
        this.model = modelManager;
    }

    getAll = async () =>{
        const products = await this.model.find().lean();
        return products;
    }
    

    save = async (ele) => {
        const resultAdd = await this.model.create(ele);
        return resultAdd;
    }

    update = async (id,props) => {
        const resultUpdate = await this.model.updateOne({_id:id},{$set:props})
        return resultUpdate;
    }

    delete = async (id) => {
        const resultDelete = await this.model.deleteOne({_id:id})
        return resultDelete;
    }

}