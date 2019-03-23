function updateAvailableBikes() {
    let bikes = new ObservableArray();
    let selector = document.getElementById("storeSelector");
    let options = selector && selector.options;
    let selection = [];
    for (let i = 0; i < options.length; i++) {
        let selectedOption = options[i];
        if (selectedOption.selected) {
            if (selectedOption.value.includes(",")) {
                let divider = selectedOption.value.split(",");
                for (let candidate in divider) {
                    selection.push(divider[candidate]);
                }
            } else {
                selection.push(selectedOption.value || selectedOption.text);
            }
        }
    }
    for (let i = 0; i < storeArray.length; i++) {
        for (let j = 0; j < bikeArray.length; j++) {
            if (storeArray[i].store === selection[j]) {
                bikes.push(bikeArray[i]);
                break;
            }
        }
    }
    let select = document.getElementById("bikeSelector");
    while (select.firstChild) {
        select.removeChild(select.firstChild);
    }
    for (let i = 0; i < bikes.length; i++) {
        appendElementAfterCreationWithInnerTextAndAttributes(select, "option", bikes[i].name(), [["value", bikes[i].ident]]);
    }
    return bikes;
}


function getBookingsForDate(dateTmp) {
    let bookingsAtDate = [];
    let date = dateArray.filter((x) => x.date === dateTmp);
    if (date.length !== 0) {
        bookingsAtDate = bookingArray.filter((x) => {
            date.booking_ids.filter((y) => y === x.ident)
        })
    }
    return bookingsAtDate;
}

function createBooking(form) {
    form.preventDefault();
    let id = bookingArray.length + 1;
    let selector = document.getElementById("bikeSelector");
    let options = selector && selector.options;
    let selection = [];
    for (let i = 0; i < options.length; i++) {
        let selectedOption = options[i];
        if (selectedOption.selected) {
            selection.push(selectedOption.value || selectedOption.text)
        }
    }
    let bikes = selection;
    selector = document.getElementById("customerSelector");
    options = selector && selector.options;
    for (let i = 0; i < options.length; i++) {
        let selectedOption = options[i];
        if (selectedOption.selected) {
            selection.push(selectedOption.value || selectedOption.text);
            break;
        }
    }
    let customer = selection;
    let startdate = document.getElementById("startdate").value;
    let deliveryStartTime = document.getElementById("deliveryStartTime").value;
    let enddate = document.getElementById("enddate").value;
    let deliveryEndTime = document.getElementById("deliveryEndTime").value;
    let booking = new Booking(id, bikes, customer, startdate, deliveryStartTime, enddate, deliveryEndTime);
    if (booking) {
        let inserted = false;
        for (let i = 0; i < bookingArray.length; i++) {
            if (bookingArray[i].ident === id) {
                bookingArray.splice(i, 1, booking);
                console.log("Booking ersetzt: " + booking.name());
                inserted = true;
                break;
            }
        }
        if (!inserted) {
            bookingArray.push(booking);
            console.log("Bike angelegt: " + booking.name());
        }
    }
    return true;
}

function createCustomerFormFromBooking(elem) {
    removeElemWithId("customerSelector");
    removeElemWithId("newCustomerBtn");
    createCustomerForm(elem);
    removeEventListenerForID("newcustomer");
    let btn = document.getElementById("bookingBtn").innerText = "Bitte erst Kunden anlegen";
    btn.setAttribute("disabled", "disabled");
    let form = document.getElementById("newcustomer");
    form.addEventListener("submit", () => {
        let btn = document.getElementById("bookingBtn").innerText = "Booking anlegen";
        btn.removeAttribute("disabled");
        createCustomer;
    });
}

