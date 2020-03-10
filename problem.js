function parseProblem(){
    try{

        chrome.tabs.getSelected(null,function callback(tab){
            chrome.tabs.sendMessage(tab.id, {text: 'report_back',parser:getOJParserRaw()}, updateInfo);
        })

    }catch(err){
        document.getElementById("msg").innerHTML="Cannot parse problem:"+err;
    }
}

function updateInfo(res){
    console.log(res);
    document.getElementById("oj").innerText=res.oj;
    document.getElementById("title").innerText=res.title;
    document.getElementById("uid").innerText=res.oj+"_"+res.id;

    document.getElementById("msg").innerText="Parse finish";
}

document.getElementById("msg").innerText="Parsing";
parseProblem();

document.getElementById("reload").onclick=parseProblem();