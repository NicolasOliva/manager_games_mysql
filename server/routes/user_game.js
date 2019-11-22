const express = require('express'),
      app = express(),
      db = require('../database');  

    app.get('/user_game', (req, res) => {

        const query = `SELECT * FROM user_by_game`;

        db.query(query, (error, results, fields) => {
        
            if (error) {
                res.status(400).json({
                    state:false,
                    error
                })
            }else{
                res.status(200).json({
                    state:true,
                    users_by_game: results
                })
            }

        });
    
    });

    app.get('/user_game/:id', (req, res) => {
        
        const id = db.escape(req.params.id); //avoid injecting sql
        const query = `SELECT * FROM user_by_game WHERE fk_id_user = ${id}`;

        db.query(query, (error, results, fields) => {
            if (error) {
              
                res.status(400).json({
                    state:false,
                    error
                })
            
            }else{
            
                results.length === 0 ? result = 'not exists' : result = results;
            
                res.status(200).json({
                    state:true,
                    users_by_game: result
                })
            
            }

        });
    
    });

    app.post('/user_game', (req, res) => {
        
        const {id_user,id_team,id_game,goals} = req.body; 
        const query = `INSERT INTO user_by_game (fk_id_user, fk_id_team, fk_id_game, goals) VALUES (${db.escape(id_user)},${db.escape(id_team)},${db.escape(id_game)},${db.escape(goals)})`;

        db.query(query, (error, results, fields) => {
            
            if (error) {
                res.status(400).json({
                    state:false,
                    error
                })
            }else{
                res.status(200).json({
                    state:true,
                    users_by_game: 'Saved user successfully'
                })
            }

        });
    
    });

    app.put('/user_game/:id', (req, res) => {
        
        const {id_user,id_team,id_game,goals} = req.body,
              id = req.params.id,
              query = `UPDATE user_by_game SET fk_id_user = ${db.escape(id_user)}, fk_id_team = ${db.escape(id_team)}, fk_id_game = ${db.escape(id_game)}, goals = ${db.escape(goals)} WHERE id_user_by_game = ${db.escape(id)}`;

        db.query(query, (error, results, fields) => {

            if (error) {
                res.status(400).json({
                    state:false,
                    error
                })
            }else{
                res.json({
                    state:true,
                    users_by_game: 'Modified'
                })
            }

        });

    });

    app.delete('/user_game/:id', (req, res) => {
        
        const id = db.escape(req.params.id); //avoid injecting sql

        const query = `DELETE FROM user_by_game WHERE id_user_by_game = ${id}`;

        db.query(query, (error, results, fields) => {
            
            if (error) {
                res.status(400).json({
                    state:false,
                    error
                })
            }else{
                res.json({
                    state:true,
                    users_by_game: 'Deleted successfully'
                })
            }
        });
    });
    
module.exports = app;