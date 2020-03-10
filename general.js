function setGeneral(){
    if (typeof(Storage) === "undefined") {
        document.getElementById("msg").innerHTML="Error: Local storage not supported";
        return;
    }
    localStorage.setItem("user",document.getElementById("usr").value);
    localStorage.setItem("pass",document.getElementById("pwd").value);//very dangerous!!
    localStorage.setItem("host",document.getElementById("host").value);
    document.getElementById("msg").innerHTML="Successful set general information";
}

function getGeneral(){
    if (typeof(Storage) === "undefined") {
        document.getElementById("msg").innerHTML="Error: Local storage not supported";
        return;
    }

    document.getElementById("usr").value=localStorage.getItem("user");
    document.getElementById("pwd").value=localStorage.getItem("pass");
    document.getElementById("host").value=localStorage.getItem("host");
    document.getElementById("ver").innerHTML=getOJParser().ver;
}

function updateParser(){
    document.getElementById("msg").innerHTML="Updating parser from Github";

    $.get("https://raw.githubusercontent.com/XiaoGeNintendo/CP-Taskboard-Resource/master/parser.js",{},
    function(data,status){
        document.getElementById("msg").innerHTML="Read "+data.length+"bytes.";
        localStorage.setItem("parser",data);
        getGeneral();
    }).fail(function(response){
        document.getElementById("msg").innerHTML="Failed to update parser";
    })
}

getGeneral();

document.getElementById("button").onclick=setGeneral;
document.getElementById("update").onclick=updateParser;