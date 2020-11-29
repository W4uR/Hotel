let hotel = document.getElementById("infiniteHotel");
let currentPos=0;
let scrollSpeed=5;

let pageIds = new Array(3);
pageIds[0] = "main.html";
pageIds[1] = "reservation.html";

window.addEventListener('wheel', function(event)
{
 if (event.deltaY < 0)
 {
    currentPos+=scrollSpeed;
 }
 else if (event.deltaY > 0)
 {
    currentPos-=scrollSpeed;
}
    if(Math.abs(currentPos) >= Number.MAX_SAFE_INTEGER - scrollSpeed)
        currentPos = 0;
    hotel.style.backgroundPosition = "0% "+currentPos+"%";
});
function loadPage(id){
    document.location = pageIds[id];
}

let cost = 0;
let login;
let logout;
let days;

let popup = document.getElementById("popup");
let overlay = document.getElementById("overlay") 
let msg = document.getElementById("msg");
let bT = document.getElementById("yes");


function DisplayPopUp(message,buttonText){
    popup.style.display = "block";
    overlay.style.display = "block";
    msg.innerHTML=message;
    bT.innerHTML=buttonText;
}

function closePop(){
    close();
}

function close(){
    overlay.style.display = "none";
    popup.style.display = "none";
}

function yes(){
    close();
    if (bT.innerHTML=="Yes") {
        bT.innerHTML="";
        DisplayPopUp("Your reservation was successful!","Awesome");
    }
}

function checkDate(){
    login = Date.parse(document.getElementById("login").value);
    logout = Date.parse(document.getElementById("logout").value);
    console.log(logout)


    if (login <= Date.now() && login) {
        DisplayPopUp("We can't make a reservation in the past", "Sad")
        return;
    }
    
    if (login>=logout && login && logout) {
        DisplayPopUp("Could you make sure you set the logout date to be after the login date?","Sure")
    }


}


function book(){
    let ppl = document.getElementById("ppl").value;
    let bed = document.getElementById("bed").value;
    if (!(logout && login) || login >= logout || login <= Date.now()) {
        return;
    }
    days = ((logout-login) / 86400000);
    console.log(days);
    cost =  (ppl*25+bed*60 +500) * days;
    DisplayPopUp("Do you want to reserve this room for " + cost + " LP?","Yes")
}


