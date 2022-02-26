#!/bin/sh

cd server

table_name_lower_case=${1,,}
table_name_first_upper_case=${table_name_lower_case^}
table_name_singular=${table_name_lower_case%?}
file_name_controllers="controllers/${table_name_lower_case}.js"
file_name_models="models/${table_name_lower_case}Model.js"

#CREATION FICHIER CONTROLLERS

echo "// Import function from ${table_name_first_upper_case} Model
      import { get${table_name_first_upper_case}, get${table_name_first_upper_case}ById, insert${table_name_first_upper_case}, update${table_name_first_upper_case}ById, delete${table_name_first_upper_case}ById } from \"../${file_name_models}\";
      
      // Get All ${table_name_first_upper_case}
      export const show${table_name_first_upper_case} = (req, res) => {
          get${table_name_first_upper_case}((err, results) => {
              if (err){
                  res.send(err);
              }else{
                  res.json(results);
              }
          });
      }
      
      // Get Single ${table_name_first_upper_case}
      export const show${table_name_first_upper_case}ById = (req, res) => {
          get${table_name_first_upper_case}ById(req.params.id, (err, results) => {
              if (err){
                  res.send(err);
              }else{
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
              }else{
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
              }else{
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
              }else{
                  res.json(results);
              }
          });
      }
" > "$file_name_controllers"

#CREATION FICHIER MODEL

echo "// import connection
      import db from \"../config/database.js\";
      
      
      // Get All $table_name_first_upper_case
      export const get${table_name_first_upper_case} = (result) => {
          db.query(\"SELECT * FROM ${table_name_lower_case}\", (err, results) => {
              if(err) {
                  result(err, null);
              } else {
                  result(null, results);
              }
          });
      }
      
      // Get Single ${table_name_first_upper_case}
      export const get${table_name_first_upper_case}ById = (id, result) => {
          db.query(\"SELECT * FROM ${table_name_lower_case} WHERE ${table_name_singular}_id = ?\", [id], (err, results) => {
              if(err) {
                  result(err, null);
              } else {
                  result(null, results[0]);
              }
          });
      }
      
      // Insert ${table_name_first_upper_case} to Database
      export const insert${table_name_first_upper_case} = (data, result) => {
          db.query(\"INSERT INTO ${table_name_lower_case} SET ?\", [data], (err, results) => {
              if(err) {
                  result(err, null);
              } else {
                  result(null, results);
              }
          });
      }
      
      // Update ${table_name_first_upper_case} to Database
      export const update${table_name_first_upper_case}ById = (data, id, result) => {
          db.query(\"UPDATE ${table_name_lower_case} SET name = ? /* TODO */, id = ?\", [data.name /* TODO */, id], (err, results) => {
              if(err) {
                  result(err, null);
              } else {
                  result(null, results);
              }
          });
      }
      
      // Delete ${table_name_first_upper_case} to Database
      export const delete${table_name_first_upper_case}ById = (id, result) => {
          db.query(\"DELETE FROM ${table_name_lower_case} WHERE ${table_name_singular}_id = ?\", [id], (err, results) => {
              if(err) {
                  result(err, null);
              } else {
                  result(null, results);
              }
          });
      }" > "$file_name_models"
