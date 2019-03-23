function dateDayString(date){
    return dateDayNames[date.getDay()] + ", der " +date.getDate() + " " + monthNames[date.getMonth()];
}
function fillDateData(date){

}

function clearDateData(){

}

function updateDate(date, value){
    clearDateData();
    let prevDay = removeEventListenerForID("prevDay");
    let nextDay = removeEventListenerForID("nextDay");
    let newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + value);
    fillDateData(newDate);
    replaceInnerHtmlFromId("dateDisplay", dateDayString(newDate));
    prevDay.addEventListener("click", () => updateDate(newDate, -1));
    nextDay.addEventListener("click", () => updateDate(newDate, +1));
}

function createDate(body, date) {
    if(!date){ date = new Date();}
    let div = appendElementAfterCreationWithAttributes(body, "div", [["id", "date"],["style", "text-align: center;"]]);
    let prevDay = appendElementAfterCreationWithInnerTextAndAttributes(div, "button", " < ", [["id","prevDay"]]);
    appendElementAfterCreationWithInnerTextAndAttributes(div, "span",  dateDayString(date), [["id", "dateDisplay"]]);
    let nextDay = appendElementAfterCreationWithInnerTextAndAttributes(div, "button", " > ", [["id","nextDay"]]);

    prevDay.addEventListener("click", () => updateDate(date, -1));
    nextDay.addEventListener("click", () => updateDate(date, +1));
}

/*
<div id="date">
    <button style="float:left;"> < </button>
    <span style="clear:both;">theDateToDisplay</span>
    <button style="float:right;"> > </button>
    <div id="bikesAtDay">
        <span> 12/12 Räder</span>
        <br>
        <span> Eintrag 1 <button style="font-style: italic;"> i </button></span>
    </div>

    text-align: center;
</div>
 */