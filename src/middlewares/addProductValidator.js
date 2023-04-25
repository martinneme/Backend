function addProductValidator(req, res, next) {
    const propiedadesEsperadas = ["title", "description", "price","code","stock","category","status","thumbnails"];
    const propiedadesProducto = Object.keys(req.body);

    const error = {
        error: "Error al agregar el producto",
        code: 400,
        description:`Se esperan las propiedades ${[...propiedadesEsperadas] }`
    }

    for (const prop in propiedadesProducto){
        if (!propiedadesEsperadas.includes(propiedadesProducto[prop])) {
            error.description=error.description+`.El request contiene la propiedad ${propiedadesProducto[prop]} no esperada`
        res.status(400).json(error);
        }
      }
    
    if (!req.body.title,
        !req.body.description,
        !req.body.price,
        !req.body.code,
        !req.body.stock,
        !req.body.category
    ) {
        res.status(400).json(error);
    } else {
        if (typeof req.body.status === 'undefined') {
            req.body.status = true;
        }
        return next();
    }

}

export default addProductValidator;