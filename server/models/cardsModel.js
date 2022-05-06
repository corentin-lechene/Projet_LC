// import connection
import db from "../config/database.js";

// Get All Cards
export const getCards = (result) => {
    db.query("SELECT * FROM cards", (err, results) => {
        if(err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results[0]});
        }
    });
}

// Get Single Cards
export const getCardsById = (id, result) => {
    db.query("SELECT * FROM cards WHERE card_id = ?", [id], (err, results) => {
        if(err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results[0]});
        }
    });
}

// Get Single Cards
export const getPointsByCustomerId = (customer_id, result) => {
    db.query("SELECT * FROM cards INNER JOIN customers c on cards.card_id = c.card_id WHERE customer_id = ?\n", [customer_id, customer_id], (err, results) => {
        if(err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results[0]});
        }
    });
}

// Insert Cards to Database
export const insertCards = (data, result) => {
    db.query("INSERT INTO cards SET ?", [data], (err, results) => {
        if(err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results[0]});
        }
    });
}

// Update Cards to Database
export const updateCardsById = (data, card_id, result) => {
    db.query("update cards set points = (points + ?) where card_id = ?", [data.points, card_id], (err, results) => {
        if(err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
        }
    });
}

// Delete Cards to Database
export const deleteCardsById = (id, result) => {
    db.query("DELETE FROM cards WHERE card_id = ?", [id], (err, results) => {
        if(err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results[0]});
        }
    });
}
