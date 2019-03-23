function createTable(table, date, fnc) {
    let dateZero = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    let daysInMonth = dateZero.getDate();
    let dayOffset = new Date(date.getFullYear(), date.getMonth(), 0).getDay();
    let rowsNeeded = Math.ceil((daysInMonth + dayOffset) / 7.0);
    let enumeration = 1;
    let remainingBikes = 0;
    let location;

    for (let i = 0; i < rowsNeeded; i++) {
        let tr = document.createElement("tr");
        for (let j = i * 7; j < (i + 1) * 7; j++) {
            if (j < dayOffset || j >= daysInMonth + dayOffset) {
                let td = document.createElement("td");
                tr.append(td);
            } else {
                let td = document.createElement("td");
                let thisDay = new Date(date.getFullYear(), date.getMonth(), j - dayOffset + 1);
                td.addEventListener("click", () => fnc(thisDay));

                // Create a div element that includes the day number and add it to the class top-left
                let topleft = appendElementAfterCreationWithInnerText(td, "div", enumeration++);
                topleft.classList.add("top-left");

                // get an array of all current location id's
                location = getCurrentStores();

                for(let locationId in location) {
                    // Reduce the number of Bikes at the current location by the number of Bikes in the Bookings
                    remainingBikes += remainingBikesInLocation(thisDay, locationId);
                }

                // Create a div element that includes the result and add it to the class bottom-right
                let bottomright = appendElementAfterCreationWithInnerText(td, "div", remainingBikes);
                bottomright.classList.add("bottom-right");

                td.classList.add("divide");
                tr.append(td);

                remainingBikes = 0;
            }
        }
        table.append(tr);
    }


    let infspan = document.getElementById("currentMonth");
    infspan.innerText = monthNames[date.getMonth()] + " " + date.getFullYear();

    // increase button
    let incbtn = document.getElementById("incMonth");
    // decrease button
    let decbtn = document.getElementById("decMonth");

    incbtn.addEventListener("click", () => updateTable(table, dateZero, +1, fnc));
    decbtn.addEventListener("click", () => updateTable(table, dateZero, -1, fnc));

}

function updateTable(table, date, value, fnc) {
    clearTable(table);
    removeEventListenerForID("incMonth");
    removeEventListenerForID("decMonth");
    createTable(table, new Date(date.getFullYear(), date.getMonth() +  value + 1, 0), fnc);
}


function clearTable(table) {
    let rows = table.rows;
    let i = rows.length;
    // Until i is equal to 0 decrease by 1 and use as i as the index of the row
    while (--i) {
        rows[i].parentNode.removeChild(rows[i]);
    }
}

function switchToDate(date) {
    if (date) {
        updateDate(date, 0);
        //TODO Buchung init
        createBookingForm(date);
    }
}


function remainingBikesInLocation(thisDay, location) {

    let dateObject;
    let maxBikes = 0;
    let bikes = 0;

    // collect the date object that matches the current date
    dateObject = getCurrentDateObject(thisDay);

    // Collect all Bikes ID's from the current location
    maxBikes = getBikesFromLocation(location);

    for(let i = 0 ; i < dateObject.booking_ids.length ; i += 1) {
        // Collect the bike ID's from a booking
        bikes = getBikesFromBooking(dateObject.booking_ids[i]);

        // Subtract the number of Bikes ID's from the current location that match the booking
        maxBikes = maxBikes - bikes;
    }
    return maxBikes;
}


/** GENERATE HTML **/

function createTableHead(){
    let tr = createElementWithAttributes("tr");
    for(let i = 0; i < 7; i++){
        appendElementAfterCreationWithInnerText(tr, "th", dayNames[i]);
    }
    return tr;
}

function createCalender(body){
    let div = appendElementAfterCreationWithAttributes(body, "div", [["id", "calender"]]);
    let head = appendElementAfterCreationWithAttributes(div, "div", [["id", "calenderHeader"]]);
    appendElementAfterCreationWithInnerTextAndAttributes(head,"button", " < ", [["id", "decMonth"]]);
    appendElementAfterCreationWithAttributes(head,"span", [["id", "currentMonth"]]);
    appendElementAfterCreationWithInnerTextAndAttributes(head,"button", " > ", [["id", "incMonth"]]);
    let table = appendElementAfterCreationWithAttributes(div,"table", [["id", "calenderTable"]]);
    table.appendChild(createTableHead());
    createTable(table, new Date(), switchToDate);
}

