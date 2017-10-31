//prefixes of implementation that we want to test
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

//prefixes of window.IDB objects
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB.")
}

const clickData = [
    { id: "1", data: Date.now, count: 0 }
]
var db;
var request = window.indexedDB.open("clickDB");

request.onerror = function(event) {
  alert("Database error: " + event.target.errorCode);
};
request.onsuccess = function(event) {
  db = event.target.result;
};
// This event is only implemented in recent browsers
request.onupgradeneeded = function(event) { 
  var db = event.target.result;
  // Create an objectStore for this database
  var objectStore = db.createObjectStore("name", { keyPath: "myKey" });
};

