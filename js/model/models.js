class Bike {
    constructor(ident, bez, rahmennr, akkuser, store) {
        this.ident = ident;
        this.bez = bez;
        this.rahmennr = rahmennr;
        // serial number of the 'akku'
        this.akkuser = akkuser;
        this.store = store;
        if (akkuser) {
            this.ebike = true;
        } else {
            this.ebike = false;
        }
    }

    name(){
        return "RadID: " + this.ident + " - Bez: " + this.bez.name() + " - Store: " + this.store;
    }
}

function getBikeFromObject(object){
    return new Bike(object.ident, getBezFromObject(object.bez), object.rahmennr, object.akkuser, object.store);
}

class Store{
    constructor(ident, name, adress, selector){
        this.ident = ident;
        this.name = name;
        this.adress = adress;
        this.selector = selector;
    }
}

function getStoreFromObject(object){
    return new Store(object.ident, object.name, object.adress, object.selector);
}

class Bezeichnung {
    constructor(marke, serie, gang, zoll, bautyp) {
        this.marke = marke;
        this.serie = serie;
        this.gang = gang;
        this.zoll = zoll;
        this.bautyp = bautyp;
    }

    name(){
        return this.marke + ", " + this.serie;
    }
}

function getBezFromObject(object){
    return new Bezeichnung(object.marke, object.serie, object.gang, object.zoll, object.bautyp);
}

class Customer {
    constructor(name, street, plz, city, phone) {
        this.name = name;
        this.street = street;
        this.plz = plz;
        this.city = city;
        this.phone = phone;
    }
}

function getCustomerFromObject(object){
    return new Customer(object.name, object.street, object.plz, object.city, object.phone);
}

class Buchung{
    constructor(ident, bikes, kunde, abholzeitpunkt, abgabezeitpunkt) {
        this.ident = ident;
        this.bikes = bikes;
        this.kunde = kunde;
        this.abholzeitpunkt = abholzeitpunkt;
        this.abgabezeitpunkt = abgabezeitpunkt;
    }

    addBike(bike) {
        bikes.push(bike);
    };

    removeBike(bike) {
        bikes.splice(bikes.indexOf(bike), 1);
    };
}


function getBookingFromObject(object){
    let bikes = [];
    for(let i = 0; i < object.bikes.length; i++){
        bikes.push(getBikeFromObject(object.bikes[i]));
    }
    return new Buchung(ident, bikes, object.kunde, object.abholzeitpunkt, object.abgabezeitpunkt);
}

class Datum{
    constructor(date, booking_id) {
        this.date = date;
        this.booking_id = booking_id;
    }

    addDate(date) {
        date.push(date);
    };

    removeDate(date) {
        date.splice(date.indexOf(date), 1);
    };
}

function getDateFromObject(object){
    let bookings = [];
    for(let i = 0; i < object.bookings.length; i++){
        bookings.push(getBookingFromObject(object.bookings[i]));
    }
    return new Date(object.date, bookings);
}
