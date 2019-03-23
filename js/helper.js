function createElementWithAttributes(type, attributes){
    let elem = document.createElement(type);
    if (attributes){
        for(let i = 0; i < attributes.length; i++){
            elem.setAttribute(attributes[i][0], attributes[i][1]);
        }
    }
    return elem;
}


function createElementWithInnerText(type, innerText){
    let elem = document.createElement(type);
    if (innerText){
        elem.innerText = innerText;
    }
    return elem;
}

function createElementWithInnerTextAndAttributes(type, innerText, attributes){
    let elem = createElementWithAttributes(type, attributes);
    elem.innerText = innerText;
    return elem;
}

function appendElementAfterCreationWithAttributes(father, type, attributes){
    let newChild = createElementWithAttributes(type, attributes);
    father.appendChild(newChild);
    return newChild;
}

function appendElementAfterCreationWithInnerText(father, type, innerText){
    let newChild = createElementWithInnerText(type, innerText);
    father.appendChild(newChild);
    return newChild;
}

function appendElementAfterCreationWithInnerTextAndAttributes(father, type, innerText, attributes){
    let newChild = createElementWithInnerTextAndAttributes(type, innerText, attributes);
    father.appendChild(newChild);
    return newChild;
}

function replaceBody(){
    let body = document.querySelector("body");
    let newbody = createElementWithAttributes("body");
    body.replaceWith(newbody);
    return document.querySelector("body");
}

function replaceElem(elem, type){
    let newElem = createElementWithAttributes(type);
    elem.replaceWith(newElem);
}

function removeElem(elem){
    elem.parentNode.removeChild(elem);
    let parent = elem.parentNode;
    parent.removeChild(elem);
    return parent;
}

function removeElemWithId(id){
    let selector = document.getElementById(id);
    let parent = selector.parentNode;
    parent.removeChild(selector);
    return parent;
}

function getIdentForArray(array){
    array.sort(function(a, b){return a - b});
    for(let i = 0; i < array.length; i++){
        if (array[i].ident !== i){
            return i;
        }
    }
    return array.length + 1;
}

function reloadCss(){
    let links = document.getElementsByTagName("link");
    for (let cl in links)
    {
        let link = links[cl];
        if (link.rel === "stylesheet")
            link.href += "";
    }
}

function replaceInnerHtmlFromId(id, newHtml){
    let elem = document.getElementById(id);
    if (elem) {elem.innerText = newHtml;}
    else {console.log("replaceInnerHtmlFromId() mit id " + id);}
    return elem;
}

function removeEventListenerForID(id) {
    let elem = document.getElementById(id);
    if (elem) {
        let elemClone = elem.cloneNode(true);
        elem.replaceWith(elemClone);
        return elemClone;
    }
    else { console.log("removeEventListenerForID() mit id " + id);}

}

function corsRequest(url, callback){
    let corsReq = new XMLHttpRequest();
    corsReq.addEventListener("load", callback);
    corsReq.open("GET", "http://cors-anywhere.herokuapp.com/".concat(url));
    corsReq.send();
}

const dayNames = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];
const dateDayNames = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
const monthNames = ["Januar", "Februar", "März", "April", "Mai", "Juni",
    "Juli", "August", "September", "Oktober", "November", "Dezember"
];


function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}


/** Extended Date to count number of days in Month **/

Date.prototype.monthDays= function(){
    var d= new Date(this.getFullYear(), this.getMonth()+1, 0);
    return d.getDate();
};



/** Observable Array **/

