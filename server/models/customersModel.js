// import connection
import db from "../config/database.js";


// Get All Customers
export const getCustomers = (result) => {
    db.query("SELECT * FROM customers INNER JOIN users u on customers.user_id = u.user_id\n", (err, results) => {
        if(err) {
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Get Single Customers
export const getCustomersById = (id, result) => {
    db.query("SELECT * FROM customers INNER JOIN users u on customers.user_id = ?", [id], (err, results) => {
        if(err) {
            result(err, null);
        } else {
            result(null, results[0]);
        }
    });
}

// Insert Customers to Database
export const insertCustomers = (data, result) => {
    db.query("INSERT INTO customers SET ?", [data], (err, results) => {
        if(err) {
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Update Customers to Database
export const updateCustomersById = (data, id, result) => {
    db.query("UPDATE customers SET name = ? /* TODO */, id = ?", [data.name /* TODO */, id], (err, results) => {
        if(err) {
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Delete Customers to Database
export const deleteCustomersById = (id, result) => {
    db.query("DELETE FROM customers WHERE customer_id = ?", [id], (err, results) => {
        if(err) {
            result(err, null);
        } else {
            result(null, results);
        }
    });
}
