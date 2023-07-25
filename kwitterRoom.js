// ADICIONE SUS LINKS FIREBASE AQUI
const firebaseConfig = {
  apiKey: "AIzaSyCwZOG4yJqRGGPccUIQ3EWAbc5H-yv9w5Q",
  authDomain: "duolitter.firebaseapp.com",
  databaseURL: "https://duolitter-default-rtdb.firebaseio.com",
  projectId: "duolitter",
  storageBucket: "duolitter.appspot.com",
  messagingSenderId: "161670523573",
  appId: "1:161670523573:web:fb7eff676d067e95c6acfc"
};

firebase.initializeApp(firebaseConfig);
//ADICIONE SEUS LINKS FIREBASE

//pegando o valor username do local storage para armazenar na variável
userName=localStorage.getItem("userName")
document.getElementById("userName").innerHTML = "Boas vindas " + userName + "!";

function addRoom()
{
  roomName=document.getElementById("roomName").value 

  firebase.database().ref('/').child(roomName).update({
    purpose:"adicionado nova sala"
  })
  
  localStorage.setItem("roomName",roomName)
    
  window.location="kwitterPage.html"
}

function getData() {  firebase.database().ref("/").on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; //linha que pega todos os dados do firebase e mostra em alguma div html, esse código é pego pela documentação do firebase
       roomNames = childKey; //armazenando todos os nomes de cada sala na variável
       console.log("Nome da Sala - " + roomNames); //só para verificação
      row = "<div class='roomName' id="+roomNames+" onclick='redirectToRoomName(this.id)' >#"+ roomNames +"</div><hr>"; //this.id significa a id do elemento do html atual, e a id do dessa div é o nome da sala, entao, quando clicar na sala saberemos para qual sala estamos entrando etc.
      document.getElementById("output").innerHTML += row;
    });
  });

}

getData(); //chamando a função getData() assim que carregar a página

function redirectToRoomName(name) //name é uma referencia para o this.id para receber o nome da sala e redirecionar para ela
{
  console.log(name);
  localStorage.setItem("roomName", name); // salvando no localStorage
    window.location = "kwitterPage.html"; //indo para dentro da sala
}

function logout() {
localStorage.removeItem("userName");
localStorage.removeItem("roomName");
    window.location = "index.html";
}
