const socket = io();


function generateNewMessage(message) {
  return  `<div class="message">
  <p class="title">user:${message.email}</p>
  <p class="description">Message:${message.message}</p>
  <p class="time">time:${message.timestamp}</p>
</div>`;
}
const newmessage = document.querySelector('#newmessage');

  newmessage.addEventListener('submit',(e)=>{
    e.preventDefault();
  
    const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  
  const newmsg = {
      email,
   message,

  }
  socket.emit("MESSAGE_ADDED",newmsg)
  
  newmessage.reset();
})


socket.on("ADD_MESSAGE_CHAT",async (message)=>{
  message.timestamp = new Date()
  const msg = generateNewMessage(message);
  document.querySelector("#chat").innerHTML += msg; 
  let chatBox = document.getElementById("chat"); chatBox.scrollTop = chatBox.scrollHeight;
})