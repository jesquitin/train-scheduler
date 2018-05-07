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
    var trainFirstTime = $("#firts-train-input").val().trim();
    var trainFrequent = $("#frequent-input").val().trim();

    //local temp object for train data

    var newTrain =  {
        name:trainName,
        dest:trainDest,
        firstTime:trainFirstTime,
        frequent:trainFrequent

    };
    // Uploads train data to the database
    database.ref().push(newTrain);

        /*  console.log(newTrain.name);
            console.log(newTrain.dest);
            console.log(newTrain.firstTime);
            console.log(newTrain.frequent);
        */
    // Alert
       alert("Train successfully added");

  // Clears all input fields
   $("#name-input").val("");
   $("#dest-input").val("");
   $("#firts-train-input").val("");
   $("#frequent-input").val("");

  });

  // 3. Adds train into database and rows into html element
	database.ref().on("child_added", function(childSnapshot, prevChildKey) {

        console.log(childSnapshot.val());
  
        // Store everything into a variable.
        var trainName = childSnapshot.val().name;
        var trainDest = childSnapshot.val().dest;
        var trainFirstTime = childSnapshot.val().firstTime;
        var trainFrequent = childSnapshot.val().frequent;
  
  
         // Declare variable
        var trainFrequent;
  
            // Time is to be entered on the entry form
        var firstTime = 0;
  
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
          console.log(firstTimeConverted);
  
        // Current Time
        var currentTime = moment();
          console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
  
        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
          console.log("DIFFERENCE IN TIME: " + diffTime);
  
          // Time apart (remainder)
        var tRemainder = diffTime % trainFrequent;
          console.log("Time Remaining  " + tRemainder);
  
          // Minute Until Train
         var tMinutesTillTrain = trainFrequent - tRemainder;
          console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
  
          // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
          console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));
  
  
        // Add each train's data into the table
        $("#disply-info> tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFrequent + 
         "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
      });

});