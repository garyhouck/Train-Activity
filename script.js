$(document).ready(function(){


// Initialize Firebase
let config = {
    apiKey: "AIzaSyCvPE37Xm9VATSDVi_0KVfsy_xyysorZ88",
    authDomain: "myfirstfirebase-13930.firebaseapp.com",
    databaseURL: "https://myfirstfirebase-13930.firebaseio.com",
    projectId: "myfirstfirebase-13930",
    storageBucket: "myfirstfirebase-13930.appspot.com",
    messagingSenderId: "935312554326"
  };
  firebase.initializeApp(config);

  // variable for database
  let database = firebase.database();
  // initial variables
  let trainName = "";
  let destination = "";
  let frequency ="";
  let nextArrival = "";
  


  // click function for submitting user data to the schedule table
  $("#submit").on("click", function(event) {

      event.preventDefault();

      trainName = $("#trainInput").val();
      destination = $("#destinationInput").val();
      frequency = $("#frequencyInput").val();
      firstTrain = $("#firstTrain").val();
      
      let now = moment();
      let nextArrival = firstTrain;
      let diff = now.subtract(firstTrain);
      let minutesAway = frequency - (diff % frequency);
     
      
      

      // send info to database and html
      database.ref().push({
          train: trainName,
          destination: destination,
          frequency: frequency,
          arrival : nextArrival,
          minutes: minutesAway
          
      });

    });

      database.ref().on("child_added", function(snapshot) {
        $("#newInput1").append(snapshot.val().train);
        $("#newInput2").append(snapshot.val().destination);
        $("#newInput3").append(snapshot.val().frequency);
        $("#newInput4").append(snapshot.val().arrival);
        $("#newInput5").append(snapshot.val().minutes);
        console.log(minutesAway);
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });

   


// document.ready ends here
});