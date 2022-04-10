
function generateRandomInt(max){
    return Math.floor(Math.random() * max);
}

var pic=new Array("a.jpg","b.jpg","c.jpg","d.jpg","e.jpg","f.jpg","g.jpg","h.jpg",
    "i.jpg","j.jpg","k.jpg","l.jpg","m.jpg","n.jpg","o.jpg","p.jpg","q.jpg","r.jpg","s.jpg",
    "t.jpg","u.jpg","v.jpg","w.jpg","x.jpg","y.jpg","z.jpg");//pic[0](=A)-pic[25](=Z)

var s1=0;
var s2=0;
var firstp=false;
var realfp=true;//the first time press any key
var glength;
var imgid;

var clength=26;
function generatepic(glength){//顯示圖片,並於該圖片中附加id=pic.keycode
    for(let i=0;i<glength;i++){
        var n;
        n=generateRandomInt(25);
        var pickeyc=n+65;
        $(".race").prepend('<img id="'+pickeyc+'" src='+pic[n]+'/>');
    }
}

function equalwithlast(inkeyc){
    var lastkeyc1=$("#1 img:last-child").attr("id");//get the last keycode on race1
    var lastkeyc2=$("#2 img:last-child").attr("id");//get the last keycode on race2
    var lastkeyc3=$("#3 img:last-child").attr("id");//get the last keycode on race3
    var lastkeyc4=$("#4 img:last-child").attr("id");//get the last keycode on race4
    var lastkeyc5=$("#5 img:last-child").attr("id");//get the last keycode on race5
    var lastkeyc6=$("#6 img:last-child").attr("id");//get the last keycode on race6

    if(lastkeyc1==inkeyc){//
        $("#1 img:last-child").remove();
    }
    else if(lastkeyc2==inkeyc){//
        $("#2 img:last-child").remove();
    }
    else if(lastkeyc3==inkeyc){//
        $("#3 img:last-child").remove();
    }
    else if(lastkeyc4==inkeyc){//
        $("#4 img:last-child").remove();
    }
    else if(lastkeyc5==inkeyc){//
        $("#5 img:last-child").remove();
    }
    else if(lastkeyc6==inkeyc){//
        $("#6 img:last-child").remove();
    }
    else{
        return;
    }
}

$("#in").keydown(function(event){
    var inkeyc=event.keyCode;//C要記得大寫-..-
    firstp=!firstp;
    if(firstp==true){
        s1=new Date().getTime();
    }
    else{
        s2=new Date().getTime();
    }
    glength=Math.round((Math.abs(s2-s1))/1000*1.5);
    while(realfp==true){
        glength=1;
        realfp=false;
    }
    generatepic(glength);
    equalwithlast(inkeyc);
});

 $(document).ready(function(){
     setInterval(function(){
         $(".race img").animate({left:"+=50px"});
         var distan1=$("#1 img:last-child").offset().left;
         var distan2=$("#2 img:last-child").offset().left;
         var distan3=$("#3 img:last-child").offset().left;
         var distan4=$("#4 img:last-child").offset().left;
         var distan5=$("#5 img:last-child").offset().left;
         var distan6=$("#6 img:last-child").offset().left;
         if(distan1>=1376){
            $("body").css("background","red");
            $("h1").text("GAME OVER!!!").css("font-size","50px");
            window.location.reload();
         }
         else if(distan2>=1376){
            $("body").css("background","red");
            $("h1").text("GAME OVER!!!").css("font-size","50px");
            window.location.reload();
         }
         else if(distan3>=1376){
            $("body").css("background","red");
            $("h1").text("GAME OVER!!!").css("font-size","50px");
            window.location.reload();
         }
         else if(distan4>=1376){
            $("body").css("background","red");
            $("h1").text("GAME OVER!!!").css("font-size","50px");
            window.location.reload();
         }
         else if(distan5>=1376){
            $("body").css("background","red");
            $("h1").text("GAME OVER!!!").css("font-size","50px");
            window.location.reload();
         }
         else if(distan6>=1376){
            $("body").css("background","red");
            $("h1").text("GAME OVER!!!").css("font-size","50px");
            window.location.reload();
         }
     });
 });

 
