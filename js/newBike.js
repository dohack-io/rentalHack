function createBike(form){
    form.preventDefault();
    let id = document.getElementById("ident").value;
    let marke = document.getElementById("marke").value;
    let serie = document.getElementById("serie").value;
    let gang = document.getElementById("gang").value;
    let zoll = document.getElementById("zoll").value;
    let bautyp = document.getElementById("bautyp").value;
    let rahmennr = document.getElementById("rahmennr").value;
    let akkuser = document.getElementById("akkuser").value;
    let store = document.getElementById("store").value;
    let bike = new Bike(id, new Bezeichnung(marke, serie, gang, zoll, bautyp),rahmennr, akkuser, store);
    if(bike){
        let inserted = false;
        for(let i= 0; i < bikeArray.length; i++){
            if (bikeArray[i].ident === id){
                bikeArray.splice(i, 1, bike);
                console.log("Bike ersetzt: " + bike.name());
                inserted = true;
                break;
            }
        }
        if (!inserted){
            bikeArray.push(bike);
            console.log("Bike angelegt: " + bike.name());
        }
    }
    return true;
}

function deleteBike(){
    let ident = document.getElementById("ident");
    let marke = document.getElementById("marke");
    let serie = document.getElementById("serie");
    let gang = document.getElementById("gang");
    let zoll = document.getElementById("zoll");
    let bautyp = document.getElementById("bautyp");
    let rahmennr = document.getElementById("rahmennr");
    let akkuser = document.getElementById("akkuser");
    let store = document.getElementById("store");
    for(let i= 0; i < bikeArray.length; i++){
        if (bikeArray[i].ident === ident.value){
            let bike = bikeArray[i];
            bikeArray.splice(i,1);
            console.log("Bike gelöscht: " + bike.name());
            break;
        }
    }
    ident.value = "";
    marke.value = "";
    serie.value = "";
    gang.value = "";
    zoll.value = "";
    bautyp.value = "";
    rahmennr.value = "";
    akkuser.value = "";
    store.value = "";
    updateBike();
    updateBikeList();
}

function updateBikeList(){
    let select4 = document.getElementById("updateBikeSelect");
    while (select4.firstChild) {
        select4.removeChild(select4.firstChild);
    }
    if(customerArray.length === 0){
        appendElementAfterCreationWithInnerTextAndAttributes(select4, "option", "Kein Bike Eintrag gefunden", [["value","null"],["disabled","disabled"]]);
    } else {
        for(let i = 0; i < customerArray.length; i++){
            appendElementAfterCreationWithInnerTextAndAttributes(select4, "option", customerArray[i].name(), [["value",customerArray[i].ident]]);
        }
    }
}

function updateBike(){
    let bikeOption = document.getElementById("updateBikeSelect");
    let selection;
    let btn = document.getElementById("bikeBtn");
    btn.value = "Daten aktualisieren";
    let fieldset = document.getElementById("newbikefieldset");
    fieldset.firstChild.innerHTML = "Fahrrad bearbeiten";
    let deleteBtn = appendElementAfterCreationWithAttributes(fieldset, "input",[["type","button"], ["value","Eintrag löschen"], ["style","color:red;"]]);
    deleteBtn.addEventListener("click", () => deleteBike());
    for(let i= 0; i < bikeOption.length; i++){
        let selectedOption = bikeOption[i];
        if (selectedOption.selected){
            selection = (selectedOption.value || selectedOption.text);
        }
    }
    if(selection){
        let bike;
        for(let i= 0; i < bikeArray.length; i++){
            if (bikeArray[i].ident === selection){
                bike = bikeArray[i];
                break;
            }
        }
        if(bike){
            let ident = document.getElementById("ident");
            let marke = document.getElementById("marke");
            let serie = document.getElementById("serie");
            let gang = document.getElementById("gang");
            let zoll = document.getElementById("zoll");
            let bautyp = document.getElementById("bautyp");
            let rahmennr = document.getElementById("rahmennr");
            let akkuser = document.getElementById("akkuser");
            let store = document.getElementById("store");
            ident.value = bike.ident;
            marke.value = bike.bez.marke;
            serie.value = bike.bez.serie;
            gang.value = bike.bez.gang;
            zoll.value = bike.bez.zoll;
            bautyp.value = bike.bez.bautyp;
            rahmennr.value = bike.rahmennr;
            akkuser.value = bike.akkuser;
            store.value = bike.store;
        }
    }
}

