// this is client.

const socket = io(); // User connect to application

const urlSearch = new URLSearchParams(window.location.search);
const username  = urlSearch.get("username");
const room      = urlSearch.get("select_room");
const category  = urlSearch.get("select_category");

// emit => issue some information from server
// on   => listen to some information

const usernameDiv = document.getElementById("username");
usernameDiv.innerHTML = `Hello ${category} ${username} - You are in the room ${room}.` ;

socket.emit("select_room", {
  username,
  room,
  category,
}, messages => {
  messages.forEach((message) => createMessage(message));
});

document.getElementById("button_send").addEventListener
("click", (event) => {
  const registration = document.getElementById("registration_input").value;
  const summary      = document.getElementById("summary_input").value;

  const data = {
    room,
    registration,
    summary,
    username,
    category,
  }
  socket.emit("message", data);
});

socket.on("message", data => {
  createMessage(data);
});

function createMessage(data) {
  const messageDiv = document.getElementById("messages");

  // Se for professor exibe todas as mensagens.
  // If you are a teacher, display all messages.
  if (category.toLowerCase() === 'teacher') {
    messageDiv.innerHTML += `
    <div class="new_message">
      <label class="form-label">
        <strong> ${data.username} - ${data.registration} - </strong> <span> ${data.summary} - ${dayjs(data.createdAt).format("DD/MM HH:mm")}</span>
      </label>
    </div>
    `;
  }

  // Se não, só exibe para o próprio usuário.
  // If not, it only displays for the user.
  else if (data.username.toLowerCase() === username.toLowerCase()) {
    messageDiv.innerHTML += `
    <div class="new_message">
      <label class="form-label">
        <strong> ${data.username} - ${data.registration} - </strong> <span> ${data.summary} - ${dayjs(data.createdAt).format("DD/MM HH:mm")}</span>
      </label>
    </div>
    `;
  };
};

document.getElementById("logout").addEventListener("click", (event) => {
  window.location.href = "index.html";
});

//console.log(username, room, category);