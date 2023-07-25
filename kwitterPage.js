//LINKS FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyCwZOG4yJqRGGPccUIQ3EWAbc5H-yv9w5Q",
  authDomain: "duolitter.firebaseapp.com",
  databaseURL: "https://duolitter-default-rtdb.firebaseio.com",
  projectId: "duolitter",
  storageBucket: "duolitter.appspot.com",
  messagingSenderId: "161670523573",
  appId: "1:161670523573:web:fb7eff676d067e95c6acfc"
};+
firebase.initializeApp(firebaseConfig);

 userName=localStorage.getItem("userName")
 roomName=localStorage.getItem("roomName")

function send() //função enviar
{
  msg=document.getElementById("msg").value
  firebase.database().ref(roomName).push({
    nome:userName,
    message:msg,
    like:0
  })
  msg=""
}


function getData() {
  firebase.database().ref("/" + roomName).on('value', function (snapshot) {
    document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
        firebaseMessageId = childKey; //chave única para cada mensagem contendo o nome, mensagem e like
        messageData = childData;
        //Início do código
        console.log(firebaseMessageId);
        console.log(messageData);
        nome = messageData['nome'];
        message = messageData['message'];
        like = messageData['like'];
        nameWithTag = "<h4 class='message_name'> " + nome + "<img class='user_tick' src='tick.png'></h4>";
        messageWithTag = "<h4 class='message_h4'>" + message + "</h4>";
        like_button = "<button class='btn btn-warning' id=" + firebaseMessageId + " value=" + like + " onclick='updateLike(this.id)'>";
        spanWithTag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";

        row = nameWithTag + messageWithTag + like_button + spanWithTag;
        document.getElementById("output").innerHTML += row;
        //Fim do código
      }
    });
  });
}
getData();

function updateLike(messageId) {
  console.log("botão de like pressionado - " + messageId);
  buttonId = messageId;
  likes = document.getElementById(buttonId).value;
  updatedLikes = Number(likes) + 1;
  console.log(updatedLikes);

  firebase.database().ref(roomName).child(messageId).update({
    like: updatedLikes
  });
}

function logout() {
  localStorage.removeItem("userName");
  localStorage.removeItem("roomName");
  window.location.replace("index.html");
}
