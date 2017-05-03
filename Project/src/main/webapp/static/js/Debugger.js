function debug()
{
    return;

    var nameOfPerson=arguments.callee.name;
    var finalDebug="DEBUGGER: "+nameOfPerson+"(): ";

    var count=0;
    for(var item in arguments){
        if(!arguments.hasOwnProperty(item)){
            break;
        }
        if((count++)!=0){
            finalDebug+="\n  : ";
        }
        var argument=arguments[item];
        if(typeof argument=='function'){
            finalDebug+="Function...";
            continue;
        }

        if(typeof argument=='object' ){
            finalDebug+="\n"+JSON.stringify(argument,null,2);
            continue;
        }

        finalDebug+=(typeof argument)+"("+argument+")";
    }
    console.debug(finalDebug);

}