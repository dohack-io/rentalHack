let accesstoken;
let bikeArray = new ObservableArray();
let customerArray = new ObservableArray();
let bookingArray = new ObservableArray();
let storeArray = new ObservableArray();
let test = true;
let copyForTest = false;

//loadingNav();


function loadDocument(syncClient, docname, loadFnc, watchArray) {
    syncClient.document(docname)
        .then(function (syncDoc) {
            // if(docname === "tbikes"){
            //     syncDoc.removeDocument().then(()=>console.log("deleted document"));
            // }

            console.log('Successfully opened a Document. SID: ' + syncDoc.sid);
            pageLoaded();

            syncDoc.on('updated', function (event) {
                loadFnc('update', event.value, event);
            });

            loadFnc('init', syncDoc.value, syncDoc);
            watchArray.addEventListener("itemadded", () => savefnc());

            let savebtn = document.getElementById("save");
            let savefnc = function () {
                alert(syncClient.connectionState);
                console.log(watchArray);
                syncDoc.set({watchArray: watchArray});
                console.log(docname + " Document saved");
            };
            window.addEventListener("beforeunload", () => savefnc());
            savebtn.addEventListener("click", () => savefnc());
        })
        .catch(function (error) {
            console.log('Unexpected error', error);
        });
}


function entityUpdateHandler(event, document, tEvent, array, arrayname, fnc) {
    console.log(event + " Event with Document: " + arrayname);
    if (event === "init" && document.watchArray) {
        for (let i = 0; document.watchArray[i]; i++) {
            array.push(fnc(document.watchArray[i]));
        }
        console.log("loaded initial " + array.length + " " + arrayname);
    } else {
        if (!tEvent.isLocal) {
            let set = array.reduce(function (a, b) {
                if (a.indexOf(b.ident) === -1) {
                    a.push(b.ident)
                }
                return a;
            }, []);
            for (let i = 0; i < document.length; i++) {
                if (!set.includes(document[i].ident)) {
                    array.push(document[i]);
                }
            }
            console.log("loaded " + array.length + " " + arrayname);
        } else {
            console.log("Array already up to date")
        }
    }
}

function bikeUpdateHandler(event, document, tEvent) {
    entityUpdateHandler(event, document, tEvent, bikeArray, "bikes", getBikeFromObject);
}

function customerUpdateHandler(event, document, tEvent) {
    entityUpdateHandler(event, document, tEvent, customerArray, "customers", getCustomerFromObject);
}

function bookingUpdateHandler(event, document, tEvent) {
    entityUpdateHandler(event, document, tEvent, bookingArray, "bookings", getBookingFromObject);
}

function storeUpdateHandler(event, document, tEvent) {
    entityUpdateHandler(event, document, tEvent, storeArray, "stores", getStoreFromObject);
    updateLocations();
    if (test && storeArray.length === 0) {
        storeArray.push(new Store("DU3", "Filliale LJB DU 3", "Straße 12, 44747 Stadt", ["DU3"]));
        storeArray.push(new Store("DU4", "Filliale LJB DU 4", "Straße 45, 44747 AnderStadt", ["DU4"]));
        storeArray.push(new Store("DUA", "Zusammenfassung Fillialen Duisburg", "Straße 45, 44747 AnderStadt", ["DU3", "DU4"]));
        updateLocations();
    }
}

let docLoader = function (syncClient) {
    if (test) {
        console.log("Started in test-mode");
        loadDocument(syncClient, 'tbikes', bikeUpdateHandler, bikeArray);
        loadDocument(syncClient, 'tbookings', bookingUpdateHandler, bookingArray);
        loadDocument(syncClient, 'tkunden', customerUpdateHandler, customerArray);
        loadDocument(syncClient, 'tstores', storeUpdateHandler, storeArray);
    } else {
        loadDocument(syncClient, 'bikes', bikeUpdateHandler, bikeArray);
        loadDocument(syncClient, 'bookings', bookingUpdateHandler, bookingArray);
        loadDocument(syncClient, 'kunden', customerUpdateHandler, customerArray);
        loadDocument(syncClient, 'stores', storeUpdateHandler, storeArray);
    }
    if (copyForTest && !test) {
        let bikeArray2 = new ObservableArray();
        let storeArray2 = new ObservableArray();
        let customerArray2 = new ObservableArray();
        let bookingArray2 = new ObservableArray();
        loadDocument(syncClient, 'tbikes', bikeUpdateHandler, bikeArray2);
        loadDocument(syncClient, 'tbookings', bookingUpdateHandler, bookingArray2);
        loadDocument(syncClient, 'tkunden', customerUpdateHandler, customerArray2);
        loadDocument(syncClient, 'tstores', storeUpdateHandler, storeArray2);
        loadDocument(syncClient, 'bikes', bikeUpdateHandler, bikeArray);
        loadDocument(syncClient, 'bookings', bookingUpdateHandler, bookingArray);
        loadDocument(syncClient, 'kunden', customerUpdateHandler, customerArray);
        loadDocument(syncClient, 'stores', storeUpdateHandler, storeArray);
        setTimeout(() => bikeArray = bikeArray2, 10000);
        setTimeout(() => bookingArray = bookingArray2, 10000);
        setTimeout(() => customerArray = customerArray2, 10000);
        setTimeout(() => storeArray = storeArray2, 10000);
        setTimeout(() => document.getElementById("save").click(), 10200);
    }
};

let reqListener = function () {
    accesstoken = this.responseText.split("\"")[3];
    console.log(this.responseText.split("\"")[3]);
    let syncClient = new Twilio.Sync.Client(accesstoken, {logLevel: 'info'});
    if (syncClient) {
        docLoader(syncClient);
    }
};

function removeAllDocuments() {
    bikeArray = [];
    bookingArray = [];
    customerArray = [];
    storeArray = [];
}

//corsRequest("https://almond-dunlin-3705.twil.io/sync-token", reqListener);
