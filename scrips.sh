#!/bin/sh

cd server

table_name_lower_case=${1,,}
table_name_first_upper_case=${table_name_lower_case^}
table_name_singular=${table_name_lower_case%?}
file_name_controllers="controllers/${table_name_lower_case}.js"
file_name_models="models/${table_name_lower_case}Model.js"
file_name_routes="routes/${table_name_lower_case}Routes.js"

#CREATION FICHIER CONTROLLERS

echo "// Import function from ${table_name_first_upper_case} Model
import { get${table_name_first_upper_case}, get${table_name_first_upper_case}ById, insert${table_name_first_upper_case}, update${table_name_first_upper_case}ById, delete${table_name_first_upper_case}ById } from \"../${file_name_models}\";

// Get All ${table_name_first_upper_case}
export const show${table_name_first_upper_case} = (req, res) => {
    get${table_name_first_upper_case}((err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}
      
// Get Single ${table_name_first_upper_case}
export const show${table_name_first_upper_case}ById = (req, res) => {
    get${table_name_first_upper_case}ById(req.params.id, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
       }
   });
}
      
// Create New ${table_name_first_upper_case}
export const create${table_name_first_upper_case} = (req, res) => {
    const data = req.body;
    insert${table_name_first_upper_case}(data, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Update ${table_name_first_upper_case}
export const update${table_name_first_upper_case} = (req, res) => {
    const data  = req.body;
    const id    = req.params.id;
    update${table_name_first_upper_case}ById(data, id, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Delete ${table_name_first_upper_case}
export const delete${table_name_first_upper_case} = (req, res) => {
    const id = req.params.id;
    delete${table_name_first_upper_case}ById(id, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}
" >"$file_name_controllers"

#CREATION FICHIER MODEL

echo "// import connection
import db from \"../config/database.js\";


// Get All $table_name_first_upper_case
export const get${table_name_first_upper_case} = (result) => {
    db.query(\"SELECT * FROM ${table_name_lower_case}\", (err, results) => {
        if(err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results[0]});
        }
    });
}

// Get Single ${table_name_first_upper_case}
export const get${table_name_first_upper_case}ById = (id, result) => {
    db.query(\"SELECT * FROM ${table_name_lower_case} WHERE ${table_name_singular}_id = ?\", [id], (err, results) => {
        if(err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results[0]});
        }
    });
}

// Insert ${table_name_first_upper_case} to Database
export const insert${table_name_first_upper_case} = (data, result) => {
    db.query(\"INSERT INTO ${table_name_lower_case} SET ?\", [data], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else if (results.affectedRows !== 0) {
            result({valid: true, result: \"Colonne ajoutée\"});
        }
    });
}

// Update ${table_name_first_upper_case} to Database
export const update${table_name_first_upper_case}ById = (data, id, result) => {
    db.query(\"UPDATE ${table_name_lower_case} SET name = ? /* TODO */, ${table_name_singular}_id = ?\", [data.name /* TODO */, id], (err, results) => {
        if(err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results[0]});
        }
    });
}

// Delete ${table_name_first_upper_case} to Database
export const delete${table_name_first_upper_case}ById = (id, result) => {
    db.query(\"DELETE FROM ${table_name_lower_case} WHERE ${table_name_singular}_id = ?\", [id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else if (results.affectedRows !== 0) {
            result({valid: true, result: \"Colonne supprimée\"});
        } else {
            result({valid: false, reason: \"Colonne non supprimée ou inexistante\"});
        }
    });
}" >"$file_name_models"

# CREATION FICHIER ROUTES

echo "// import express
import express from \"express\";

// init express ${table_name_lower_case}Router
const ${table_name_lower_case}Router = express.Router();

// import function from controller
import { show$table_name_first_upper_case, show${table_name_first_upper_case}ById, create${table_name_first_upper_case}, delete${table_name_first_upper_case} /* TODO update${table_name_first_upper_case} */ } from \"../${file_name_controllers}\";


${table_name_lower_case}Router.get('/${table_name_lower_case}', show${table_name_first_upper_case});
${table_name_lower_case}Router.get('/${table_name_lower_case}/:id', show${table_name_first_upper_case}ById);
${table_name_lower_case}Router.post('/${table_name_lower_case}', create${table_name_first_upper_case});
//TODO ${table_name_lower_case}Router.put('/${table_name_lower_case}/:id', update${table_name_first_upper_case});
${table_name_lower_case}Router.delete('/${table_name_lower_case}/:id', delete${table_name_first_upper_case});

export default ${table_name_lower_case}Router;" >"$file_name_routes"

git add "$file_name_controllers" "$file_name_routes" "$file_name_models"
