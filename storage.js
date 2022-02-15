if(localStorage.getItem("count")==null){
    document.querySelector("#local").textContent = 0;
}
else{
    document.querySelector("#local").textContent = localStorage.getItem("count");
}

if(sessionStorage.getItem("count")==null){
    document.querySelector("#session").textContent = 0;
}
else{
    document.querySelector("#session").textContent = sessionStorage.getItem("count");
}


document.querySelector("#add").addEventListener("click",
function(e){
    
    if(localStorage.getItem("count")==null){
        localStorage.setItem("count",1);
    }else{
        let count = localStorage.getItem("count");
        count = parseInt(count) + 1;
        localStorage.setItem("count",count);
    }

    if(sessionStorage.getItem("count")==null){
        sessionStorage.setItem("count",1);
    }else{
        let count = sessionStorage.getItem("count");
        count = parseInt(count) + 1;
        sessionStorage.setItem("count",count);
    }
    document.querySelector("#local").textContent = localStorage.getItem("count");
    document.querySelector("#session").textContent = sessionStorage.getItem("count");
    e.preventDefault();
});