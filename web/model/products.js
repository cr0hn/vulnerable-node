var config = require("../config"),
    pgp = require('pg-promise')();

function list_products() {
    var db = pgp(config.db.connectionString);

    var q = "SELECT * FROM products;";

    return db.many(q);
}

function getProduct(product_id) {
    var db = pgp(config.db.connectionString);

    var q = "SELECT * FROM products WHERE id = $1";

    return db.one(q, product_id);
}

function search(query) {

    var db = pgp(config.db.connectionString);

    var q = "SELECT * FROM products WHERE name ILIKE '%1#%' OR description ILIKE '%$1#%'";

    return db.many(q, query);

}

function purchase(cart) {

    var db = pgp(config.db.connectionString);

    var q = "INSERT INTO purchases(mail, product_name, user_name, product_id, address, phone, ship_date, price)"+
             "VALUES(${mail}, ${product_name}, ${username}, ${product_id}, ${address}, ${ship_date}, ${phone}, ${price})";
             
    return db.none(q, cart);

}

function get_purcharsed(username) {

    var db = pgp(config.db.connectionString);

    var q = "SELECT * FROM purchases WHERE user_name = $1";

    return db.many(q, username);

}

var actions = {
    "list": list_products,
    "getProduct": getProduct,
    "search": search,
    "purchase": purchase,
    "getPurchased": get_purcharsed
}

module.exports = actions;
