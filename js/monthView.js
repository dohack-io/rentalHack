function createMonthViewTable(body, date){
    if(!body){
        body = document.querySelector("body");
    }
    if(!date){
        date = new Date();
    }
    let days = date.monthDays();
    let div = appendElementAfterCreationWithAttributes(body, "div", [["id","monthViewDiv"]]);
    let table = appendElementAfterCreationWithAttributes(div, "table", [["id","monthViewTable"]]);
    let trhead = appendElementAfterCreationWithAttributes(table, "tr");
    appendElementAfterCreationWithInnerTextAndAttributes(trhead, "th", "Ident", [["colspan","1"],["rowspan","2"]]);
    appendElementAfterCreationWithInnerTextAndAttributes(trhead, "th", "Bezeichnung", [["colspan","1"],["rowspan","2"]]);
    appendElementAfterCreationWithInnerTextAndAttributes(trhead, "th", "Laden", [["colspan","1"],["rowspan","2"]]);
    appendElementAfterCreationWithInnerTextAndAttributes(trhead, "th", "Status", [["colspan","1"],["rowspan","2"]]);
    appendElementAfterCreationWithInnerTextAndAttributes(trhead, "th",monthNames[date.getMonth()] + " " + date.getFullYear(),  [["colspan",days],["rowspan","1"],["id","monthViewMonth"]]);
    let trExtend = appendElementAfterCreationWithAttributes(table, "tr", [["id","monthViewDaysRow"]]);
    for(let i = 1; i <= days; i++){
        let weekday = new Date(date.getFullYear(), date.getMonth(), i).getDay();
        if(weekday === 0 || weekday === 6){
            appendElementAfterCreationWithInnerTextAndAttributes(trExtend, "td", pad(i, 2), [["colspan","1"],["rowspan","1"],["class","weekend"]]);
        } else {
            appendElementAfterCreationWithInnerTextAndAttributes(trExtend, "td", pad(i, 2), [["colspan","1"],["rowspan","1"]]);
        }
    }
    for(let i = 0; i < customerArray.length; i++){
        let bike = customerArray[i];
        let trBike = appendElementAfterCreationWithAttributes(table, "tr", [["id", "monthViewBike-" + bike.ident]]);
        appendElementAfterCreationWithInnerTextAndAttributes(trBike, "td", bike.ident, [["colspan","1"],["rowspan","1"]]);
        appendElementAfterCreationWithInnerTextAndAttributes(trBike, "td", bike.bez.name(), [["colspan","1"],["rowspan","1"]]);
        appendElementAfterCreationWithInnerTextAndAttributes(trBike, "td", bike.store, [["colspan","1"],["rowspan","1"]]);
        appendElementAfterCreationWithInnerTextAndAttributes(trBike, "td", "TODO", [["colspan","1"],["rowspan","1"]]);
    }
}


function createMonthView(body){
    createMonthViewTable(body);
}