function createBookingForm(date) {
    let body = document.querySelector("body");
    let form = appendElementAfterCreationWithAttributes(body, "form", [["id", "newBooking"]]);
    let formfield = appendElementAfterCreationWithInnerText(form, "fieldset");
    appendElementAfterCreationWithInnerText(formfield, "legend", "Neue Booking");
    let fieldset = appendElementAfterCreationWithInnerText(formfield, "fieldset");
    appendElementAfterCreationWithInnerText(fieldset, "legend", "Abholtermin");
    appendElementAfterCreationWithInnerTextAndAttributes(fieldset, "label", "Abholtermin für Leihräder: ", [["for", "startdate"]]);
    appendElementAfterCreationWithAttributes(fieldset, "span");
    appendElementAfterCreationWithAttributes(fieldset, "br");
    if (date) {
        let dateTmp = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
        let startInput = appendElementAfterCreationWithAttributes(fieldset, "input", [["type", "date"], ["id", "startdate"]]);
        startInput.value = dateTmp.toISOString().substr(0, 10);
    } else {
        appendElementAfterCreationWithAttributes(fieldset, "input", [["type", "date"], ["id", "startdate"]]);
    }
    appendElementAfterCreationWithAttributes(fieldset, "input", [["type", "time"], ["id", "deliveryStartTime"]]);
    let fieldset1 = appendElementAfterCreationWithAttributes(formfield, "fieldset");
    appendElementAfterCreationWithInnerTextAndAttributes(fieldset1, "label", "Zeige Fahrräder von: *(multiselect)", [["for", "storeSelector"]]);
    appendElementAfterCreationWithInnerText(fieldset1, "legend", "Ladenauswahl");
    let select = appendElementAfterCreationWithAttributes(fieldset1, "select", [["multiple", "multiple"], ["id", "storeSelector"], ["required", "required"]]);
    for (let i = 0; i < storeArray.length; i++) {
        if (i === 0) {
            appendElementAfterCreationWithInnerTextAndAttributes(select, "option", storeArray[i].name, [["value", storeArray[i].selector], ["selected", "selected"]]);
        } else {
            appendElementAfterCreationWithInnerTextAndAttributes(select, "option", storeArray[i].name, [["value", storeArray[i].selector]]);
        }
    }
    appendElementAfterCreationWithAttributes(fieldset1, "span");
    let button1 = appendElementAfterCreationWithAttributes(fieldset1, "input", [["type", "button"], ["value", "aktualisieren"]]);
    appendElementAfterCreationWithAttributes(fieldset1, "br");
    fieldset1.addEventListener("mouseleave", () => updateAvailableBikes());
    button1.addEventListener("click", () => updateAvailableBikes());
    let fieldset2 = appendElementAfterCreationWithAttributes(formfield, "fieldset");
    appendElementAfterCreationWithInnerText(fieldset2, "legend", "Rückgabetermin");
    appendElementAfterCreationWithInnerTextAndAttributes(fieldset2, "label", "Abgabetermin für Leihräder: ", [["for", "enddate"]]);
    appendElementAfterCreationWithAttributes(fieldset2, "input", [["type", "date"], ["id", "enddate"], ["value", date]]);
    appendElementAfterCreationWithAttributes(fieldset2, "input", [["type", "time"], ["id", "deliveryEndTime"]]);
    appendElementAfterCreationWithAttributes(body, "form", [["id", "newBookingBikes"]]);
    let fieldset3 = appendElementAfterCreationWithAttributes(formfield, "fieldset");
    appendElementAfterCreationWithInnerText(fieldset3, "legend", "Räderauswahl");
    appendElementAfterCreationWithAttributes(fieldset3, "select", [["multiple", "multiple"], ["id", "bikeSelector"], ["required", "required"]]);
    let fieldset4 = appendElementAfterCreationWithAttributes(formfield, "fieldset");
    appendElementAfterCreationWithInnerText(fieldset4, "legend", "Kundenwahl");
    select = appendElementAfterCreationWithAttributes(fieldset4, "select", [["id", "customerSelector"], ["required", "required"]]);
    for (let i = 0; i < customerArray.length; i++) {
        if (i === 0) {
            appendElementAfterCreationWithInnerTextAndAttributes(select, "option", customerArray[i].name, [["value", customerArray[i].selector], ["selected", "selected"]]);
        } else {
            appendElementAfterCreationWithInnerTextAndAttributes(select, "option", customerArray[i].name, [["value", customerArray[i].selector]]);
        }
    }
    let btnKunde = appendElementAfterCreationWithInnerTextAndAttributes(fieldset4, "button", "neuen Kunden anlegen", [["id", "newCustomerBtn"]]);
    btnKunde.addEventListener("click", () => createCustomerFormFromBooking(fieldset4));
    appendElementAfterCreationWithInnerTextAndAttributes(formfield, "input", "anlegen", [["type", "submit"], ["id", "bookingBtn"]]);
    if (form.attachEvent) {
        form.attachEvent("submit", () => createBooking);
    } else {
        form.addEventListener("submit", () => createBooking);
    }
    updateAvailableBikes();
}

function createListBookings(date) {
    let body = document.querySelector("body");
    let form = appendElementAfterCreationWithAttributes(body, "form", [["id", "bookingList"]]);
    let fieldset = appendElementAfterCreationWithInnerText(form, "fieldset");
    appendElementAfterCreationWithInnerText(fieldset, "legend", "Buchungen am ausgewählten Tag");
    if (date) {
        let dateTmp = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    } else {
        let dateTmp = new Date();
    }
    let select = appendElementAfterCreationWithAttributes(fieldset, "select", [["multiple", "multiple"], ["id", "bookingEditSelector"]]);
    let bookings = getBookingsForDate(dateTmp);
    for (let i = 0; i < bookings.length; i++) {
        appendElementAfterCreationWithInnerTextAndAttributes(select, "option", bookings[i].name, [["value", bookings[i].ident]]);
    }
    let button = appendElementAfterCreationWithAttributes(fieldset, "input", [["type", "button"], ["value", "Booking bearbeiten"]]);
    button.addEventListener("click", () => editBooking())
}
