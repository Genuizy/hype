const PASSWORD = "clockeddevelopment";

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
function addGoal(){

    const input = document.getElementById("goalInput");
    const text = input.value.trim();

    if(text === "") return;

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = text;
    span.className = "goalText";

    span.onclick = function(){
        span.classList.toggle("completed");
    };

    const del = document.createElement("button");
    del.textContent = "Delete";
    del.className = "deleteBtn";

    del.onclick = function(){
        li.remove();
    };

    li.appendChild(span);
    li.appendChild(del);

    document.getElementById("goalList").appendChild(li);

    input.value = "";
}

document.getElementById("goalInput").addEventListener("keypress", function(e){

    if(e.key === "Enter"){
        addGoal();
    }

});