function ObservableArray(items) {
    var _self = this,
        _array = [],
        _handlers = {
            itemadded: [],
            itemremoved: [],
            itemset: []
        };

    function defineIndexProperty(index) {
        if (!(index in _self)) {
            Object.defineProperty(_self, index, {
                configurable: true,
                enumerable: true,
                get: function() {
                    return _array[index];
                },
                set: function(v) {
                    _array[index] = v;
                    raiseEvent({
                        type: "itemset",
                        index: index,
                        item: v
                    });
                }
            });
        }
    }

    function raiseEvent(event) {
        _handlers[event.type].forEach(function(h) {
            h.call(_self, event);
        });
    }

    Object.defineProperty(_self, "addEventListener", {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function(eventName, handler) {
            eventName = ("" + eventName).toLowerCase();
            if (!(eventName in _handlers)) throw new Error("Invalid event name.");
            if (typeof handler !== "function") throw new Error("Invalid handler.");
            _handlers[eventName].push(handler);
        }
    });

    Object.defineProperty(_self, "removeEventListener", {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function(eventName, handler) {
            eventName = ("" + eventName).toLowerCase();
            if (!(eventName in _handlers)) throw new Error("Invalid event name.");
            if (typeof handler !== "function") throw new Error("Invalid handler.");
            var h = _handlers[eventName];
            var ln = h.length;
            while (--ln >= 0) {
                if (h[ln] === handler) {
                    h.splice(ln, 1);
                }
            }
        }
    });

    Object.defineProperty(_self, "push", {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function() {
            var index;
            for (var i = 0, ln = arguments.length; i < ln; i++) {
                index = _array.length;
                _array.push(arguments[i]);
                defineIndexProperty(index);
                raiseEvent({
                    type: "itemadded",
                    index: index,
                    item: arguments[i]
                });
            }
            return _array.length;
        }
    });

    Object.defineProperty(_self, "pop", {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function() {
            if (_array.length > -1) {
                var index = _array.length - 1,
                    item = _array.pop();
                delete _self[index];
                raiseEvent({
                    type: "itemremoved",
                    index: index,
                    item: item
                });
                return item;
            }
        }
    });

    Object.defineProperty(_self, "unshift", {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function() {
            for (var i = 0, ln = arguments.length; i < ln; i++) {
                _array.splice(i, 0, arguments[i]);
                defineIndexProperty(_array.length - 1);
                raiseEvent({
                    type: "itemadded",
                    index: i,
                    item: arguments[i]
                });
            }
            for (; i < _array.length; i++) {
                raiseEvent({
                    type: "itemset",
                    index: i,
                    item: _array[i]
                });
            }
            return _array.length;
        }
    });

    Object.defineProperty(_self, "shift", {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function() {
            if (_array.length > -1) {
                var item = _array.shift();
                delete _self[_array.length];
                raiseEvent({
                    type: "itemremoved",
                    index: 0,
                    item: item
                });
                return item;
            }
        }
    });

    Object.defineProperty(_self, "splice", {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function(index, howMany /*, element1, element2, ... */ ) {
            var removed = [],
                item,
                pos;

            index = index == null ? 0 : index < 0 ? _array.length + index : index;

            howMany = howMany == null ? _array.length - index : howMany > 0 ? howMany : 0;

            while (howMany--) {
                item = _array.splice(index, 1)[0];
                removed.push(item);
                delete _self[_array.length];
                raiseEvent({
                    type: "itemremoved",
                    index: index + removed.length - 1,
                    item: item
                });
            }

            for (var i = 2, ln = arguments.length; i < ln; i++) {
                _array.splice(index, 0, arguments[i]);
                defineIndexProperty(_array.length - 1);
                raiseEvent({
                    type: "itemadded",
                    index: index,
                    item: arguments[i]
                });
                index++;
            }

            return removed;
        }
    });

    Object.defineProperty(_self, "length", {
        configurable: false,
        enumerable: false,
        get: function() {
            return _array.length;
        },
        set: function(value) {
            var n = Number(value);
            var length = _array.length;
            if (n % 1 === 0 && n >= 0) {
                if (n < length) {
                    _self.splice(n);
                } else if (n > length) {
                    _self.push.apply(_self, new Array(n - length));
                }
            } else {
                throw new RangeError("Invalid array length");
            }
            _array.length = n;
            return value;
        }
    });

    Object.getOwnPropertyNames(Array.prototype).forEach(function(name) {
        if (!(name in _self)) {
            Object.defineProperty(_self, name, {
                configurable: false,
                enumerable: false,
                writable: false,
                value: Array.prototype[name]
            });
        }
    });

    if (items instanceof Array) {
        _self.push.apply(_self, items);
    }
}
