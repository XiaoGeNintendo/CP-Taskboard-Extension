
function _nqoa(str,chr){
    var last=str.lastIndexOf(chr);
    return str.substr(0,(last==-1?str.length:last))
}

function nqoa(str){
    return _nqoa(_nqoa(str,"?"),"#");
}

// Listen for messages
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {

    if (msg.text === 'report_back') {
        
        var res={
            oj:"Unknown",
            id:location.href,
            title:"Unknown",
            url:location.href
        }
        var parser=eval(msg.parser) //TODO Use raw
        // console.log(parser)

        for(var i=0;i<parser.parser.length;i++){
            try{
                var oj=parser.parser[i];
                // console.log(oj);
                var reg=new RegExp(oj.regex);
                if(reg.test(location.href)){
                    //it's the oj
                    res.oj=oj.name;
                    res.id=oj.getId();
                    res.title=oj.getTitle();

                    if(res.id!=null && res.title!=null){
                        sendResponse(res)
                    }
                }
            }catch(err){
                //failed. Use next
                console.log(err)
            }
        }

        sendResponse(res)
    }
});