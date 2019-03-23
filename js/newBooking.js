function updateAvailableBikes(){
    let bikes = new ObservableArray();
    let selector = document.getElementById("storeSelector");
    let options = selector && selector.options;
    let selection = [];
    for(let i= 0; i < options.length; i++){
        let selectedOption = options[i];
        if (selectedOption.selected){
            if(selectedOption.value.includes(",")){
                let divider = selectedOption.value.split(",");
                for (let candidate in divider){
                    selection.push(divider[candidate]);
                }
            } else {
                selection.push(selectedOption.value || selectedOption.text);
            }
        }
    }
    for(let i = 0; i < bikeArray.length; i++){
        for(let j = 0; j < selection.length; j++){
            if(bikeArray[i].store === selection[j]){
                bikes.push(bikeArray[i]);
                break;
            }
        }
    }
    let select = document.getElementById("bikeSelector");
    while (select.firstChild) {
        select.removeChild(select.firstChild);
    }
    for(let i = 0; i < bikes.length; i++){
        appendElementAfterCreationWithInnerTextAndAttributes(select, "option", bikes[i].name(), [["value",bikes[i].ident]]);
    }
    return bikes;
}

function createBookingForm(date){
    let body = document.querySelector("body");
    let form = appendElementAfterCreationWithAttributes(body, "form", [["id", "newBooking"]]);
    let fieldset = appendElementAfterCreationWithInnerText(form, "fieldset");
    appendElementAfterCreationWithInnerText(fieldset, "legend", "Abholtermin");
    appendElementAfterCreationWithInnerTextAndAttributes(fieldset, "label", "Abholtermin für Leihräder: ", [["for","startdate"]]);
    appendElementAfterCreationWithAttributes(fieldset, "span");
    appendElementAfterCreationWithAttributes(fieldset, "br");
    if(date){
        let dateTmp = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
        let startInput = appendElementAfterCreationWithAttributes(fieldset, "input", [["type","date"], ["id","startdate"]]);
        startInput.value = dateTmp.toISOString().substr(0, 10);
    } else {
        appendElementAfterCreationWithAttributes(fieldset, "input", [["type","date"], ["id","startdate"]]);
    }
    let fieldset1 = appendElementAfterCreationWithAttributes(form, "fieldset");
    appendElementAfterCreationWithInnerTextAndAttributes(fieldset1, "label", "Zeige Fahrräder von: *(multiselect)", [["for","storeSelector"]]);
    appendElementAfterCreationWithInnerText(fieldset1, "legend", "Ladenauswahl");
    let select = appendElementAfterCreationWithAttributes(fieldset1, "select", [["multiple","multiple"], ["id","storeSelector"], ["required","required"]]);
    for(let i = 0; i < storeArray.length; i++){
        appendElementAfterCreationWithInnerTextAndAttributes(select, "option", storeArray[i].name, [["value",storeArray[i].selector]]);
    }
    appendElementAfterCreationWithAttributes(fieldset1, "span");
    let button1 = appendElementAfterCreationWithAttributes(fieldset1, "input",  [["type","button"],["value","aktualisieren"]]);
    appendElementAfterCreationWithAttributes(fieldset1, "br");
    fieldset1.addEventListener("mouseleave", () => updateAvailableBikes());
    button1.addEventListener("click", () => updateAvailableBikes());
    let fieldset2 = appendElementAfterCreationWithAttributes(form, "fieldset");
    appendElementAfterCreationWithInnerText(fieldset2, "legend", "Rückgabetermin");
    appendElementAfterCreationWithInnerTextAndAttributes(fieldset2, "label", "Abgabetermin für Leihräder: ", [["for","enddate"]]);
    appendElementAfterCreationWithAttributes(fieldset2, "input", [["type","date"], ["id","enddate"], ["value",date]]);


    let doc2 = appendElementAfterCreationWithAttributes(body, "form", [["id", "newBookingBikes"]]);
    let fieldset3 =appendElementAfterCreationWithAttributes(doc2, "fieldset");
    appendElementAfterCreationWithInnerText(fieldset3, "legend", "Räderauswahl");
    appendElementAfterCreationWithAttributes(fieldset3, "select", [["multiple","multiple"], ["id","bikeSelector"], ["required","required"]]);
}
