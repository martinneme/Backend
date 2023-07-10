import config from "../config/config.js";

let Products;
const persistence = config.persistence;

switch(persistence) {
    case 'MONGO':
        console.log('Trabajando con MongoDB');
        const mongoose = await import("mongoose");
        await mongoose.connect(config.mongoUrl);
        const { default: MongoProducts } = await import('../dao/dbManagers/products.js');
        Products = MongoProducts;
        break;
    case 'MEMORY':
        console.log('Trabajando con MEMORY');
        const { default: ContactsMemory } = await import('./memory/contact.memory.js');
        Contacts = ContactsMemory;
        break;
}

export {
    Products
}