import mysql from "mysql2";
import {sha512} from "js-sha512";
import jsonwebtoken from "jsonwebtoken";


// create the connection to database
const db = mysql.createConnection({
    host: `${process.env.BDD_HOST}`,
    user: `${process.env.BDD_USER}`,
    password: `${process.env.BDD_PWD}`,
    database: `${process.env.BDD_DATABASE}`
});



export function preserve(data) {
    return (db.escape(data)).replaceAll("'", "`");
}

export function generatePassword(data = false) {
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

export function encodeToken(data) {
    return data.token || jsonwebtoken.sign(
        {user_id: data.user_id, role: data.role},
        `${process.env.JWT_KEY_TOKEN}`,
    );
}

export function decodeToken(token) {
    return jsonwebtoken.verify(token, `${process.env.JWT_KEY_TOKEN}`);
}

export default db;
