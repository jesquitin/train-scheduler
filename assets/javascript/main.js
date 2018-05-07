$(document).ready(function(){

    document.getElementById("current-time").innerHTML = formatAMPM();

function formatAMPM() {
var d = new Date(),
    minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes(),
    hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours(),
    ampm = d.getHours() >= 12 ? 'pm' : 'am',
    months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
return days[d.getDay()]+' '+months[d.getMonth()]+' '+d.getDate()+' '+d.getFullYear()+' '+hours+':'+minutes+ampm;
}
 
 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyCEvafTGLuEU5SCZZmXk5-Zw0W_BNbXlHU",
    authDomain: "trainscheduler-2b39e.firebaseapp.com",
    databaseURL: "https://trainscheduler-2b39e.firebaseio.com",
    projectId: "trainscheduler-2b39e",
    storageBucket: "trainscheduler-2b39e.appspot.com",
    messagingSenderId: "100449681350"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  //adding train

  $("#add-train").on("click", function (event){
        event.preventDefault();

    //Input fields
    var trainName = $("#name-input").val().trim();
    var trainDest = $("#dest-input").val().trim();
    var trainFirstTime = moment($("#firstTrain-input").val().trim(), "DD/MM/YY").format("X");
    var trainFrequent = $("#frequent-input").val().trim();

    //local temp object for train data

    var newTrain = dataRef.push( {
        name:trainName,
        dest:trainDest,
        firstTime:trainFirstTime,
        frequent:trainFrequent

    });

  });

  
});