const PASSWORD = "clocked";

window.onload = () => {

if(sessionStorage.getItem("loggedIn") === "true"){

document.getElementById("lockScreen").style.display = "none";

}

};

function login(){

const input = document.getElementById("password").value;

if(input === PASSWORD){

sessionStorage.setItem("loggedIn","true");

document.getElementById("lockScreen").style.display = "none";

}else{

document.getElementById("error").textContent = "Incorrect Password";

document.getElementById("password").value = "";

}

}

document.getElementById("password").addEventListener("keypress",function(e){

if(e.key==="Enter"){

login();

}

});
