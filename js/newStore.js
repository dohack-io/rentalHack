function createStore(form){
    let store = new Store(form.ident.value, form.name.value, form.adress.value, form.selector.value);
    if(store){
        storeArray.push(store);
    }
    console.log("Store angelegt: " + store);
    return false;
}

function createStoreForm(body){
    let form = appendElementAfterCreationWithAttributes(body, "form", [["id", "newstore"], ["onsubmit", "return createStore(this)"]]);
    let fieldset = appendElementAfterCreationWithAttributes(form, "fieldset");
    appendElementAfterCreationWithInnerText(fieldset, "legend", "Neuer Laden");
    appendElementAfterCreationWithInnerTextAndAttributes(fieldset, "label", "ID: ", [["for", "ident"]]);
    appendElementAfterCreationWithAttributes(fieldset, "input", [["type","text"], ["id","ident"], ["required","required"]]);
    appendElementAfterCreationWithAttributes(fieldset, "span");
    appendElementAfterCreationWithAttributes(fieldset, "br");
    appendElementAfterCreationWithInnerTextAndAttributes(fieldset, "label", "Name: ", [["for", "name"]]);
    appendElementAfterCreationWithAttributes(fieldset, "input", [["type","text"], ["id","name"], ["required","required"]]);
    appendElementAfterCreationWithAttributes(fieldset, "span");
    appendElementAfterCreationWithAttributes(fieldset, "br");
    appendElementAfterCreationWithInnerTextAndAttributes(fieldset, "label", "Adresse: ", [["for", "adress"]]);
    appendElementAfterCreationWithAttributes(fieldset, "input", [["type","text"], ["id","adress"], ["required","required"]]);
    appendElementAfterCreationWithAttributes(fieldset, "span");
    appendElementAfterCreationWithAttributes(fieldset, "br");
    appendElementAfterCreationWithInnerTextAndAttributes(fieldset, "label", "Selector:", [["for", "selector"]]);
    appendElementAfterCreationWithAttributes(fieldset, "input", [["type","text"], ["id","selector"]]);
    appendElementAfterCreationWithAttributes(fieldset, "span");
    let button = appendElementAfterCreationWithInnerTextAndAttributes(fieldset, "input", "Laden anlegen", [["type","submit"]]);
    if (form.attachEvent) {
        form.attachEvent("submit", createStore);
    } else {
        form.addEventListener("submit", createStore);
    }
}


/**
 <form id="newstore">
 <fieldset>
 <legend>Neuer Laden</legend>
 <label for="ident">ID: </label><input type="text" id="ident" required><span></span><br>
 <label for="name">Name: </label><input type="text" id="name" required><span></span><br>
 <label for="adress">Adresse: </label><input type="text" id="adress" required><span></span><br>
 <label for="selector">Selector: </label><input type="text" id="selector" placeholder="DU3,DU4 mit komma"><span></span>
 <button type="submit">anlegen</button>
 </fieldset>
 </form>
 **/