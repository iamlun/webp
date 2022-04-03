
var input=document.getElementById("input");
input.addEventListener("keydown",logkey);
function logkey(e){
    word.textContent += `${e.key}`;//event.key
}//if ``中 有包變數 則會輸出該變數的內容
