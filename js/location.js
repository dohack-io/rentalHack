function createLocation(body) {
    if (!body) {
        body = document.querySelector("body");
    }
    let div = appendElementAfterCreationWithAttributes(body, "div", [["id", "location"]]);
    let select = appendElementAfterCreationWithAttributes(div, "select");
    if (storeArray.length !== 0) {
        select.addEventListener("change", () => changeLocation(select.value));
        for (let i = 0; i < storeArray.length; i++) {
            appendElementAfterCreationWithInnerTextAndAttributes(select, "option", storeArray[i].name, [["value", storeArray[i].ident]]);
        }
    } else {
        appendElementAfterCreationWithInnerTextAndAttributes(select, "option", "Kein Store Eintrag gefunden", [["value", "null"]]);
    }
}

function getCurrentStores() {
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
    let stores = [];
    for (let i = 0; i < storeArray.length; i++) {
        for (let j = 0; j < selection.length; j++){
            if (storeArray[i].store === selection[j]) {
                stores.push(storeArray[i]);
                break;
            }
        }
    }
    return stores;
}

function updateLocations() {
    let div = document.getElementById("location");
    replaceElem(div, "div");
    createLocation();
}

function changeLocation(code) {
    let store = getStoreFromIdent(code);
    if (store) {
        //TODO
    }
}

function getStoreFromIdent(ident) {
    for (let i = 0; storeArray[i]; i++) {
        if (storeArray[i].ident === ident) {
            return storeArray[i];
        }
    }
    return null;
}


function getCurrentStores() {
    let selector = document.getElementById("storeSelector");
    let options = selector && selector.options;
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
            if (storeArray[i].store === selection[j]) {
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
