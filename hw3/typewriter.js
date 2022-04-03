
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function generateString(length) {
    let result='';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}//random generator for A-Z

var topic=document.getElementById("rdword");//question
//topic.innerText+=generateString(1);

var inword=document.getElementById("input");//input form
var loginword=document.getElementById("inword");//display the input word
var s1=0;
var s2=0;
var firstp=false;
var realfp=true;//the first time press any key
var glength;//隨機產生的字串長度
inword.addEventListener("keydown",logkey);
function logkey(e){
    while(topic.textContent.length>96){
        alert("GAME OVER!");
        window.location.reload();
        break;
    }
    firstp=!firstp;
    if(firstp==true){
        s1=new Date().getTime();
    }
    else{
        s2=new Date().getTime();
    }
    glength=Math.round((Math.abs(s2-s1))/1000*2.5);
    while(realfp==true){
        glength=3;
        realfp=false;
    }
    topic.textContent=generateString(glength)+topic.textContent;
    var temp=e.keyCode;
    if(temp>=65&&temp<=90){//only print a-z and A-Z, ignore others, such as shift
        loginword.textContent+=e.key;
        while(e.key==topic.textContent.slice(-1)){
            topic.textContent=topic.textContent.slice(0,-1);
        }
    }
}