function createBikeForm(body){
    let form = appendElementAfterCreationWithAttributes(body, "form", [["id", "newbike"], ]);
    let fieldset1 = appendElementAfterCreationWithAttributes(form, "fieldset", [["id","newbikefieldset"]]);
    appendElementAfterCreationWithInnerText(fieldset1, "legend", "Neues Fahrrad");
    appendElementAfterCreationWithInnerText(fieldset1, "label", "ID:");
    appendElementAfterCreationWithAttributes(fieldset1, "input", [["type", "text"],["id","ident"]]);
    let fieldset2 = appendElementAfterCreationWithAttributes(fieldset1, "fieldset");
    appendElementAfterCreationWithInnerText(fieldset2, "legend", "Bezeichnung");
    appendElementAfterCreationWithInnerText(fieldset2, "label", "Marke:");
    appendElementAfterCreationWithAttributes(fieldset2, "input", [["type","text"], ["id","marke"], ["placeholder","kalkhoff"], ["required","true"]]);
    appendElementAfterCreationWithAttributes(fieldset2, "span");
    appendElementAfterCreationWithAttributes(fieldset2, "br");
    appendElementAfterCreationWithInnerText(fieldset2, "label", "Serie:");
    appendElementAfterCreationWithAttributes(fieldset2, "input", [["type","text"], ["id","serie"], ["placeholder","Agatto"], ["required","true"]]);
    appendElementAfterCreationWithAttributes(fieldset2, "span");
    appendElementAfterCreationWithAttributes(fieldset2, "br");
    appendElementAfterCreationWithInnerText(fieldset2, "label", "Gang:");
    appendElementAfterCreationWithAttributes(fieldset2, "input", [["type","text"], ["id","gang"], ["placeholder","7 Gang"], ["required","true"]]);
    appendElementAfterCreationWithAttributes(fieldset2, "span");
    appendElementAfterCreationWithAttributes(fieldset2, "br");
    appendElementAfterCreationWithInnerText(fieldset2, "label", "Zoll:");
    let select = appendElementAfterCreationWithAttributes(fieldset2, "select", [["required", "true"], ["name", "zoll"], ["id", "zoll"]]);
    appendElementAfterCreationWithInnerTextAndAttributes(select, "option", "20 Zoll", [["value","20"]]);
    appendElementAfterCreationWithInnerTextAndAttributes(select, "option", "24 Zoll", [["value","24"]]);
    appendElementAfterCreationWithInnerTextAndAttributes(select, "option", "26 Zoll", [["value","26"]]);
    appendElementAfterCreationWithInnerTextAndAttributes(select, "option", "28 Zoll", [["value","28"], ["selected","selected"]]);
    appendElementAfterCreationWithInnerTextAndAttributes(select, "option", "29 Zoll", [["value","29"]]);
    appendElementAfterCreationWithAttributes(fieldset2, "span");
    appendElementAfterCreationWithAttributes(fieldset2, "br");
    appendElementAfterCreationWithInnerText(fieldset2, "label", "Fahrradtyp:");
    let select2 = appendElementAfterCreationWithAttributes(fieldset2, "select", [["required", "true"],["name","bautyp"], ["id","bautyp"]]);
    appendElementAfterCreationWithInnerTextAndAttributes(select2, "option", "", [["selected","selected"], ["disabled", "true"], ["hidden","true"]]);
    appendElementAfterCreationWithInnerTextAndAttributes(select2, "option", "Damenrad", [["value","damen"]]);
    appendElementAfterCreationWithInnerTextAndAttributes(select2, "option", "Herrenrad", [["value","herren"]]);
    appendElementAfterCreationWithAttributes(fieldset2, "span");
    appendElementAfterCreationWithInnerText(fieldset1, "label", "Rahmennr:");
    appendElementAfterCreationWithAttributes(fieldset1, "input", [["type","text"], ["id", "rahmennr"]]);
    appendElementAfterCreationWithAttributes(fieldset1, "span");
    appendElementAfterCreationWithAttributes(fieldset1, "br");
    appendElementAfterCreationWithInnerText(fieldset1, "label", "Akkuseriennr:");
    appendElementAfterCreationWithAttributes(fieldset1, "input", [["type","text"], ["id", "akkuser"]]);
    let fieldset3 = appendElementAfterCreationWithAttributes(fieldset1, "fieldset");
    appendElementAfterCreationWithInnerText(fieldset3, "legend", "Zugehöriger Laden");
    appendElementAfterCreationWithInnerText(fieldset3, "label", "Laden:");
    let select3 = appendElementAfterCreationWithAttributes(fieldset3, "select", [["required","required"], ["id","store"]]);
    for(let i = 0; i < storeArray.length; i++){
        if(storeArray[i].selector.length === 1){
            appendElementAfterCreationWithInnerTextAndAttributes(select3, "option", storeArray[i].name, [["value",storeArray[i].ident]])
        }
    }
    appendElementAfterCreationWithAttributes(fieldset3, "span");
    let btn = appendElementAfterCreationWithInnerTextAndAttributes(fieldset1, "input", "anlegen", [["type", "submit"],["id","bikeBtn"]]);
    if (form.attachEvent) {
        form.attachEvent("submit", createBike);
    } else {
        form.addEventListener("submit", createBike);
    }

    let form2 = appendElementAfterCreationWithAttributes(body, "form", [["id", "updateBike"]]);
    let fieldset4 = appendElementAfterCreationWithAttributes(form2, "fieldset");
    appendElementAfterCreationWithInnerText(fieldset4, "legend", "Rad Bearbeiten");
    let select4 = appendElementAfterCreationWithAttributes(fieldset4, "select", [["required","required"], ["id","updateBikeSelect"]]);
    if(bikeArray.length === 0){
        appendElementAfterCreationWithInnerTextAndAttributes(select4, "option", "Kein Bike Eintrag gefunden", [["value","null"],["disabled","disabled"]]);
    } else {
        for(let i = 0; i < bikeArray.length; i++){
            appendElementAfterCreationWithInnerTextAndAttributes(select4, "option", bikeArray[i].name(), [["value",bikeArray[i].ident]]);
        }
    }
    appendElementAfterCreationWithAttributes(fieldset4, "span");
    appendElementAfterCreationWithAttributes(fieldset4, "br");
    let button = appendElementAfterCreationWithAttributes(fieldset4, "input", [["type","button"], ["value", "Fahrrad bearbeiten"]]);
    button.addEventListener("click", () => updateBike())
}

/**
<form id="newbike">
    <fieldset>
    <legend>Neues Fahrrad</legend>
<label>ID: </label><input type="text" id="ident">
<fieldset>
<legend>Bezeichnung</legend>
<label>Marke: </label><input type="text" id="marke" required placeholder="Kalkhoff"><span></span><br>
<label>Serie: </label><input type="text" id="serie" required placeholder="Agatto"><span></span><br>
<label>Gang: </label><input type="text" id="gang" required placeholder="7 Gang"><span></span><br>
<label>Zoll: </label>
<select required>
<option value="20"> 20 Zoll</option>
<option value="24"> 24 Zoll</option>
<option value="26"> 26 Zoll</option>
<option value="28" selected="selected"> 28 Zoll</option>
<option value="29"> 29 Zoll</option>
</select><span></span><br>
<label>Fahrradtyp: </label><select required>
<option selected disabled hidden>Auswählen</option>
<option value="damen">Damenrad</option>
    <option value="herren">Herrenrad</option>
    </select>
    </fieldset>
    <label>Rahmennr: </label><input type="text" id="rahmennr" required><span></span><br>
<label>Akkuseriennr: </label><input type="text" id="akkuser"><br>
</fieldset>
</form>

 **/
