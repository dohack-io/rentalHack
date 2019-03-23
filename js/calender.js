function createTable(table, date, fnc) {
    let dateZero = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    let daysInMonth = dateZero.getDate();
    let dayOffset = new Date(date.getFullYear(), date.getMonth(), 0).getDay();
    let rowsNeeded = Math.ceil((daysInMonth + dayOffset) / 7.0);
    let enumeration = 1;

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
                let topleft = appendElementAfterCreationWithInnerText(td, "div", enumeration++);
                topleft.classList.add("top-left");
                /** TODO Anzahl Buchungen für den Tag **/
                td.classList.add("divide");
                tr.append(td);

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
        createStandartSiteContent(replaceBody());
        createBookingForm(date);
        createListBookings(date);
    }
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

