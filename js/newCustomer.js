function createCustomer(form){
    let customer = new Customer(form.ident.value, form.street.value, form.plz.value, form.city.value, form.phone.value);
    if(customer){
        customerArray.push(customer);
    }
    console.log("Kunde angelegt: " + customer);

    let parent = removeElemWithId("newcustomer");
    appendElementAfterCreationWithInnerText(parent, "p", "erfolgreich angelegt");
    createCustomerForm(parent);
    return false;
}

function deleteCustomer() {
    let ident = document.getElementById("ident");
    let name = document.getElementById("name");
    let street = document.getElementById("street");
    let plz = document.getElementById("plz");
    let city = document.getElementById("city");
    let phone = document.getElementById("phone");
    ident.value = getIdentForArray(customerArray);
    name.value = "";
    street.value = "";
    plz.value = "";
    city.value = "";
    phone.value = "";
    createEditCustomerForm();
    for(let i= 0; i < customerArray.length; i++){
        if (customerArray[i].ident === ident.value){
            let customer = customerArray[i];
            customerArray.splice(i,1);
            console.log("Bike gelöscht: " + customer.name());
            break;
        }
    }
    let btn = document.getElementById("submitNewCustomer");
    btn.innerHTML = "Kunden anlegen";
    let rbtn = document.getElementById("deleteCustomerBtn");
    if (rbtn){
        removeElem(rbtn);
    }
}

function editCustomer() {
    let btn = document.getElementById("submitNewCustomer");
    btn.value = "Daten aktualisieren";
    let fieldset = document.getElementById("newcustomer").firstChild;
    fieldset.firstChild.innerHTML = "Kunden bearbeiten";
    let deleteBtn = appendElementAfterCreationWithAttributes(fieldset, "input",[["type","button"], ["value","Eintrag löschen"], ["id", "deleteCustomerBtn"], ["style","color:red;"]]);
    deleteBtn.addEventListener("click", () => deleteCustomer());
    let selection;
    let customerOption = document.getElementById("customerEditSelector");
    for(let i= 0; i < customerOption.length; i++){
        let selectedOption = customerOption[i];
        if (selectedOption.selected){
            selection = (selectedOption.value || selectedOption.text);
        }
    }
    if(selection){
        let customer;
        for(let i= 0; i < customerArray.length; i++){
            if (customerArray[i].ident === selection){
                customer = customerArray[i];
                break;
            }
        }
        if(customer){
            let ident = document.getElementById("ident");
            let name = document.getElementById("name");
            let street = document.getElementById("street");
            let plz = document.getElementById("plz");
            let city = document.getElementById("city");
            let phone = document.getElementById("phone");
            ident.value = customer.ident;
            name.value = customer.name;
            street.value = customer.street;
            plz.value = customer.plz;
            city.value = customer.city;
            phone.value = customer.phone;
        }
    }
}

function createEditCustomerForm(body) {
    if(!body) {
        body = document.querySelector("body");
    }
    let fieldset = appendElementAfterCreationWithAttributes(body, "fieldset", [["id","editCustomer"]]);
    appendElementAfterCreationWithInnerText(fieldset, "legend", "Kunden bearbeiten");
    select = appendElementAfterCreationWithAttributes(fieldset, "select", [["id", "customerEditSelector"], ["required", "required"]]);
    for (let i = 0; i < customerArray.length; i++) {
        if (i === 0) {
            appendElementAfterCreationWithInnerTextAndAttributes(select, "option", customerArray[i].name, [["value", customerArray[i].ident], ["selected", "selected"]]);
        } else {
            appendElementAfterCreationWithInnerTextAndAttributes(select, "option", customerArray[i].name, [["value", customerArray[i].ident]]);
        }
    }
    let btnKunde = appendElementAfterCreationWithInnerTextAndAttributes(fieldset, "button", "Kunden bearbeiten", [["id", "editCustomerBtn"]]);
    btnKunde.addEventListener("click", () => editCustomer());

}

function createCustomerForm(body){
    if(!body) {
        body = document.querySelector("body");
    }
    let form = appendElementAfterCreationWithAttributes(body, "form", [["id", "newcustomer"], ["onsubmit", "return createCustomer(this)"]]);
    let fieldset = appendElementAfterCreationWithAttributes(form, "fieldset");
    appendElementAfterCreationWithInnerText(fieldset, "legend", "Neuer Kunde");
    let id = getIdentForArray(customerArray);
    appendElementAfterCreationWithInnerTextAndAttributes(fieldset, "label", "ID: ", [["for", "ident"]]);
    appendElementAfterCreationWithAttributes(fieldset, "input", [["type","text"], ["id","ident"], ["value", id], ["disabled","disabled"]]);
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
    appendElementAfterCreationWithAttributes(fieldset, "input", [["type","submit"], ["id", "submitNewCustomer"], ["value","Kunden anlegen"]]);
    if (form.attachEvent) {
        form.attachEvent("submit", () => createCustomer);
    } else {
        form.addEventListener("submit", () => createCustomer);
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