const socket = io();




socket.on("SEND_PRODUCTS", async (response) => {

   response.forEach(element => {
   const prod = `<div class="product" >
    <p>Title:</p>
    <p class="title">${element.title}</p>
  <img class="image" src="${element.thumbnails[0].lenght > 2 ? element.thumbnails[0]:element.thumbnails }"></img> 
    <p>description:</p>
    <p class="description">${element.description}</p>
    <p>Price:</p>
    <p class="price">${element.price}</p>
    <p>Stock:</p>
    <p class="stock">${element.stock}</p>
</div>`
document.querySelector("#products").innerHTML += prod; 
   });
      
    });


 const addproduct = document.querySelector('#send')

 addproduct.addEventListener('submit',(e)=>{
      e.preventDefault();
    
      const title = document.getElementById("title").value;
    const price = document.getElementById("price").value;
    const description = document.getElementById("description").value;
    const thumbnails = document.getElementById("thumbnails").value;
    const code = document.getElementById("code").value;
    const category = document.getElementById("category").value;
    const stock = document.getElementById("stock").value;
    const status = document.getElementById("status").value;
    
    const prod = {
    title,
     price,
     description,
      thumbnails,
      category,
      code,
      stock,
      status
    }
    socket.emit("PRODUCT_ADDED",prod)
    
    addprod.reset();
    })

    socket.on("ADD_PRODUCT",element=>{
        const product = `<div class="product" >
    <p>Title:</p>
    <p class="title">${element.title}</p>
  <img class="image" src="${element.thumbnails}"></img> 
    <p>description:</p>
    <p class="description">${element.description}</p>
    <p>Price:</p>
    <p class="price">${element.price}</p>
    <p>Stock:</p>
    <p class="stock">${element.stock}</p>
</div>`
document.querySelector("#products").innerHTML+=product
    })