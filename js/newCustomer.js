function createCustomer(form){
    let customer = new Customer(form.ident.value, form.street.value, form.plz.value, form.city.value, form.phone.value);
    if(customer){
        customerArray.push(customer);
    }
    console.log("Kunde angelegt: " + customer);
    return false;
}

function createCustomerForm(body){
    let form = appendElementAfterCreationWithAttributes(body, "form", [["id", "newcustomer"], ["onsubmit", "return createCustomer(this)"]]);
    let fieldset = appendElementAfterCreationWithAttributes(form, "fieldset");
    appendElementAfterCreationWithInnerText(fieldset, "legend", "Neuer Kunde");
    appendElementAfterCreationWithInnerTextAndAttributes(fieldset, "label", "ID: ", [["for", "ident"]]);
    appendElementAfterCreationWithAttributes(fieldset, "input", [["type","text"], ["id","ident"], ["required","required"]]);
    appendElementAfterCreationWithAttributes(fieldset, "span");
    appendElementAfterCreationWithAttributes(fieldset, "br");
    appendElementAfterCreationWithInnerTextAndAttributes(fieldset, "label", "Name: ", [["for", "name"]]);
    appendElementAfterCreationWithAttributes(fieldset, "input", [["type","text"], ["id","name"], ["required","required"]]);
    appendElementAfterCreationWithAttributes(fieldset, "span");
    appendElementAfterCreationWithAttributes(fieldset, "br");
    appendElementAfterCreationWithInnerTextAndAttributes(fieldset, "label", "Straße: ", [["for", "street"]]);
    appendElementAfterCreationWithAttributes(fieldset, "input", [["type","text"], ["id","street"], ["required","required"]]);
    appendElementAfterCreationWithAttributes(fieldset, "span");
    appendElementAfterCreationWithAttributes(fieldset, "br");
    appendElementAfterCreationWithInnerTextAndAttributes(fieldset, "label", "PLZ:", [["for", "plz"]]);
    appendElementAfterCreationWithAttributes(fieldset, "input", [["type","text"], ["id","plz"], ["required","required"]]);
    appendElementAfterCreationWithAttributes(fieldset, "span");
    appendElementAfterCreationWithAttributes(fieldset, "br");
    appendElementAfterCreationWithInnerTextAndAttributes(fieldset, "label", "Ort:", [["for", "city"]]);
    appendElementAfterCreationWithAttributes(fieldset, "input", [["type","text"], ["id","city"], ["required","required"]]);
    appendElementAfterCreationWithAttributes(fieldset, "span");
    appendElementAfterCreationWithAttributes(fieldset, "br");
    appendElementAfterCreationWithInnerTextAndAttributes(fieldset, "label", "Telefon:", [["for", "phone"]]);
    appendElementAfterCreationWithAttributes(fieldset, "input", [["type","text"], ["id","phone"]]);
    appendElementAfterCreationWithAttributes(fieldset, "span");
    let button = appendElementAfterCreationWithAttributes(fieldset, "input", [["type","submit"]]);
    if (form.attachEvent) {
        form.attachEvent("submit", createCustomer);
    } else {
        form.addEventListener("submit", createCustomer);
    }
}


/**

 <form id="newcustomer">
 <fieldset>
 <legend>Neuer Kunde</legend>
 <label for="ident">ID: </label><input type="text" id="ident"><span></span><br>
 <label for="name">Name: </label><input type="text" id="name" required><span></span><br>
 <label for="street">Straße: </label><input type="text" id="street" required><span></span><br>
 <label for="plz">PLZ: </label><input type="text" id="plz" required><span></span><br>
 <label for="city">Ort: </label><input type="text" id="city" required><span></span><br>
 <label for="phone">Telefonnummer: </label><input type="text" id="phone"><span></span>
 <input type="submit">
 </fieldset>
 </form>

 **/