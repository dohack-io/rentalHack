function createLocation(body) {
    if (!body) {
        body = document.querySelector("body");
    }
    let div = appendElementAfterCreationWithAttributes(body, "div", [["id", "location"]]);
    let select = appendElementAfterCreationWithAttributes(div, "select");
    if (storeArray.length !== 0) {
        select.addEventListener("change", () => changeLocation());
        for (let i = 0; i < storeArray.length; i++) {
            appendElementAfterCreationWithInnerTextAndAttributes(select, "option", storeArray[i].name, [["value", storeArray[i].ident]]);
        }
    } else {
        appendElementAfterCreationWithInnerTextAndAttributes(select, "option", "Kein Store Eintrag gefunden", [["value", "null"]]);
    }
}

function updateLocations() {
    let div = document.getElementById("location");
    replaceElem(div, "div");
    createLocation();
}

function changeLocation() {
    createCalender();
}

function getCurrentStores() {
    let selector = document.getElementById("location").firstChild;
    let options = selector && selector.options ? selector.options : [];
    let selection = [];
    let stores = [];

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
        for (let j = 0; j < selection.length; j++){
            if (storeArray[i].ident === selection[j]) {
                stores.push(storeArray[i]);
                break;
             }
         }
    }
    return stores;
}


/**
 <div id="location">
 <select>
 <option></option>
 </select>
 </div>
 **/
