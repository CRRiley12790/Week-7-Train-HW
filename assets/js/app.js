// Initialize Firebase
var config = {
    apiKey: "AIzaSyDMs_r_D8zsv6q_mwxjEqAI7xsUUaRdgF0",
    authDomain: "train-project-f523a.firebaseapp.com",
    databaseURL: "https://train-project-f523a.firebaseio.com",
    projectId: "train-project-f523a",
    storageBucket: "train-project-f523a.appspot.com",
    messagingSenderId: "707896310764"
  };
  firebase.initializeApp(config);

var database = firebase.database();
var currentTime = moment().format("HH:mm");
console.log(currentTime);

database.ref().on("child_added", function(childSnap) {
    var name = childSnap.val().name;
    var destination = childSnap.val().destination;
    var firstTrain = childSnap.val().firstTrain;
    var frequency = childSnap.val().frequency;
    var min = childSnap.val().min;
    var next = childSnap.val().next;

    $("#trainTable > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + next + "</td><td>" + min + "</td></tr>");
});

database.ref().on("value", function(snapshot) {
});

//grabs information from the form
$("#addTrainBtn").on("click", function() {

    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = $("#firstInput").val().trim();
    var frequency = $("#frequencyInput").val().trim();


    //inputs values
    if (trainName == "") {
        alert('Enter a train name.');
        return false;
    }
    if (destination == "") {
        alert('Enter a destination.');
        return false;
    }
    if (firstTrain == "") {
        alert('Enter a first train time.');
        return false;
    }
    if (frequency == "") {
        alert('Enter a frequency');
        return false;
    }
});

var tFrequency = 3;

// Time is 3:30 AM
var firstTime = "03:30";

// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

// Current Time
var currentTime = moment();

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

// Time apart (remainder)
var tRemainder = diffTime % tFrequency;

// Minute Until Train
var tMinutesTillTrain = tFrequency - tRemainder;

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");