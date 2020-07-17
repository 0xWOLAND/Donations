import React from "react";
import "./App.css";
import faker from "faker";
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
import ReactDOM from "react-dom";
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6o8pBse4Ak4DDvNin2QoIdm0zm6Ht-sY",
  authDomain: "donationapp-65b58.firebaseapp.com",
  databaseURL: "https://donationapp-65b58.firebaseio.com",
  projectId: "donationapp-65b58",
  storageBucket: "donationapp-65b58.appspot.com",
  messagingSenderId: "335186783668",
  appId: "1:335186783668:web:2b668d91fe790dd3ff56e1",
  measurementId: "G-TNGHGRG1KH",
};

var app = firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

faker.seed(123);

var sum = 0;
var cnt = 0;

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function createDonateElement(person, sum) {
  var str = person + " donated $" + sum + ".";
  var node = document.createElement("div");
  node.className = "donationElem"
  var text = document.createElement("h4");
  text.innerText = str;
  node.appendChild(text);
  document.getElementById("donators").append(node);
}

function donate() {
  const person = faker.fake("{{name.firstName}} {{name.lastName}}");
  const donation = faker.random.number() % 200;
  db.collection("Donations").add({
    name: person,
    donation: donation,
  });
  createDonateElement(person, donation);
  sum += donation;
  document.getElementById("totalDonations").innerHTML =
    "Total Donations: $" + numberWithCommas(sum);
  cnt += 1;
  var average = sum / cnt;
  var decimal = (Math.round(average * 100) / 100).toFixed(2);
  document.getElementById("averageDonations").innerHTML =
    "Average Donation: $" + numberWithCommas(decimal);
}
function App() {
  return (
    <div className="App">
      <h1 id="totalDonations">Total Donations: ${sum}</h1>
      <h3 id="averageDonations">Average Donation: ${sum / cnt}</h3>
      <button className="button" onClick={() => donate()}>
        Donate
      </button>
      <div id="donators"></div>
    </div>
  );
}

export default App;
