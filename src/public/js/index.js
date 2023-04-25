const socket = io();


socket.emit('addProduct',element=>{
    console.log("producto agregado");
})




socket.on("sendProducts", async (response) => {
    console.log("test");
    const url = "http://localhost:8080/realTimeProducts";
      fetch(url).then((resp) => {
        return resp.text();
    }).then((text) => {
      const template = Handlebars.compile(text);
      const html = template({response});
      document.querySelector("#products").innerHTML = html;
    });

  })
