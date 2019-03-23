function createLocation(body){
    if (!body){
        body = document.querySelector("body");
    }
    let div = appendElementAfterCreationWithAttributes(body, "div", [["id", "location"]]);
    let select = appendElementAfterCreationWithAttributes(div, "select");
    if(storeArray.length !== 0){
        select.addEventListener("change", () => changeLocation(select.value));
        for(let i = 0; i < storeArray.length; i++){
            appendElementAfterCreationWithInnerTextAndAttributes(select, "option", storeArray[i].name, [["value",storeArray[i].ident]]);
        }
    } else {
        appendElementAfterCreationWithInnerTextAndAttributes(select, "option", "Kein Store Eintrag gefunden", [["value","null"]]);
    }
}

function updateLocations(){
    let div = document.getElementById("location");
    replaceElem(div, "div");
    createLocation();
}

function changeLocation(code){
    let store = getStoreFromIdent(code);
    if(store){
        //TODO
    }
}

function getStoreFromIdent(ident){
    for(let i = 0; storeArray[i]; i++){
        if(storeArray[i].ident === ident){
            return storeArray[i];
        }
    }
    return null;
}


/**
 <div id="location">
 <select>
 <option></option>
 </select>
 </div>
 **/