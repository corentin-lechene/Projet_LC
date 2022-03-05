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
export const updateCardsById = (data, id, result) => {
    db.query("UPDATE cards SET name = ? /* TODO */, id = ?", [data.name /* TODO */, id], (err, results) => {
        if(err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results[0]});
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
