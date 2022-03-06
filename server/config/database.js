import mysql from "mysql2";
import {sha512} from "js-sha512";


// create the connection to database
const db = mysql.createConnection({
    host: `${process.env.BDD_HOST}`,
    user: `${process.env.BDD_USER}`,
    password: `${process.env.BDD_PWD}`,
    database: `${process.env.BDD_DATABASE}`
});



function preserve(data) {
    return (db.escape(data)).replaceAll("'", "`");
}

function generatePassword(data = false) {
    let pass = '';
    let str = data || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$';

    for (let i = 1; i <= 8; i++) {
        const char = Math.floor(Math.random() * str.length + 1);
        pass += str.charAt(char)
    }
    return {
        pwd_visible: pass,
        pwd_hash: sha512(pass)
    };
}

export {preserve, generatePassword};

export default db;
