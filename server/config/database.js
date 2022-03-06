import mysql from "mysql2";


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

export default db;
export {preserve};
