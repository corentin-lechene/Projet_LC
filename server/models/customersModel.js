// import connection
import db from "../config/database.js";


// Get All Customers
export const getCustomers = (result) => {
    db.query("SELECT *, DATE_FORMAT(birthdate,'%d/%m/%Y') AS birthDay FROM users u INNER JOIN customers cu INNER JOIN companies co WHERE u.user_id = cu.user_id AND cu.company_id = co.company_id", (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
        }
    });
}

// Get Single Customers
export const getCustomersById = (id, result) => {
    db.query("SELECT * FROM customers INNER JOIN users u on customers.user_id = ?", [id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results[0]});
        }
    });
}

// Insert Customers to Database
export const insertCustomers = (data, result) => {
    db.query("INSERT INTO customers SET ?", [data], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
        }
    });
}

// Update Customers to Database
export const updateCustomersById = (data, id, result) => {
    db.query("UPDATE customers SET name = ? /* TODO */, id = ?", [data.name /* TODO */, id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
        }
    });
}

// Delete Customers to Database
export const deleteCustomersById = (id, result) => {
    db.query("DELETE FROM customers WHERE customer_id = ?", [id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
        }
    });
}
