let time=[]
let index=1;

let cost=[]
let x=0;
$(function(){
    $.ajax({
        url:'https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/ODFare/TYMC?%24format=JSON',
        method:'get',
        dataType:'json',
        data:{},
        async:false
    }).done(function(res){
        //console.log(res)
        res.forEach(function(cost1,i){
            if(i%21==0){
                cost[x]=cost1.Fares[0].Price;
                x++;
            }
        })
    })
    .fail(function(err){
        console.log(err)
    })
})

$(function(){
    $.ajax({
        url: 'https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/S2STravelTime/TYMC?%24top=1&%24format=JSON',
        method:'get',
        dataType:'json',
        data:{}
    }).done(function(res){
        //console.log(res)
        //$('#rail').empty()
        res.forEach(function(rail1){
            let temp=0;
            time[0]=rail1.TravelTimes[0].RunTime/60;
            for(let j=20;j>2;j--){
                temp=temp+j;
                time[index]=rail1.TravelTimes[temp].RunTime/60;
                index++;
            }
            time[19]=rail1.TravelTimes[209].RunTime/60
            $('#station1').append('<br id="1">'+rail1.TravelTimes[0].FromStationID+'_'+rail1.TravelTimes[0].FromStationName.Zh_tw+'</br>'+'<i class="arrow down"></i><span>$'+cost[0]+'</span></br>'+'<i class="arrow down"></i><span>'+time[0]+'分</span>'+'  </br>')//a1
            for(let i=0;i<19;i++){
                if(i==18){
                    $('#station1').append('<br id="1">'+rail1.TravelTimes[i].ToStationID+'_'+rail1.TravelTimes[i].ToStationName.Zh_tw+'</br>'+'<i class="arrow down"></i><span>$'+cost[i+1]+'</span></br>'+'<i class="arrow down"></i><span>'+time[19]+'分</span>'+'  </br>')//a2
                }
                else{
                    $('#station1').append('<br id="1">'+rail1.TravelTimes[i].ToStationID+'_'+rail1.TravelTimes[i].ToStationName.Zh_tw+'</br>'+'<i class="arrow down"></i><span>$'+cost[i+1]+'</span></br>'+'<i class="arrow down"></i><span>'+time[i+1]+'分</span>'+'  </br>')//a2

                }
            }
            $('#station1').append('<br>'+rail1.TravelTimes[19].ToStationID+'_'+rail1.TravelTimes[19].ToStationName.Zh_tw+'  </br>')
        });
    })
    .fail(function(err){
        console.log(err)
    })
})
