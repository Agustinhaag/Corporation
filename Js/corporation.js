
let form = document.getElementById("form");
let usuario= document.getElementById("text");
let email= document.getElementById("email");
let edad= document.getElementById("edad");
let nacimiento = document.getElementById("fechanac");
let area = document.getElementById("area");


form.addEventListener("submit", e =>{
    e.preventDefault(),
    checkedinput();
});

function checkedinput(){ 
    let usuarioval= usuario.value.trim();
    let emailval= email.value.trim();
    let edadval= edad.value.trim();
    let nacimientoval= nacimiento.value.trim();
    let areaval= area.value.trim();
    if(usuarioval===""){
        setError(usuario,"El campo nombre no puede quedar vacio");
    }else{ 
        succes(usuario);  
    }  
    if(emailval===""){
        setError(email,"El campo email no puede quedar vacio");
    }else{
        succes(email);
    }
    if(edadval===""){
        setError(edad,"El campo edad no puede quedar vacio")
    }else{
        succes(edad);
    }
    if(nacimientoval===""){
        setError(nacimiento,"El campo fecha de nacimiento no puede quedar vacio")
    }else{
        succes(nacimiento);
    }
    if(areaval===""){
        setError(area,"El campo mensaje no puede quedar vacio")
    }else{
        succes(area);
    }
}
function setError(input, mensaje){
 let elemenpadre= input.parentElement;
 let small= elemenpadre.querySelector("small");
 elemenpadre.className="inputerror";
 small.innerText= mensaje;
}
function succes(input){
 let elemenpadre= input.parentElement;
 let small= elemenpadre.querySelector("small");
 elemenpadre.className="inputsucces";
 small.innerText="";
}

