function createStandartSiteContent(body) {
    createNavBar(body);
    createLocation(body);
    createCalender(body);
    createDate(body);
}

let homeNav = function () {
    let body = replaceBody();
    createStandartSiteContent(body);

    reloadCss();
};

let newBikeNav = function () {
    let body = replaceBody();
    createStandartSiteContent(body);
    createBikeForm(body);
    reloadCss();
};

let newStoreNav = function () {
    let body = replaceBody();
    createStandartSiteContent(body);
    createStoreForm(body);
    reloadCss();
};

let newCustomerNav = function () {
    let body = replaceBody();
    createStandartSiteContent(body);
    createCustomerForm(body);

    reloadCss();
};

let newBookingNav = function () {
    let body = replaceBody();
    createStandartSiteContent(body);
    createBookingForm();
    reloadCss();
};

let monthViewNav = function(){
    let body = replaceBody();
    createNavBar();
    createMonthView(body);
};

let loadingNav = function () {
    let body = replaceBody();
    createNavBar(body);
    pageLoading(body);
};

let pageLoaded = function () {
    let body = replaceBody();
    // let body = document.querySelector("body");
    createNavBar(body);
    createLocation(body);
    createCalender(body);
    createDate(body);

    reloadCss();
};

let aboutNav = function () {
    console.log("Speichern gedrückt");
};

const navtuples = [
    ["Home", homeNav],
    ["Neues Fahrrad", newBikeNav],
    ["Neuer Laden", newStoreNav],
    ["Neuer Customer", newCustomerNav],
    ["Neue Buchung", newBookingNav],
    ["Monatsansicht", monthViewNav]
];

function insertElementInLi(element) {
    let li = document.createElement("li");
    li.appendChild(element);
    return li;
}

function createHrefLink(name, eventlistener) {
    let aNode = document.createElement("a");
    aNode.innerText = name;
    aNode.addEventListener("click", () => eventlistener());
    return aNode;
}

function createAndInsertNavBar(tuple) {
    let body = document.querySelector("body");
    let nav = document.createElement("nav");
    nav.setAttribute("id", "navigationTop");
    let ul = document.createElement("ul");
    for (let i = 0; i < tuple.length; i++) {
        ul.appendChild(insertElementInLi(createHrefLink(tuple[i][0], tuple[i][1])));
    }
    let about = insertElementInLi(createHrefLink("Speichern", () => aboutNav()));
    about.setAttribute("class", "active");
    about.setAttribute("style", "float:right;");
    about.setAttribute("id", "save");
    ul.appendChild(about);
    nav.appendChild(ul);
    body.appendChild(nav);
}

function createNavBar() {
    createAndInsertNavBar(navtuples);
}

function pageLoading(body) {
    appendElementAfterCreationWithInnerTextAndAttributes(body, "h1", "wait while loading data from sync server.", [["id","loading"]]);
}


