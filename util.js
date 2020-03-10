function getOJParser(){

    var obj=eval(getOJParserRaw());
    if(obj === null){
        return {
            ver:"no parser!",
            oj:[]
        }
    }else{
        return obj;
    }
}

function getOJParserRaw(){
    // return val;
    return localStorage.getItem("parser");    
}
