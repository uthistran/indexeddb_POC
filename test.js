//prefixes of implementation that we want to test
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

//prefixes of window.IDB objects
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB.")
}

const employeeData = [
    { id: "00-01", name: "gopal", age: 35, email: "gopal@tutorialspoint.com" },
    { id: "00-02", name: "prasad", age: 32, email: "prasad@tutorialspoint.com" }
];

const clickData = [
    { id: "1", count: 0 }
]
var db;
var request = window.indexedDB.open("clickDatabase", 1);

request.onerror = function (event) {
    console.log("error: ");
};

request.onsuccess = function (event) {
    db = request.result;
    console.log("success: " + db);
};

request.onupgradeneeded = function (event) {
    alert("it came here");
    var db = event.target.result;
    // var objectStore = db.createObjectStore("employee", { keyPath: "id" });

    // for (var i in employeeData) {
    //     objectStore.add(employeeData[i]);
    // }

     var objectStore = db.createObjectStore("clicks", { keyPath: "id" });

     for (var i in clickData) {
         objectStore.add(clickData[i]);
     }
}

function deletedb() {

    window.indexedDB.deleteDatabase("newDatabase")
}

function read() {
    var transaction = db.transaction(["clicks"]);
    var objectStore = transaction.objectStore("clicks");
    var request = objectStore.get("1");


    request.onsuccess = function (event) {
        alert(request.count);
        request.count ++;
    };
    request.onerror = function (event) {
        alert("Unable to retrieve daa from database!");
    };

    // request.onsuccess = function (event) {
    //     // Do something with the request.result!
    //     if (request.result) {
    //         alert("Name: " + request.result.name + ", Age: " + request.result.age + ", Email: " + request.result.email);
    //     }

    //     else {
    //         alert("Kenny couldn't be found in your database!");
    //     }
    // };
}

function readAll() {
    var objectStore = db.transaction("employee").objectStore("employee");

    objectStore.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;

        if (cursor) {
            alert("Name for id " + cursor.key + " is " + cursor.value.name + ", Age: " + cursor.value.age + ", Email: " + cursor.value.email);
            cursor.continue();
        }

        else {
            alert("No more entries!");
        }
    };
}

function add() {
    var request = db.transaction(["employee"], "readwrite")
        .objectStore("employee")
        .add({ id: "00-03", name: "Kenny", age: 19, email: "kenny@planet.org" });

    request.onsuccess = function (event) {
        alert("Kenny has been added to your database.");
    };

    request.onerror = function (event) {
        alert("Unable to add data\r\nKenny is aready exist in your database! ");
    }
}

function remove() {
    var request = db.transaction(["employee"], "readwrite")
        .objectStore("employee")
        .delete("00-03");

    request.onsuccess = function (event) {
        alert("Kenny's entry has been removed from your database.");
    };
}

function senddata() {

    // Send an AJAX request
    $.ajax({
        type: "GET",
        url: "http://10.2.46.84/testwebapi/api/Values",
        // data:{name:'5'},
        //dataType: 'json',
        success: function (response) {
            alert(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });

}