const express = require('express'),
      app = express(),
      db = require('../database');  

    app.get('/team', (req, res) => {

        const query = `SELECT * FROM teams`;

        db.query(query, (error, results, fields) => {
        
            if (error) {
                res.status(400).json({
                    state:false,
                    error
                })
            }else{
                res.status(200).json({
                    state:true,
                    teams: results
                })
            }

        });
    
    });

    app.get('/team/:id', (req, res) => {
        
        const id = db.escape(req.params.id); //avoid injecting sql
        const query = `SELECT * FROM teams WHERE id_team = ${id}`;

        db.query(query, (error, results, fields) => {
            if (error) {
                res.status(400).json({
                    state:false,
                    error
                })
            }else{
                results.length === 0 ? result = 'not exists' : result = results[0];
                res.status(200).json({
                    state:true,
                    team: result
                })
            }
        });
    
    });

    app.post('/team', (req, res) => {
        
        const name = db.escape(req.body.name); //avoid injecting sql
        const query = `INSERT INTO teams(name) VALUES(${name})`;

        db.query(query, (error, results, fields) => {
            
            if (error) {
                res.status(400).json({
                    state:false,
                    error
                })
            }else{
                res.status(200).json({
                    state:true,
                    team: 'Saved team successfully'
                })
            }

        });
        
    });

    app.put('/team/:id', (req, res) => {
        
        const id = db.escape(req.params.id); //avoid injecting sql
        const name = db.escape(req.body.name); //avoid injecting sql

        const query = `UPDATE teams SET name = ${name} WHERE id_team = ${id}`;

        db.query(query, (error, results, fields) => {
            
            if (error) {
                res.status(400).json({
                    state:false,
                    error
                })
            }else{
                res.json({
                    state:true,
                    team: 'Modified name'
                })
            }
        });
    });

    app.delete('/team/:id', (req, res) => {
        
        const id = db.escape(req.params.id); //avoid injecting sql

        const query = `DELETE FROM teams WHERE id_team = ${id}`;

        db.query(query, (error, results, fields) => {
            
            if (error) {
                res.status(400).json({
                    state:false,
                    error
                })
            }else{
                console.log(results);
                res.json({
                    state:true,
                    team: 'Deleted successfully'
                })
            }
        });
    });
    
module.exports = app;