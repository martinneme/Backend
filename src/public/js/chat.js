const newmessage = document.querySelector('#newmessage');

  newmessage.addEventListener('submit',(e)=>{
    e.preventDefault();
  
    const title = document.getElementById("email").value;
  const price = document.getElementById("message").value;

  
  const message = {
      email,
   message,

  }
  socket.emit("MESSAGE_ADDED",message)
  
  newmessage.reset();
})