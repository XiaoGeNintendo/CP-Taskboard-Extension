function parseProblem(){
    
    document.getElementById("tags").disabled=true;
    document.getElementById("note").disabled=true;
    try{

        chrome.tabs.getSelected(null,function callback(tab){
            chrome.tabs.sendMessage(tab.id, {text: 'report_back',parser:getOJParserRaw()}, updateInfo);
        })

    }catch(err){
        document.getElementById("msg").innerHTML="Cannot parse problem:"+err;
    }
}

var glb;
function updateInfo(res){
    glb=res;
    
    document.getElementById("parse").innerText="Parse OK";
    document.getElementById("msg").innerText="Fetching";

    $.post(localStorage.getItem("host")+"/QueryServlet",{
        "username":localStorage.getItem("user"),
        "password":localStorage.getItem("pass"),
        "id":glb.oj+"_"+glb.id
    },function(data,status){
        document.getElementById("tags").disabled=false;
        document.getElementById("note").disabled=false;
        if(data=="null"){
            document.getElementById("ac").innerText="Unattempted";
            document.getElementById("msg").innerHTML="All set";
            return;
        }
        try{
            document.getElementById("msg").innerText="Fetch Success";
            var js=JSON.parse(data);
            if(js.ac){
                document.getElementById("ac").innerText="Accepted"
            }else{
                document.getElementById("ac").innerText="Attempted"
            }

            document.getElementById("tags").value=js.tag;
            document.getElementById("note").value=js.note;

            document.getElementById("msg").innerHTML="All set";
        }catch(err){
            document.getElementById("msg").innerHTML="Error:"+data;
        }
    }).fail(function(response){
        document.getElementById("msg").innerText="Error:"+JSON.stringify(response);
    })
}

function uploadInfo(){
    
    document.getElementById("msg").innerHTML="Updating Information";
    document.getElementById("tags").disabled=true;
    document.getElementById("note").disabled=true;

    $.post(localStorage.getItem("host")+"/StatusServlet",{
        "username":localStorage.getItem("user"),
        "password":localStorage.getItem("pass"),
        "oj":glb.oj,
        "title":glb.title,
        "note":document.getElementById("note").value,
        "tag":document.getElementById("tags").value,
        "id":glb.oj+"_"+glb.id,
        "ac":(document.getElementById("ac").innerText=="Accepted"?"true":"false"),
        "link":glb.url,
    },function(data,status){
        document.getElementById("tags").disabled=false;
        document.getElementById("note").disabled=false;
        document.getElementById("msg").innerHTML=data;
    }).fail(function(response){
        document.getElementById("msg").innerHTML=JSON.stringify(response);
    })
}

parseProblem()

document.getElementById("reload").onclick=parseProblem

document.getElementById("setac").onclick=function(){
    if(document.getElementById("ac").innerText=="Accepted"){
        document.getElementById("ac").innerText="Unaccepted";
    }else{
        document.getElementById("ac").innerText="Accepted";
    }
}

document.getElementById("update").onclick=uploadInfo