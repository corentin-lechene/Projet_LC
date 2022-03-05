import mysql from "mysql2";

// create the connection to database
const db = mysql.createConnection({
    host: '35.233.27.141',
    user: 'root',
    password: 'us8ypgCyo9pFvlA8',
    database: 'projetlc-test'
});



function preserve(data) {
    return (db.escape(data)).replaceAll("'", "`");
}

export default db;
export {preserve};
