class Bike {
    constructor(ident, bez, rahmennr, akkuser, store) {
        this.ident = ident;
        this.bez = bez;
        this.rahmennr = rahmennr;
        // serial number of the 'akku'
        this.akkuser = akkuser;
        // the id of the store
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
    constructor(id, name, street, plz, city, phone) {
        this.id = id;
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

class Booking{
    constructor(ident, bikes, kunde, abholtag, abholzeitpunkt, abgabetag, abgabezeitpunkt) {
        this.ident = ident;
        this.bikes = bikes;
        this.kunde = kunde;
        this.abholtag = abholtag;
        this.abgabetag = abgabetag;
        this.abholzeitpunkt = abholzeitpunkt;
        this.abgabezeitpunkt = abgabezeitpunkt;
    }

    addBike(bike) {
        this.bikes.push(bike);
    };

    removeBike(bike) {
        this.bikes.splice(this.bikes.indexOf(bike), 1);
    };
}


function getBookingFromObject(object){
    let bikes = [];
    for(let i = 0; i < object.bikes.length; i++){
        bikes.push(getBikeFromObject(object.bikes[i]));
    }
    return new Booking(ident, bikes, object.kunde, object.abholtag, object.abholzeitpunkt,object.abgabetag, object.abgabezeitpunkt);
}

class Dates{
    constructor(date, booking_id) {
        this.date = date;
        this.booking_ids = booking_id;
    }

    addBooking(booking_id) {
        this.booking_ids.push(booking_id);
    };

    removeBooking(booking_id) {
        this.booking_ids.splice(this.booking_ids.indexOf(booking_id), 1);
    };
}

function getDateFromObject(object){
    let bookings = [];
    for(let i = 0; i < object.booking_ids.length; i++){
        bookings.push(object.booking_ids[i]);
    }
    return new Dates(object.date, bookings);
}
