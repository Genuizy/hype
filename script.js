const PASS="clockeddevelopment";
function login(){if(pw.value===PASS){lock.style.display="none";sessionStorage.ok=1}else err.textContent="Wrong password";}
if(sessionStorage.ok)lock.style.display="none";
function toggleTop(){topMenu.classList.toggle("open")} function toggleSide(){sideMenu.classList.toggle("open")}
function showSection(id){document.querySelectorAll(".sec").forEach(s=>s.classList.remove("active"));document.getElementById(id).classList.add("active")}
function addGoal(){let t=goalInput.value.trim();if(!t)return;let li=document.createElement("li");li.textContent=t;li.onclick=()=>li.classList.toggle("done");let b=document.createElement("button");b.textContent="X";b.onclick=(e)=>{e.stopPropagation();li.remove()};li.appendChild(b);goalList.appendChild(li);goalInput.value="";}